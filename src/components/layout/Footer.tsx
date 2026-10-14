import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { footerNav } from '@/data/navigation'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/ui/Logo'
import { Container } from '@/components/ui/Container'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { SocialIcons } from './SocialIcons'

function Column({ title, dark, children }: { title: string; dark: boolean; children: ReactNode }) {
  return (
    <div>
      <h2 className={cn('text-[0.72rem] font-semibold tracking-[0.14em] uppercase', dark ? 'text-slate-400' : 'text-slate')}>{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  )
}

/**
 * Minimal footer: newsletter band, four aligned columns (brand · navigation ·
 * services · contact) and a slim legal bar. Same container as the header.
 */
export function Footer({ tone }: { tone: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const { pathname } = useLocation()
  const year = new Date().getFullYear()

  const link = cn('text-[0.9rem] transition-colors', dark ? 'text-slate-300 hover:text-white' : 'text-navy/75 hover:text-brand')
  const muted = dark ? 'text-slate-400' : 'text-slate'
  const divider = dark ? 'border-white/[0.08]' : 'border-line'
  const icon = cn('size-4 shrink-0', dark ? 'text-brand-300' : 'text-brand')

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <footer data-theme={tone} className={cn(dark ? 'bg-navy-950 text-slate-300' : 'border-t border-line bg-white text-ink')}>
      {/* Newsletter band */}
      <Container>
        <div className={cn('flex flex-col gap-6 border-b py-10 md:flex-row md:items-center md:justify-between', divider)}>
          <div>
            <p className={cn('font-display text-lg font-semibold', dark ? 'text-white' : 'text-navy')}>Restez informé</p>
            <p className={cn('mt-1 text-[0.9rem]', muted)}>Nos actualités et dernières réalisations, une fois par mois.</p>
          </div>
          <div className="w-full md:max-w-sm">
            <NewsletterForm tone={tone} />
          </div>
        </div>
      </Container>

      {/* Columns */}
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12">
        <div>
          <Logo tone={dark ? 'dark' : 'light'} />
          <p className={cn('mt-5 max-w-xs text-[0.9rem] leading-relaxed', muted)}>
            Entreprise technologique basée à {site.foundedIn}. Nous concevons des logiciels, plateformes et solutions digitales pour les entreprises et
            organisations.
          </p>
          <SocialIcons tone={tone} className="mt-6" />
        </div>

        <nav aria-label="Pied de page">
          <Column title="Navigation" dark={dark}>
            <ul className="space-y-2.5">
              {footerNav.navigation.map((l) => {
                const current = isCurrent(l.href)
                return (
                  <li key={l.href}>
                    <Link to={l.href} aria-current={current ? 'page' : undefined} className={cn(link, current && (dark ? 'text-brand-300' : 'text-brand'))}>
                      {l.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </Column>
        </nav>

        <Column title="Services" dark={dark}>
          <ul className="space-y-2.5">
            {footerNav.services.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className={link}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Contact" dark={dark}>
          <ul className="space-y-3.5 text-[0.9rem]">
            <li className={cn('flex items-center gap-3', dark ? 'text-slate-300' : 'text-navy/75')}>
              <MapPin aria-hidden className={icon} />
              {site.contact.city}
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden className={icon} />
              <a href={`mailto:${site.contact.email}`} className={cn(link, 'break-all')}>
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden className={icon} />
              <a href={site.contact.phoneHref} className={cn(link, 'whitespace-nowrap')}>
                {site.contact.phone}
              </a>
            </li>
          </ul>
          <p className={cn('mt-5 text-[0.8rem]', muted)}>{site.contact.hours}</p>
        </Column>
      </Container>

      {/* Legal bar — bottom padding leaves room for the floating chat button. */}
      <Container>
        <div className={cn('flex flex-col gap-3 border-t pt-6 pb-24 text-[0.8rem] sm:flex-row sm:items-center sm:justify-between lg:pb-8', divider, muted)}>
          <p>© {year} Nashsoft Systems. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className={cn('transition-colors', dark ? 'hover:text-white' : 'hover:text-brand')}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
