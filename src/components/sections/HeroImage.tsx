import type { ReactNode } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import { BrandN } from '@/components/visuals/BrandN'

interface HeroImageProps {
  src: string
  alt: string
  /** Floating cards / panels layered over the photo (absolutely positioned). */
  children?: ReactNode
  className?: string
  /** Eager-load the hero photo (it is the LCP element). */
  priority?: boolean
}

/** Hero photograph with brand glow, faint N mark and floating UI cards. */
export function HeroImage({ src, alt, children, className, priority = true }: HeroImageProps) {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  return (
    <div className={cn('relative mx-auto w-full max-w-[600px] lg:max-w-none', className)}>
      <div aria-hidden className={cn('absolute -inset-6 rounded-[2.5rem] blur-3xl', dark ? 'bg-brand/30' : 'bg-brand/15')} />
      <BrandN className={cn('absolute -top-10 -right-6 w-36 sm:w-44', dark ? 'opacity-40' : 'opacity-25')} />
      <div
        className={cn(
          'relative overflow-hidden rounded-[1.75rem] p-1.5',
          dark ? 'bg-gradient-to-br from-cyan/40 via-brand/20 to-violet/40' : 'bg-gradient-to-br from-white via-brand-100 to-violet-50 shadow-[0_40px_80px_-40px_rgb(6_20_38/0.45)]',
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
          <img
            src={src}
            alt={alt}
            width={1600}
            height={1200}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            className="size-full object-cover"
          />
          <div
            aria-hidden
            className={cn(
              'absolute inset-0',
              dark ? 'bg-gradient-to-tr from-navy-950/60 via-transparent to-brand/20' : 'bg-gradient-to-tr from-navy/25 via-transparent to-transparent',
            )}
          />
        </div>
      </div>
      {children}
    </div>
  )
}
