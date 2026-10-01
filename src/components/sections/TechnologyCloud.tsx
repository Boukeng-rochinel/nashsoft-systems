import type { Technology } from '@/types'
import { coreStack } from '@/data/technologies'
import { cn } from '@/lib/cn'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { TechMark, TechTile } from '@/components/ui/TechTile'

interface TechnologyCloudProps {
  items?: Technology[]
  tone?: 'light' | 'dark'
  /** `tiles`: card grid · `pills`: compact logo + name rows (dark homepage design). */
  variant?: 'tiles' | 'pills'
  captions?: Record<string, string>
  /** Grid column classes for the `tiles` variant. */
  cols?: string
  className?: string
}

export function TechnologyCloud({ items = coreStack, tone = 'light', variant = 'tiles', captions, cols = 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5', className }: TechnologyCloudProps) {
  if (variant === 'pills') {
    return (
      <RevealGroup gap={0.04} className={cn('flex flex-wrap gap-3', className)}>
        {items.map((tech) => (
          <RevealItem key={tech.name}>
            <div
              className={cn(
                'flex items-center gap-2.5 rounded-xl py-2 pr-4 pl-2 transition-all duration-300 hover:-translate-y-0.5',
                tone === 'dark' ? 'border border-white/10 bg-white/[0.04] hover:border-cyan/40' : 'border border-line bg-white shadow-card',
              )}
            >
              <TechMark tech={tech} size="sm" />
              <span className={cn('text-sm font-medium', tone === 'dark' ? 'text-slate-200' : 'text-navy')}>{tech.name}</span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    )
  }

  return (
    <RevealGroup gap={0.04} className={cn('grid gap-3', cols, className)}>
      {items.map((tech) => (
        <RevealItem key={tech.name}>
          <TechTile tech={tech} tone={tone} caption={captions?.[tech.name]} />
        </RevealItem>
      ))}
    </RevealGroup>
  )
}
