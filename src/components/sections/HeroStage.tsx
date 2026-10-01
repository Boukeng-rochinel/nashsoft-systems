import type { ReactNode } from 'react'
import type { ProjectTheme, ScreenVariant } from '@/types'
import { cn } from '@/lib/cn'
import { BrandN } from '@/components/visuals/BrandN'
import { Laptop, Phone } from '@/components/visuals/Devices'

interface HeroStageProps {
  laptop: ScreenVariant
  phone?: ScreenVariant
  theme: ProjectTheme
  title?: string
  /** Floating cards and overlays (absolutely positioned). */
  children?: ReactNode
  className?: string
}

/**
 * Dark hero visual: glowing workstation (laptop ± phone) over the brand N,
 * with floating glass cards layered on top — the technology-imagery role
 * the photographs play in the reference designs.
 */
export function HeroStage({ laptop, phone, theme, title, children, className }: HeroStageProps) {
  return (
    <div className={cn('relative mx-auto w-full max-w-[560px] lg:max-w-none', className)}>
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-brand/30 blur-3xl" />
      <div aria-hidden className="absolute top-[18%] right-[12%] size-40 rounded-full bg-violet/30 blur-3xl" />
      <BrandN className="absolute top-[-4%] left-[6%] w-[30%] opacity-30" />
      <div className="relative px-[7%] pt-[12%] pb-[12%]">
        <div className="[transform:perspective(1400px)_rotateY(-10deg)_rotateX(4deg)]">
          <Laptop variant={laptop} theme={theme} title={title} />
        </div>
        {phone && (
          <div className="absolute right-[4%] bottom-[8%] w-[20%]">
            <Phone variant={phone} theme={theme} title={title} />
          </div>
        )}
        {/* Reflection on the "desk" */}
        <div aria-hidden className="absolute inset-x-[10%] bottom-[6%] h-6 rounded-full bg-cyan/25 blur-2xl" />
      </div>
      {children}
    </div>
  )
}
