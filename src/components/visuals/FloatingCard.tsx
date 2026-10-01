import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { useTheme } from '@/hooks/useTheme'

interface FloatingCardProps {
  icon?: LucideIcon
  title: string
  description?: string
  /** Defaults to the site theme. */
  tone?: 'light' | 'dark'
  className?: string
  /** Seconds — offsets the float loop so cards don't move in sync. */
  delay?: number
  children?: ReactNode
}

/** Glass card that floats over hero visuals ("Web & Mobile Apps", "IA & Data"…). */
export function FloatingCard({ icon: Icon, title, description, tone, className, delay = 0, children }: FloatingCardProps) {
  const { theme } = useTheme()
  const dark = (tone ?? theme) === 'dark'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4 + delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn('absolute z-10', className)}
    >
      <div
        className={cn(
          'animate-float rounded-2xl p-3 sm:p-3.5',
          dark
            ? 'border border-cyan/25 bg-navy-900/70 text-white shadow-[0_0_40px_-12px_rgb(0_198_255/0.55)] backdrop-blur-md'
            : 'border border-white/80 bg-white/85 text-navy shadow-float backdrop-blur-md',
        )}
        style={{ animationDelay: `${delay * 1.7}s` }}
      >
        <div className="flex items-start gap-3">
          {Icon && (
            <span
              aria-hidden
              className={cn(
                'inline-flex size-9 shrink-0 items-center justify-center rounded-xl',
                dark ? 'bg-gradient-to-br from-brand to-violet text-white' : 'bg-gradient-to-br from-brand to-[#3a5bff] text-white',
              )}
            >
              <Icon className="size-[18px]" strokeWidth={1.8} />
            </span>
          )}
          <div className="min-w-0">
            <p className={cn('font-display text-[0.8rem] font-semibold whitespace-nowrap', dark ? 'text-white' : 'text-navy')}>{title}</p>
            {description && <p className={cn('mt-0.5 max-w-[11rem] text-[0.7rem] leading-snug', dark ? 'text-slate-300' : 'text-slate')}>{description}</p>}
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  )
}
