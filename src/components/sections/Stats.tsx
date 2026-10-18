import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import type { Stat } from '@/types'
import { stats as defaultStats } from '@/data/site'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/hooks/useCountUp'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { t } from '@/i18n'

function StatValue({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.value, start)
  if (stat.display) return <>{t(stat.display)}</>
  return (
    <>
      {value}
      {t(stat.suffix)}
    </>
  )
}

function TickerItem({ stat, start }: { stat: Stat; start: boolean }) {
  return (
    <li className="flex w-[260px] shrink-0 items-center gap-4 px-6 sm:w-[300px] sm:px-8">
      <span
        aria-hidden
        className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-card ring-1 ring-brand-100"
      >
        <stat.icon className="size-5" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-3xl leading-none font-semibold tracking-tight text-navy tabular-nums sm:text-[2rem]">
          <StatValue stat={stat} start={start} />
        </p>
        <p className="mt-1.5 font-display text-sm font-semibold text-navy">{t(stat.label)}</p>
        <p className="mt-0.5 truncate text-xs text-slate">{t(stat.caption)}</p>
      </div>
    </li>
  )
}

/**
 * Homepage key figures: an endless right-to-left ticker (pauses on hover).
 * The track holds two identical halves and slides by -50% for a seamless loop.
 * Reduced motion → static grid.
 */
function StatsTicker({ items, className }: { items: Stat[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div ref={ref} className={cn('rounded-2xl border border-brand-100/70 bg-light py-6', className)}>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((stat) => (
            <TickerItem key={stat.label} stat={stat} start={inView} />
          ))}
        </ul>
      </div>
    )
  }

  // Repeat so one half is always wider than the viewport, then double for the loop.
  const half = [...items, ...items]

  return (
    <div
      ref={ref}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-brand-100/70 bg-light py-6 sm:py-7',
        '[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]',
        className,
      )}
    >
      {/* Accessible, non-moving copy for assistive tech. */}
      <ul className="sr-only">
        {items.map((stat) => (
          <li key={stat.label}>
            {stat.display ? t(stat.display) : `${stat.value}${t(stat.suffix)}`} {t(stat.label)} — {t(stat.caption)}
          </li>
        ))}
      </ul>
      <div aria-hidden className="flex w-max animate-[marquee_32s_linear_infinite] group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex [&>li]:border-r [&>li]:border-brand-100">
            {half.map((stat, i) => (
              <TickerItem key={`${copy}-${i}`} stat={stat} start={inView} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

/**
 * Key figures with animated counters.
 * `panel`: scrolling light ticker (homepage) · `dark`: figures over navy (About).
 */
export function Stats({ items = defaultStats, variant = 'panel', className }: { items?: Stat[]; variant?: 'panel' | 'dark' | 'inline'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const dark = variant === 'dark'

  if (variant === 'panel') return <StatsTicker items={items} className={className} />

  return (
    <div ref={ref} className={className}>
      <RevealGroup
        className="grid grid-cols-2 lg:grid-cols-4"
      >
        {items.map((stat, i) => (
          <RevealItem
            key={stat.label}
            className={cn(
              'relative flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:gap-4 sm:p-6',
              // Dividers: vertical between columns on desktop, grid lines on mobile.
              i > 0 && 'lg:before:absolute lg:before:top-6 lg:before:bottom-6 lg:before:left-0 lg:before:w-px',
              dark ? 'lg:before:bg-white/10' : 'lg:before:bg-brand-100',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'inline-flex size-11 shrink-0 items-center justify-center rounded-full',
                dark ? 'bg-white/5 text-brand-300 ring-1 ring-white/10' : 'bg-white text-brand shadow-card ring-1 ring-brand-100',
              )}
            >
              <stat.icon className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className={cn('font-display text-3xl font-semibold tracking-tight tabular-nums sm:text-[2rem]', dark ? 'text-white' : 'text-navy')}>
                <StatValue stat={stat} start={inView} />
              </p>
              <p className={cn('mt-0.5 font-display text-sm font-semibold', dark ? 'text-brand-300' : 'text-navy')}>{t(stat.label)}</p>
              <p className={cn('mt-1 text-xs leading-relaxed', dark ? 'text-slate-400' : 'text-slate')}>{t(stat.caption)}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
