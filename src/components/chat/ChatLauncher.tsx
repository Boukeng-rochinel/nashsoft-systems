import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/cn'

// The panel (and its logic) loads only when a visitor opens the chat — nothing extra on first paint.
const ChatPanel = lazy(() => import('./ChatPanel'))

export function ChatLauncher() {
  const [open, setOpen] = useState(false)
  const [teaser, setTeaser] = useState(true)
  const button = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    button.current?.focus()
  }, [])

  return (
    <>
      <AnimatePresence>
        {open && (
          <Suspense fallback={null}>
            <ChatPanel onClose={close} />
          </Suspense>
        )}
      </AnimatePresence>

      <div className="fixed right-4 bottom-4 z-50 flex items-center gap-3 sm:right-5 sm:bottom-5">
        <AnimatePresence>
          {teaser && !open && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0, transition: { delay: 2.5 } }}
              exit={{ opacity: 0, x: 10 }}
              className="hidden items-center gap-2 rounded-full border border-line bg-white py-2 pr-2 pl-4 text-sm font-medium text-navy shadow-float sm:flex"
            >
              Une question ? Demandez à Nash
              <button
                type="button"
                onClick={() => setTeaser(false)}
                aria-label="Masquer"
                className="inline-flex size-6 items-center justify-center rounded-full text-slate hover:bg-light"
              >
                <X aria-hidden className="size-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          ref={button}
          type="button"
          onClick={() => (open ? close() : (setOpen(true), setTeaser(false)))}
          aria-expanded={open}
          aria-label={open ? 'Fermer l’assistant' : 'Ouvrir l’assistant Nashsoft'}
          className={cn(
            'relative inline-flex size-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-[0_14px_34px_-10px_rgb(8_125_255/0.85)] transition-transform hover:scale-105',
            open && 'max-sm:hidden',
          )}
        >
          {!open && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand/30 [animation-duration:3s]" />}
          {open ? <X aria-hidden className="size-6" /> : <MessageCircle aria-hidden className="size-6" />}
        </button>
      </div>
    </>
  )
}
