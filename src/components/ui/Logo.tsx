import { Link } from '@/i18n/router'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { t } from '@/i18n'

interface LogoProps {
  tone?: 'light' | 'dark'
  className?: string
  /** Render as a link to the homepage (default true). */
  asLink?: boolean
  size?: 'md' | 'lg'
}

/**
 * Nashsoft Systems lockup.
 * - Light surfaces: the original lockup image (background removed).
 * - Dark surfaces: the original "N" mark with the wordmark set in light colors,
 *   as shown in the brand's dark-theme designs.
 */
export function Logo({ tone = 'light', className, asLink = true, size = 'md' }: LogoProps) {
  const content =
    tone === 'light' ? (
      <img
        src={site.logo.lockup}
        alt={t('Nashsoft Systems — Ideas · Code · Solutions')}
        width={267}
        height={58}
        className={cn('w-auto select-none', size === 'lg' ? 'h-12' : 'h-9 sm:h-10')}
        draggable={false}
      />
    ) : (
      <span className="flex items-center gap-2.5">
        <img
          src={site.logo.mark}
          alt=""
          width={66}
          height={66}
          className={cn('w-auto select-none', size === 'lg' ? 'h-12' : 'h-9 sm:h-10')}
          draggable={false}
        />
        <span className="flex flex-col leading-none">
          <span className={cn('font-display font-semibold tracking-tight text-white', size === 'lg' ? 'text-2xl' : 'text-lg sm:text-xl')}>{t('Nashsoft')}</span>
          <span className={cn('font-display font-semibold text-brand', size === 'lg' ? 'text-xl' : 'text-base sm:text-lg')} style={{ marginTop: '-0.08em' }}>{t('Systems')}</span>
          <span className="mt-1 text-[0.45rem] font-medium tracking-[0.32em] text-slate-300 uppercase sm:text-[0.5rem]">{t('Ideas · Code · Solutions')}</span>
        </span>
        <span className="sr-only">{t('Nashsoft Systems — Ideas · Code · Solutions')}</span>
      </span>
    )

  if (!asLink) return <span className={cn('inline-flex', className)}>{content}</span>

  return (
    <Link to="/" className={cn('inline-flex shrink-0 rounded-md', className)} aria-label={t('Nashsoft Systems — accueil')}>
      {content}
    </Link>
  )
}
