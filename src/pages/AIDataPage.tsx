import { Link } from 'react-router-dom'
import { ArrowRight, Bot, BrainCircuit, ChartLine, Cpu, Database, Lightbulb, ScanEye, Sparkles, Target, Workflow } from 'lucide-react'
import { getServiceBySlug } from '@/data/services'
import { getProjectBySlug, projectHref } from '@/data/projects'
import { aiExpertises } from '@/data/expertises'
import { usePageMeta } from '@/hooks/usePageMeta'
import type { Feature } from '@/types'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { ServiceDetailView } from '@/components/sections/ServiceDetailView'
import { HeroImage } from '@/components/sections/HeroImage'
import { ExpertiseGrid } from '@/components/sections/ExpertiseGrid'
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
          Transformez vos données <GradientText>en intelligence.</GradientText>
        </>
      }
      heroVisual={
        <HeroImage src="/images/hero-ai.webp" alt="Tableau de bord analytique affiché sur un écran">
          <GlassPanel
            className="top-[2%] right-0 hidden sm:block"
            items={[
              { label: 'Machine Learning', icon: BrainCircuit },
              { label: 'Vision par ordinateur', icon: ScanEye },
              { label: 'Analyse prédictive', icon: ChartLine },
            ]}
          />
          <FloatingCard icon={Bot} title="Assistants intelligents" description="Connectés à vos données." className="bottom-[2%] left-0" delay={0.3} />
        </HeroImage>
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
              Un pipeline <GradientText>intelligent</GradientText>, de bout en bout
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
          description="Six domaines d’intervention, toujours au service d’un objectif mesurable. Cliquez sur une expertise pour en savoir plus."
          className="max-w-2xl"
        />
        <ExpertiseGrid items={aiExpertises} service={service.slug} className="mt-12" />
      </Section>

      {/* Approach + case study */}
      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col">
            <SectionTitle eyebrow="Notre approche" title="Une IA pragmatique, utile et responsable" />
            <RevealGroup className="mt-8 grid flex-1 gap-4 lg:auto-rows-fr">
              {principles.map((p) => (
                <RevealItem key={p.title} className="h-full">
                  <div className="flex h-full items-center gap-4 rounded-2xl border border-line bg-white p-5 shadow-card">
                    {p.icon && (
                      <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
                        <p.icon className="size-5" strokeWidth={1.8} />
                      </span>
                    )}
                    <div>
                      <h3 className="font-display text-base font-semibold text-navy">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate">{p.description}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          {autofix && (
            <Reveal className="h-full">
              <Link
                to={projectHref(autofix.slug)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-64 lg:flex-1">
                  <img
                    src={autofix.image}
                    alt={autofix.imageAlt}
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
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
