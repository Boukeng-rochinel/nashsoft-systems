import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { languages, useLanguage, type SiteLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/cn'

/** Simplified flags as inline SVG (emoji flags don't render on Windows). */
const flags: Record<SiteLanguage, ReactNode> = {
  fr: (
    <>
      <rect width="8" height="16" fill="#002395" />
      <rect x="8" width="8" height="16" fill="#fff" />
      <rect x="16" width="8" height="16" fill="#ED2939" />
    </>
  ),
  en: (
    <>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#fff" strokeWidth="3.2" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" strokeWidth="1.1" />
      <path d="M12 0v16M0 8h24" stroke="#fff" strokeWidth="5" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3" />
    </>
  ),
  pt: (
    <>
      <rect width="24" height="16" fill="#FF0000" />
      <rect width="9.6" height="16" fill="#006600" />
      <circle cx="9.6" cy="8" r="3.4" fill="#FFCC00" />
      <circle cx="9.6" cy="8" r="2.1" fill="#FF0000" />
      <rect x="8.6" y="6.6" width="2" height="2.8" rx="0.3" fill="#fff" />
    </>
  ),
}

function Flag({ code }: { code: SiteLanguage }) {
  return (
    <svg aria-hidden viewBox="0 0 24 16" className="h-3.5 w-5 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10">
      {flags[code]}
    </svg>
  )
}

/** Compact FR / EN / PT dropdown for the header. */
export function LanguageSwitcher({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const wrapper = useRef<HTMLDivElement>(null)
  const listId = useId()
  const dark = tone === 'dark'
  const current = languages.find((l) => l.code === language) ?? languages[0]

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrapper.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={wrapper} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t('Changer de langue')} (${current.label})`}
        className={cn(
          'inline-flex h-10 items-center gap-1 px-1 text-[0.85rem] font-medium transition-colors',
          dark ? 'text-slate-200 hover:text-white' : 'text-navy/80 hover:text-brand',
        )}
      >
        <Flag code={current.code} />
        <span className="ml-0.5">{current.short}</span>
        <ChevronDown aria-hidden className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 z-50 mt-3 w-44 space-y-3 rounded-xl border border-line bg-white px-6 py-5 shadow-[0_24px_60px_-24px_rgb(6_20_38/0.35)]"
          >
            {languages.map((l) => {
              const selected = l.code === language
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    lang={l.code}
                    aria-current={selected ? 'true' : undefined}
                    onClick={() => {
                      setLanguage(l.code)
                      setOpen(false)
                    }}
                    className={cn(
                      'flex w-full items-center gap-2.5 text-left text-[0.85rem] leading-snug transition-colors hover:text-brand focus-visible:text-brand',
                      selected ? 'font-medium text-brand' : 'text-slate',
                    )}
                  >
                    <Flag code={l.code} />
                    {l.label}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
