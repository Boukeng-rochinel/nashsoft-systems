import { ArrowRight } from 'lucide-react'
import type { ProcessStep } from '@/types'
import { processSteps } from '@/data/site'
import { cn } from '@/lib/cn'
import { motion } from 'framer-motion'
import { fadeUp, revealViewport, stagger } from '@/lib/motion'

interface ProcessStepsProps {
  steps?: ProcessStep[]
  /**
   * `inline`: circle icons connected by arrows (homepage, light).
   * `cards`: each step in a white card (service pages).
   * `dark`: numbered circles on navy (services catalogue).
   */
  variant?: 'inline' | 'cards' | 'dark'
  /** Overrides the large-screen column classes. */
  cols?: string
  className?: string
}

/** Delivery methodology: Découverte → … → Évolution. Vertical timeline on mobile. */
export function ProcessSteps({ steps = processSteps, variant = 'inline', cols: colsOverride, className }: ProcessStepsProps) {
  const dark = variant === 'dark'
  const cards = variant === 'cards'
  const cols = colsOverride ?? (steps.length >= 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-5')

  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={stagger(0.07)}
      className={cn('relative grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-3', cols, className)}
    >
        {steps.map((step, i) => {
          const last = i === steps.length - 1
          return (
            <motion.li
              key={step.title}
              variants={fadeUp}
                className={cn(
                  'relative flex h-full gap-4 lg:flex-col lg:gap-0',
                  cards && 'rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
                  !cards && 'pb-2',
                )}
              >
                <div className="flex shrink-0 items-center lg:w-full">
                  {dark ? (
                    <span className="inline-flex size-11 items-center justify-center rounded-full border border-cyan/40 bg-navy-900 font-display text-sm font-bold text-cyan shadow-[0_0_24px_-6px_rgb(0_198_255/0.7)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  ) : (
                    <span
                      aria-hidden
                      className={cn(
                        'inline-flex size-12 items-center justify-center bg-gradient-to-br from-brand to-[#3a5bff] text-white shadow-[0_10px_20px_-8px_rgb(8_125_255/0.75)]',
                        cards ? 'rounded-xl' : 'rounded-full ring-4 ring-brand-50',
                      )}
                    >
                      <step.icon className="size-5" strokeWidth={1.8} />
                    </span>
                  )}
                  {!last && !cards && (
                    <span aria-hidden className="mx-3 hidden h-px flex-1 items-center lg:flex">
                      <span className={cn('h-px flex-1', dark ? 'bg-gradient-to-r from-cyan/50 to-cyan/10' : 'bg-gradient-to-r from-brand/40 to-brand/10')} />
                      <ArrowRight className={cn('-ml-1 size-3.5', dark ? 'text-cyan/60' : 'text-brand/60')} />
                    </span>
                  )}
                </div>
                <div className="lg:mt-5">
                  {!dark && <p className="font-display text-xs font-bold text-brand">{String(i + 1).padStart(2, '0')}</p>}
                  <h3 className={cn('mt-1 font-display text-[0.95rem] font-semibold', dark ? 'text-white' : 'text-navy')}>{step.title}</h3>
                  <p className={cn('mt-1.5 text-[0.8rem] leading-relaxed', dark ? 'text-slate-400' : 'text-slate')}>{step.description}</p>
                </div>
            </motion.li>
          )
        })}
    </motion.ol>
  )
}
