import { FolderKanban, Layers, Rocket } from 'lucide-react'
import { projects } from '@/data/projects'
import { START_PROJECT_HREF } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/sections/PageHero'
import { ProjectFilter } from '@/components/sections/ProjectFilter'
import { HeroImage } from '@/components/sections/HeroImage'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { CTABand } from '@/components/sections/CTABand'
import { FloatingCard } from '@/components/visuals/FloatingCard'

export default function ProjectsPage() {
  usePageMeta({
    title: 'Projets',
    description:
      'Applications web, mobiles, IA et logiciels d’entreprise : découvrez les réalisations de Nashsoft Systems — Restaurant Elegance, AutoFix Car, IGWork, Eduteklearn et plus.',
  })
  const [a, b] = projects

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Projets' }]}
        eyebrow="Nos réalisations"
        title={
          <>
            Des projets qui font <GradientText>la différence.</GradientText>
          </>
        }
        description="Web, mobile, intelligence artificielle, ERP : chaque projet est une réponse concrète à un besoin réel. Découvrez nos études de cas."
        actions={
          <>
            <ButtonLink to="#portfolio" size="lg">
              Explorer le portfolio
            </ButtonLink>
            <ButtonLink to={START_PROJECT_HREF} variant="secondary" size="lg">
              Démarrer un projet
            </ButtonLink>
          </>
        }
        highlights={[
          { title: `${projects.length} études de cas`, description: 'Détaillées', icon: FolderKanban },
          { title: '5 catégories', description: 'Web à Cloud', icon: Layers },
          { title: 'Du MVP', description: 'à la production', icon: Rocket },
        ]}
        visual={
          <HeroImage src="/images/hero-projects.webp" alt="Développeurs collaborant sur un projet logiciel">
            <FloatingCard icon={FolderKanban} title={a.title} description={a.type} className="-bottom-6 left-[6%]" delay={0.3} />
            <FloatingCard icon={Rocket} title={b.title} description={b.type} className="top-[8%] -right-2 hidden sm:block lg:-right-8" delay={0.5} />
          </HeroImage>
        }
      />

      <Section tone="light" id="portfolio" className="scroll-mt-20">
        <SectionTitle
          eyebrow="Portfolio"
          title={
            <>
              Nos <GradientText>études de cas</GradientText>
            </>
          }
          description="Filtrez par type de projet pour découvrir les réalisations les plus proches de votre besoin."
          className="mb-10"
        />
        <ProjectFilter projects={projects} />
      </Section>

      <Section tone="white">
        <SectionTitle
          align="center"
          eyebrow="Comment nous travaillons"
          title="Chaque projet suit la même exigence"
          description="Une méthode éprouvée, de la découverte à l’évolution continue du produit."
          className="mb-12"
        />
        <ProcessSteps variant="inline" />
      </Section>

      <CTABand eyebrow="Vous avez un projet en tête ?" title="Votre projet sera notre prochaine étude de cas." />
    </>
  )
}
