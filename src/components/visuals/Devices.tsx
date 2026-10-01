import type { ProjectTheme, ScreenVariant } from '@/types'
import { cn } from '@/lib/cn'
import { Screen } from './Screen'

interface DeviceProps {
  variant: ScreenVariant
  theme: ProjectTheme
  title?: string
  className?: string
}

/** Laptop with a code-rendered screen. Width is driven by the parent. */
export function Laptop({ variant, theme, title, className }: DeviceProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative rounded-t-[1.1rem] bg-gradient-to-b from-[#2a3446] to-[#161d2a] p-[1.6%] pb-[2.2%] shadow-[0_40px_80px_-30px_rgb(6_20_38/0.55)] ring-1 ring-white/10">
        <div className="absolute top-[0.7%] left-1/2 size-[0.6%] min-h-1 min-w-1 -translate-x-1/2 rounded-full bg-[#0b0f17]" />
        <div className="@container aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-black">
          <Screen variant={variant} theme={theme} title={title} />
        </div>
      </div>
      <div className="relative mx-[-6%] h-[0.9rem] rounded-b-[1.1rem] bg-gradient-to-b from-[#d9dee7] to-[#9aa3b2] shadow-[0_18px_30px_-12px_rgb(6_20_38/0.45)] sm:h-[1.1rem]">
        <div className="absolute top-0 left-1/2 h-[45%] w-[16%] -translate-x-1/2 rounded-b-lg bg-[#b8bfcb]" />
      </div>
    </div>
  )
}

/** Smartphone with a code-rendered screen. */
export function Phone({ variant, theme, title, className }: DeviceProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative rounded-[18%/9%] bg-gradient-to-b from-[#2c3546] to-[#121826] p-[4.5%] shadow-[0_30px_60px_-24px_rgb(6_20_38/0.6)] ring-1 ring-white/15">
        <div className="@container relative aspect-[9/19] overflow-hidden rounded-[14%/7%] bg-black">
          <Screen variant={variant} theme={theme} title={title} device="phone" />
          <div className="absolute top-[1.6%] left-1/2 h-[3%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}

/** Laptop + phone composition used for covers and heroes. */
export function DeviceDuo({ laptop, phone, theme, title, className }: { laptop: ScreenVariant; phone: ScreenVariant; theme: ProjectTheme; title?: string; className?: string }) {
  return (
    <div className={cn('relative w-full pr-[8%] pb-[4%]', className)}>
      <Laptop variant={laptop} theme={theme} title={title} />
      <div className="absolute right-0 bottom-0 w-[22%]">
        <Phone variant={phone} theme={theme} title={title} />
      </div>
    </div>
  )
}
