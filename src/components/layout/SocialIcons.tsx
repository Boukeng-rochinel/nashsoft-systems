import type { SVGProps } from 'react'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'

/** Brand glyphs (lucide-react v1 no longer ships brand icons). */
const icons = {
  linkedin: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  github: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22v3.29c0 .32.21.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  ),
  x: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.3 19.5h2.04L6.49 3.24H4.3L17.6 20.65z" />
    </svg>
  ),
  youtube: (p: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  ),
}

const labels: Record<keyof typeof icons, string> = { linkedin: 'LinkedIn', github: 'GitHub', x: 'X (Twitter)', youtube: 'YouTube' }

/** Renders only the profiles configured in `site.social`. */
export function SocialIcons({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const entries = (Object.keys(icons) as Array<keyof typeof icons>).filter((k) => site.social[k])
  if (entries.length === 0) return null
  return (
    <ul className="flex items-center gap-3">
      {entries.map((key) => {
        const Icon = icons[key]
        return (
          <li key={key}>
            <a
              href={site.social[key]}
              target="_blank"
              rel="noreferrer"
              aria-label={`Nashsoft Systems sur ${labels[key]}`}
              className={cn(
                'inline-flex size-9 items-center justify-center rounded-lg transition-colors',
                tone === 'dark' ? 'text-slate-300 hover:bg-white/10 hover:text-white' : 'text-navy hover:bg-brand-50 hover:text-brand',
              )}
            >
              <Icon className="size-[18px]" aria-hidden />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
