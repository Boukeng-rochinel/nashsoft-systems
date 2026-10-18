import { featuredServices } from '@/data/services'
import { featuredProjects } from '@/data/projects'
import { coreStack } from '@/data/technologies'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AccentText } from '@/components/ui/AccentText'
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
import { Laptop } from '@/components/visuals/Devices'
import { BrandN } from '@/components/visuals/BrandN'
import { themes } from '@/data/themes'
import { industries } from '@/data/industries'
import { t } from '@/i18n'

/** The homepage design features six sectors; the Solutions page shows all of them. */
const homeIndustries = industries.filter((i) => ['education', 'finance', 'sante', 'retail', 'logistique', 'gouvernement'].includes(i.slug))

export default function HomePage() {
  usePageMeta(pageSeo.home)

  return (
    <>
      <HomeHero />

      {/* Key figures */}
      <section aria-label={t('Nashsoft Systems en chiffres')} className="bg-white pb-6 md:pb-10">
        <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <Stats variant="panel" />
        </div>
      </section>

      {/* Services */}
      <Section tone="white" id="services">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.75fr] lg:gap-14">
          <SectionTitle
            eyebrow={t('Nos services')}
            title={
              <>{t('Des services complets pour vos')}{' '}<AccentText>{t('projets digitaux')}</AccentText>
              </>
            }
            description={t('Nous vous accompagnons à chaque étape de votre projet, de la conception à la mise en production, avec des solutions sur mesure et des technologies de pointe.')}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <ButtonLink to="/services">{t('Découvrir tous nos services')}</ButtonLink>
          </SectionTitle>
          {/* Hairline grid: 1px gaps over a line-coloured background draw the dividers. */}
          <RevealGroup className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
            {featuredServices.map((service, i) => (
              <RevealItem key={service.slug} className="bg-white">
                <ServiceCard service={service} variant="cell" index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Process */}
      <Section tone="light" id="processus" className="scroll-mt-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <SectionTitle
            eyebrow={t('Notre processus')}
            title={
              <>{t('Une approche structurée pour des résultats')}{' '}<AccentText>{t('concrets')}</AccentText>
              </>
            }
            description={t('Nous suivons une méthodologie éprouvée pour transformer vos besoins en solutions logicielles fiables et performantes.')}
            className="max-w-2xl"
          />
          <ButtonLink to="/services#processus" className="shrink-0 self-start lg:self-end">{t('Découvrir notre processus')}</ButtonLink>
        </div>
        <ProcessSteps variant="inline" className="mt-12 lg:mt-16" />
      </Section>

      {/* Industry solutions */}
      <Section tone="white" id="solutions">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.1fr] lg:gap-12">
          <SectionTitle
            eyebrow={t('Nos solutions')}
            title={
              <>{t('Des solutions')}{' '}<AccentText>{t('adaptées')}</AccentText>{' '}{t('à chaque secteur')}{' '}<AccentText>{t('d’activité')}</AccentText>
              </>
            }
            description={t('Nous développons des solutions sur mesure pour répondre aux besoins spécifiques de chaque industrie et accompagner votre transformation digitale.')}
            className="lg:pt-2"
          >
            <ButtonLink to="/solutions">{t('Voir toutes nos solutions')}</ButtonLink>
          </SectionTitle>
          <IndustrySelector industries={homeIndustries} />
        </div>
      </Section>

      {/* Featured projects */}
      <Section tone="light" id="projets">
        <div className="grid gap-10 lg:grid-cols-[1fr_2.1fr] lg:gap-12">
          <SectionTitle
            eyebrow={t('Nos projets')}
            title={t('Des réalisations qui font la différence')}
            description={t('Découvrez quelques-uns de nos projets qui illustrent notre expertise et notre engagement à créer des solutions innovantes.')}
          >
            <ButtonLink to="/projets">{t('Voir tous les projets')}</ButtonLink>
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
      <Section tone="navy">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <SectionTitle
              tone="dark"
              eyebrow={t('Notre stack tech')}
              title={
                <>{t('Des technologies modernes pour des solutions')}{' '}<AccentText>{t('durables')}</AccentText>
                </>
              }
              description={t('Nous utilisons les meilleures technologies du marché pour garantir des solutions performantes, sécurisées et évolutives.')}
              className="max-w-2xl"
            />
            <TechnologyCloud items={coreStack} tone="dark" variant="pills" className="mt-9" />
          </div>
          <div className="relative mx-auto hidden w-full max-w-md lg:block">
            <BrandN className="absolute -top-14 right-6 z-10 w-24" />
            <div className="relative [transform:perspective(1200px)_rotateY(-16deg)_rotateX(8deg)]">
              <Laptop variant="analytics" theme={themes.nashsoftDark} title={t('Nashsoft')} />
            </div>
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
