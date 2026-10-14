import { Fragment } from 'react'
import { languages, useLanguage } from '@/hooks/useLanguage'
import { cn } from '@/lib/cn'
import { t as tr } from '@/i18n'

/** Minimal inline language switch: "FR | EN | PT", the current one in brand blue. */
export function LanguageSwitcher({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const { language, setLanguage, t } = useLanguage()
  const dark = tone === 'dark'

  return (
    <div role="group" aria-label={t('Changer de langue')} className={cn('flex items-center gap-1.5 text-[0.8rem] font-semibold tracking-wide', className)}>
      {languages.map((l, i) => {
        const selected = l.code === language
        return (
          <Fragment key={l.code}>
            {i > 0 && (
              <span aria-hidden className={dark ? 'text-white/25' : 'text-line-strong'}>
                |
              </span>
            )}
            <button
              type="button"
              lang={l.code}
              aria-label={tr(l.label)}
              aria-pressed={selected}
              onClick={() => setLanguage(l.code)}
              className={cn(
                'px-0.5 py-1 transition-colors focus-visible:underline focus-visible:underline-offset-4 focus-visible:outline-none',
                selected ? (dark ? 'text-brand-300' : 'text-brand') : dark ? 'text-slate-400 hover:text-white' : 'text-navy/60 hover:text-navy',
              )}
            >
              {tr(l.short)}
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}
