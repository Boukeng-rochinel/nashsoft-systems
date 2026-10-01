import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fadeUp, revealViewport, stagger } from '@/lib/motion'

interface SectionTitleProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  /** Heading level — defaults to h2. */
  as?: 'h1' | 'h2' | 'h3'
  className?: string
  children?: ReactNode
}

export function SectionTitle({ eyebrow, title, description, tone = 'light', align = 'left', as: Heading = 'h2', className, children }: SectionTitleProps) {
  const dark = tone === 'dark'
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className={cn('max-w-xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <motion.p variants={fadeUp} className={cn('eyebrow mb-3 flex items-center gap-2', align === 'center' && 'justify-center', dark ? 'text-cyan' : 'text-brand')}>
          {eyebrow}
        </motion.p>
      )}
      <motion.div variants={fadeUp}>
        <Heading className={cn('text-[1.75rem] leading-[1.15] font-bold sm:text-[2.1rem] lg:text-[2.35rem]', dark && 'text-white')}>{title}</Heading>
      </motion.div>
      {description && (
        <motion.p variants={fadeUp} className={cn('mt-4 text-[0.95rem] leading-relaxed', dark ? 'text-slate-300' : 'text-slate')}>
          {description}
        </motion.p>
      )}
      {children && (
        <motion.div variants={fadeUp} className={cn('mt-7', align === 'center' && 'flex justify-center')}>
          {children}
        </motion.div>
      )}
    </motion.div>
  )
}
