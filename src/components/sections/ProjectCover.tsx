import type { Project } from '@/types'
import { Laptop, Phone } from '@/components/visuals/Devices'

/** Product shot for a project: device mockups on a themed gradient stage. */
export function ProjectCover({ project, size = 'card' }: { project: Project; size?: 'card' | 'hero' }) {
  const { theme, cover } = project
  const stage = `radial-gradient(120% 90% at 85% 10%, ${theme.accent}55, transparent 55%), radial-gradient(90% 80% at 0% 100%, ${theme.accent2}40, transparent 60%), linear-gradient(160deg, #0a1a33, #061426)`

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden" style={{ background: stage }}>
      <div aria-hidden className="absolute inset-0 bg-grid-dark opacity-50" />
      {cover.device === 'phone' ? (
        <div className="relative flex w-full items-end justify-center gap-[4%] px-[10%] pt-[8%]">
          <Phone variant={cover.variant} theme={theme} title={project.title} className="w-[24%] translate-y-[6%]" />
          <Phone variant="analytics" theme={theme} className="w-[24%] -translate-y-[4%] scale-105" />
          <Phone variant="table" theme={theme} className="w-[24%] translate-y-[6%]" />
        </div>
      ) : cover.device === 'both' ? (
        <div className={size === 'hero' ? 'relative w-[86%] translate-y-[3%]' : 'relative w-[82%] translate-y-[8%]'}>
          <Laptop variant={cover.variant} theme={theme} title={project.title} />
          <div className="absolute right-[-6%] bottom-[-2%] w-[22%]">
            <Phone variant="mobile" theme={theme} title={project.title} />
          </div>
        </div>
      ) : (
        <div className={size === 'hero' ? 'relative w-[86%] translate-y-[3%]' : 'relative w-[80%] translate-y-[10%]'}>
          <Laptop variant={cover.variant} theme={theme} title={project.title} />
        </div>
      )}
    </div>
  )
}
