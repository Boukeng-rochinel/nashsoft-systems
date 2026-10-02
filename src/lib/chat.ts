export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export type ChatReply = { ok: true; reply: string } | { ok: false; code: string; error: string }

const ENDPOINT = (import.meta.env.VITE_CHAT_ENDPOINT as string | undefined) || '/api/chat'

/** Sends the conversation to the server-side assistant (which holds the Gemini key). */
export async function sendChat(messages: ChatMessage[], signal?: AbortSignal): Promise<ChatReply> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages.map(({ role, content }) => ({ role, content })) }),
      signal,
    })
    const data = (await res.json().catch(() => null)) as { reply?: string; error?: string; code?: string } | null
    if (res.ok && data?.reply) return { ok: true, reply: data.reply }
    return { ok: false, code: data?.code ?? `http_${res.status}`, error: data?.error ?? 'L’assistant est momentanément indisponible.' }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return { ok: false, code: 'aborted', error: '' }
    return { ok: false, code: 'network', error: 'Connexion impossible. Vérifiez votre réseau puis réessayez.' }
  }
}

export const newId = () => Math.random().toString(36).slice(2, 10)
