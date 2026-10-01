import { useId } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { Project, ProjectCategory } from '@/types'
import { projectCategories } from '@/data/projects'
import { cn } from '@/lib/cn'
import { ProjectCard } from './ProjectCard'

type Filter = (typeof projectCategories)[number]

const isFilter = (v: string | null): v is Filter => v !== null && (projectCategories as readonly string[]).includes(v)

/**
 * Category filter + animated grid. The active filter lives in the URL
 * (?categorie=Mobile) so filtered views are shareable and survive reloads.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const [params, setParams] = useSearchParams()
  const raw = params.get('categorie')
  const active: Filter = isFilter(raw) ? raw : 'Tous'
  const groupId = useId()

  const visible = active === 'Tous' ? projects : projects.filter((p) => p.categories.includes(active as ProjectCategory))
  const count = (f: Filter) => (f === 'Tous' ? projects.length : projects.filter((p) => p.categories.includes(f as ProjectCategory)).length)

  const select = (f: Filter) => {
    const next = new URLSearchParams(params)
    if (f === 'Tous') next.delete('categorie')
    else next.set('categorie', f)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <div>
      <div role="group" aria-labelledby={`${groupId}-label`} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-none sm:mx-0 sm:flex-wrap sm:px-0">
        <span id={`${groupId}-label`} className="sr-only">
          Filtrer les projets par catégorie
        </span>
        {projectCategories.map((f) => {
          const selected = f === active
          return (
            <button
              key={f}
              type="button"
              aria-pressed={selected}
              onClick={() => select(f)}
              className={cn(
                'relative inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-colors',
                selected ? 'text-white' : 'border border-line bg-white text-navy hover:border-brand/40 hover:text-brand',
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${groupId}-active`}
                  className="absolute inset-0 rounded-full bg-brand-gradient shadow-[0_8px_20px_-8px_rgb(8_125_255/0.8)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{f}</span>
              <span className={cn('relative rounded-full px-1.5 text-[0.7rem]', selected ? 'bg-white/20' : 'bg-light text-slate')}>{count(f)}</span>
            </button>
          )
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} projet{visible.length > 1 ? 's' : ''} affiché{visible.length > 1 ? 's' : ''}
      </p>

      <motion.ul layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  )
}
