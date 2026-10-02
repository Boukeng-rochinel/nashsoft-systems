/**
 * Website assistant backend — framework-agnostic.
 *
 * Used by `api/chat.ts` (Vercel function) and by the Vite dev server middleware.
 * The Gemini API key is read from the server environment (GEMINI_API_KEY) and is
 * never exposed to the browser.
 */
import { z } from 'zod'
import { SYSTEM_PROMPT } from './knowledge'

export const DEFAULT_GEMINI_MODEL = 'gemini-3.5-flash-lite'
const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'

/** Limits that keep cost and abuse in check. */
const MAX_MESSAGE_CHARS = 1000
const MAX_HISTORY = 12
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 25 }

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(MAX_MESSAGE_CHARS),
      }),
    )
    .min(1)
    .max(40),
})

export type ChatRequest = z.infer<typeof chatRequestSchema>

export interface ChatEnv {
  apiKey?: string
  model?: string
  /** Client identifier for rate limiting (IP address). */
  clientId?: string
}

export interface ChatResult {
  status: number
  body: { reply: string } | { error: string; code: string }
}

/* ---------------------------------------------------------------- */
/* Best-effort in-memory rate limiting (per instance).               */
/* For multi-instance production traffic, back this with Redis/KV.   */
/* ---------------------------------------------------------------- */
const hits = new Map<string, number[]>()

function rateLimited(clientId: string): boolean {
  const now = Date.now()
  const recent = (hits.get(clientId) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(clientId, recent)
  if (hits.size > 5000) hits.clear() // bound memory
  return recent.length > RATE_LIMIT.max
}

interface GeminiResponse {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> }; finishReason?: string }>
  promptFeedback?: { blockReason?: string }
  error?: { message?: string }
}

export async function handleChat(payload: unknown, env: ChatEnv): Promise<ChatResult> {
  if (!env.apiKey) {
    return { status: 503, body: { code: 'not_configured', error: 'L’assistant n’est pas encore configuré.' } }
  }

  const parsed = chatRequestSchema.safeParse(payload)
  if (!parsed.success) {
    return { status: 400, body: { code: 'invalid_request', error: 'Message invalide ou trop long.' } }
  }

  if (rateLimited(env.clientId ?? 'anonymous')) {
    return { status: 429, body: { code: 'rate_limited', error: 'Trop de messages en peu de temps. Réessayez dans quelques minutes.' } }
  }

  // Keep the most recent turns; Gemini expects the conversation to start with a user turn.
  let history = parsed.data.messages.slice(-MAX_HISTORY)
  while (history.length && history[0].role !== 'user') history = history.slice(1)
  if (history.length === 0 || history[history.length - 1].role !== 'user') {
    return { status: 400, body: { code: 'invalid_request', error: 'Le dernier message doit venir du visiteur.' } }
  }

  const model = env.model || DEFAULT_GEMINI_MODEL
  let res: Response
  try {
    res = await fetch(`${GEMINI_BASE}/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.apiKey },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: history.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
      }),
      signal: AbortSignal.timeout(25_000),
    })
  } catch {
    return { status: 504, body: { code: 'upstream_timeout', error: 'L’assistant met trop de temps à répondre. Réessayez.' } }
  }

  const data = (await res.json().catch(() => ({}))) as GeminiResponse
  if (!res.ok) {
    // Log server-side only; never forward upstream details (they can include key/quota info).
    console.error('[chat] Gemini error', res.status, data.error?.message)
    return { status: 502, body: { code: 'upstream_error', error: 'L’assistant est momentanément indisponible.' } }
  }

  if (data.promptFeedback?.blockReason) {
    return { status: 200, body: { reply: 'Je ne peux pas répondre à cette demande. Puis-je vous aider au sujet de nos services ou de votre projet ?' } }
  }

  const reply = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim()
  if (!reply) {
    return { status: 502, body: { code: 'empty_reply', error: 'Aucune réponse générée. Reformulez votre question.' } }
  }
  return { status: 200, body: { reply } }
}
