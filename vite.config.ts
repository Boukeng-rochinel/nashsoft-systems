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
 * After the client build, writes one HTML file per route and per locale
 * (dist/<route>/index.html, dist/en/<route>/index.html, …)
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
      // One module graph for i18n + metadata, so the active locale applies to both.
      const { module } = await runnerImport<typeof import('./src/data/seoBuild')>(fileURLToPath(new URL('./src/data/seoBuild.ts', import.meta.url)), {
        configFile: false,
        resolve: { alias },
      })
      const pages = await module.buildPages()
      const template = await readFile(join(outDir, 'index.html'), 'utf8')

      for (const page of pages) {
        const title = escapeAttr(page.title)
        const description = escapeAttr(page.description)
        const alternates = page.noindex ? '' : page.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`).join('\n    ')
        const tags: Array<[RegExp, string]> = [
          [/<html lang="[^"]*">/, `<html lang="${page.htmlLang}">`],
          [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
          [/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`],
          [/<meta name="robots" content="[^"]*" \/>/, `<meta name="robots" content="${page.noindex ? 'noindex, nofollow' : 'index, follow'}" />`],
          [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${page.url}" />\n    ${alternates}`],
          [/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${page.type}" />`],
          [/<meta property="og:locale" content="[^"]*" \/>/, `<meta property="og:locale" content="${page.ogLocale}" />`],
          [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`],
          [/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`],
          [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${page.url}" />`],
          [/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${page.image}" />`],
          [/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`],
          [/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`],
          [/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${page.image}" />`],
          [/<div id="root"><\/div>/, `<div id="root">${page.shell}</div>`],
        ]
        let html = template
        for (const [pattern, replacement] of tags) {
          if (!pattern.test(html)) throw new Error(`[seo] index.html is missing ${pattern}`)
          html = html.replace(pattern, () => replacement)
        }
        const dir = join(outDir, page.outPath)
        await mkdir(dir, { recursive: true })
        await writeFile(join(dir, 'index.html'), html)
      }

      // Multilingual sitemap: every URL lists its language alternates (xhtml:link).
      const today = new Date().toISOString().slice(0, 10)
      const indexable = pages.filter((p) => !p.noindex)
      const urls = indexable.map((p) =>
        [
          '  <url>',
          `    <loc>${p.url}</loc>`,
          ...p.alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
          `    <lastmod>${p.lastmod ?? today}</lastmod>`,
          `    <changefreq>${p.changefreq}</changefreq>`,
          `    <priority>${p.priority.toFixed(1)}</priority>`,
          '  </url>',
        ].join('\n'),
      )
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
      await writeFile(join(outDir, 'sitemap.xml'), sitemap)
      console.log(`[seo] wrote ${pages.length} route heads and sitemap.xml (${indexable.length} URLs)`)
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
