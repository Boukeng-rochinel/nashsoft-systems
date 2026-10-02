import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Serves POST /api/chat during `npm run dev` with the same handler as the
 * production function (api/chat.ts). Reads GEMINI_API_KEY from .env.local —
 * server-side only, never bundled into the client.
 */
function chatApiDev(env: Record<string, string>): Plugin {
  return {
    name: 'nashsoft-chat-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
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
        const { handleChat } = (await server.ssrLoadModule('/server/chat.ts')) as typeof import('./server/chat')
        const result = await handleChat(payload, {
          apiKey: env.GEMINI_API_KEY,
          model: env.GEMINI_MODEL,
          clientId: req.socket.remoteAddress ?? 'local',
        })
        res.statusCode = result.status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(result.body))
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  // '' prefix: load all variables (server-only ones included) for the dev middleware.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), chatApiDev(env)],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
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
