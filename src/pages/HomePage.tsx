import { featuredServices } from '@/data/services'
import { featuredProjects } from '@/data/projects'
import { coreStack } from '@/data/technologies'
import { usePageMeta } from '@/hooks/usePageMeta'
import { site } from '@/data/site'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { ButtonLink } from '@/components/ui/Button'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { HomeHero } from '@/components/sections/HomeHero'
import { Stats } from '@/components/sections/Stats'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { IndustrySelector } from '@/components/sections/IndustrySelector'
import { ProjectCard } from '@/components/sections/ProjectCard'
import { TechnologyCloud } from '@/components/sections/TechnologyCloud'
import { CTABand } from '@/components/sections/CTABand'
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'
import { Laptop } from '@/components/visuals/Devices'
import { BrandN } from '@/components/visuals/BrandN'
import { themes } from '@/data/themes'
import { industries } from '@/data/industries'

/** The homepage design features six sectors; the Solutions page shows all of them. */
const homeIndustries = industries.filter((i) => ['education', 'finance', 'sante', 'retail', 'logistique', 'gouvernement'].includes(i.slug))

export default function HomePage() {
  usePageMeta({ title: site.name, description: site.description })

  return (
    <>
      <HomeHero />

      {/* Key figures */}
      <section aria-label="Nashsoft Systems en chiffres" className="bg-white pb-6 md:pb-10">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <Stats variant="panel" />
        </div>
      </section>

      {/* Services */}
      <Section tone="white" id="services">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.75fr] lg:gap-14">
          <SectionTitle
            eyebrow="Nos services"
            title={
              <>
                Des services complets pour vos <GradientText>projets digitaux</GradientText>
              </>
            }
            description="Nous vous accompagnons à chaque étape de votre projet, de la conception à la mise en production, avec des solutions sur mesure et des technologies de pointe."
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <ButtonLink to="/services">Découvrir tous nos services</ButtonLink>
          </SectionTitle>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service) => (
              <RevealItem key={service.slug}>
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Process */}
      <Section tone="light" id="processus" className="scroll-mt-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.1fr] lg:items-center lg:gap-12">
          <SectionTitle
            eyebrow="Notre processus"
            title={
              <>
                Une approche structurée pour des résultats <GradientText>concrets</GradientText>
              </>
            }
            description="Nous suivons une méthodologie éprouvée pour transformer vos besoins en solutions logicielles fiables et performantes."
          >
            <ButtonLink to="/services#processus">Découvrir notre processus</ButtonLink>
          </SectionTitle>
          <ProcessSteps variant="inline" />
        </div>
      </Section>

      {/* Industry solutions */}
      <Section tone="white" id="solutions">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.1fr] lg:gap-12">
          <SectionTitle
            eyebrow="Nos solutions"
            title={
              <>
                Des solutions <GradientText>adaptées</GradientText> à chaque secteur <GradientText>d’activité</GradientText>
              </>
            }
            description="Nous développons des solutions sur mesure pour répondre aux besoins spécifiques de chaque industrie et accompagner votre transformation digitale."
            className="lg:pt-2"
          >
            <ButtonLink to="/solutions">Voir toutes nos solutions</ButtonLink>
          </SectionTitle>
          <IndustrySelector industries={homeIndustries} />
        </div>
      </Section>

      {/* Featured projects */}
      <Section tone="light" id="projets">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.1fr] lg:gap-12">
          <SectionTitle
            eyebrow="Nos projets"
            title="Des réalisations qui font la différence"
            description="Découvrez quelques-uns de nos projets qui illustrent notre expertise et notre engagement à créer des solutions innovantes."
          >
            <ButtonLink to="/projets">Voir tous les projets</ButtonLink>
          </SectionTitle>
          <RevealGroup className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project) => (
              <RevealItem key={project.slug}>
                <ProjectCard project={project} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Technology stack (dark band — rhythm) */}
      <Section tone="navy" background={<AnimatedGrid tone="dark" />}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <SectionTitle
              tone="dark"
              eyebrow="Notre stack tech"
              title={
                <>
                  Des technologies modernes pour des solutions <GradientText tone="dark">durables</GradientText>
                </>
              }
              description="Nous utilisons les meilleures technologies du marché pour garantir des solutions performantes, sécurisées et évolutives."
              className="max-w-2xl"
            />
            <TechnologyCloud items={coreStack} tone="dark" variant="pills" className="mt-9" />
          </div>
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <BrandN className="absolute -top-14 right-6 z-10 w-24" />
            <div aria-hidden className="absolute inset-0 rounded-full bg-brand/25 blur-3xl" />
            <div className="relative [transform:perspective(1200px)_rotateY(-16deg)_rotateX(8deg)]">
              <Laptop variant="analytics" theme={themes.nashsoftDark} title="Nashsoft" />
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
