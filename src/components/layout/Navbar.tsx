import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu } from 'lucide-react'
import type { NavItem } from '@/types'
import { primaryNav, START_PROJECT_HREF } from '@/data/navigation'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

export type NavTone = 'light' | 'dark'

const isActive = (pathname: string, item: NavItem) =>
  item.href === '/'
    ? pathname === '/'
    : pathname === item.href || pathname.startsWith(`${item.href}/`) || (item.children?.some((c) => pathname.startsWith(c.href)) ?? false)

/**
 * Open state scoped to the pathname it was opened on:
 * navigating elsewhere closes it without a state-syncing effect.
 */
function useRouteScopedToggle() {
  const { pathname } = useLocation()
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) =>
      setOpenOn((prevPath) => {
        const prev = prevPath === pathname
        const value = typeof next === 'function' ? next(prev) : next
        return value ? pathname : null
      }),
    [pathname],
  )
  return [open, setOpen] as const
}

function Dropdown({ item, tone, active }: { item: NavItem; tone: NavTone; active: boolean }) {
  const [open, setOpen] = useRouteScopedToggle()
  const timer = useRef<number | undefined>(undefined)
  const wrapper = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const dark = tone === 'dark'
  const wide = (item.children?.length ?? 0) > 4

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        wrapper.current?.querySelector('button')?.focus()
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, setOpen])

  const show = () => {
    window.clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    timer.current = window.setTimeout(() => setOpen(false), 140)
  }

  return (
    <div ref={wrapper} className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'relative flex items-center gap-1 px-1 py-2 text-[0.85rem] font-medium transition-colors',
          active ? (dark ? 'text-cyan' : 'text-brand') : dark ? 'text-slate-200 hover:text-white' : 'text-navy/80 hover:text-brand',
        )}
      >
        {item.label}
        <ChevronDown aria-hidden className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')} />
        {active && <ActiveBar tone={tone} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn('absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3', wide ? 'w-[640px]' : 'w-[320px]')}
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_30px_60px_-20px_rgb(6_20_38/0.35)]">
              <ul className={cn('grid gap-1', wide && 'grid-cols-2')}>
                {item.children?.map((child) => (
                  <li key={child.href}>
                    <Link
                      to={child.href}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-light focus-visible:bg-light"
                    >
                      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <child.icon aria-hidden className="size-[18px]" strokeWidth={1.8} />
                      </span>
                      <span>
                        <span className="block font-display text-sm font-semibold text-navy">{child.label}</span>
                        <span className="mt-0.5 block text-xs leading-snug text-slate">{child.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {wide && (
                <Link
                  to={item.href}
                  className="mt-1 flex items-center justify-between rounded-xl bg-light px-4 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand-50"
                >
                  Voir tous nos services
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ActiveBar({ tone }: { tone: NavTone }) {
  return (
    <motion.span
      layoutId="nav-active"
      className={cn('absolute right-1 -bottom-[1px] left-1 h-0.5 rounded-full', tone === 'dark' ? 'bg-cyan' : 'bg-brand')}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    />
  )
}

export function Navbar({ tone }: { tone: NavTone }) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)
  const [menuOpen, setMenuOpen] = useRouteScopedToggle()
  const dark = tone === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      data-theme={dark ? 'dark' : 'light'}
      className={cn(
        'sticky top-0 z-40 transition-[background-color,box-shadow,border-color] duration-300',
        dark ? 'border-b border-white/[0.06] bg-navy-950/90 backdrop-blur-xl' : 'border-b bg-white/85 backdrop-blur-xl',
        !dark && (scrolled ? 'border-line shadow-[0_6px_24px_-16px_rgb(6_20_38/0.25)]' : 'border-transparent'),
        dark && scrolled && 'shadow-[0_10px_30px_-16px_rgb(0_0_0/0.6)]',
      )}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-md bg-brand px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo tone={dark ? 'dark' : 'light'} />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-7">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item)
              return (
                <li key={item.label}>
                  {item.children ? (
                    <Dropdown item={item} tone={tone} active={active} />
                  ) : (
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      className={cn(
                        'relative block px-1 py-2 text-[0.85rem] font-medium transition-colors',
                        active ? (dark ? 'text-cyan' : 'text-brand') : dark ? 'text-slate-200 hover:text-white' : 'text-navy/80 hover:text-brand',
                      )}
                    >
                      {item.label}
                      {active && <ActiveBar tone={tone} />}
                    </NavLink>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Visibility on a wrapper: the button's own display class would override `hidden`. */}
          <span className="hidden sm:block">
            <ButtonLink to={START_PROJECT_HREF} size="md">
              Démarrer un projet
            </ButtonLink>
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Ouvrir le menu"
            className={cn(
              'inline-flex size-11 items-center justify-center rounded-xl border transition-colors lg:hidden',
              dark ? 'border-white/15 text-white hover:bg-white/10' : 'border-line text-navy hover:bg-light',
            )}
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  )
}
