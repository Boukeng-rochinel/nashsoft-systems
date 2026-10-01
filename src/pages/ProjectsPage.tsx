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
import { ProjectCover } from '@/components/sections/ProjectCover'
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
            Des projets qui font <GradientText tone="dark">la différence.</GradientText>
          </>
        }
        description="Web, mobile, intelligence artificielle, ERP : chaque projet est une réponse concrète à un besoin réel. Découvrez nos études de cas."
        actions={
          <>
            <ButtonLink to="#portfolio" size="lg">
              Explorer le portfolio
            </ButtonLink>
            <ButtonLink to={START_PROJECT_HREF} variant="outline-dark" size="lg">
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
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
            <div aria-hidden className="absolute inset-[10%] rounded-full bg-brand/30 blur-3xl" />
            <div className="absolute top-[4%] left-0 w-[72%] -rotate-3 overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
              <div className="aspect-[16/10]">
                <ProjectCover project={a} />
              </div>
            </div>
            <div className="absolute right-0 bottom-[4%] w-[66%] rotate-2 overflow-hidden rounded-2xl border border-cyan/30 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)]">
              <div className="aspect-[16/10]">
                <ProjectCover project={b} />
              </div>
            </div>
            <FloatingCard tone="dark" icon={FolderKanban} title={a.title} description={a.type} className="bottom-[2%] left-[2%]" delay={0.3} />
          </div>
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
