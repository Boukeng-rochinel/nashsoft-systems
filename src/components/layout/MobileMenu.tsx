import { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Mail, MapPin, Phone, X } from 'lucide-react'
import { primaryNav, START_PROJECT_HREF } from '@/data/navigation'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { useLanguage } from '@/hooks/useLanguage'

/**
 * Rendered into <body>: the sticky header uses backdrop-filter, which makes it the
 * containing block for `position: fixed` descendants and would clip this overlay
 * to the 72px header bar.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const close = useCallback(() => onClose(), [onClose])
  const { t } = useLanguage()
  useLockBodyScroll(open)
  useFocusTrap(panel, open, close)

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            tabIndex={-1}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute inset-y-0 right-0 flex h-dvh w-full max-w-sm flex-col bg-white shadow-2xl outline-none"
            data-theme="light"
          >
            <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
              <Logo tone="light" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="inline-flex size-11 items-center justify-center rounded-xl border border-line text-navy hover:bg-light"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="min-h-0 flex-1 overscroll-contain overflow-y-auto px-4 py-4 sm:px-6">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } } }}
                className="space-y-1"
              >
                {primaryNav.map((item) => {
                  const isOpen = expanded === item.label
                  return (
                    <motion.li key={item.label} variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0 } }}>
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => setExpanded(isOpen ? null : item.label)}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left font-display text-base font-semibold text-navy hover:bg-light"
                          >
                            {t(item.label)}
                            <ChevronDown aria-hidden className={cn('size-4 text-slate transition-transform', isOpen && 'rotate-180')} />
                          </button>
                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <li>
                                  <NavLink to={item.href} end className="block rounded-lg py-2.5 pr-3 pl-6 text-sm font-semibold text-brand">
                                    Vue d’ensemble
                                  </NavLink>
                                </li>
                                {item.children
                                  .filter((c) => c.href !== item.href)
                                  .map((child) => (
                                    <li key={child.href}>
                                      <NavLink
                                        to={child.href}
                                        className={({ isActive }) =>
                                          cn(
                                            'flex items-center gap-3 rounded-lg py-2.5 pr-3 pl-6 text-sm',
                                            isActive ? 'bg-brand-50 text-brand' : 'text-slate hover:bg-light hover:text-navy',
                                          )
                                        }
                                      >
                                        <child.icon aria-hidden className="size-4 shrink-0" />
                                        {child.label}
                                      </NavLink>
                                    </li>
                                  ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <NavLink
                          to={item.href}
                          end={item.href === '/'}
                          className={({ isActive }) =>
                            cn(
                              'block rounded-xl px-3 py-3 font-display text-base font-semibold',
                              isActive ? 'bg-brand-50 text-brand' : 'text-navy hover:bg-light',
                            )
                          }
                        >
                          {t(item.label)}
                        </NavLink>
                      )}
                    </motion.li>
                  )
                })}
              </motion.ul>
            </nav>

            <div className="shrink-0 space-y-4 border-t border-line bg-light px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6">
              <ButtonLink to={START_PROJECT_HREF} className="w-full" size="lg">
                {t('Démarrer un projet')}
              </ButtonLink>
              <ul className="space-y-2 text-sm text-slate">
                <li className="flex items-center gap-2">
                  <Mail aria-hidden className="size-4 text-brand" />
                  <a href={`mailto:${site.contact.email}`} className="hover:text-brand">
                    {site.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone aria-hidden className="size-4 text-brand" />
                  <a href={site.contact.phoneHref} className="hover:text-brand">
                    {site.contact.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin aria-hidden className="size-4 text-brand" />
                  {site.contact.city}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
