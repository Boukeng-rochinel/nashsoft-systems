/**
 * Production API server for the VPS (Nginx serves dist/, and proxies /api/ here).
 *
 *   npm run build:server
 *   node --env-file=.env dist-server/index.js
 *
 * Routes:
 *   POST /api/contact  — Turnstile-protected contact forms → SMTP
 *   POST /api/chat     — website assistant (Gemini)
 */
import { createServer, type IncomingMessage, type ServerResponse } from 'node:http'
import { handleContact } from './contact'
import { handleChat } from './chat'

const PORT = Number(process.env.API_PORT) || 3001
const HOST = process.env.API_HOST || '127.0.0.1'
const MAX_BODY_BYTES = 32 * 1024

class PayloadTooLarge extends Error {}

async function readJson(req: IncomingMessage): Promise<unknown> {
  let size = 0
  const chunks: Buffer[] = []
  for await (const chunk of req as AsyncIterable<Buffer>) {
    size += chunk.length
    if (size > MAX_BODY_BYTES) throw new PayloadTooLarge()
    chunks.push(chunk)
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return null
  }
}

/** Nginx sets X-Real-IP to $remote_addr; X-Forwarded-For can be spoofed by the client. */
const clientIp = (req: IncomingMessage) => {
  const real = req.headers['x-real-ip']
  return (typeof real === 'string' && real) || req.socket.remoteAddress || 'anonymous'
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  res.end(JSON.stringify(body))
}

const server = createServer(async (req, res) => {
  const path = (req.url ?? '').split('?')[0]
  if (path !== '/api/contact' && path !== '/api/chat') return send(res, 404, { code: 'not_found', error: 'Not found' })
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return send(res, 405, { code: 'method_not_allowed', error: 'Method not allowed' })
  }

  let payload: unknown
  try {
    payload = await readJson(req)
  } catch (err) {
    if (err instanceof PayloadTooLarge) return send(res, 413, { code: 'too_large', error: 'Requête trop volumineuse.' })
    throw err
  }

  const ip = clientIp(req)
  try {
    if (path === '/api/contact') {
      const result = await handleContact(payload, {
        turnstileSecret: process.env.TURNSTILE_SECRET_KEY,
        smtp: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: process.env.SMTP_SECURE,
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        to: process.env.CONTACT_TO,
        from: process.env.CONTACT_FROM,
        clientIp: ip,
      })
      return send(res, result.status, result.body)
    }
    const result = await handleChat(payload, { apiKey: process.env.GEMINI_API_KEY, model: process.env.GEMINI_MODEL, clientId: ip })
    return send(res, result.status, result.body)
  } catch (err) {
    console.error(`[api] ${path} failed`, err)
    return send(res, 500, { code: 'server_error', error: 'Erreur interne. Réessayez dans un instant.' })
  }
})

server.listen(PORT, HOST, () => {
  console.log(`[api] listening on http://${HOST}:${PORT}`)
})
