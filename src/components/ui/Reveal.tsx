import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { fadeUp, revealViewport, stagger } from '@/lib/motion'

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; children: ReactNode }

/** Fades and lifts its content into view once, on scroll. */
export function Reveal({ delay = 0, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={{ hidden: fadeUp.hidden, show: { ...(fadeUp.show as object), transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } } }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/** Container that staggers its `RevealItem` children. */
export function RevealGroup({ children, gap = 0.08, ...props }: HTMLMotionProps<'div'> & { gap?: number; children: ReactNode }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={revealViewport} variants={stagger(gap)} {...props}>
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, ...props }: HTMLMotionProps<'div'> & { children: ReactNode }) {
  return (
    <motion.div variants={fadeUp} {...props}>
      {children}
    </motion.div>
  )
}
