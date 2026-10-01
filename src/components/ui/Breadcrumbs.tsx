import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumbs({ items, tone = 'dark', className }: { items: Crumb[]; tone?: 'light' | 'dark'; className?: string }) {
  return (
    <nav aria-label="Fil d’Ariane" className={cn('text-[0.8rem]', className)}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link to={item.href} className={cn('transition-colors', tone === 'dark' ? 'text-cyan/90 hover:text-white' : 'text-brand hover:text-navy')}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={tone === 'dark' ? 'text-slate-300' : 'text-slate'}>
                  {item.label}
                </span>
              )}
              {!last && <ChevronRight aria-hidden className={cn('size-3.5', tone === 'dark' ? 'text-slate-500' : 'text-slate/60')} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
