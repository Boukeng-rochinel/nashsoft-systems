import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Feature } from '@/types'
import { cn } from '@/lib/cn'
import { fadeUp, stagger } from '@/lib/motion'
import { useTheme } from '@/hooks/useTheme'
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
 * Inner-page hero. Follows the site theme:
 * light enterprise (default, like the homepage) or dark technology (inner-page designs).
 * Highlighted words should use <GradientText> — it adapts automatically.
 */
export function PageHero({ breadcrumbs, eyebrow, title, description, actions, highlights, visual, className }: PageHeroProps) {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <section
      data-theme={theme}
      className={cn('relative isolate overflow-hidden', dark ? 'bg-navy-950 text-slate-300' : 'bg-white text-ink', className)}
    >
      {dark ? (
        <>
          <AnimatedGrid tone="dark" className="-z-10" />
          <LightStreaks className="-z-10 opacity-60" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-navy-950 to-transparent" />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_85%_30%,#e3efff_0%,#f3f7fd_45%,#ffffff_75%)]" />
          <AnimatedGrid tone="light" glow={false} className="-z-10 opacity-70" />
        </>
      )}
      <Container className={cn('grid items-center gap-12 pt-10 pb-14 md:pt-14 md:pb-20', visual && 'lg:grid-cols-[1.05fr_1fr] lg:gap-12')}>
        <motion.div variants={stagger(0.09, 0.05)} initial="hidden" animate="show" className="relative max-w-2xl">
          {breadcrumbs && (
            <motion.div variants={fadeUp} className="mb-5">
              <Breadcrumbs items={breadcrumbs} tone={theme} />
            </motion.div>
          )}
          {eyebrow && (
            <motion.p variants={fadeUp} className={cn('eyebrow mb-4 flex items-center gap-3', dark ? 'text-cyan' : 'text-brand')}>
              {eyebrow}
              <span aria-hidden className={cn('h-px w-8', dark ? 'bg-cyan/60' : 'bg-brand/50')} />
            </motion.p>
          )}
          <motion.h1
            variants={fadeUp}
            className={cn('text-[2.15rem] leading-[1.08] font-extrabold sm:text-5xl lg:text-[3.2rem]', dark ? 'text-white' : 'text-navy')}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={fadeUp} className={cn('mt-5 max-w-xl text-[0.98rem] leading-relaxed sm:text-base', dark ? 'text-slate-300' : 'text-slate')}>
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
                    <span
                      aria-hidden
                      className={cn(
                        'inline-flex size-9 shrink-0 items-center justify-center rounded-full border',
                        dark ? 'border-white/15 bg-white/5 text-cyan' : 'border-brand/15 bg-white text-brand shadow-card',
                      )}
                    >
                      <h.icon className="size-4" strokeWidth={1.8} />
                    </span>
                  )}
                  <span className="text-[0.72rem] leading-tight">
                    <span className={cn('block font-semibold', dark ? 'text-white' : 'text-navy')}>{h.title}</span>
                    {h.description && <span className={dark ? 'text-slate-400' : 'text-slate'}>{h.description}</span>}
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
