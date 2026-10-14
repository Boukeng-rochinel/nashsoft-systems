import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ChevronRight, Mail, Phone, RotateCcw, X } from 'lucide-react'
import { site } from '@/data/site'
import { newId, sendChat, type ChatMessage } from '@/lib/chat'
import { cn } from '@/lib/cn'
import { RichText } from './RichText'
import { t } from '@/i18n'

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
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-3 top-[84px] bottom-3 z-50 flex origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_70px_-24px_rgb(6_20_38/0.4)] sm:inset-x-auto sm:top-auto sm:right-5 sm:bottom-24 sm:h-[min(620px,calc(100dvh-8rem))] sm:w-[380px]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <BotAvatar size="md" />
        <div className="min-w-0 flex-1">
          <h2 id="chat-title" className="font-display text-[0.95rem] font-semibold text-navy">
            Nash
          </h2>
          <p className="flex items-center gap-1.5 text-[0.72rem] text-slate">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
            {t('Assistant Nashsoft · en ligne')}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label={t('Nouvelle conversation')}
          title={t('Nouvelle conversation')}
          className="inline-flex size-9 items-center justify-center rounded-full text-slate transition-colors hover:bg-light hover:text-navy"
        >
          <RotateCcw aria-hidden className="size-[17px]" />
        </button>
        <button
          type="button"
          onClick={onClose}
          aria-label={t('Fermer l’assistant')}
          className="inline-flex size-9 items-center justify-center rounded-full text-slate transition-colors hover:bg-light hover:text-navy"
        >
          <X aria-hidden className="size-5" />
        </button>
      </div>

      {/* Messages */}
      <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="flex-1 space-y-4 overflow-y-auto px-4 py-5">
        {messages.map((m) =>
          m.role === 'user' ? (
            <div key={m.id} className="flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-md bg-brand px-3.5 py-2.5 text-[0.875rem] leading-relaxed whitespace-pre-wrap text-white">{m.content}</p>
            </div>
          ) : (
            <div key={m.id} className="flex items-end gap-2">
              <BotAvatar size="sm" />
              <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-light px-3.5 py-2.5 text-[0.875rem] leading-relaxed text-ink">
                <RichText text={t(m.content)} />
              </div>
            </div>
          ),
        )}

        {pending && (
          <div className="flex items-end gap-2" aria-label={t('L’assistant rédige une réponse')}>
            <BotAvatar size="sm" />
            <div className="flex gap-1 rounded-2xl rounded-bl-md bg-light px-4 py-3.5">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 animate-bounce rounded-full bg-slate/60" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}

        {onlyWelcome && !pending && (
          <div className="pl-8">
            <p className="mb-2 text-[0.72rem] font-medium text-slate">{t('Questions fréquentes')}</p>
            <ul className="overflow-hidden rounded-2xl border border-line">
              {SUGGESTIONS.map((s) => (
                <li key={s} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => submit(t(s))}
                    className="group flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left text-[0.85rem] text-navy transition-colors hover:bg-light"
                  >
                    {t(s)}
                    <ChevronRight aria-hidden className="size-4 shrink-0 text-slate transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && error.code === 'not_configured' && (
          <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-[0.8rem] text-amber-900">
            <p className="font-semibold">{t('L’assistant sera bientôt disponible.')}</p>
            <p className="mt-1">{t('En attendant, notre équipe vous répond directement :')}</p>
            <div className="mt-2.5 flex flex-col gap-1.5">
              <a href={`mailto:${site.contact.email}`} className="inline-flex items-center gap-2 font-medium text-brand hover:underline">
                <Mail aria-hidden className="size-4" /> {t(site.contact.email)}
              </a>
              <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 font-medium text-brand hover:underline">
                <Phone aria-hidden className="size-4" /> {t(site.contact.phone)}
              </a>
            </div>
          </div>
        )}

        {error && error.code !== 'not_configured' && error.code !== 'aborted' && (
          <div role="alert" className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-[0.8rem] text-red-800">
            <span>{t(error.message)}</span>
            <button
              type="button"
              onClick={() => void ask(messages)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-100"
            >
              <RotateCcw aria-hidden className="size-3.5" />{' '}{t('Réessayer')}</button>
          </div>
        )}

      </div>

      {/* Composer */}
      <form onSubmit={onSubmit} className="px-3 pt-2 pb-3">
        <div className="flex items-end gap-2 rounded-3xl border border-line-strong bg-white py-1.5 pr-1.5 pl-4 transition-[border-color,box-shadow] focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
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
            placeholder={t('Écrivez votre question…')}
            className="max-h-28 min-h-9 flex-1 resize-none bg-transparent py-2 text-[0.875rem] text-ink outline-none placeholder:text-slate"
          />
          <button
            type="submit"
            disabled={!input.trim() || pending}
            aria-label={t('Envoyer')}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-600 disabled:bg-line-strong disabled:text-white"
          >
            <ArrowUp aria-hidden className="size-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[0.65rem] text-slate">{t('Réponses générées par IA, à vérifier. Ne partagez pas d’informations sensibles.')}</p>
      </form>
    </motion.div>
  )
}

/** Nashsoft "N" mark in a soft round badge — the assistant's avatar. */
function BotAvatar({ size }: { size: 'sm' | 'md' }) {
  return (
    <span
      aria-hidden
      className={cn('inline-flex shrink-0 items-center justify-center rounded-full bg-brand-50 ring-1 ring-brand-100', size === 'md' ? 'size-10' : 'size-6')}
    >
      <img src={site.logo.mark} alt="" className={size === 'md' ? 'size-6' : 'size-3.5'} />
    </span>
  )
}
