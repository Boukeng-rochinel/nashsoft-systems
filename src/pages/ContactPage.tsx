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
    <section data-theme={theme} className={cn('relative isolate overflow-hidden', dark ? 'bg-navy-950' : 'bg-white')}>
      <Container className="py-14 md:py-20">
        {/* One card: coordinates + map on the left, message form on the right */}
        <Reveal className="grid overflow-hidden rounded-2xl border border-line bg-white shadow-card lg:grid-cols-[5fr_7fr] on-dark:border-white/10 on-dark:bg-navy-900/70 on-dark:shadow-none">
          <motion.div
            variants={stagger(0.06, 0.05)}
            initial="hidden"
            animate="show"
            className="flex min-w-0 flex-col border-b border-line bg-[#f7f9fc] p-6 sm:p-8 lg:border-r lg:border-b-0 on-dark:border-white/10 on-dark:bg-white/[0.02]"
          >
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-xl font-bold text-navy sm:text-2xl on-dark:text-white">{t('Parlez à notre équipe')}</h2>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-slate on-dark:text-slate-300">
                {t('Choisissez le canal qui vous convient : nous répondons à chaque demande sous 24 heures ouvrées.')}
              </p>
            </motion.div>

            <motion.dl variants={fadeUp} className="mt-8 space-y-5">
              {info.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span aria-hidden className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand ring-1 ring-line on-dark:bg-white/[0.06] on-dark:text-brand-300 on-dark:ring-white/10">
                    <item.icon className="size-[18px]" strokeWidth={1.9} />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-[0.75rem] font-medium text-slate on-dark:text-slate-400">{t(item.title)}</dt>
                    <dd className="mt-0.5 text-[0.92rem] font-semibold break-words text-navy on-dark:text-white">
                      {item.href ? (
                        <a href={item.href} className="transition-colors hover:text-brand on-dark:hover:text-brand-300">
                          {t(item.lines[0])}
                        </a>
                      ) : (
                        t(item.lines[0])
                      )}
                    </dd>
                    <dd className="text-[0.78rem] text-slate on-dark:text-slate-400">{t(item.lines[1])}</dd>
                  </div>
                </div>
              ))}
            </motion.dl>

            <motion.div variants={fadeUp} className="mt-8 lg:mt-auto lg:pt-8">
              <MapCard />
            </motion.div>
          </motion.div>

          <div className="p-6 sm:p-8 lg:p-10">
            <h2 className="font-display text-xl font-bold text-navy sm:text-2xl on-dark:text-white">{t('Envoyez-nous un message')}</h2>
            <p className="mt-2 mb-7 text-[0.9rem] text-slate on-dark:text-slate-300">{t('Nous serons ravis de vous répondre dans les plus brefs délais.')}</p>
            <ContactMessageForm />
          </div>
        </Reveal>
      </Container>
    </section>
    </>
  )
}
