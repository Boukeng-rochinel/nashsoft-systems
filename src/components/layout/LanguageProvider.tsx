import { Fragment, useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LanguageContext, type SiteLanguage } from '@/hooks/useLanguage'
import { DEFAULT_LOCALE, catalogLoaders, localeInfo, localizePath, setActiveLocale, splitLocale, t, type Catalog, type Locale } from '@/i18n'

const loaded: Partial<Record<Locale, Catalog>> = { fr: {} }

/**
 * The locale comes from the URL (`/en/…`, `/pt/…`, French at the root).
 * Its catalog is loaded on demand and activated before the tree renders; the
 * tree is keyed by locale so every `t()` call re-runs after a language switch.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { locale, path } = splitLocale(location.pathname)
  const [, rerender] = useReducer((n: number) => n + 1, 0)

  useEffect(() => {
    if (loaded[locale]) return
    let cancelled = false
    catalogLoaders[locale as Exclude<Locale, 'fr'>]()
      .then((m) => {
        loaded[locale] = m.default
      })
      .catch(() => {
        // Offline or chunk error: fall back to French text rather than a blank page.
        loaded[locale] = {}
      })
      .finally(() => {
        if (!cancelled) rerender()
      })
    return () => {
      cancelled = true
    }
  }, [locale])

  // French is shown only for the instant a catalog chunk is loading.
  const active: Locale = loaded[locale] ? locale : DEFAULT_LOCALE
  setActiveLocale(active, loaded[active] ?? {})

  useEffect(() => {
    document.documentElement.lang = localeInfo[active].htmlLang
  }, [active])

  const setLanguage = useCallback(
    (next: SiteLanguage) => navigate(`${localizePath(path, next)}${location.search}${location.hash}`),
    [navigate, path, location.search, location.hash],
  )
  const value = useMemo(() => ({ language: active, setLanguage, t }), [active, setLanguage])

  return (
    <LanguageContext value={value}>
      <Fragment key={active}>{children}</Fragment>
    </LanguageContext>
  )
}
