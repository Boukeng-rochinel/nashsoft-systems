import {
  Activity,
  AppWindow,
  Boxes,
  CircleCheck,
  Cloud,
  CloudUpload,
  Container,
  Database,
  GitBranch,
  HardDrive,
  LockKeyhole,
  Rocket,
  Server,
  TestTubeDiagonal,
  Workflow,
} from 'lucide-react'
import { getServiceBySlug } from '@/data/services'
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
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'
import { ArchitectureStack } from '@/components/visuals/ArchitectureStack'
import { FloatingCard } from '@/components/visuals/FloatingCard'
import { GlassPanel } from '@/components/visuals/GlassPanel'
import { FlowDiagram } from '@/components/visuals/FlowDiagram'

const architecture = [
  { layer: 'Applications', items: ['Web', 'Mobile', 'API REST', 'Back-offices'] },
  { layer: 'Conteneurs', items: ['Docker', 'Docker Compose', 'Registre d’images'] },
  { layer: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'VPS', 'CDN'] },
  { layer: 'Bases de données', items: ['PostgreSQL', 'MongoDB', 'Réplication', 'Sauvegardes'] },
  { layer: 'Supervision', items: ['Métriques', 'Journaux', 'Alertes', 'Disponibilité'] },
]
const architectureIcons = [AppWindow, Container, Cloud, Database, Activity]

const pipeline = [
  { label: 'Commit', caption: 'Revue de code et branches protégées.', icon: GitBranch },
  { label: 'Tests', caption: 'Tests automatisés à chaque modification.', icon: TestTubeDiagonal },
  { label: 'Build', caption: 'Images Docker versionnées.', icon: Boxes },
  { label: 'Déploiement', caption: 'Mise en production sans interruption.', icon: Rocket },
  { label: 'Supervision', caption: 'Alertes et retour immédiat.', icon: Activity },
]

const cloudServices: Feature[] = [
  { title: 'Déploiement cloud', description: 'Mise en ligne et migration de vos applications vers AWS, Azure, GCP ou VPS.', icon: CloudUpload },
  { title: 'DevOps', description: 'Culture et outillage pour livrer plus souvent, avec moins de risques.', icon: Workflow },
  { title: 'Docker & conteneurs', description: 'Environnements reproductibles du poste de développement à la production.', icon: Container },
  { title: 'CI/CD', description: 'Pipelines automatisés de tests, build et déploiement avec GitHub Actions.', icon: GitBranch },
  { title: 'Supervision', description: 'Monitoring, journaux centralisés et alertes en temps réel.', icon: Activity },
  { title: 'Sauvegardes', description: 'Sauvegardes automatisées, testées, et plan de reprise d’activité.', icon: HardDrive },
  { title: 'Infrastructure', description: 'Serveurs, réseaux, DNS, certificats et répartition de charge.', icon: Server },
  { title: 'Sécurité', description: 'Pare-feu, gestion des secrets, mises à jour et contrôle d’accès.', icon: LockKeyhole },
]

export default function CloudPage() {
  const service = getServiceBySlug('cloud-devops')!
  usePageMeta({
    title: 'Cloud & Infrastructure',
    description:
      'Déploiement cloud, Docker, CI/CD, supervision, sauvegardes et sécurité : Nashsoft Systems conçoit et exploite une infrastructure fiable pour vos applications.',
  })

  return (
    <ServiceDetailView
      service={service}
      showFeatures={false}
      heroTitle={
        <>
          Une infrastructure cloud <GradientText tone="dark">fiable et sécurisée.</GradientText>
        </>
      }
      heroVisual={
        <HeroStage laptop="dashboard" theme={themes.nashsoftDark} title="Cloud">
          <GlassPanel
            title="État des services"
            className="top-[2%] right-0 hidden sm:block"
            items={[
              { label: 'API · opérationnelle', icon: CircleCheck },
              { label: 'Base de données · répliquée', icon: Database },
              { label: 'Sauvegarde · quotidienne', icon: HardDrive },
            ]}
          />
          <FloatingCard tone="dark" icon={Container} title="Conteneurs Docker" description="Du développement à la production." className="bottom-[2%] left-0" delay={0.3} />
        </HeroStage>
      }
    >
      {/* Architecture */}
      <Section tone="dark" background={<AnimatedGrid tone="dark" />}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <div>
            <SectionTitle
              tone="dark"
              eyebrow="Architecture technique"
              title={
                <>
                  De l’application à la <GradientText tone="dark">supervision</GradientText>
                </>
              }
              description="Chaque couche est conçue pour être reproductible, observable et sécurisée. Vos équipes savent ce qui tourne, où, et dans quel état."
            />
            <Reveal className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="font-display text-sm font-semibold text-white">Haute disponibilité</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                Réplication des données, sauvegardes hors site et supervision continue pour réduire les interruptions de service.
              </p>
            </Reveal>
          </div>
          <ArchitectureStack layers={architecture} icons={architectureIcons} />
        </div>
      </Section>

      {/* CI/CD */}
      <Section tone="light">
        <SectionTitle
          align="center"
          eyebrow="CI/CD"
          title={
            <>
              Livrer plus souvent, <GradientText>en toute confiance</GradientText>
            </>
          }
          description="Chaque modification suit le même pipeline automatisé, du commit à la production."
          className="max-w-2xl"
        />
        <FlowDiagram nodes={pipeline} tone="light" className="mt-12" />
      </Section>

      {/* Services */}
      <Section tone="white">
        <SectionTitle
          eyebrow="Nos services cloud"
          title={
            <>
              Tout ce qu’il faut pour <GradientText>exploiter sereinement</GradientText>
            </>
          }
          className="max-w-2xl"
        />
        <FeatureGrid items={cloudServices} columns={4} className="mt-12" />
      </Section>
    </ServiceDetailView>
  )
}
