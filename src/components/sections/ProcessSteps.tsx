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
   * `cards`: circle timeline on a single connector line (service pages).
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

  if (cards) {
    // Gap between columns is 1rem (gap-4): the line runs from the first to the last circle centre.
    return (
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        variants={stagger(0.07)}
        className={cn('relative grid gap-8 lg:grid-cols-6 lg:gap-4', className)}
      >
        <span
          aria-hidden
          className="absolute top-8 right-[calc((100%-5rem)/12)] left-[calc((100%-5rem)/12)] hidden h-px bg-gradient-to-r from-brand/50 via-brand/25 to-violet/50 lg:block"
        />
        {steps.map((step, i) => (
          <motion.li key={step.title} variants={fadeUp} className="group relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
            {i < steps.length - 1 && <span aria-hidden className="absolute top-16 -bottom-8 left-8 w-px bg-brand/20 lg:hidden" />}
            <span
              aria-hidden
              className="relative inline-flex size-16 shrink-0 items-center justify-center rounded-full border border-line bg-white text-brand shadow-card transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-brand group-hover:to-violet group-hover:text-white group-hover:shadow-[0_12px_24px_-10px_rgb(8_125_255/0.8)]"
            >
              <step.icon className="size-6" strokeWidth={1.6} />
              <span className="absolute -top-1 -right-1 inline-flex size-6 items-center justify-center rounded-full bg-navy font-display text-[0.65rem] font-bold text-white ring-4 ring-light">
                {i + 1}
              </span>
            </span>
            <div className="pt-2 lg:mt-5 lg:pt-0">
              <h3 className="font-display text-base font-semibold text-navy">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate lg:mx-auto lg:max-w-[12rem] lg:text-[0.8rem]">{step.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    )
  }

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
                  'pb-2',
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
                        'rounded-full ring-4 ring-brand-50',
                      )}
                    >
                      <step.icon className="size-5" strokeWidth={1.8} />
                    </span>
                  )}
                  {!last && (
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
