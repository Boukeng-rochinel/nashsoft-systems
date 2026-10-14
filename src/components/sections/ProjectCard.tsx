import { Link } from '@/i18n/router'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/types'
import { projectHref } from '@/data/projects'
import { cn } from '@/lib/cn'
import { TechChip } from '@/components/ui/TechTile'
import { SmartImage } from '@/components/ui/SmartImage'
import { t as tr } from '@/i18n'

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
        <SmartImage
          src={project.image}
          alt={tr(project.imageAlt)}
          width={1200}
          height={750}
          wrapperClassName="size-full"
          className="size-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div aria-hidden className="absolute inset-0 bg-navy/10" />
        <span className="absolute top-3 left-3 rounded-md bg-brand px-2 py-0.5 font-display text-[0.65rem] font-semibold text-white">
          {tr(project.categories[0])}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[0.98rem] font-semibold text-navy">{tr(project.title)}</h3>
        <p className="mt-0.5 text-xs font-medium text-slate">
          {tr(project.industry)} · {tr(project.type)}
        </p>
        <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate">{tr(project.summary)}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={tr('Technologies')}>
          {project.technologies.slice(0, 3).map((t) => (
            <li key={t}>
              <TechChip name={t} />
            </li>
          ))}
        </ul>
        <Link
          to={projectHref(project.slug)}
          className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-brand transition-colors after:absolute after:inset-0 hover:text-brand-600"
        >{tr('Voir le projet')}{' '}<span className="sr-only">{tr(project.title)}</span>
          <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
