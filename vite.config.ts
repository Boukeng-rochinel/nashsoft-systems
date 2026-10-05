import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, runnerImport, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Serves POST /api/chat and /api/contact during `npm run dev` with the same
 * handlers as production (server/index.ts). Reads GEMINI_API_KEY,
 * TURNSTILE_SECRET_KEY and SMTP_* from .env.local — server-side only, never
 * bundled into the client.
 */
function apiDev(env: Record<string, string>): Plugin {
  return {
    name: 'nashsoft-api-dev',
    configureServer(server) {
      const route = (path: string, handle: (payload: unknown, clientIp: string) => Promise<{ status: number; body: unknown }>) =>
        server.middlewares.use(path, async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end()
            return
          }
          let raw = ''
          for await (const chunk of req) raw += chunk
          let payload: unknown = null
          try {
            payload = JSON.parse(raw)
          } catch {
            /* handled by validation */
          }
          const result = await handle(payload, req.socket.remoteAddress ?? 'local')
          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        })

      route('/api/chat', async (payload, clientId) => {
        const { handleChat } = (await server.ssrLoadModule('/server/chat.ts')) as typeof import('./server/chat')
        return handleChat(payload, { apiKey: env.GEMINI_API_KEY, model: env.GEMINI_MODEL, clientId })
      })

      route('/api/contact', async (payload, clientIp) => {
        const { handleContact } = (await server.ssrLoadModule('/server/contact.ts')) as typeof import('./server/contact')
        return handleContact(payload, {
          turnstileSecret: env.TURNSTILE_SECRET_KEY,
          smtp: { host: env.SMTP_HOST, port: env.SMTP_PORT, secure: env.SMTP_SECURE, user: env.SMTP_USER, pass: env.SMTP_PASS },
          to: env.CONTACT_TO,
          from: env.CONTACT_FROM,
          clientIp,
        })
      })
    },
  }
}

const alias = { '@': fileURLToPath(new URL('./src', import.meta.url)) }

const escapeAttr = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * After the client build, writes one HTML file per route (dist/<route>/index.html)
 * whose <head> already carries that page's title, description, canonical URL and
 * Open Graph tags, plus dist/sitemap.xml. Crawlers and link previews (WhatsApp,
 * LinkedIn, Facebook) then see the right metadata without running JavaScript.
 * Routes and metadata come from src/data/seo.ts, the same source the pages use.
 */
function seo(): Plugin {
  let outDir = 'dist'
  let skip = false
  return {
    name: 'nashsoft-seo',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      skip = Boolean(config.build.ssr)
    },
    async closeBundle() {
      if (skip) return
      const { module } = await runnerImport<typeof import('./src/data/seo')>(fileURLToPath(new URL('./src/data/seo.ts', import.meta.url)), {
        configFile: false,
        resolve: { alias },
      })
      const { seoRoutes, formatTitle, DEFAULT_OG_IMAGE } = module
      const { site } = await runnerImport<typeof import('./src/data/site')>(fileURLToPath(new URL('./src/data/site.ts', import.meta.url)), {
        configFile: false,
        resolve: { alias },
      }).then((r) => r.module)

      const template = await readFile(join(outDir, 'index.html'), 'utf8')
      const routes = seoRoutes()

      for (const route of routes) {
        const url = `${site.url}${route.path}`
        const title = escapeAttr(formatTitle(route.title))
        const description = escapeAttr(route.description)
        const image = `${site.url}${route.image ?? DEFAULT_OG_IMAGE}`
        const tags: Array<[RegExp, string]> = [
          [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
          [/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`],
          [/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${route.noindex ? 'noindex, nofollow' : 'index, follow'}" />`],
          [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`],
          [/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${route.type ?? 'website'}" />`],
          [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`],
          [/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`],
          [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`],
          [/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${image}" />`],
          [/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`],
          [/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`],
          [/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${image}" />`],
        ]
        let html = template
        for (const [pattern, replacement] of tags) {
          if (!pattern.test(html)) throw new Error(`[seo] index.html is missing ${pattern}`)
          html = html.replace(pattern, () => replacement)
        }
        const dir = join(outDir, route.path)
        await mkdir(dir, { recursive: true })
        await writeFile(join(dir, 'index.html'), html)
      }

      const today = new Date().toISOString().slice(0, 10)
      const urls = routes
        .filter((r) => !r.noindex)
        .map(
          (r) =>
            `  <url>\n    <loc>${site.url}${r.path}</loc>\n    <lastmod>${r.lastmod ?? today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`,
        )
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
      await writeFile(join(outDir, 'sitemap.xml'), sitemap)
      console.log(`[seo] wrote ${routes.length} route heads and sitemap.xml (${urls.length} URLs)`)
    },
  }
}

export default defineConfig(({ mode }) => {
  // '' prefix: load all variables (server-only ones included) for the dev middleware.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), apiDev(env), seo()],
    resolve: { alias },
    build: {
      rollupOptions: {
        output: {
          // Long-lived vendor chunks so page chunks stay small and cacheable.
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined
            if (/[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(id)) return 'react'
            if (/[\\/](framer-motion|motion-dom|motion-utils)[\\/]/.test(id)) return 'motion'
            if (/[\\/](react-hook-form|zod|@hookform)[\\/]/.test(id)) return 'forms'
            return undefined
          },
        },
      },
    },
  }
})
