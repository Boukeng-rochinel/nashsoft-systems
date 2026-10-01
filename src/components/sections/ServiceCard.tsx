import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Service } from '@/types'
import { serviceHref } from '@/data/services'
import { cn } from '@/lib/cn'
import { TechChip } from '@/components/ui/TechTile'

interface ServiceCardProps {
  service: Service
  /**
   * `stacked`: icon on top + "En savoir plus" (homepage).
   * `row`: icon left, arrow right (services catalogue).
   * `dark`: glowing card for dark sections.
   */
  variant?: 'stacked' | 'row' | 'dark'
  showTech?: boolean
}

export function ServiceCard({ service, variant = 'stacked', showTech = false }: ServiceCardProps) {
  const Icon = service.icon
  const href = serviceHref(service.slug)

  if (variant === 'row') {
    return (
      <Link
        to={href}
        className="group relative flex h-full gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover sm:p-6"
      >
        <span
          aria-hidden
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-[#3a5bff] text-white shadow-[0_8px_18px_-8px_rgb(8_125_255/0.8)] transition-transform duration-300 group-hover:scale-105"
        >
          <Icon className="size-[22px]" strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="pr-6 font-display text-[0.98rem] font-semibold text-navy">{service.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate">{service.description}</p>
          {showTech && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {service.technologies.slice(0, 4).map((t) => (
                <li key={t}>
                  <TechChip name={t} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <ArrowRight aria-hidden className="absolute top-6 right-5 size-4 text-slate/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand" />
      </Link>
    )
  }

  if (variant === 'dark') {
    return (
      <Link
        to={href}
        className="group relative flex h-full flex-col rounded-2xl border border-brand/25 bg-navy-900/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/50 hover:shadow-[0_0_40px_-12px_rgb(0_198_255/0.45)]"
      >
        <span aria-hidden className="inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-violet text-white ring-1 ring-white/15">
          <Icon className="size-5" strokeWidth={1.8} />
        </span>
        <h3 className="mt-4 font-display text-[0.95rem] font-semibold text-white">{service.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{service.description}</p>
        <ArrowUpRight aria-hidden className="absolute top-5 right-5 size-4 text-slate-500 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan" />
      </Link>
    )
  }

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover sm:p-6">
      <span
        aria-hidden
        className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand ring-1 ring-brand/10 transition-colors duration-300 group-hover:bg-brand group-hover:text-white"
      >
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <h3 className="mt-5 font-display text-[0.98rem] font-semibold text-navy">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{service.description}</p>
      {showTech && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {service.technologies.slice(0, 3).map((t) => (
            <li key={t}>
              <TechChip name={t} />
            </li>
          ))}
        </ul>
      )}
      <Link
        to={href}
        className={cn(
          'mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-brand transition-colors hover:text-violet',
          // Stretch the link over the card for a larger click target.
          'after:absolute after:inset-0 after:rounded-2xl',
        )}
      >
        En savoir plus <span className="sr-only">sur {service.title}</span>
        <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  )
}
