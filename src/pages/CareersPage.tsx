import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Check, ChevronDown, Clock, FileText, Handshake, Mail, MapPin, MessagesSquare, Search } from 'lucide-react'
import type { Job } from '@/types'
import { jobs, perks } from '@/data/jobs'
import { site } from '@/data/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { cn } from '@/lib/cn'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AccentText } from '@/components/ui/AccentText'
import { ButtonLink } from '@/components/ui/Button'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { CTABand } from '@/components/sections/CTABand'
import { t } from '@/i18n'

const hiringSteps = [
  { title: 'Candidature', description: 'Envoyez votre CV et quelques mots sur vos projets.', icon: FileText },
  { title: 'Premier échange', description: 'Un appel de 30 minutes pour faire connaissance.', icon: MessagesSquare },
  { title: 'Cas pratique', description: 'Un exercice court, proche de nos projets réels.', icon: Search },
  { title: 'Bienvenue', description: 'Proposition, intégration et mentorat dès le premier jour.', icon: Handshake },
]

const applyHref = (job?: Job) =>
  `mailto:${site.contact.careersEmail}?subject=${encodeURIComponent(job ? `Candidature — ${job.title}` : 'Candidature spontanée')}`

function JobItem({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className={cn('rounded-2xl border bg-white shadow-card transition-colors', open ? 'border-brand/40' : 'border-line hover:border-brand/30')}>
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full flex-col gap-3 p-5 text-left sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <span>
            <span className="block font-display text-lg font-semibold text-navy">{t(job.title)}</span>
            <span className="mt-1 block text-sm text-slate">{t(job.summary)}</span>
          </span>
          <span className="flex shrink-0 flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 font-semibold text-brand">
              <Briefcase aria-hidden className="size-3.5" />
              {t(job.type)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-light px-2.5 py-1 text-navy">
              <MapPin aria-hidden className="size-3.5" />
              {t(job.location)} · {t(job.mode)}
            </span>
            <ChevronDown aria-hidden className={cn('ml-1 size-5 text-slate transition-transform duration-300', open && 'rotate-180')} />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 border-t border-line p-5 sm:p-6 md:grid-cols-3">
              {[
                { title: 'Vos missions', items: job.responsibilities },
                { title: 'Profil recherché', items: job.requirements },
                { title: 'Un plus', items: job.niceToHave },
              ].map((block) => (
                <div key={block.title}>
                  <h4 className="eyebrow text-brand">{t(block.title)}</h4>
                  <ul className="mt-3 space-y-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-navy/85">
                        <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={2.5} />
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 border-t border-line p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="inline-flex items-center gap-2 text-sm text-slate">
                <Clock aria-hidden className="size-4" />{t('Niveau :')}{' '}{t(job.level)}
              </p>
              <ButtonLink to={applyHref(job)} external icon={Mail} arrow={false}>{t('Postuler')}</ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Careers: why join, open positions (accordion), hiring process and spontaneous application. */
export default function CareersPage() {
  usePageMeta(pageSeo.careers)

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Carrières' }]}
        eyebrow={t('Carrières')}
        title={
          <>{t('Construisons ensemble l’avenir')}{' '}<AccentText>{t('numérique.')}</AccentText>
          </>
        }
        description={t('Nous recherchons des esprits curieux et exigeants pour concevoir des produits utilisés par de vraies entreprises au Cameroun et au-delà.')}
        actions={
          <>
            <ButtonLink to="#postes" size="lg">{t('Voir les postes ouverts')}</ButtonLink>
            <ButtonLink to={applyHref()} external variant="secondary" size="lg" icon={Mail} arrow={false}>{t('Candidature spontanée')}</ButtonLink>
          </>
        }
        image="/images/hero-careers.webp"
      />

      <Section tone="white">
        <SectionTitle
          eyebrow={t('Pourquoi nous rejoindre')}
          title={t('Un cadre pour apprendre, livrer et grandir')}
          description={t('Chez Nashsoft Systems, chaque membre de l’équipe a un impact visible sur les produits que nous livrons.')}
          className="max-w-2xl"
        />
        <FeatureGrid items={perks} columns={3} className="mt-10" />
      </Section>

      <Section tone="light" id="postes" className="scroll-mt-20">
        <SectionTitle eyebrow={t('Postes ouverts')} title={t('Trouvez votre place dans l’équipe')} description={t('Cliquez sur un poste pour voir le détail des missions et du profil recherché.')} className="max-w-2xl" />
        <RevealGroup className="mt-10 space-y-4">
          {jobs.map((job) => (
            <RevealItem key={job.slug}>
              <JobItem job={job} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="white">
        <SectionTitle eyebrow={t('Recrutement')} title={t('Un processus simple et transparent')} description={t('Nous répondons à chaque candidature, en général sous une semaine.')} className="max-w-2xl" />
        <ProcessSteps steps={hiringSteps} variant="inline" cols="lg:grid-cols-4" className="mt-12" />
      </Section>

      <CTABand
        eyebrow={t('Pas de poste pour vous ?')}
        title={t('Envoyez-nous une candidature spontanée.')}
        description={t('Nous gardons chaque profil en tête pour nos prochains projets.')}
        cta={{ label: 'Écrire à l’équipe', href: applyHref() }}
      />
    </>
  )
}
