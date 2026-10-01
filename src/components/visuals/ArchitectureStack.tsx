import { motion } from 'framer-motion'
import { Layers, type LucideIcon } from 'lucide-react'
import type { ArchitectureLayer } from '@/types'
import { cn } from '@/lib/cn'
import { revealViewport } from '@/lib/motion'

interface ArchitectureStackProps {
  layers: ArchitectureLayer[]
  icons?: LucideIcon[]
  tone?: 'light' | 'dark'
  className?: string
}

/** Layered architecture diagram with animated data pulses between layers. */
export function ArchitectureStack({ layers, icons = [], tone = 'dark', className }: ArchitectureStackProps) {
  const dark = tone === 'dark'
  return (
    <motion.ol
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className={cn('relative flex flex-col', className)}
      aria-label="Schéma d’architecture"
    >
      {layers.map((layer, i) => {
        const Icon = icons[i] ?? Layers
        return (
          <motion.li
            key={layer.layer}
            variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
            className="relative"
          >
            {i > 0 && (
              <span aria-hidden className="relative ml-[1.65rem] block h-6 w-px">
                <span className={cn('absolute inset-0', dark ? 'bg-gradient-to-b from-cyan/60 to-brand/30' : 'bg-brand/25')} />
                <span
                  className="absolute left-1/2 size-1.5 -translate-x-1/2 animate-[flow-y_1.8s_linear_infinite] rounded-full bg-cyan shadow-[0_0_10px_2px_rgb(0_198_255/0.7)]"
                  style={{ animationDelay: `${i * 0.25}s` }}
                />
              </span>
            )}
            <div
              className={cn(
                'flex flex-col gap-3 rounded-2xl p-3.5 sm:flex-row sm:items-center sm:gap-4',
                dark ? 'border border-brand/25 bg-navy-900/80 backdrop-blur' : 'border border-line bg-white shadow-card',
              )}
            >
              <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex size-[3.3rem] shrink-0 items-center justify-center rounded-xl text-white',
                    i === layers.length - 1 ? 'bg-gradient-to-br from-violet to-brand' : 'bg-gradient-to-br from-brand to-cyan/80',
                    dark && 'shadow-[0_0_24px_-6px_rgb(0_198_255/0.6)]',
                  )}
                >
                  <Icon className="size-6" strokeWidth={1.7} />
                </span>
                <div>
                  <p className={cn('eyebrow text-[0.6rem]', dark ? 'text-cyan/80' : 'text-brand')}>Couche 0{i + 1}</p>
                  <p className={cn('font-display font-semibold', dark ? 'text-white' : 'text-navy')}>{layer.layer}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-medium',
                      dark ? 'bg-white/[0.06] text-slate-200 ring-1 ring-white/10' : 'bg-brand-50 text-brand',
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}
