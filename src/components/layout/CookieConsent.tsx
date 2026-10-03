import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { CONSENT_OPEN_EVENT, readConsent, saveConsent, type ConsentLevel } from '@/lib/consent'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/Button'

/**
 * Bottom-left consent card in the site's own visual language.
 * Non-modal: the page stays usable, but the choice is one click away.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(() => readConsent() === null)
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const titleId = useId()
  const dark = theme === 'dark'

  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener(CONSENT_OPEN_EVENT, reopen)
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen)
  }, [])

  const decide = (level: ConsentLevel) => {
    saveConsent(level)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="region"
          aria-labelledby={titleId}
          data-theme={theme}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, transition: { duration: 0.2 } }}
          className={cn(
            'fixed inset-x-3 bottom-3 z-[60] rounded-2xl border p-5 sm:inset-x-auto sm:bottom-5 sm:left-5 sm:w-[400px]',
            dark
              ? 'border-white/10 bg-navy-950/95 text-slate-300 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] backdrop-blur-xl'
              : 'border-line bg-white text-slate shadow-[0_24px_60px_-24px_rgb(6_20_38/0.35)]',
          )}
        >
          <div className="flex gap-3.5">
            <span
              aria-hidden
              className={cn(
                'inline-flex size-10 shrink-0 items-center justify-center rounded-xl',
                dark ? 'bg-white/5 text-cyan ring-1 ring-white/10' : 'bg-brand-50 text-brand',
              )}
            >
              <Cookie className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <h2 id={titleId} className={cn('font-display text-[0.95rem] font-semibold', dark ? 'text-white' : 'text-navy')}>
                Votre vie privée compte
              </h2>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed">
                Nous utilisons des cookies essentiels au fonctionnement du site et, avec votre accord, des cookies de mesure d’audience pour
                l’améliorer.{' '}
                <Link to="/confidentialite" className={cn('font-medium underline underline-offset-2', dark ? 'text-cyan hover:text-white' : 'text-brand hover:text-violet')}>
                  En savoir plus
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Button variant="secondary" size="sm" arrow={false} onClick={() => decide('essential')}>
              Essentiels uniquement
            </Button>
            <Button size="sm" arrow={false} onClick={() => decide('all')}>
              Tout accepter
            </Button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
