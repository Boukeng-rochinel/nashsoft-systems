import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

type Variant = 'soft' | 'solid' | 'circle' | 'dark' | 'outline'

const variants: Record<Variant, string> = {
  /** Light-blue tile with blue icon (light cards). */
  soft: 'rounded-xl bg-brand-50 text-brand ring-1 ring-brand/10',
  /** Gradient tile with white icon (services grid, process). */
  solid: 'rounded-xl bg-brand text-white',
  /** Gradient circle (process steps). */
  circle: 'rounded-full bg-brand text-white',
  /** Glowing tile for dark sections. */
  dark: 'rounded-xl bg-brand text-white ring-1 ring-white/15',
  /** Thin outlined circle (hero highlights). */
  outline: 'rounded-full border border-brand/20 bg-white text-brand',
}

const sizes = { sm: 'size-9 [&>svg]:size-4', md: 'size-11 [&>svg]:size-5', lg: 'size-14 [&>svg]:size-6' }

export function IconBox({ icon: Icon, variant = 'soft', size = 'md', className }: { icon: LucideIcon; variant?: Variant; size?: keyof typeof sizes; className?: string }) {
  return (
    <span aria-hidden className={cn('inline-flex shrink-0 items-center justify-center', variants[variant], sizes[size], className)}>
      <Icon strokeWidth={1.8} />
    </span>
  )
}
