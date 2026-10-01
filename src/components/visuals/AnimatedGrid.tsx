import { cn } from '@/lib/cn'

/**
 * Decorative background: drifting grid + soft brand glows.
 * Purely visual (aria-hidden) and paused for reduced-motion users via CSS.
 */
export function AnimatedGrid({ tone = 'dark', className, glow = true }: { tone?: 'light' | 'dark'; className?: string; glow?: boolean }) {
  const dark = tone === 'dark'
  return (
    <div aria-hidden className={cn('absolute inset-0 overflow-hidden', className)}>
      <div className={cn('absolute inset-0 animate-grid-pan mask-radial', dark ? 'bg-grid-dark' : 'bg-grid-light')} />
      {glow && (
        <>
          <div
            className={cn(
              'absolute -top-1/4 -right-[10%] size-[42rem] rounded-full blur-3xl animate-pulse-soft',
              dark ? 'bg-brand/25' : 'bg-brand/10',
            )}
          />
          <div className={cn('absolute -bottom-1/3 left-[20%] size-[34rem] rounded-full blur-3xl', dark ? 'bg-violet/20' : 'bg-violet/[0.07]')} />
          {dark && <div className="absolute top-1/3 -left-[12%] size-[26rem] rounded-full bg-cyan/10 blur-3xl" />}
        </>
      )}
    </div>
  )
}

/** Diagonal light streaks seen on the dark heroes and CTA bands of the designs. */
export function LightStreaks({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('absolute inset-0 overflow-hidden', className)}>
      <div className="absolute top-[-20%] left-[-8%] h-[140%] w-24 rotate-[28deg] bg-gradient-to-b from-transparent via-brand/30 to-transparent blur-xl" />
      <div className="absolute top-[-20%] left-[2%] h-[140%] w-[2px] rotate-[28deg] bg-gradient-to-b from-transparent via-cyan/60 to-transparent" />
      <div className="absolute top-[-20%] right-[6%] h-[140%] w-32 rotate-[28deg] bg-gradient-to-b from-transparent via-violet/25 to-transparent blur-2xl" />
    </div>
  )
}
