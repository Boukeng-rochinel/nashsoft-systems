import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { GalleryItem, ProjectTheme } from '@/types'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { Laptop, Phone } from '@/components/visuals/Devices'

interface LightboxProps {
  items: GalleryItem[]
  theme: ProjectTheme
  title: string
  /** Index of the open item, or null when closed. */
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

/** Accessible modal gallery: focus trap, Escape to close, ←/→ to navigate. */
export function Lightbox({ items, theme, title, index, onClose, onNavigate }: LightboxProps) {
  const dialog = useRef<HTMLDivElement>(null)
  const open = index !== null
  const close = useCallback(() => onClose(), [onClose])
  useLockBodyScroll(open)
  useFocusTrap(dialog, open, close)

  const go = useCallback(
    (delta: number) => {
      if (index === null) return
      onNavigate((index + delta + items.length) % items.length)
    },
    [index, items.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go])

  const item = index !== null ? items[index] : null

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-md" onClick={onClose} aria-hidden />
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={`Galerie ${title} — ${item.title}`}
            tabIndex={-1}
            className="relative flex w-full max-w-5xl flex-col items-center outline-none"
          >
            <div className="mb-4 flex w-full items-center justify-between gap-4 text-white">
              <p className="text-sm text-slate-300" aria-live="polite">
                <span className="font-display font-semibold text-white">{item.title}</span>
                <span className="ml-2 text-slate-400">
                  {index! + 1} / {items.length}
                </span>
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer la galerie"
                className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="flex w-full flex-col items-center"
              >
                {/* Sized by viewport height as well as width so the device, caption and arrows always fit on screen. */}
                <div className={item.device === 'phone' ? 'w-[min(60vw,280px,calc((100dvh-15rem)*0.48))]' : 'w-[min(100%,56rem,calc((100dvh-15rem)*1.5))]'}>
                  {item.device === 'phone' ? (
                    <Phone variant={item.variant} theme={theme} title={title} />
                  ) : (
                    <Laptop variant={item.variant} theme={theme} title={title} />
                  )}
                </div>
                <figcaption className="mt-6 max-w-xl text-center text-sm text-slate-300">{item.caption}</figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Image précédente"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan/60 hover:bg-white/10"
              >
                <ChevronLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Image suivante"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-cyan/60 hover:bg-white/10"
              >
                <ChevronRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
