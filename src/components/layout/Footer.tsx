import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, CircleCheck, Lightbulb, Mail, MapPin, Phone, ShieldCheck, Users, type LucideIcon } from 'lucide-react'
import { footerNav } from '@/data/navigation'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { Logo } from '@/components/ui/Logo'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { SocialIcons } from './SocialIcons'

/** Slightly wider than the page container so five columns breathe, as in the reference design. */
const wrap = 'mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8'

const trust: Array<{ title: string; caption: string; icon: LucideIcon }> = [
  { title: 'Fiabilité', caption: 'de nos solutions', icon: ShieldCheck },
  { title: 'Innovation', caption: 'au quotidien', icon: Lightbulb },
  { title: 'Votre succès', caption: 'notre priorité', icon: Users },
]

function ColumnTitle({ children, dark, to }: { children: string; dark: boolean; to?: string }) {
  const inner = (
    <>
      {children}
      <ArrowRight aria-hidden className={cn('size-[18px] transition-transform group-hover:translate-x-1', dark ? 'text-cyan' : 'text-brand')} strokeWidth={2.2} />
    </>
  )
  return (
    <h2 className={cn('font-display text-[1.05rem] font-bold', dark ? 'text-white' : 'text-navy')}>
      {to ? (
        <Link to={to} className="group inline-flex items-center gap-2.5">
          {inner}
        </Link>
      ) : (
        <span className="inline-flex items-center gap-2.5">{inner}</span>
      )}
    </h2>
  )
}

