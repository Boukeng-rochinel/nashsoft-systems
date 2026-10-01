import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Highlighted words in headings.
 * `light`: blue→violet · `dark`: cyan→blue · `auto` (default): picks from the nearest themed ancestor.
 */
export function GradientText({ children, tone = 'auto', className }: { children: ReactNode; tone?: 'light' | 'dark' | 'auto'; className?: string }) {
  const classes = tone === 'dark' ? 'text-gradient-cyan' : tone === 'light' ? 'text-gradient' : 'text-gradient on-dark:text-gradient-cyan'
  return <span className={cn(classes, className)}>{children}</span>
}
