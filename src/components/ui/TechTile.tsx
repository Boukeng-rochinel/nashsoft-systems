import type { Technology } from '@/types'
import { cn } from '@/lib/cn'
import { t } from '@/i18n'

/** Monogram badge in the technology's brand color. */
export function TechMark({ tech, size = 'md' }: { tech: Technology; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg font-display font-bold tracking-tight',
        size === 'sm' && 'size-7 text-[0.6rem]',
        size === 'md' && 'size-10 text-xs',
        size === 'lg' && 'size-12 text-sm',
      )}
      style={{ background: tech.color, color: tech.foreground ?? '#fff', boxShadow: `0 6px 16px -8px ${tech.color}` }}
    >
      {t(tech.mono)}
    </span>
  )
}

/** Technology tile, light or dark (matches the "stack" grids in the designs). */
export function TechTile({ tech, tone = 'light', caption }: { tech: Technology; tone?: 'light' | 'dark'; caption?: string }) {
  return (
    <div
      className={cn(
        'group flex h-full flex-col items-start gap-3 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1',
        tone === 'light'
          ? 'border border-line bg-white shadow-card hover:shadow-card-hover'
          : 'border border-brand/25 bg-navy-900/80 hover:border-brand-300/50',
      )}
    >
      <TechMark tech={tech} />
      <div>
        <p className={cn('font-display text-sm font-semibold', tone === 'light' ? 'text-navy' : 'text-white')}>{t(tech.name)}</p>
        <p className={cn('mt-0.5 text-xs', tone === 'light' ? 'text-slate' : 'text-slate-400')}>{t(caption ?? tech.category)}</p>
      </div>
    </div>
  )
}

/** Small technology chip used on cards. */
export function TechChip({ name, tone = 'light' }: { name: string; tone?: 'light' | 'dark' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-[0.7rem] font-medium',
        tone === 'light' ? 'bg-brand-50 text-brand' : 'bg-white/8 text-brand-300 ring-1 ring-white/10',
      )}
    >
      {t(name)}
    </span>
  )
}
