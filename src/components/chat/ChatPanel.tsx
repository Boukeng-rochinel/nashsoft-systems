import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, RotateCcw, SendHorizontal, X } from 'lucide-react'
import { Link } from '@/i18n/router'
import { site } from '@/data/site'
import { newId, sendChat, type ChatMessage } from '@/lib/chat'
import { RichText } from './RichText'
import { getActiveLocale, localeInfo, t } from '@/i18n'

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
  // Date stamp at the top of the conversation, e.g. "Aujourd’hui, 16:40".
  const [openedAt] = useState(() =>
    t('Aujourd’hui, {0}', [new Date().toLocaleTimeString(localeInfo[getActiveLocale()].dateLocale, { hour: '2-digit', minute: '2-digit' })]),
  )

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
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-3 top-[84px] bottom-3 z-50 flex origin-bottom-right flex-col overflow-hidden rounded-xl bg-white shadow-[0_20px_60px_-20px_rgb(6_20_38/0.45)] ring-1 ring-black/5 sm:inset-x-auto sm:top-auto sm:right-5 sm:bottom-24 sm:h-[min(560px,calc(100dvh-8rem))] sm:w-[350px]"
    >
      {/* Header — solid brand bar */}
      <div className="flex items-center gap-3 bg-brand px-4 py-3 text-white">
        <span aria-hidden className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white">
          <img src={site.logo.mark} alt="" className="size-5" />
        </span>
        <h2 id="chat-title" className="min-w-0 flex-1 truncate font-display text-[0.95rem] font-semibold text-white">
          {t('Nash · Assistant Nashsoft')}
        </h2>
        {!onlyWelcome && (
          <button
            type="button"
            onClick={reset}
            aria-label={t('Nouvelle conversation')}
            title={t('Nouvelle conversation')}
            className="inline-flex size-8 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
          >
            <RotateCcw aria-hidden className="size-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={t('Fermer l’assistant')}
          className="inline-flex size-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15"
        >
          <X aria-hidden className="size-5" strokeWidth={2.4} />
        </button>
      </div>

      {/* Conversation */}
      <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-3 overflow-y-auto px-4 pt-4 pb-5">
        <p className="text-center text-[0.72rem] text-slate">{openedAt}</p>

        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[80%] rounded-lg bg-brand px-3.5 py-2.5 text-[0.85rem] leading-relaxed whitespace-pre-wrap text-white">{m.content}</p>
            </div>
          ) : (
            <div key={m.id} className="relative pl-2.5">
              <BotAvatar />
              <div className="max-w-[82%] rounded-lg bg-[#eef2f6] px-3.5 py-3 text-[0.85rem] leading-relaxed text-navy">
                <RichText text={t(m.content)} />
              </div>
            </div>
          ),
        )}

        {pending && (
          <div className="relative pl-2.5" aria-label={t('L’assistant rédige une réponse')}>
            <BotAvatar />
            <div className="inline-flex gap-1 rounded-lg bg-[#eef2f6] px-4 py-3.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 animate-bounce rounded-full bg-slate/60" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {/* Quick replies — styled like the visitor's own messages */}
        {onlyWelcome && !pending && (
          <ul aria-label={t('Questions fréquentes')} className="flex flex-col items-end gap-2 pt-1">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => submit(t(s))}
                  className="rounded-lg bg-brand px-4 py-2.5 text-right text-[0.85rem] font-medium text-white transition-colors hover:bg-brand-600"
                >
                  {t(s)}
                </button>
              </li>
            ))}
          </ul>
        )}

        {error && error.code === 'not_configured' && (
          <div role="alert" className="rounded-lg border border-amber-200 bg-amber-50 p-3.5 text-[0.8rem] text-amber-900">
            <p className="font-semibold">{t('L’assistant sera bientôt disponible.')}</p>
            <p className="mt-1">{t('En attendant, notre équipe vous répond directement :')}</p>
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
          <div role="alert" className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-[0.8rem] text-red-800">
            <span>{t(error.message)}</span>
            <button
              type="button"
              onClick={() => void ask(messages)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-100"
            >
              <RotateCcw aria-hidden className="size-3.5" /> {t('Réessayer')}
            </button>
          </div>
        )}
      </div>

      {/* Composer + privacy link */}
      <form onSubmit={onSubmit} className="border-t border-line">
        <div className="flex items-end gap-2 px-3 py-2">
          <label htmlFor="chat-input" className="sr-only">
            {t('Votre question')}
          </label>
          <textarea
            ref={inputRef}
            id="chat-input"
            rows={1}
            value={input}
            maxLength={MAX_CHARS}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t('Écrivez votre message…')}
            className="max-h-28 min-h-9 flex-1 resize-none bg-transparent py-2 text-[0.85rem] text-ink outline-none placeholder:text-slate"
          />
          <button
            type="submit"
            disabled={!input.trim() || pending}
            aria-label={t('Envoyer')}
            className="mb-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full text-brand transition-colors hover:bg-brand-50 disabled:text-line-strong disabled:hover:bg-transparent"
          >
            <SendHorizontal aria-hidden className="size-[18px]" />
          </button>
        </div>
        <p className="border-t border-line py-2.5 text-center text-[0.7rem] text-slate">
          <Link to="/confidentialite" className="underline underline-offset-2 hover:text-navy">
            {t('Politique de confidentialité')}
          </Link>
        </p>
      </form>
    </motion.div>
  )
}

/** Small round Nashsoft mark pinned to the top-left corner of assistant bubbles. */
function BotAvatar() {
  return (
    <span aria-hidden className="absolute -top-1.5 left-0 z-10 inline-flex size-5 items-center justify-center rounded-full bg-white ring-1 ring-line">
      <img src={site.logo.mark} alt="" className="size-3" />
    </span>
  )
}
