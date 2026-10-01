import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  ChartColumn,
  ChartLine,
  Cpu,
  Database,
  Lightbulb,
  ScanEye,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react'
import { getServiceBySlug } from '@/data/services'
import { getProjectBySlug, projectHref } from '@/data/projects'
import { themes } from '@/data/themes'
import { usePageMeta } from '@/hooks/usePageMeta'
import type { Feature } from '@/types'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { Reveal } from '@/components/ui/Reveal'
import { ServiceDetailView } from '@/components/sections/ServiceDetailView'
import { HeroStage } from '@/components/sections/HeroStage'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { ProjectCover } from '@/components/sections/ProjectCover'
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'
import { FlowDiagram } from '@/components/visuals/FlowDiagram'
import { FloatingCard } from '@/components/visuals/FloatingCard'
import { GlassPanel } from '@/components/visuals/GlassPanel'

const pipeline = [
  { label: 'Données', caption: 'Collecte depuis vos applications, fichiers, capteurs et API.', icon: Database },
  { label: 'Traitement', caption: 'Nettoyage, structuration et enrichissement.', icon: Workflow },
  { label: 'Modèle IA', caption: 'Entraînement, évaluation et déploiement.', icon: BrainCircuit },
  { label: 'Insights', caption: 'Tableaux de bord, alertes et prévisions.', icon: ChartLine },
  { label: 'Décision', caption: 'Des actions éclairées et mesurables.', icon: Target },
]

const aiServices: Feature[] = [
  { title: 'Machine Learning', description: 'Modèles de classification, de prévision et de recommandation entraînés sur vos données.', icon: BrainCircuit },
  { title: 'Vision par ordinateur', description: 'Reconnaissance d’images, contrôle qualité visuel et lecture de documents.', icon: ScanEye },
  { title: 'Analyse prédictive', description: 'Anticipez la demande, les risques de défaut ou le départ de clients.', icon: ChartLine },
  { title: 'Automatisation IA', description: 'Extraction de données de factures et formulaires, tri et routage automatique.', icon: Workflow },
  { title: 'Tableaux de bord data', description: 'Indicateurs clés en temps réel pour vos décideurs, sur ordinateur et mobile.', icon: ChartColumn },
  { title: 'Assistants intelligents', description: 'Chatbots et assistants connectés à votre documentation et à vos outils.', icon: Bot },
]

const principles: Feature[] = [
  { title: 'Commencer par le problème', description: 'Nous partons d’une décision métier à améliorer, pas d’une technologie à placer.', icon: Lightbulb },
  { title: 'Preuve de concept rapide', description: 'Un prototype en quelques semaines pour valider la valeur avant d’industrialiser.', icon: Sparkles },
  { title: 'IA embarquée ou cloud', description: 'Modèles exécutés sur mobile, sur vos serveurs ou dans le cloud selon vos contraintes.', icon: Cpu },
]

export default function AIDataPage() {
  const service = getServiceBySlug('ia-data')!
  const autofix = getProjectBySlug('autofix-car')
  usePageMeta({
    title: 'IA & Data',
    description:
      'Transformez vos données en intelligence : machine learning, vision par ordinateur, analyse prédictive, automatisation et tableaux de bord avec Nashsoft Systems.',
  })

  return (
    <ServiceDetailView
      service={service}
      showFeatures={false}
      heroTitle={
        <>
          Transformez vos données <GradientText tone="dark">en intelligence.</GradientText>
        </>
      }
      heroVisual={
        <HeroStage laptop="analytics" phone="analytics" theme={themes.nashsoftDark} title="Insights">
          <GlassPanel
            className="top-[2%] right-0 hidden sm:block"
            items={[
              { label: 'Machine Learning', icon: BrainCircuit },
              { label: 'Vision par ordinateur', icon: ScanEye },
              { label: 'Analyse prédictive', icon: ChartLine },
            ]}
          />
          <FloatingCard tone="dark" icon={Bot} title="Assistants intelligents" description="Connectés à vos données." className="bottom-[2%] left-0" delay={0.3} />
        </HeroStage>
      }
    >
      {/* Pipeline */}
      <Section tone="dark" background={<AnimatedGrid tone="dark" />}>
        <SectionTitle
          tone="dark"
          align="center"
          eyebrow="De la donnée à la décision"
          title={
            <>
              Un pipeline <GradientText tone="dark">intelligent</GradientText>, de bout en bout
            </>
          }
          description="Nous construisons toute la chaîne : collecte, préparation, modélisation et restitution des résultats là où vos équipes travaillent."
          className="max-w-2xl"
        />
        <FlowDiagram nodes={pipeline} className="mt-14" />
      </Section>

      {/* Capabilities */}
      <Section tone="white">
        <SectionTitle
          eyebrow="Nos expertises IA"
          title={
            <>
              Des solutions IA <GradientText>concrètes</GradientText> pour votre activité
            </>
          }
          description="Six domaines d’intervention, toujours au service d’un objectif mesurable."
          className="max-w-2xl"
        />
        <FeatureGrid items={aiServices} columns={3} className="mt-12" />
      </Section>

      {/* Approach + case study */}
      <Section tone="light">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="Notre approche" title="Une IA pragmatique, utile et responsable" />
            <div className="mt-8">
              <FeatureGrid items={principles} variant="compact" columns={1} />
            </div>
          </div>
          {autofix && (
            <Reveal>
              <Link
                to={projectHref(autofix.slug)}
                className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <div className="size-full transition-transform duration-700 group-hover:scale-105">
                    <ProjectCover project={autofix} />
                  </div>
                </div>
                <div className="p-6">
                  <p className="eyebrow text-brand">Étude de cas · IA embarquée</p>
                  <h3 className="mt-2 font-display text-xl font-bold text-navy">{autofix.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">{autofix.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Lire l’étude de cas <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          )}
        </div>
      </Section>
    </ServiceDetailView>
  )
}
