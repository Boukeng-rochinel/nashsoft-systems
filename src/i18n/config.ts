/**
 * Locale configuration — framework-free so the build (vite.config.ts) can use it too.
 *
 * French is the source language and lives at the root (`/services`); the other
 * locales are prefixed (`/en/services`, `/pt/services`).
 */
export const LOCALES = ['fr', 'en', 'pt'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'fr'

export const localeInfo: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string; dateLocale: string }> = {
  fr: { label: 'Français', short: 'FR', htmlLang: 'fr', ogLocale: 'fr_FR', dateLocale: 'fr-FR' },
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US', dateLocale: 'en-GB' },
  pt: { label: 'Português', short: 'PT', htmlLang: 'pt', ogLocale: 'pt_PT', dateLocale: 'pt-PT' },
}

export const isLocale = (value: string | undefined): value is Locale => (LOCALES as readonly string[]).includes(value ?? '')

/** Splits a pathname into its locale and the locale-free path: `/en/services` → `{ locale: 'en', path: '/services' }`. */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const match = /^\/([a-z]{2})(?=\/|$)/.exec(pathname)
  if (match && isLocale(match[1]) && match[1] !== DEFAULT_LOCALE) {
    return { locale: match[1], path: pathname.slice(3) || '/' }
  }
  return { locale: DEFAULT_LOCALE, path: pathname }
}

/**
 * Prefixes an internal href with the locale: `/services?x=1#a` → `/en/services?x=1#a`.
 * External links (http, mailto, tel), relative and hash-only hrefs are returned unchanged.
 */
export function localizePath(href: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE || !href.startsWith('/') || href.startsWith('//')) return href
  const { path } = splitLocale(href)
  if (path === '/') return `/${locale}`
  // `/#processus` → `/en#processus`, `/?x` → `/en?x`
  if (path.startsWith('/#') || path.startsWith('/?')) return `/${locale}${path.slice(1)}`
  return `/${locale}${path}`
}
