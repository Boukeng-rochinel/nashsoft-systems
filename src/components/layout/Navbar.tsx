import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Mail, MapPin, Menu, Phone } from 'lucide-react'
import type { NavGroup, NavItem, NavLinkItem, NavMenu } from '@/types'
import { primaryNav, START_PROJECT_HREF } from '@/data/navigation'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/ui/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useLanguage } from '@/hooks/useLanguage'

export type NavTone = 'light' | 'dark'

const ownsPath = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

/** A top-level item that owns the path wins, so a dropdown never lights up alongside it (e.g. /contact). */
const isActive = (pathname: string, item: NavItem) => {
  if (ownsPath(pathname, item.href)) return true
  if (primaryNav.some((other) => other !== item && ownsPath(pathname, other.href))) return false
  return item.children?.some((c) => ownsPath(pathname, c.href.split('?')[0])) ?? false
}

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

const panel = 'rounded-xl border border-line bg-white shadow-[0_24px_60px_-24px_rgb(6_20_38/0.35)]'

function MenuLinks({ group, current }: { group: NavGroup; current: string }) {
  return (
    <>
      <p className="font-display text-[0.92rem] font-semibold text-navy">{group.title}</p>
      <ul className={cn('mt-3.5 space-y-2.5', group.split && 'grid grid-cols-2 gap-x-10 gap-y-2.5 space-y-0')}>
        {group.links.map((link) => {
          const here = current === link.href
          return (
            <li key={link.href}>
              <Link
                to={link.href}
                aria-current={here ? 'page' : undefined}
                className={cn(
                  'block text-[0.85rem] leading-snug transition-colors hover:text-brand focus-visible:text-brand',
                  here ? 'font-medium text-brand' : 'text-slate',
                )}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function MenuCta({ link, className }: { link: NavLinkItem; className?: string }) {
  return (
    <Link
      to={link.href}
      className={cn(
        'group inline-flex items-center gap-1.5 rounded-full border border-brand/60 px-4 py-1.5 text-[0.82rem] font-semibold text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white',
        className,
      )}
    >
      {link.label}
      <ChevronRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}

/** Mega menu panel: text-first link columns, product showcase, or company card. */
function MegaMenu({ menu }: { menu: NavMenu }) {
  const { pathname, search } = useLocation()
  const current = `${pathname}${search}`

  if (menu.kind === 'products') {
    return (
      <div className={cn(panel, 'w-[min(1080px,calc(100vw-2rem))] px-9 py-8')}>
        <ul className="grid grid-cols-3 gap-x-10 gap-y-8">
          {menu.products.map((product) => (
            <li key={product.href} className="flex flex-col">
              <p className="flex items-center gap-2 font-display text-[0.95rem] font-semibold text-navy">
                {product.title}
                {product.isNew && (
                  <span className="rounded bg-gradient-to-r from-brand to-violet px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wide text-white uppercase">
                    Nouveau
                  </span>
                )}
              </p>
              <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-slate">{product.summary}</p>
              <p className="mt-2.5 text-xs text-slate">
                <span className="font-semibold text-navy/80">Secteur :</span> {product.meta}
              </p>
              <MenuCta link={{ label: 'Voir le produit', href: product.href }} className="mt-4 self-start" />
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
          <p className="text-[0.82rem] text-slate">Des produits conçus, développés et maintenus par nos équipes à Douala.</p>
          <Link to={menu.cta.href} className="group inline-flex items-center gap-1 text-[0.82rem] font-semibold text-brand">
            {menu.cta.label}
            <ChevronRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    )
  }

  if (menu.kind === 'brand') {
    return (
      <div className={cn(panel, 'flex px-8 py-7')}>
        <div className="w-[320px] pr-8">
          <Logo tone="light" asLink={false} />
          <p className="mt-4 text-[0.85rem] leading-relaxed text-slate">{site.description}</p>
          <ul className="mt-5 flex items-center gap-2.5">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                aria-label={`Écrire à ${site.contact.email}`}
                className="inline-flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors hover:bg-brand hover:text-white"
              >
                <Mail aria-hidden className="size-4" />
              </a>
            </li>
            <li>
              <a
                href={site.contact.phoneHref}
                aria-label={`Appeler le ${site.contact.phone}`}
                className="inline-flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors hover:bg-brand hover:text-white"
              >
                <Phone aria-hidden className="size-4" />
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                aria-label="Nous trouver à Douala"
                className="inline-flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand transition-colors hover:bg-brand hover:text-white"
              >
                <MapPin aria-hidden className="size-4" />
              </Link>
            </li>
          </ul>
        </div>
        {menu.groups.map((group) => (
          <div key={group.title} className="w-[170px] border-l border-line pl-8">
            <MenuLinks group={group} current={current} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn(panel, 'px-8 py-7')}>
      <div className="flex">
        {menu.columns.map((column, i) => (
          <div key={i} className={cn('min-w-0', i > 0 && 'ml-8 border-l border-line pl-8', column.some((g) => g.split) ? 'flex-1' : 'w-[200px]')}>
            {column.map((group, j) => (
              <div key={group.title} className={cn(j > 0 && 'mt-7')}>
                <MenuLinks group={group} current={current} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <MenuCta link={menu.cta} className="mt-7" />
    </div>
  )
}

function Dropdown({ item, tone, active }: { item: NavItem; tone: NavTone; active: boolean }) {
  const { t } = useLanguage()
  const [open, setOpen] = useRouteScopedToggle()
  const timer = useRef<number | undefined>(undefined)
  const wrapper = useRef<HTMLDivElement>(null)
  const panelId = useId()
  const dark = tone === 'dark'
  // Wide menus are centred on the header bar (so they never overflow); compact ones sit under their trigger.
  const wide = item.menu?.kind === 'products' || (item.menu?.kind === 'links' && item.menu.columns.length > 2)

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
    timer.current = window.setTimeout(() => setOpen(false), 180)
  }

  if (!item.menu) return null

  return (
    <div ref={wrapper} className={cn(!wide && 'relative')} onMouseEnter={show} onMouseLeave={hide}>
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
        {t(item.label)}
        <ChevronDown aria-hidden className={cn('size-3.5 transition-transform duration-300', open && 'rotate-180')} />
        {active && <ActiveBar tone={tone} />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'absolute left-1/2 z-50 -translate-x-1/2',
              wide ? 'top-[calc(100%-6px)] w-max max-w-[calc(100vw-2rem)]' : 'top-full w-max pt-3',
            )}
          >
            <MegaMenu menu={item.menu} />
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
  const { t } = useLanguage()

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
      <div className="relative mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo tone={dark ? 'dark' : 'light'} />

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-4 xl:gap-7">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item)
              return (
                <li key={item.label}>
                  {item.menu ? (
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
                      {t(item.label)}
                      {active && <ActiveBar tone={tone} />}
                    </NavLink>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          {/* Visibility on a wrapper: the button's own display class would override `hidden`. */}
          <span className="hidden sm:block">
            <ButtonLink to={START_PROJECT_HREF} size="md">
              {t('Démarrer un projet')}
            </ButtonLink>
          </span>
          <LanguageSwitcher tone={tone} />
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
