import { useState, type ImgHTMLAttributes } from 'react'
import { ImageOff } from 'lucide-react'
import { cn } from '@/lib/cn'

type Status = 'loading' | 'loaded' | 'error'

interface SmartImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  /** Classes for the wrapper (size it here: `size-full`, `aspect-[16/10]`…). */
  wrapperClassName?: string
  tone?: 'light' | 'dark'
}

/**
 * Image that shows a shimmering skeleton until it has loaded, then fades in.
 * On error it degrades to a neutral block instead of a broken-image icon —
 * important for visitors on slow or unstable connections.
 */
export function SmartImage({ wrapperClassName, className, tone = 'light', alt = '', loading = 'lazy', decoding = 'async', ...img }: SmartImageProps) {
  const [status, setStatus] = useState<Status>('loading')

  return (
    <div className={cn('relative overflow-hidden', status === 'loading' && cn('skeleton', tone === 'dark' && 'skeleton-dark'), wrapperClassName)}>
      {status === 'error' ? (
        <div role="img" aria-label={alt} className={cn('flex size-full items-center justify-center', tone === 'dark' ? 'bg-navy-900 text-slate-500' : 'bg-mist text-slate/60')}>
          <ImageOff aria-hidden className="size-6" />
        </div>
      ) : (
        <img
          {...img}
          alt={alt}
          loading={loading}
          decoding={decoding}
          // Cached images can finish before React attaches onLoad: check `complete` on mount.
          ref={(el) => {
            if (el?.complete && el.naturalWidth > 0 && status === 'loading') setStatus('loaded')
          }}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn('transition-opacity duration-500', status === 'loaded' ? 'opacity-100' : 'opacity-0', className)}
        />
      )}
    </div>
  )
}
