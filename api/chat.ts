/**
 * Vercel Function: POST /api/chat
 * Set GEMINI_API_KEY (and optionally GEMINI_MODEL) in the project's environment variables.
 */
import { handleChat } from '../server/chat'

export async function POST(request: Request): Promise<Response> {
  const payload: unknown = await request.json().catch(() => null)
  const forwarded = request.headers.get('x-forwarded-for') ?? ''
  const result = await handleChat(payload, {
    apiKey: process.env.GEMINI_API_KEY,
    model: process.env.GEMINI_MODEL,
    clientId: forwarded.split(',')[0]?.trim() || 'anonymous',
  })
  return Response.json(result.body, { status: result.status, headers: { 'Cache-Control': 'no-store' } })
}
