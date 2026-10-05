import { useCallback, useState } from 'react'
import { TURNSTILE_SITE_KEY } from '@/lib/api'

/**
 * Turnstile token state for a form. `siteKey` is undefined when the captcha is
 * disabled (no backend configured), in which case `requireToken` always passes.
 */
export function useCaptcha() {
  const [token, setTokenState] = useState<string | null>(null)
  const [error, setError] = useState<string | undefined>()
  // Changing the widget key remounts it: tokens are single-use.
  const [widgetKey, setWidgetKey] = useState(0)

  const setToken = useCallback((next: string | null) => {
    setTokenState(next)
    if (next) setError(undefined)
  }, [])

  /** Returns the token, or flags an error and returns false when it is missing. */
  const requireToken = (): string | undefined | false => {
    if (!TURNSTILE_SITE_KEY) return undefined
    if (token) return token
    setError('Veuillez confirmer que vous n’êtes pas un robot.')
    return false
  }

  const reset = () => {
    setTokenState(null)
    setWidgetKey((k) => k + 1)
  }

  return { siteKey: TURNSTILE_SITE_KEY, setToken, error, requireToken, reset, widgetKey }
}
