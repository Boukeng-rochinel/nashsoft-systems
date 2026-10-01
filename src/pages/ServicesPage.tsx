import { BrainCircuit, Cloud, Globe, MessageSquare, Smartphone, Sparkles } from 'lucide-react'
import { services } from '@/data/services'
import { processSteps } from '@/data/site'
import { technologies, getTechnology } from '@/data/technologies'
import { themes } from '@/data/themes'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { HeroStage } from '@/components/sections/HeroStage'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { TechnologyCloud } from '@/components/sections/TechnologyCloud'
import { CTABand } from '@/components/sections/CTABand'
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'
import { GlassPanel } from '@/components/visuals/GlassPanel'
import { FloatingCard } from '@/components/visuals/FloatingCard'
import { Laptop } from '@/components/visuals/Devices'
import { BrandN } from '@/components/visuals/BrandN'

const stack = ['React', 'Next.js', 'Node.js', 'Flutter', 'Python', 'PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'AWS'].map(getTechnology)

/** Five-step delivery shown in the Services design. */
const deliverySteps = [processSteps[0], processSteps[1], processSteps[2], processSteps[4], { ...processSteps[5], title: 'Suivi' }]

export default function ServicesPage() {
  usePageMeta({
    title: 'Services',
    description:
      'Développement logiciel, web et mobile, IA, cloud & DevOps, data, cybersécurité, transformation digitale et conseil IT : les expertises de Nashsoft Systems.',
  })

  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title={
          <>
            Des solutions technologiques pour un <GradientText tone="dark">avenir meilleur</GradientText>
          </>
        }
        description="Nous offrons une gamme complète de services technologiques pour aider les entreprises et organisations à innover, se digitaliser et atteindre leurs objectifs."
        actions={
          <>
            <ButtonLink to="#catalogue" size="lg">
              Découvrir nos services
            </ButtonLink>
            <ButtonLink to="/contact" variant="outline-dark" size="lg" icon={MessageSquare} arrow={false}>
              Discuter avec notre équipe
            </ButtonLink>
          </>
        }
        visual={
          <HeroStage laptop="code" theme={themes.nashsoftDark} title="nashsoft">
            <GlassPanel
              className="top-[4%] right-0 hidden sm:block"
              items={[
                { label: 'Web Apps', icon: Globe },
                { label: 'Mobile Apps', icon: Smartphone },
                { label: 'Cloud Solutions', icon: Cloud },
                { label: 'AI & Data', icon: BrainCircuit },
              ]}
            />
            <FloatingCard tone="dark" icon={Sparkles} title="Build · Innovate · Transform" className="bottom-[4%] left-0" delay={0.3} />
          </HeroStage>
        }
      />

      {/* Catalogue */}
      <Section tone="light" id="catalogue" className="scroll-mt-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionTitle
            eyebrow="Nos services"
            title={
              <>
                Des expertises complètes pour vos <GradientText>projets</GradientText>
              </>
            }
          />
          <Reveal>
            <p className="max-w-lg text-[0.95rem] leading-relaxed text-slate lg:border-l lg:border-line lg:pl-8">
              Du concept au déploiement, nous vous accompagnons à chaque étape de votre transformation digitale avec des solutions sur mesure,
              performantes et durables.
            </p>
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
      <Section tone="navy" id="processus" className="scroll-mt-20" background={<AnimatedGrid tone="dark" />}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.6fr]">
          <Reveal className="relative mx-auto hidden w-full max-w-sm lg:block">
            <div aria-hidden className="absolute inset-0 rounded-full bg-brand/30 blur-3xl" />
            <div className="relative [transform:perspective(900px)_rotateX(48deg)_rotateZ(-28deg)]">
              <Laptop variant="dashboard" theme={themes.nashsoftDark} title="Nashsoft" />
            </div>
            <BrandN className="absolute -top-10 left-1/2 w-20 -translate-x-1/2" />
          </Reveal>
          <div>
            <SectionTitle
              tone="dark"
              eyebrow="Notre processus"
              title="Une méthode éprouvée pour des résultats concrets"
              description="Nous suivons un processus agile et collaboratif pour garantir la réussite de chaque projet, de l’idée initiale à la mise en production."
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
            eyebrow="Notre stack technologique"
            title="Des technologies modernes pour des solutions performantes"
            description="Nous utilisons les meilleures technologies du marché pour garantir des solutions rapides, sécurisées et évolutives."
          >
            <ButtonLink to="/demarrer-un-projet">Parler de votre projet</ButtonLink>
          </SectionTitle>
          <TechnologyCloud items={stack} tone="light" />
        </div>
        <p className="sr-only">Technologies maîtrisées : {technologies.map((t) => t.name).join(', ')}.</p>
      </Section>

      <CTABand eyebrow="Prêt à réaliser votre projet ?" title="Transformons vos idées en solutions digitales." description="Parlons de votre projet et trouvons ensemble la meilleure approche." />
    </>
  )
}
