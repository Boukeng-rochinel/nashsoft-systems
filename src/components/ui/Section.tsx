import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

export type SectionTone = 'white' | 'light' | 'mist' | 'dark' | 'navy'

const toneClasses: Record<SectionTone, string> = {
  white: 'bg-white text-ink',
  light: 'bg-light text-ink',
  mist: 'bg-mist text-ink',
  navy: 'bg-navy text-slate-300',
  dark: 'bg-navy-950 text-slate-300',
}

const isDarkTone = (tone: SectionTone) => tone === 'dark' || tone === 'navy'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  tone?: SectionTone
  /** Decorative background layer rendered behind the content. */
  background?: ReactNode
  /** Vertical rhythm. */
  spacing?: 'sm' | 'md' | 'lg'
  contained?: boolean
}

const spacingClasses = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-28',
}

export function Section({ tone = 'white', background, spacing = 'md', contained = true, className, children, ...props }: SectionProps) {
  const dark = isDarkTone(tone)
  return (
    <section
      data-theme={dark ? 'dark' : 'light'}
      className={cn('relative isolate overflow-hidden', toneClasses[tone], spacingClasses[spacing], className)}
      {...props}
    >
      {background && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {background}
        </div>
      )}
      {contained ? <Container>{children}</Container> : children}
    </section>
  )
}
