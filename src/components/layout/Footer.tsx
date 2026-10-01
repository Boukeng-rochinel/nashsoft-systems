import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { footerNav } from '@/data/navigation'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { SocialIcons } from './SocialIcons'

function Column({ title, links, dark }: { title: string; links: Array<{ label: string; href: string }>; dark: boolean }) {
  return (
    <div>
      <h2 className={cn('font-display text-sm font-semibold', dark ? 'text-white' : 'text-navy')}>{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link to={l.href} className={cn('text-sm transition-colors', dark ? 'text-slate-400 hover:text-cyan' : 'text-slate hover:text-brand')}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer({ tone }: { tone: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const year = new Date().getFullYear()
  const muted = dark ? 'text-slate-400' : 'text-slate'

  return (
    <footer data-theme={tone} className={cn('relative', dark ? 'bg-navy-950 text-slate-300' : 'border-t border-line bg-white text-ink')}>
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr_1.3fr] lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone={dark ? 'dark' : 'light'} />
          <p className={cn('mt-5 max-w-xs text-sm leading-relaxed', muted)}>
            Entreprise technologique basée à {site.foundedIn}. Nous concevons des logiciels, plateformes et solutions digitales pour les
            entreprises et organisations.
          </p>
        </div>

        <Column title="Navigation" links={footerNav.navigation} dark={dark} />
        <Column title="Nos services" links={footerNav.services} dark={dark} />

        <div>
          <h2 className={cn('font-display text-sm font-semibold', dark ? 'text-white' : 'text-navy')}>Contact</h2>
          <ul className={cn('mt-4 space-y-3 text-sm', muted)}>
            <li className="flex items-start gap-2.5">
              <MapPin aria-hidden className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-cyan' : 'text-navy')} />
              {site.contact.city}
            </li>
            <li className="flex items-start gap-2.5">
              <Mail aria-hidden className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-cyan' : 'text-navy')} />
              <a href={`mailto:${site.contact.email}`} className={dark ? 'hover:text-cyan' : 'hover:text-brand'}>
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone aria-hidden className={cn('mt-0.5 size-4 shrink-0', dark ? 'text-cyan' : 'text-navy')} />
              <a href={site.contact.phoneHref} className={dark ? 'hover:text-cyan' : 'hover:text-brand'}>
                {site.contact.phone}
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <SocialIcons tone={tone} />
          </div>
        </div>

        <div>
          <h2 className={cn('font-display text-sm font-semibold', dark ? 'text-white' : 'text-navy')}>Newsletter</h2>
          <p className={cn('mt-4 mb-4 text-sm leading-relaxed', muted)}>Restez informé de nos actualités et nos dernières réalisations.</p>
          <NewsletterForm tone={tone} />
        </div>
      </Container>

      <div className={cn('border-t', dark ? 'border-white/[0.07]' : 'border-line')}>
        <Container className={cn('flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between', muted)}>
          <p>© {year} Nashsoft Systems. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className={dark ? 'hover:text-cyan' : 'hover:text-brand'}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}
