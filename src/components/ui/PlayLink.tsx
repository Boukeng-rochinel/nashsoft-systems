import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'

/** Secondary hero action: outlined play circle + label (white, for photo heroes). */
export function PlayLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="group inline-flex items-center gap-3 self-start font-display text-[0.95rem] font-medium text-white sm:self-auto">
      <span
        aria-hidden
        className="inline-flex size-10 items-center justify-center rounded-full border-[1.5px] border-white/80 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-navy"
      >
        <Play className="ml-0.5 size-4 fill-current" />
      </span>
      {children}
    </Link>
  )
}
