import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

interface GlassPanelProps {
  title?: string
  items: Array<{ label: string; icon?: LucideIcon; color?: string; mono?: string }>
  columns?: 1 | 2
  className?: string
  delay?: number
}

/** Glass list panel floating over dark hero visuals (service list, tech list). */
export function GlassPanel({ title, items, columns = 1, className, delay = 0 }: GlassPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5 + delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn('absolute z-10', className)}
    >
      <div className="animate-float-slow rounded-2xl border border-cyan/30 bg-navy-900/70 p-3.5 shadow-[0_0_50px_-14px_rgb(0_198_255/0.55)] backdrop-blur-md sm:p-4">
        {title && <p className="mb-3 font-display text-xs font-semibold text-white">{title}</p>}
        <ul className={cn('grid gap-2.5', columns === 2 && 'grid-cols-2 gap-x-5')}>
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              {item.icon ? (
                <span aria-hidden className="inline-flex size-8 items-center justify-center rounded-lg border border-cyan/30 bg-gradient-to-br from-brand/40 to-violet/40 text-white">
                  <item.icon className="size-4" strokeWidth={1.8} />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="inline-flex size-7 items-center justify-center rounded-md font-display text-[0.55rem] font-bold text-white"
                  style={{ background: item.color ?? '#087DFF' }}
                >
                  {item.mono}
                </span>
              )}
              <span className="text-[0.75rem] font-medium whitespace-nowrap text-slate-100">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
