import { Fragment } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { revealViewport } from '@/lib/motion'

export interface FlowNode {
  label: string
  caption: string
  icon: LucideIcon
}

/**
 * Animated pipeline diagram (Data → Processing → AI Model → …).
 * Horizontal on desktop, vertical on mobile. Pulses travel along connectors.
 */
export function FlowDiagram({ nodes, tone = 'dark', className }: { nodes: FlowNode[]; tone?: 'light' | 'dark'; className?: string }) {
  const dark = tone === 'dark'
  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
      className={cn('flex flex-col items-stretch gap-0 lg:flex-row lg:items-center', className)}
      aria-label="Schéma du processus"
    >
      {nodes.map((node, i) => (
        <Fragment key={node.label}>
          <motion.li
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className={cn(
              'relative flex items-center gap-4 rounded-2xl p-4 lg:flex-1 lg:flex-col lg:p-5 lg:text-center',
              dark
                ? 'border border-brand/25 bg-navy-900/80 shadow-[0_0_40px_-18px_rgb(0_198_255/0.6)] backdrop-blur'
                : 'border border-line bg-white shadow-card',
            )}
          >
            <span className="eyebrow absolute top-3 right-4 text-[0.6rem] text-slate-500 lg:top-3 lg:right-3">0{i + 1}</span>
            <span
              aria-hidden
              className={cn(
                'inline-flex size-12 shrink-0 items-center justify-center rounded-xl text-white',
                i === nodes.length - 1 ? 'bg-gradient-to-br from-violet to-brand' : 'bg-gradient-to-br from-brand to-cyan/80',
                dark && 'shadow-[0_0_24px_-4px_rgb(0_198_255/0.6)]',
              )}
            >
              <node.icon className="size-6" strokeWidth={1.7} />
            </span>
            <div>
              <p className={cn('font-display font-semibold', dark ? 'text-white' : 'text-navy')}>{node.label}</p>
              <p className={cn('mt-1 text-xs leading-relaxed', dark ? 'text-slate-400' : 'text-slate')}>{node.caption}</p>
            </div>
          </motion.li>
          {i < nodes.length - 1 && (
            <li aria-hidden className="relative mx-auto flex h-8 w-px items-center justify-center lg:mx-0 lg:h-px lg:w-10 lg:shrink-0">
              <span className={cn('absolute inset-0', dark ? 'bg-gradient-to-b from-cyan/60 to-brand/40 lg:bg-gradient-to-r' : 'bg-line-strong')} />
              <span className="absolute size-1.5 animate-[flow-y_2s_linear_infinite] rounded-full bg-cyan shadow-[0_0_10px_2px_rgb(0_198_255/0.7)] lg:animate-[flow-x_2s_linear_infinite]" style={{ animationDelay: `${i * 0.3}s` }} />
            </li>
          )}
        </Fragment>
      ))}
    </motion.ol>
  )
}
