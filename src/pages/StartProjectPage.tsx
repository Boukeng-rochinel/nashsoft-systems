import { useSearchParams } from 'react-router-dom'
import { ArrowRight, ClipboardList, Phone } from 'lucide-react'
import { site } from '@/data/site'
import { faqs, nextSteps, startProjectHighlights, startProjectReasons } from '@/data/contact'
import { isProjectType } from '@/lib/validation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/cn'
import { glassButton } from '@/lib/styles'
import { pageSeo } from '@/data/seo'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AccentText } from '@/components/ui/AccentText'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { FaqList } from '@/components/sections/FaqList'
import { ContactForm } from '@/components/forms/ContactForm'
import { t } from '@/i18n'

export default function StartProjectPage() {
  usePageMeta(pageSeo.startProject)
  const [params] = useSearchParams()
  const type = params.get('type')

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Démarrer un projet' }]}
        eyebrow={t('Démarrer un projet')}
        title={
          <>{t('Transformons votre idée en')}{' '}<AccentText>{t('solution digitale.')}</AccentText>
          </>
        }
        description={t('Vous avez un projet en tête ? Nous sommes là pour vous accompagner de la conception à la mise en production. Remplissez le formulaire ci-dessous et notre équipe vous recontactera rapidement.')}
        highlights={startProjectHighlights}
        image="/images/hero-contact.webp"
      />

      {/* Why us + form, side by side (reference design) */}
      <Section tone="dark" id="formulaire" className="scroll-mt-20">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <h2 className="text-2xl font-bold text-white sm:text-[1.7rem]">{t('Pourquoi')}{' '}<AccentText tone="dark">{t('nous choisir ?')}</AccentText>
            </h2>
            <ul className="mt-8 grid gap-7 sm:grid-cols-2">
              {startProjectReasons.map((r) => (
                <li key={r.title}>
                  {r.icon && (
                    <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-xl bg-brand text-white">
                      <r.icon className="size-5" strokeWidth={1.8} />
                    </span>
                  )}
                  <h3 className="mt-4 font-display text-[1.02rem] font-semibold text-white">{t(r.title)}</h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-slate-300">{t(r.description)}</p>
                </li>
              ))}
            </ul>
            <a
              href={site.contact.phoneHref}
              className={cn('group mt-auto flex items-center gap-4 rounded-2xl p-5 transition-colors max-lg:mt-10 lg:mt-10', glassButton)}
            >
              <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Phone className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display font-semibold">{t('Vous préférez en parler de vive voix ?')}</span>
                <span className="block text-[0.82rem] text-white/85">{t('Appelez-nous au')}{' '}{t(site.contact.phone)} · {t(site.contact.hours)}
                </span>
              </span>
              <span aria-hidden className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-4" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-white/10 bg-navy-900/70 p-6 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-sm sm:p-8">
            <div className="mb-7 flex items-start gap-4">
              <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand-300 ring-1 ring-brand/30">
                <ClipboardList className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white">{t('Formulaire de projet')}</h2>
                <p className="mt-1 text-[0.85rem] text-slate-300">{t('Quelques informations suffisent : nous revenons vers vous sous 24 h ouvrées.')}</p>
              </div>
            </div>
            <ContactForm tone="dark" defaultProjectType={isProjectType(type) ? type : undefined} />
          </Reveal>
        </div>
      </Section>

      {/* What happens next */}
      <Section tone="light">
        <SectionTitle
          eyebrow={t('Et ensuite ?')}
          title={
            <>{t('De votre message au')}{' '}<AccentText>{t('lancement')}</AccentText>
            </>
          }
          description={t('Un processus simple et transparent, sans engagement jusqu’à la validation du devis.')}
        />
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nextSteps.map((step, i) => (
            <RevealItem key={step.title}>
              <div className="relative h-full rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover">
                <div className="flex items-center justify-between">
                  <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <step.icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="font-display text-sm font-bold text-brand/40 tabular-nums">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-[1.02rem] font-semibold text-navy">{t(step.title)}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-slate">{t(step.description)}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle
            eyebrow={t('Questions fréquentes')}
            title={t('Tout ce qu’il faut savoir avant de démarrer')}
            description={t('Une autre question ? Notre équipe vous répond directement.')}
          >
            <ButtonLink to="/contact" variant="secondary">{t('Nous contacter')}</ButtonLink>
          </SectionTitle>
          <Reveal>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
