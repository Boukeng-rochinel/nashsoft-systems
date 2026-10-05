import { useSearchParams } from 'react-router-dom'
import { ArrowRight, ClipboardList, Phone, Zap } from 'lucide-react'
import { site } from '@/data/site'
import { faqs, nextSteps, startProjectHighlights, startProjectReasons } from '@/data/contact'
import { isProjectType } from '@/lib/validation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { HeroImage } from '@/components/sections/HeroImage'
import { FaqList } from '@/components/sections/FaqList'
import { ContactForm } from '@/components/forms/ContactForm'
import { FloatingCard } from '@/components/visuals/FloatingCard'
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'

export default function StartProjectPage() {
  usePageMeta(pageSeo.startProject)
  const [params] = useSearchParams()
  const type = params.get('type')

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Démarrer un projet' }]}
        eyebrow="Démarrer un projet"
        title={
          <>
            Transformons votre idée en <GradientText>solution digitale.</GradientText>
          </>
        }
        description="Vous avez un projet en tête ? Nous sommes là pour vous accompagner de la conception à la mise en production. Remplissez le formulaire ci-dessous et notre équipe vous recontactera rapidement."
        highlights={startProjectHighlights}
        visual={
          <HeroImage src="/images/hero-contact.webp" alt="Ordinateur portable affichant du code sur un bureau, à côté d’une tasse Nashsoft">
            <FloatingCard icon={Zap} title="Réponse sous 24 h" description="Un chef de projet dédié" className="right-0 bottom-[6%]" delay={0.3} />
          </HeroImage>
        }
      />

      {/* Why us + form, side by side (reference design) */}
      <Section tone="dark" id="formulaire" className="scroll-mt-20" background={<AnimatedGrid tone="dark" />}>
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.15fr]">
          <Reveal className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <h2 className="text-2xl font-bold text-white sm:text-[1.7rem]">
              Pourquoi <GradientText tone="dark">nous choisir ?</GradientText>
            </h2>
            <ul className="mt-8 grid gap-7 sm:grid-cols-2">
              {startProjectReasons.map((r) => (
                <li key={r.title}>
                  {r.icon && (
                    <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-violet text-white shadow-glow">
                      <r.icon className="size-5" strokeWidth={1.8} />
                    </span>
                  )}
                  <h3 className="mt-4 font-display text-[1.02rem] font-semibold text-white">{r.title}</h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-slate-300">{r.description}</p>
                </li>
              ))}
            </ul>
            <a
              href={site.contact.phoneHref}
              className="group mt-auto flex items-center gap-4 rounded-2xl bg-gradient-to-r from-cyan via-brand to-violet p-5 text-white shadow-[0_20px_40px_-20px_rgb(8_125_255/0.9)] transition-transform hover:-translate-y-0.5 max-lg:mt-10 lg:mt-10"
            >
              <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Phone className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display font-semibold">Vous préférez en parler de vive voix ?</span>
                <span className="block text-[0.82rem] text-white/85">
                  Appelez-nous au {site.contact.phone} · {site.contact.hours}
                </span>
              </span>
              <span aria-hidden className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1">
                <ArrowRight className="size-4" />
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-white/10 bg-navy-900/70 p-6 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)] backdrop-blur-sm sm:p-8">
            <div className="mb-7 flex items-start gap-4">
              <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-cyan ring-1 ring-brand/30">
                <ClipboardList className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white">Formulaire de projet</h2>
                <p className="mt-1 text-[0.85rem] text-slate-300">Quelques informations suffisent : nous revenons vers vous sous 24 h ouvrées.</p>
              </div>
            </div>
            <ContactForm tone="dark" defaultProjectType={isProjectType(type) ? type : undefined} />
          </Reveal>
        </div>
      </Section>

      {/* What happens next */}
      <Section tone="light">
        <SectionTitle
          eyebrow="Et ensuite ?"
          title={
            <>
              De votre message au <GradientText>lancement</GradientText>
            </>
          }
          description="Un processus simple et transparent, sans engagement jusqu’à la validation du devis."
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
                <h3 className="mt-5 font-display text-[1.02rem] font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-slate">{step.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionTitle
            eyebrow="Questions fréquentes"
            title="Tout ce qu’il faut savoir avant de démarrer"
            description="Une autre question ? Notre équipe vous répond directement."
          >
            <ButtonLink to="/contact" variant="secondary">
              Nous contacter
            </ButtonLink>
          </SectionTitle>
          <Reveal>
            <FaqList items={faqs} />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
