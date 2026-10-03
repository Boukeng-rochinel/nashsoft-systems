import { createContext, useContext } from 'react'

export type SiteLanguage = 'fr' | 'en' | 'pt'

export const languages: Array<{ code: SiteLanguage; label: string; short: string }> = [
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'pt', label: 'Português', short: 'PT' },
]

/**
 * Interface strings keyed by their French source text.
 * Content pages are authored in French; a missing key falls back to it.
 */
const dictionary: Record<string, Partial<Record<Exclude<SiteLanguage, 'fr'>, string>>> = {
  Accueil: { en: 'Home', pt: 'Início' },
  Services: { en: 'Services', pt: 'Serviços' },
  Solutions: { en: 'Solutions', pt: 'Soluções' },
  Produits: { en: 'Products', pt: 'Produtos' },
  'À propos': { en: 'About', pt: 'Sobre nós' },
  Insights: { en: 'Insights', pt: 'Insights' },
  Contact: { en: 'Contact', pt: 'Contacto' },
  'Démarrer un projet': { en: 'Start a project', pt: 'Iniciar um projeto' },
  'Changer de langue': { en: 'Change language', pt: 'Mudar de idioma' },
}

export function translate(language: SiteLanguage, text: string): string {
  if (language === 'fr') return text
  return dictionary[text]?.[language] ?? text
}

export interface LanguageContextValue {
  language: SiteLanguage
  setLanguage: (language: SiteLanguage) => void
  t: (text: string) => string
}

export const LanguageContext = createContext<LanguageContextValue>({
  language: 'fr',
  setLanguage: () => {},
  t: (text) => text,
})

export const useLanguage = () => useContext(LanguageContext)
