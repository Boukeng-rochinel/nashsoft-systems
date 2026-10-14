import { FolderKanban, Layers, Rocket } from 'lucide-react'
import { projects } from '@/data/projects'
import { START_PROJECT_HREF } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AccentText } from '@/components/ui/AccentText'
import { ButtonLink } from '@/components/ui/Button'
import { PageHero } from '@/components/sections/PageHero'
import { ProjectFilter } from '@/components/sections/ProjectFilter'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { CTABand } from '@/components/sections/CTABand'
import { t } from '@/i18n'

export default function ProjectsPage() {
  usePageMeta(pageSeo.projects)

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Projets' }]}
        eyebrow={t('Nos réalisations')}
        title={
          <>{t('Des projets qui font')}{' '}<AccentText>{t('la différence.')}</AccentText>
          </>
        }
        description={t('Web, mobile, intelligence artificielle, ERP : chaque projet est une réponse concrète à un besoin réel. Découvrez nos études de cas.')}
        actions={
          <>
            <ButtonLink to="#portfolio" size="lg">{t('Explorer le portfolio')}</ButtonLink>
            <ButtonLink to={START_PROJECT_HREF} variant="secondary" size="lg">{t('Démarrer un projet')}</ButtonLink>
          </>
        }
        highlights={[
          { title: `${projects.length} études de cas`, description: 'Détaillées', icon: FolderKanban },
          { title: '5 catégories', description: 'Web à Cloud', icon: Layers },
          { title: 'Du MVP', description: 'à la production', icon: Rocket },
        ]}
        image="/images/hero-projects.webp"
      />

      <Section tone="light" id="portfolio" className="scroll-mt-20">
        <SectionTitle
          eyebrow={t('Portfolio')}
          title={
            <>{t('Nos')}{' '}<AccentText>{t('études de cas')}</AccentText>
            </>
          }
          description={t('Filtrez par type de projet pour découvrir les réalisations les plus proches de votre besoin.')}
          className="mb-10"
        />
        <ProjectFilter projects={projects} />
      </Section>

      <Section tone="white">
        <SectionTitle
          align="center"
          eyebrow={t('Comment nous travaillons')}
          title={t('Chaque projet suit la même exigence')}
          description={t('Une méthode éprouvée, de la découverte à l’évolution continue du produit.')}
          className="mb-12"
        />
        <ProcessSteps variant="inline" />
      </Section>

      <CTABand eyebrow={t('Vous avez un projet en tête ?')} title={t('Votre projet sera notre prochaine étude de cas.')} />
    </>
  )
}
