import { useRef } from 'react'
import { useInView } from 'framer-motion'
import type { Stat } from '@/types'
import { stats as defaultStats } from '@/data/site'
import { cn } from '@/lib/cn'
import { useCountUp } from '@/hooks/useCountUp'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

function StatValue({ stat, start }: { stat: Stat; start: boolean }) {
  const value = useCountUp(stat.value, start)
  if (stat.display) return <>{stat.display}</>
  return (
    <>
      {value}
      {stat.suffix}
    </>
  )
}

/**
 * Key figures with animated counters.
 * `panel`: light rounded panel (homepage) · `dark`: figures over navy (About).
 */
export function Stats({ items = defaultStats, variant = 'panel', className }: { items?: Stat[]; variant?: 'panel' | 'dark' | 'inline'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const dark = variant === 'dark'

  return (
    <div ref={ref} className={className}>
      <RevealGroup
        className={cn(
          'grid grid-cols-2 lg:grid-cols-4',
          variant === 'panel' && 'rounded-2xl border border-brand-100/70 bg-gradient-to-br from-light to-mist p-2 sm:p-3',
        )}
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
                dark ? 'bg-white/5 text-cyan ring-1 ring-white/10' : 'bg-white text-brand shadow-card ring-1 ring-brand-100',
              )}
            >
              <stat.icon className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <p className={cn('font-display text-3xl font-extrabold tracking-tight tabular-nums sm:text-[2rem]', dark ? 'text-white' : 'text-navy')}>
                <StatValue stat={stat} start={inView} />
              </p>
              <p className={cn('mt-0.5 font-display text-sm font-semibold', dark ? 'text-cyan' : 'text-navy')}>{stat.label}</p>
              <p className={cn('mt-1 text-xs leading-relaxed', dark ? 'text-slate-400' : 'text-slate')}>{stat.caption}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
