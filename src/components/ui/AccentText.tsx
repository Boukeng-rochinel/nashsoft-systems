import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * Highlighted words in headings, in flat brand blue (no gradient).
 * `light`: brand blue · `dark`: lighter brand tint · `auto` (default): picks from the nearest themed ancestor.
 */
export function AccentText({ children, tone = 'auto', className }: { children: ReactNode; tone?: 'light' | 'dark' | 'auto'; className?: string }) {
  const classes = tone === 'dark' ? 'text-brand-300' : tone === 'light' ? 'text-brand' : 'text-brand on-dark:text-brand-300'
  return <span className={cn(classes, className)}>{children}</span>
}
