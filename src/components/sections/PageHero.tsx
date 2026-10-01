import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Feature } from '@/types'
import { cn } from '@/lib/cn'
import { fadeUp, stagger } from '@/lib/motion'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs'
import { AnimatedGrid, LightStreaks } from '@/components/visuals/AnimatedGrid'

interface PageHeroProps {
  breadcrumbs?: Crumb[]
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  highlights?: Feature[]
  visual?: ReactNode
  className?: string
}

/**
 * Dark technology hero used by every inner page
 * (Services, Service detail, Solutions, About, Project, Contact designs).
 */
export function PageHero({ breadcrumbs, eyebrow, title, description, actions, highlights, visual, className }: PageHeroProps) {
  return (
    <section data-theme="dark" className={cn('relative isolate overflow-hidden bg-navy-950 text-slate-300', className)}>
      <AnimatedGrid tone="dark" className="-z-10" />
      <LightStreaks className="-z-10 opacity-60" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-navy-950 to-transparent" />
      <Container className={cn('grid items-center gap-12 pt-10 pb-14 md:pt-14 md:pb-20', visual && 'lg:grid-cols-[1.05fr_1fr] lg:gap-10')}>
        <motion.div variants={stagger(0.09, 0.05)} initial="hidden" animate="show" className="relative max-w-2xl">
          {breadcrumbs && (
            <motion.div variants={fadeUp} className="mb-5">
              <Breadcrumbs items={breadcrumbs} />
            </motion.div>
          )}
          {eyebrow && (
            <motion.p variants={fadeUp} className="eyebrow mb-4 flex items-center gap-3 text-cyan">
              {eyebrow}
              <span aria-hidden className="h-px w-8 bg-cyan/60" />
            </motion.p>
          )}
          <motion.h1 variants={fadeUp} className="text-[2.15rem] leading-[1.08] font-extrabold text-white sm:text-5xl lg:text-[3.35rem]">
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-[0.98rem] leading-relaxed text-slate-300 sm:text-base">
              {description}
            </motion.p>
          )}
          {actions && (
            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions}
            </motion.div>
          )}
          {highlights && highlights.length > 0 && (
            <motion.ul variants={fadeUp} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-6">
              {highlights.map((h) => (
                <li key={h.title} className="flex items-center gap-2.5">
                  {h.icon && (
                    <span aria-hidden className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cyan">
                      <h.icon className="size-4" strokeWidth={1.8} />
                    </span>
                  )}
                  <span className="text-[0.72rem] leading-tight">
                    <span className="block font-semibold text-white">{h.title}</span>
                    <span className="text-slate-400">{h.description}</span>
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>
        {visual && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {visual}
          </motion.div>
        )}
      </Container>
    </section>
  )
}
