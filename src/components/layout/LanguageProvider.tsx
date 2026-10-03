import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { LanguageContext, languages, translate, type SiteLanguage } from '@/hooks/useLanguage'

const STORAGE_KEY = 'nashsoft-language'

function readStoredLanguage(): SiteLanguage {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return languages.find((l) => l.code === stored)?.code ?? 'fr'
  } catch {
    return 'fr'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    try {
      window.localStorage.setItem(STORAGE_KEY, language)
    } catch {
      /* storage unavailable (private mode) — preference just won't persist */
    }
  }, [language])

  const t = useCallback((text: string) => translate(language, text), [language])
  const value = useMemo(() => ({ language, setLanguage, t }), [language, t])

  return <LanguageContext value={value}>{children}</LanguageContext>
}
