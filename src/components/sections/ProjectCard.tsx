import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/types'
import { projectHref } from '@/data/projects'
import { cn } from '@/lib/cn'
import { TechChip } from '@/components/ui/TechTile'
import { ProjectCover } from './ProjectCover'

export function ProjectCard({ project, tone = 'light', className }: { project: Project; tone?: 'light' | 'dark'; className?: string }) {
  const dark = tone === 'dark'
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1',
        dark
          ? 'border border-white/10 bg-white text-ink shadow-[0_20px_50px_-25px_rgb(0_0_0/0.7)]'
          : 'border border-line bg-white shadow-card hover:shadow-card-hover',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="size-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <ProjectCover project={project} />
        </div>
        <span className="absolute top-3 left-3 rounded-md bg-brand px-2 py-0.5 font-display text-[0.65rem] font-semibold text-white shadow-[0_4px_12px_-4px_rgb(8_125_255/0.8)]">
          {project.categories[0]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[0.98rem] font-semibold text-navy">{project.title}</h3>
        <p className="mt-0.5 text-xs font-medium text-slate">
          {project.industry} · {project.type}
        </p>
        <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, 3).map((t) => (
            <li key={t}>
              <TechChip name={t} />
            </li>
          ))}
        </ul>
        <Link
          to={projectHref(project.slug)}
          className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-brand transition-colors after:absolute after:inset-0 hover:text-violet"
        >
          Voir le projet <span className="sr-only">{project.title}</span>
          <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
