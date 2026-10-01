import type { Feature } from '@/types'
import { cn } from '@/lib/cn'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

interface FeatureGridProps {
  items: Feature[]
  /**
   * `cards`: white cards (light sections) · `dark`: glowing cards (navy sections)
   * · `divided`: icon + text separated by thin vertical rules (values row)
   * · `compact`: small horizontal cards (icon left).
   */
  variant?: 'cards' | 'dark' | 'divided' | 'compact'
  columns?: 1 | 2 | 3 | 4
  className?: string
}

const colClasses = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }

export function FeatureGrid({ items, variant = 'cards', columns = 4, className }: FeatureGridProps) {
  return (
    <RevealGroup className={cn('grid gap-4', colClasses[columns], variant === 'divided' && 'gap-0 sm:gap-y-8', className)}>
      {items.map((item, i) => {
        const Icon = item.icon
        if (variant === 'divided') {
          return (
            <RevealItem
              key={item.title}
              className={cn('relative px-1 py-5 sm:px-6 sm:py-0', i > 0 && 'border-t border-line sm:border-t-0', i % columns !== 0 && 'lg:border-l lg:border-line')}
            >
              {Icon && <Icon aria-hidden className="size-8 text-brand" strokeWidth={1.5} />}
              <h3 className="mt-4 font-display text-base font-semibold text-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
            </RevealItem>
          )
        }
        if (variant === 'compact') {
          return (
            <RevealItem key={item.title}>
              <div className="flex h-full items-start gap-3.5 rounded-xl border border-line bg-white p-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
                {Icon && (
                  <span aria-hidden className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                )}
                <div>
                  <h3 className="font-display text-sm font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate">{item.description}</p>
                </div>
              </div>
            </RevealItem>
          )
        }
        const dark = variant === 'dark'
        return (
          <RevealItem key={item.title}>
            <div
              className={cn(
                'group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1',
                dark
                  ? 'border border-brand/25 bg-navy-900/70 hover:border-cyan/50 hover:shadow-[0_0_40px_-14px_rgb(0_198_255/0.5)]'
                  : 'border border-line bg-white shadow-card hover:border-brand/30 hover:shadow-card-hover',
              )}
            >
              {Icon && (
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105',
                    dark ? 'bg-gradient-to-br from-brand to-violet text-white shadow-[0_0_24px_-6px_rgb(0_198_255/0.6)]' : 'bg-brand-50 text-brand ring-1 ring-brand/10',
                  )}
                >
                  <Icon className="size-6" strokeWidth={1.7} />
                </span>
              )}
              <h3 className={cn('mt-5 font-display text-base font-semibold', dark ? 'text-white' : 'text-navy')}>{item.title}</h3>
              <p className={cn('mt-2 text-sm leading-relaxed', dark ? 'text-slate-400' : 'text-slate')}>{item.description}</p>
            </div>
          </RevealItem>
        )
      })}
    </RevealGroup>
  )
}
