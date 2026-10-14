import { MessageSquare } from 'lucide-react'
import { services } from '@/data/services'
import { processSteps } from '@/data/site'
import { technologies, getTechnology } from '@/data/technologies'
import { themes } from '@/data/themes'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AccentText } from '@/components/ui/AccentText'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { TechnologyCloud } from '@/components/sections/TechnologyCloud'
import { CTABand } from '@/components/sections/CTABand'
import { Laptop } from '@/components/visuals/Devices'
import { BrandN } from '@/components/visuals/BrandN'
import { t as tr } from '@/i18n'

const stack = ['React', 'Next.js', 'Node.js', 'Flutter', 'Python', 'PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'AWS'].map(getTechnology)

/** Five-step delivery shown in the Services design. */
const deliverySteps = [processSteps[0], processSteps[1], processSteps[2], processSteps[4], { ...processSteps[5], title: 'Suivi' }]

export default function ServicesPage() {
  usePageMeta(pageSeo.services)

  return (
    <>
      <PageHero
        eyebrow={tr('Nos services')}
        title={
          <>{tr('Des solutions technologiques pour un')}{' '}<AccentText>{tr('avenir meilleur')}</AccentText>
          </>
        }
        description={tr('Nous offrons une gamme complète de services technologiques pour aider les entreprises et organisations à innover, se digitaliser et atteindre leurs objectifs.')}
        actions={
          <>
            <ButtonLink to="#catalogue" size="lg">{tr('Découvrir nos services')}</ButtonLink>
            <ButtonLink to="/contact" variant="secondary" size="lg" icon={MessageSquare} arrow={false}>{tr('Discuter avec notre équipe')}</ButtonLink>
          </>
        }
        image="/images/hero-services.webp"
      />

      {/* Catalogue */}
      <Section tone="light" id="catalogue" className="scroll-mt-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionTitle
            eyebrow={tr('Nos services')}
            title={
              <>{tr('Des expertises complètes pour vos')}{' '}<AccentText>{tr('projets')}</AccentText>
              </>
            }
          />
          <Reveal>
            <p className="max-w-lg text-[0.95rem] leading-relaxed text-slate lg:border-l lg:border-line lg:pl-8">{tr('Du concept au déploiement, nous vous accompagnons à chaque étape de votre transformation digitale avec des solutions sur mesure, performantes et durables.')}</p>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <ServiceCard service={service} variant="row" showTech />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Method */}
      <Section tone="navy" id="processus" className="scroll-mt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Reveal className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div className="relative [transform:perspective(900px)_rotateX(48deg)_rotateZ(-28deg)]">
              <Laptop variant="dashboard" theme={themes.nashsoftDark} title={tr('Nashsoft')} />
            </div>
            <BrandN className="absolute -top-10 left-1/2 w-20 -translate-x-1/2" />
          </Reveal>
          <div>
            <SectionTitle
              tone="dark"
              eyebrow={tr('Notre processus')}
              title={tr('Une méthode éprouvée pour des résultats concrets')}
              description={tr('Nous suivons un processus agile et collaboratif pour garantir la réussite de chaque projet, de l’idée initiale à la mise en production.')}
              className="max-w-2xl"
            />
            <ProcessSteps steps={deliverySteps} variant="dark" className="mt-10" />
          </div>
        </div>
      </Section>

      {/* Stack */}
      <Section tone="white">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.6fr]">
          <SectionTitle
            eyebrow={tr('Notre stack technologique')}
            title={tr('Des technologies modernes pour des solutions performantes')}
            description={tr('Nous utilisons les meilleures technologies du marché pour garantir des solutions rapides, sécurisées et évolutives.')}
          >
            <ButtonLink to="/demarrer-un-projet">{tr('Parler de votre projet')}</ButtonLink>
          </SectionTitle>
          <TechnologyCloud items={stack} tone="light" />
        </div>
        <p className="sr-only">{tr('Technologies maîtrisées :')}{' '}{tr(technologies.map((t) => t.name).join(', '))}.</p>
      </Section>

      <CTABand eyebrow={tr('Prêt à réaliser votre projet ?')} title={tr('Transformons vos idées en solutions digitales.')} description={tr('Parlons de votre projet et trouvons ensemble la meilleure approche.')} />
    </>
  )
}
