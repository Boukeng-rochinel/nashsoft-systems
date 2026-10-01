import { site } from '@/data/site'
import { cn } from '@/lib/cn'

/**
 * The Nashsoft "N" mark used as a large glowing graphic element
 * (CTA bands, hero backdrops) — the brand file itself, never redrawn.
 */
export function BrandN({ className, glow = true }: { className?: string; glow?: boolean }) {
  return (
    <div aria-hidden className={cn('pointer-events-none relative select-none', className)}>
      {glow && <img src={site.logo.mark} alt="" className="absolute inset-0 size-full scale-110 object-contain opacity-70 blur-2xl" />}
      <img src={site.logo.mark} alt="" className="relative size-full object-contain drop-shadow-[0_10px_30px_rgb(8_125_255/0.55)]" draggable={false} />
    </div>
  )
}

/** Thin geometric outline of an N, used as subtle background pattern. */
export function NOutline({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" fill="none" className={cn('pointer-events-none', className)}>
      <defs>
        <linearGradient id="n-outline" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00C6FF" />
          <stop offset="1" stopColor="#6338F5" />
        </linearGradient>
      </defs>
      <path d="M12 88V12h18l40 52V12h18v76H70L30 36v52z" stroke="url(#n-outline)" strokeWidth="0.6" strokeLinejoin="round" />
      <path d="M20 80V20h6l48 62V20h6v60h-6L26 18" stroke="url(#n-outline)" strokeWidth="0.3" opacity="0.6" />
    </svg>
  )
}
