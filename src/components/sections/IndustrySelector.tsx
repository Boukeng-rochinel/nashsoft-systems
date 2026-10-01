import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import type { Industry } from '@/types'
import { industries as allIndustries } from '@/data/industries'
import { START_PROJECT_HREF } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { ButtonLink } from '@/components/ui/Button'
import { Laptop } from '@/components/visuals/Devices'

interface IndustrySelectorProps {
  industries?: Industry[]
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Accessible tabs (WAI-ARIA tablist): arrow keys / Home / End move between
 * industries; the panel content animates on change.
 */
export function IndustrySelector({ industries = allIndustries, tone = 'light', className }: IndustrySelectorProps) {
  const [index, setIndex] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])
  const baseId = useId()
  const dark = tone === 'dark'
  const active = industries[index]

  const focusTab = (i: number) => {
    const next = (i + industries.length) % industries.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      focusTab(index + 1)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      focusTab(index - 1)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusTab(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusTab(industries.length - 1)
    }
  }

  return (
    <div className={className}>
      <div role="tablist" aria-label="Secteurs d’activité" className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
        {industries.map((industry, i) => {
          const selected = i === index
          return (
            <button
              key={industry.slug}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              onKeyDown={onKeyDown}
              className={cn(
                'relative shrink-0 snap-start rounded-full px-5 py-2.5 font-display text-[0.8rem] font-semibold transition-colors duration-300',
                selected
                  ? 'text-white'
                  : dark
                    ? 'border border-white/15 text-slate-200 hover:border-cyan/50 hover:text-white'
                    : 'border border-line bg-white text-navy hover:border-brand/40 hover:text-brand',
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-full bg-brand-gradient shadow-[0_8px_20px_-8px_rgb(8_125_255/0.8)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{industry.name}</span>
            </button>
          )
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${index}`}
        tabIndex={0}
        className={cn(
          'mt-5 overflow-hidden rounded-2xl border bg-white',
          dark ? 'border-cyan/30 shadow-[0_0_60px_-20px_rgb(0_198_255/0.5)]' : 'border-line shadow-[0_24px_50px_-28px_rgb(6_20_38/0.35)]',
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid md:grid-cols-[1.05fr_1fr]"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span aria-hidden className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-[#3a5bff] text-white shadow-[0_8px_18px_-8px_rgb(8_125_255/0.8)]">
                  <active.icon className="size-6" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-brand">{active.name}</h3>
                  <p className="mt-0.5 font-display text-sm font-semibold text-navy">{active.headline}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate">{active.description}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {active.solutions.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-navy">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.4} />
                    {s}
                  </li>
                ))}
              </ul>
              <ButtonLink to={`${START_PROJECT_HREF}?secteur=${active.slug}`} size="sm" className="mt-7">
                Découvrir la solution
              </ButtonLink>
            </div>
            <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-mist via-brand-50 to-[#e6e0ff] p-6 sm:p-8">
              <div aria-hidden className="absolute -top-10 -right-10 size-48 rounded-full bg-brand/15 blur-3xl" />
              <div aria-hidden className="absolute inset-0 bg-grid-light opacity-60" />
              <Laptop variant={active.visual} theme={active.theme} title={active.name} className="relative w-full max-w-md" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
