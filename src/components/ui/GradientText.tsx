import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Highlighted words in headings: blue→violet on light, cyan→blue on dark. */
export function GradientText({ children, tone = 'light', className }: { children: ReactNode; tone?: 'light' | 'dark'; className?: string }) {
  return <span className={cn(tone === 'dark' ? 'text-gradient-cyan' : 'text-gradient', className)}>{children}</span>
}
