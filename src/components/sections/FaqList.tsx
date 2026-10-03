import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Faq } from '@/data/contact'
import { cn } from '@/lib/cn'

/** Accessible disclosure list: one answer open at a time, first one open by default. */
export function FaqList({ items, className }: { items: Faq[]; className?: string }) {
  const uid = useId()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className={cn('divide-y divide-line rounded-2xl border border-line bg-white shadow-card', className)}>
      {items.map((faq, i) => {
        const expanded = open === i
        const panelId = `${uid}-panel-${i}`
        const buttonId = `${uid}-button-${i}`
        return (
          <li key={faq.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-display text-[0.95rem] font-semibold text-navy transition-colors hover:text-brand sm:px-6"
              >
                {faq.question}
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                    expanded ? 'rotate-45 border-brand bg-brand text-white' : 'border-line-strong text-slate',
                  )}
                >
                  <Plus className="size-3.5" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[0.9rem] leading-relaxed text-slate sm:px-6">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
