import { createContext, useContext } from 'react'
import { DEFAULT_LOCALE, LOCALES, localeInfo, t, type Locale } from '@/i18n'

export type SiteLanguage = Locale

export const languages: Array<{ code: SiteLanguage; label: string; short: string }> = LOCALES.map((code) => ({
  code,
  label: localeInfo[code].label,
  short: localeInfo[code].short,
}))

export interface LanguageContextValue {
  language: SiteLanguage
  /** Navigates to the same page in another language. */
  setLanguage: (language: SiteLanguage) => void
  t: typeof t
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: DEFAULT_LOCALE,
  setLanguage: () => {},
  t,
})

export const useLanguage = () => useContext(LanguageContext)
