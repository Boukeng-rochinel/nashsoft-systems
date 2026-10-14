import { DEFAULT_LOCALE, localeInfo, type Locale } from './config'

export * from './config'

/** Translations keyed by the French source text. A missing key falls back to French. */
export type Catalog = Readonly<Record<string, string>>

let activeLocale: Locale = DEFAULT_LOCALE
let activeCatalog: Catalog = {}

/**
 * Activates a locale for `t()`. The LanguageProvider calls this before rendering
 * and remounts the tree on change, so every `t()` call sees the right catalog.
 * The build calls it too, to translate page metadata.
 */
export function setActiveLocale(locale: Locale, catalog: Catalog) {
  activeLocale = locale
  activeCatalog = catalog
}

export const getActiveLocale = () => activeLocale

type Vars = Record<string, string | number> | Array<string | number>

/**
 * Translates French source text into the active locale.
 * Placeholders `{name}` / `{0}` are filled from `vars`.
 */
export function t(text: string, vars?: Vars): string
export function t<T extends string | null | undefined>(text: T, vars?: Vars): T extends string ? string : T
export function t(text: string | null | undefined, vars?: Vars): string | null | undefined {
  if (text == null) return text
  const translated = activeCatalog[text] ?? text
  if (!vars) return translated
  return translated.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = Array.isArray(vars) ? vars[Number(key)] : vars[key]
    return value === undefined ? match : String(value)
  })
}

/** Long date in the active locale, e.g. "12 septembre 2026" / "12 September 2026". */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(localeInfo[activeLocale].dateLocale, { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Lazily loaded catalogs: French needs none, the others are split into their own chunks. */
export const catalogLoaders: Record<Exclude<Locale, 'fr'>, () => Promise<{ default: Catalog }>> = {
  en: () => import('./catalogs/en'),
  pt: () => import('./catalogs/pt'),
}
