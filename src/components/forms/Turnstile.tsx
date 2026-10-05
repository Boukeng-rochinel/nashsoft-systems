import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * Cloudflare Turnstile anti-bot check.
 *
 * The widget only produces a single-use token; it is verified server-side
 * (server/contact.ts) before any message is sent. Remount the component
 * (change its `key`) to get a fresh token after each submission.
 */

interface TurnstileRenderOptions {
  sitekey: string
  callback: (token: string) => void
  'expired-callback': () => void
  'error-callback': () => void
  theme: 'light' | 'dark'
  language: string
  size: 'flexible'
  appearance: 'always' | 'interaction-only'
}

interface TurnstileApi {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string
  remove: (widgetId: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
let scriptPromise: Promise<TurnstileApi> | null = null

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  scriptPromise ??= new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.defer = true
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile unavailable')))
    script.onerror = () => {
      scriptPromise = null
      script.remove()
      reject(new Error('Turnstile failed to load'))
    }
    document.head.appendChild(script)
  })
  return scriptPromise
}

interface TurnstileProps {
  siteKey: string
  onToken: (token: string | null) => void
  tone?: 'light' | 'dark'
  error?: string
  className?: string
}

export function Turnstile({ siteKey, onToken, tone = 'light', error, className }: TurnstileProps) {
  const container = useRef<HTMLDivElement>(null)
  const callback = useRef(onToken)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    callback.current = onToken
  }, [onToken])

  useEffect(() => {
    let widgetId: string | undefined
    let cancelled = false
    loadTurnstile()
      .then((api) => {
        if (cancelled || !container.current) return
        widgetId = api.render(container.current, {
          sitekey: siteKey,
          callback: (token) => callback.current(token),
          'expired-callback': () => callback.current(null),
          'error-callback': () => callback.current(null),
          theme: tone,
          language: 'fr',
          size: 'flexible',
          appearance: 'always',
        })
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true)
      })
    return () => {
      cancelled = true
      if (widgetId) window.turnstile?.remove(widgetId)
    }
  }, [siteKey, tone])

  const dark = tone === 'dark'
  return (
    <div className={className}>
      <div ref={container} className="min-h-[65px]" aria-describedby={error ? 'turnstile-error' : undefined} />
      {(error || loadFailed) && (
        <p id="turnstile-error" role="alert" className={cn('mt-1.5 text-xs', dark ? 'text-red-300' : 'text-red-600')}>
          {loadFailed ? 'La vérification anti-robot n’a pas pu se charger. Vérifiez votre connexion ou désactivez un éventuel bloqueur, puis rechargez la page.' : error}
        </p>
      )}
    </div>
  )
}
