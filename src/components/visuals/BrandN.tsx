import { site } from '@/data/site'
import { cn } from '@/lib/cn'

/**
 * The Nashsoft "N" mark used as a large graphic element
 * (CTA bands, hero backdrops) — the brand file itself, never redrawn.
 * Callers set the positioning (`relative` / `absolute`): a built-in `relative`
 * would win over a passed `absolute` and push surrounding content down.
 */
export function BrandN({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none select-none', className)}>
      <img src={site.logo.mark} alt="" className="size-full object-contain" draggable={false} />
    </div>
  )
}

/** Thin geometric outline of an N, used as subtle background pattern. */
export function NOutline({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" fill="none" className={cn('pointer-events-none text-brand-300', className)}>
      <path d="M12 88V12h18l40 52V12h18v76H70L30 36v52z" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" />
      <path d="M20 80V20h6l48 62V20h6v60h-6L26 18" stroke="currentColor" strokeWidth="0.3" opacity="0.6" />
    </svg>
  )
}
