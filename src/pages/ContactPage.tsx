import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { site } from '@/data/site'
import { fadeUp, stagger } from '@/lib/motion'
import { useTheme } from '@/hooks/useTheme'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { cn } from '@/lib/cn'
import { Container } from '@/components/ui/Container'
import { AccentText } from '@/components/ui/AccentText'
import { Reveal } from '@/components/ui/Reveal'
import { ContactMessageForm } from '@/components/forms/ContactMessageForm'
import { MapCard } from '@/components/sections/MapCard'
import { PageHero } from '@/components/sections/PageHero'
import { t } from '@/i18n'

interface InfoItem {
  title: string
  lines: [string, string]
  icon: LucideIcon
  href?: string
}

const info: InfoItem[] = [
  { title: 'Adresse', lines: [site.contact.city, 'Siège social'], icon: MapPin },
  { title: 'Téléphone', lines: [site.contact.phone, 'Lun – Ven, 8h – 18h'], icon: Phone, href: site.contact.phoneHref },
  { title: 'Email', lines: [site.contact.email, 'Réponse sous 24 h'], icon: Mail, href: `mailto:${site.contact.email}` },
  { title: 'Horaires', lines: ['Lun – Ven : 8h – 18h', 'Heure locale (WAT)'], icon: Clock },
]

export default function ContactPage() {
  usePageMeta(pageSeo.contact)
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <>
    <PageHero
      breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Contact' }]}
      eyebrow={t('Contactez-nous')}
      image="/images/hero-contact.webp"
      title={
        <>{t('Nous sommes là pour vous')}{' '}<AccentText>{t('accompagner')}</AccentText>
        </>
      }
      description={t('Une question, un projet ou simplement envie d’échanger ? Notre équipe est à votre écoute. Remplissez le formulaire ou utilisez nos coordonnées ci-dessous.')}
    />
    <section data-theme={theme} className={cn('relative isolate overflow-hidden', dark ? 'bg-navy-950' : 'bg-[#f7f9fc]')}>
      <Container className="grid items-start gap-10 py-14 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:gap-10 xl:gap-14">
        {/* Left: coordinates, map */}
        <div>
          <motion.div variants={stagger(0.08, 0.05)} initial="hidden" animate="show">
            <motion.ul variants={fadeUp} className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-[1fr_1fr_1.3fr_1fr]">
              {info.map((item) => (
                <li key={item.title} className="min-w-0">
                  <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand on-dark:bg-white/[0.06] on-dark:text-brand-300">
                    <item.icon className="size-5" strokeWidth={1.9} />
                  </span>
                  <h2 className="mt-4 font-display text-[1rem] font-semibold text-navy on-dark:text-white">{t(item.title)}</h2>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={cn(
                        'mt-1.5 block text-[0.85rem] transition-colors hover:text-brand max-sm:break-all on-dark:hover:text-brand-300',
                        item.title === 'Email' ? 'font-semibold text-navy sm:whitespace-nowrap on-dark:text-white' : 'text-slate on-dark:text-slate-300',
                      )}
                    >
                      {t(item.lines[0])}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-[0.85rem] text-slate on-dark:text-slate-300">{t(item.lines[0])}</p>
                  )}
                  <p className="mt-0.5 text-[0.8rem] text-slate/80 on-dark:text-slate-400">{t(item.lines[1])}</p>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <Reveal delay={0.1}>
            <MapCard className="mt-10" />
          </Reveal>
        </div>

        {/* Right: message form */}
        <Reveal
          delay={0.15}
          className="rounded-2xl border border-line bg-white p-6 shadow-[0_30px_70px_-40px_rgb(6_20_38/0.3)] sm:p-9 lg:sticky lg:top-28 on-dark:border-white/10 on-dark:bg-navy-900/70 on-dark:shadow-none"
        >
          <p className="inline-flex rounded-md bg-brand-50 px-2 py-1 text-[0.65rem] font-bold tracking-[0.14em] text-navy/80 uppercase on-dark:bg-white/[0.06] on-dark:text-brand-300">{t('Écrivez-nous')}</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy on-dark:text-white">{t('Envoyez-nous un message')}</h2>
          <p className="mt-2 mb-8 text-[0.88rem] text-slate on-dark:text-slate-300">{t('Nous serons ravis de vous répondre dans les plus brefs délais.')}</p>
          <ContactMessageForm />
        </Reveal>
      </Container>
    </section>
    </>
  )
}
