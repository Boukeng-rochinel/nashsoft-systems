import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check, X } from 'lucide-react'
import type { Expertise } from '@/types'
import { getTechnology } from '@/data/technologies'
import { START_PROJECT_HREF } from '@/data/navigation'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { cn } from '@/lib/cn'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'

interface ExpertiseGridProps {
  items: Expertise[]
  /** Service slug used to prefill the start-project form. */
  service?: string
  className?: string
}

/** Photo cards of equal height; each opens an accessible detail panel. */
export function ExpertiseGrid({ items, service, className }: ExpertiseGridProps) {
  const [active, setActive] = useState<Expertise | null>(null)
  const close = useCallback(() => setActive(null), [])

  return (
    <>
      <RevealGroup className={cn('grid gap-5 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {items.map((item) => (
          <RevealItem key={item.title} className="h-full">
            <button
              type="button"
              onClick={() => setActive(item)}
              aria-haspopup="dialog"
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-white text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-mist">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />
                <span aria-hidden className="absolute bottom-4 left-5 inline-flex size-11 items-center justify-center rounded-xl bg-white text-brand shadow-card">
                  <item.icon className="size-5" strokeWidth={1.8} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  En savoir plus <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>
      <ExpertiseDialog item={active} service={service} onClose={close} />
    </>
  )
}

function ExpertiseDialog({ item, service, onClose }: { item: Expertise | null; service?: string; onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null)
  const open = item !== null
  useLockBodyScroll(open)
  useFocusTrap(dialog, open, onClose)
  const href = service ? `${START_PROJECT_HREF}?service=${service}` : START_PROJECT_HREF

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="expertise-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl outline-none sm:rounded-2xl"
          >
            <div className="relative aspect-[21/9] shrink-0 overflow-hidden bg-mist">
              <img src={item.image} alt={item.imageAlt} width={1200} height={800} className="size-full object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
              <div className="absolute right-6 bottom-5 left-6 flex items-center gap-3">
                <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand">
                  <item.icon className="size-5" strokeWidth={1.8} />
                </span>
                <h2 id="expertise-title" className="font-display text-xl font-bold text-white sm:text-2xl">
                  {item.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer"
                className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full bg-navy-950/50 text-white backdrop-blur transition-colors hover:bg-navy-950/75"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              <p className="leading-relaxed text-slate">{item.details}</p>

              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                <div>
                  <h3 className="eyebrow text-brand">Cas d’usage</h3>
                  <ul className="mt-4 space-y-3">
                    {item.useCases.map((u) => (
                      <li key={u} className="flex items-start gap-3 text-sm text-navy">
                        <span aria-hidden className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="eyebrow text-brand">Technologies</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map(getTechnology).map((t) => (
                      <li key={t.name} className="inline-flex items-center gap-2 rounded-full border border-line bg-light py-1 pr-3 pl-1 text-sm text-navy">
                        <span
                          aria-hidden
                          className="inline-flex size-6 items-center justify-center rounded-full text-[0.6rem] font-bold"
                          style={{ backgroundColor: t.color, color: t.foreground ?? '#fff' }}
                        >
                          {t.mono}
                        </span>
                        {t.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate">Un projet en {item.title.toLowerCase()} ?</p>
                <ButtonLink to={href} onClick={onClose}>
                  Démarrer un projet
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