export function Footer({ tone }: { tone: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const { pathname } = useLocation()
  const year = new Date().getFullYear()
  const muted = dark ? 'text-slate-400' : 'text-slate'
  const body = dark ? 'text-slate-300' : 'text-[#3c4a5f]'
  const linkHover = dark ? 'hover:text-cyan' : 'hover:text-brand'
  const iconBubble = cn('inline-flex size-10 shrink-0 items-center justify-center rounded-full', dark ? 'bg-white/[0.06] text-cyan' : 'bg-brand-50 text-navy')
  const divider = dark ? 'border-white/[0.08]' : 'border-line'

  const isCurrent = (href: string) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`))

  return (
    <footer data-theme={tone} className={cn('relative', dark ? 'bg-navy-950 text-slate-300' : 'border-t border-line bg-[#f9fbfe] text-ink')}>
      <div className={cn(wrap, 'grid gap-12 pt-16 pb-14 sm:grid-cols-2 lg:grid-cols-[1.75fr_0.7fr_1.1fr_1.1fr_1.45fr] lg:gap-6 lg:pt-20 xl:gap-10')}>
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo tone={dark ? 'dark' : 'light'} size="lg" />
          <p className={cn('mt-7 max-w-sm text-[0.95rem] leading-[1.75]', body)}>
            Entreprise technologique basée à {site.foundedIn}. Nous concevons des logiciels, plateformes et solutions digitales pour les entreprises et
            organisations.
          </p>
          <ul className="mt-8 flex flex-wrap gap-y-4 sm:flex-nowrap">
            {trust.map((t, i) => (
              <li key={t.title} className={cn('flex shrink-0 items-start gap-2 pr-2.5 whitespace-nowrap', i > 0 && cn('border-l pl-2.5', divider))}>
                <t.icon aria-hidden className={cn('mt-0.5 size-[18px] shrink-0', dark ? 'text-cyan' : 'text-brand')} strokeWidth={1.9} />
                <span className="text-[0.74rem] leading-snug">
                  <span className={cn('block font-semibold', dark ? 'text-white' : 'text-navy')}>{t.title}</span>
                  <span className={muted}>{t.caption}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <nav aria-label="Pied de page">
          <ColumnTitle dark={dark}>Navigation</ColumnTitle>
          <ul className="mt-6 space-y-3">
            {footerNav.navigation.map((l) => {
              const current = isCurrent(l.href)
              return (
                <li key={l.href} className="relative">
                  {current && <span aria-hidden className={cn('absolute top-1/2 -left-3 h-5 w-0.5 -translate-y-1/2 rounded-full', dark ? 'bg-cyan' : 'bg-brand')} />}
                  <Link
                    to={l.href}
                    aria-current={current ? 'page' : undefined}
                    className={cn('text-[0.95rem] transition-colors', current ? (dark ? 'text-cyan' : 'text-brand') : cn(body, linkHover))}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Services */}
        <div>
          <ColumnTitle dark={dark} to="/services">
            Nos services
          </ColumnTitle>
          <ul className="mt-6 space-y-3">
            {footerNav.services.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className={cn('text-[0.95rem] transition-colors', body, linkHover)}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <ColumnTitle dark={dark} to="/contact">
            Contact
          </ColumnTitle>
          <ul className={cn('mt-6 space-y-4 text-[0.95rem]', body)}>
            <li className="flex items-center gap-3">
              <span aria-hidden className={iconBubble}>
                <MapPin className="size-[18px]" />
              </span>
              {site.contact.city}
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden className={iconBubble}>
                <Mail className="size-[18px]" />
              </span>
              <a href={`mailto:${site.contact.email}`} className={cn('whitespace-nowrap transition-colors', linkHover)}>
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span aria-hidden className={iconBubble}>
                <Phone className="size-[18px]" />
              </span>
              <a href={site.contact.phoneHref} className={cn('whitespace-nowrap transition-colors', linkHover)}>
                {site.contact.phone}
              </a>
            </li>
          </ul>
          <div className={cn('mt-7 flex items-start gap-3 border-t pt-7', divider)}>
            <ShieldCheck aria-hidden className={cn('mt-0.5 size-6 shrink-0', dark ? 'text-cyan' : 'text-brand')} strokeWidth={1.9} />
            <p className="text-[0.82rem] leading-relaxed">
              <span className={cn('block font-semibold', dark ? 'text-white' : 'text-navy')}>Des solutions fiables</span>
              <span className={muted}>pour un avenir numérique meilleur.</span>
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <ColumnTitle dark={dark}>Newsletter</ColumnTitle>
          <p className={cn('mt-6 mb-6 max-w-xs text-[0.95rem] leading-relaxed', body)}>Restez informé de nos actualités et de nos dernières réalisations.</p>
          <NewsletterForm tone={tone} />
          <p className={cn('mt-5 flex items-start gap-2.5 text-[0.8rem] leading-relaxed', muted)}>
            <CircleCheck aria-hidden className={cn('mt-0.5 size-[18px] shrink-0 fill-current', dark ? 'text-cyan [&>path]:stroke-navy-950' : 'text-brand [&>path]:stroke-white')} />
            <span>
              En vous inscrivant, vous acceptez notre{' '}
              <Link to="/confidentialite" className={cn('font-medium', dark ? 'text-cyan hover:text-white' : 'text-brand hover:text-violet')}>
                politique de confidentialité
              </Link>
              .
            </span>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={wrap}>
        <div className={cn('flex flex-col gap-6 border-t pt-8 pb-28 lg:flex-row lg:items-center lg:justify-between', divider)}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link to="/" className="inline-flex items-center gap-3" aria-label="Nashsoft Systems — accueil">
              <img src={site.logo.mark} alt="" width={66} height={66} className="h-10 w-auto" />
              <span className={cn('font-display text-lg font-bold', dark ? 'text-white' : 'text-navy')}>Nashsoft Systems</span>
            </Link>
            <span aria-hidden className={cn('hidden h-10 border-l sm:block', divider)} />
            <p className={cn('text-[0.82rem]', muted)}>© {year} Nashsoft Systems. Tous droits réservés.</p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <SocialIcons tone={tone} />
            <p className={cn('text-[0.82rem] leading-snug sm:border-l sm:pl-8', divider, muted)}>
              Construisons ensemble
              <br />
              un avenir numérique.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
