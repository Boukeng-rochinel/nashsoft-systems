import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

export interface CardSkeletonProps {
  /**
   * Layout to mimic:
   * - `media`   image on top, title, text, button (project / service / article cards) — default
   * - `compact` icon tile instead of an image (service cards without photos)
   * - `row`     image on the left, content on the right (list layouts)
   */
  variant?: 'media' | 'compact' | 'row'
  /** Image box aspect ratio (CSS aspect-ratio), e.g. "16 / 10", "4 / 3", "1". Default "16 / 10". */
  imageAspect?: string
  /** Number of body text lines (default 2). */
  lines?: number
  /** Show the call-to-action placeholder (default true). */
  showButton?: boolean
  /** Light cards (default) or dark cards for navy sections. */
  tone?: 'light' | 'dark'
  /** Fixed width/height if the card is not sized by its grid cell. */
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  className?: string
  /** Accessible label announced to screen readers. */
  label?: string
  /** Announce the loading state (set false for all but one card in a grid). Default true. */
  announce?: boolean
}

/** Widths cycle so stacked lines look like real paragraphs, not a barcode. */
const LINE_WIDTHS = ['100%', '92%', '78%', '86%', '64%']

/**
 * Placeholder that mirrors the showcase card layout while content (or its image)
 * loads on slow connections. Styled with Tailwind; the shimmer comes from the
 * `skeleton` utility in index.css (transform-only animation, reduced-motion safe).
 */
export function CardSkeleton({
  variant = 'media',
  imageAspect = '16 / 10',
  lines = 2,
  showButton = true,
  tone = 'light',
  width,
  height,
  className,
  label = 'Chargement…',
  announce = true,
}: CardSkeletonProps) {
  const dark = tone === 'dark'
  const block = cn('skeleton rounded-md', dark && 'skeleton-dark')

  const body = (
    <div className={cn('flex flex-1 flex-col', variant === 'row' ? 'py-1' : 'p-5')}>
      {/* Title */}
      <div className={cn(block, 'h-4 w-3/5')} />
      {/* Meta line (industry · type) */}
      <div className={cn(block, 'mt-2.5 h-3 w-2/5 opacity-70')} />
      {/* Body text */}
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className={cn(block, 'h-3')} style={{ width: LINE_WIDTHS[i % LINE_WIDTHS.length] }} />
        ))}
      </div>
      {/* Button */}
      {showButton && <div className={cn(block, 'mt-6 h-9 w-32 rounded-full')} />}
    </div>
  )

  return (
    <div
      {...(announce ? { role: 'status', 'aria-live': 'polite' as const, 'aria-busy': true, 'aria-label': label } : { 'aria-hidden': true })}
      style={{ width, height }}
      className={cn(
        'flex overflow-hidden rounded-2xl border',
        variant === 'row' ? 'flex-row gap-4 p-4' : 'flex-col',
        dark ? 'border-white/10 bg-navy-900/70' : 'border-line bg-white shadow-card',
        className,
      )}
    >
      <div aria-hidden className={cn('contents')}>
        {variant === 'media' && <div className={cn('skeleton w-full', dark && 'skeleton-dark')} style={{ aspectRatio: imageAspect }} />}
        {variant === 'row' && <div className={cn(block, 'w-28 shrink-0 rounded-xl sm:w-40')} style={{ aspectRatio: imageAspect }} />}
        {variant === 'compact' && (
          <div className="px-5 pt-5">
            <div className={cn(block, 'size-11 rounded-xl')} />
          </div>
        )}
        {body}
      </div>
    </div>
  )
}

/** Grid of skeleton cards, e.g. while a list or a lazy page chunk loads. */
export function CardSkeletonGrid({ count = 3, className, ...card }: CardSkeletonProps & { count?: number }) {
  return (
    <div className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} {...card} announce={card.announce !== false && i === 0} />
      ))}
    </div>
  )
}
