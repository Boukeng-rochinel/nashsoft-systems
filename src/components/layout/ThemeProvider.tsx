import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type SiteTheme } from '@/hooks/useTheme'

const STORAGE_KEY = 'nashsoft-theme'

function readStoredTheme(): SiteTheme {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<SiteTheme>(readStoredTheme)

  useEffect(() => {
    document.documentElement.dataset.siteTheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#03101F' : '#FFFFFF')
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* storage unavailable (private mode) — preference just won't persist */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), [])
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle])

  return <ThemeContext value={value}>{children}</ThemeContext>
}
