import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Mail, Phone, RotateCcw, Trash2, X } from 'lucide-react'
import { site } from '@/data/site'
import { newId, sendChat, type ChatMessage } from '@/lib/chat'
import { cn } from '@/lib/cn'
import { RichText } from './RichText'

const STORAGE_KEY = 'nashsoft-chat'
const MAX_CHARS = 1000

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Bonjour 👋 Je suis **Nash**, l’assistant de Nashsoft Systems. Posez-moi vos questions sur nos services, nos réalisations ou la façon de démarrer votre projet.',
}

const SUGGESTIONS = ['Quels services proposez-vous ?', 'Combien coûte une application mobile ?', 'Montrez-moi vos réalisations', 'Comment démarrer un projet ?']

function loadHistory(): ChatMessage[] {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? (JSON.parse(raw) as ChatMessage[]) : null
    return Array.isArray(parsed) && parsed.length ? parsed : [WELCOME]
  } catch {
    return [WELCOME]
  }
}

interface ChatError {
  code: string
  message: string
}

export default function ChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory)
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<ChatError | null>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      abortRef.current?.abort()
    }
  }, [onClose])

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)))
    } catch {
      /* storage unavailable */
    }
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, pending])

  const ask = useCallback(async (history: ChatMessage[]) => {
    setPending(true)
    setError(null)
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    // The welcome message is UI only — the conversation sent to the model starts with the visitor.
    const result = await sendChat(
      history.filter((m) => m.id !== 'welcome'),
      controller.signal,
    )
    if (controller.signal.aborted) return
    setPending(false)
    if (result.ok) {
      setMessages((prev) => [...prev, { id: newId(), role: 'assistant', content: result.reply }])
    } else {
      setError({ code: result.code, message: result.error })
    }
  }, [])

  const submit = (text: string) => {
    const content = text.trim().slice(0, MAX_CHARS)
    if (!content || pending) return
    const next = [...messages, { id: newId(), role: 'user' as const, content }]
    setMessages(next)
    setInput('')
    void ask(next)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    submit(input)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit(input)
    }
  }

  const reset = () => {
    abortRef.current?.abort()
    setPending(false)
    setError(null)
    setMessages([WELCOME])
    inputRef.current?.focus()
  }

  const onlyWelcome = messages.length === 1

  return (
    <motion.div
      role="dialog"
      aria-modal="false"
      aria-labelledby="chat-title"
      data-theme="light"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-3 top-[84px] bottom-3 z-50 flex origin-bottom-right flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-20px_rgb(6_20_38/0.45)] sm:inset-x-auto sm:top-auto sm:right-5 sm:bottom-24 sm:h-[min(600px,calc(100dvh-8rem))] sm:w-[390px]"
    >
      {/* Header */}
      <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-r from-navy-950 via-[#06204a] to-[#0a3cc2] px-4 py-3.5 text-white">
        <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-40" />
        <span className="relative inline-flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <img src={site.logo.mark} alt="" className="size-7" />
        </span>
        <div className="relative min-w-0 flex-1">
          <h2 id="chat-title" className="font-display text-sm font-bold text-white">
            Assistant Nashsoft
          </h2>
          <p className="flex items-center gap-1.5 text-[0.7rem] text-slate-300">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-400" />
            Propulsé par Gemini · répond 24/7
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Nouvelle conversation"
          title="Nouvelle conversation"
          className="relative inline-flex size-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Trash2 aria-hidden className="size-4" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer l’assistant"
          className="relative inline-flex size-9 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-3 overflow-y-auto bg-light px-4 py-4">
        {messages.map((m) => (
          <div key={m.id} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.85rem] leading-relaxed',
                m.role === 'user' ? 'rounded-br-md bg-brand-gradient text-white' : 'rounded-bl-md border border-line bg-white text-ink shadow-card',
              )}
            >
              {m.role === 'assistant' ? <RichText text={m.content} /> : <p className="whitespace-pre-wrap">{m.content}</p>}
            </div>
          </div>
        ))}

        {pending && (
          <div className="flex justify-start" aria-label="L’assistant rédige une réponse">
            <div className="flex gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 shadow-card">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 animate-bounce rounded-full bg-brand/60" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {error && error.code === 'not_configured' && (
          <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-[0.8rem] text-amber-900">
            <p className="font-semibold">L’assistant sera bientôt disponible.</p>
            <p className="mt-1">En attendant, notre équipe vous répond directement :</p>
            <div className="mt-2.5 flex flex-col gap-1.5">
              <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 font-medium text-brand hover:underline">
                <Mail aria-hidden className="size-4" /> {site.contact.email}
              </a>
              <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 font-medium text-brand hover:underline">
                <Phone aria-hidden className="size-4" /> {site.contact.phone}
              </a>
            </div>
          </div>
        )}

        {error && error.code !== 'not_configured' && error.code !== 'aborted' && (
          <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-[0.8rem] text-red-800">
            <span>{error.message}</span>
            <button
              type="button"
              onClick={() => void ask(messages)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-100"
            >
              <RotateCcw aria-hidden className="size-3.5" /> Réessayer
            </button>
          </div>
        )}

        {onlyWelcome && !pending && (
          <div className="pt-1">
            <p className="mb-2 text-[0.7rem] font-semibold tracking-wide text-slate uppercase">Questions fréquentes</p>
            <ul className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => submit(s)}
                    className="rounded-full border border-brand/20 bg-white px-3 py-1.5 text-left text-[0.78rem] text-brand transition-colors hover:border-brand hover:bg-brand-50"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Composer */}
      <form onSubmit={onSubmit} className="border-t border-line bg-white p-3">
        <div className="flex items-end gap-2 rounded-xl border border-line-strong bg-white p-1.5 pl-3 transition-colors focus-within:border-brand">
          <label htmlFor="chat-input" className="sr-only">
            Votre question
          </label>
          <textarea
            ref={inputRef}
            id="chat-input"
            rows={1}
            value={input}
            maxLength={MAX_CHARS}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Écrivez votre question…"
            className="max-h-28 min-h-9 flex-1 resize-none bg-transparent py-2 text-sm text-ink outline-none placeholder:text-slate"
          />
          <button
            type="submit"
            disabled={!input.trim() || pending}
            aria-label="Envoyer"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white transition-opacity disabled:opacity-40"
          >
            <ArrowUp aria-hidden className="size-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[0.65rem] text-slate">
          Réponses générées par IA, à vérifier. Ne partagez pas d’informations sensibles.
        </p>
      </form>
    </motion.div>
  )
}
