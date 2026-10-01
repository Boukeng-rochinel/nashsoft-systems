import { createContext, useContext } from 'react'

export type SiteTheme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: SiteTheme
  toggle: () => void
}

export const ThemeContext = createContext<ThemeContextValue>({ theme: 'light', toggle: () => {} })

/**
 * Site-wide theme. "light" (default) is the enterprise theme of the homepage
 * design; "dark" is the technology theme of the inner-page designs. It drives
 * the navbar, page heroes and footer; content bands keep their own rhythm.
 */
export const useTheme = () => useContext(ThemeContext)
