import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Check, CirclePlay, Gauge, Headphones, Layers, ShieldCheck, type LucideIcon } from 'lucide-react'
import type { Project, ProjectCategory, Service } from '@/types'
import { services, serviceHref } from '@/data/services'
import { projects } from '@/data/projects'
import { getTechnology } from '@/data/technologies'
import { whyNashsoft } from '@/data/site'
import { themes } from '@/data/themes'
import { START_PROJECT_HREF } from '@/data/navigation'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PageHero } from './PageHero'
import { HeroStage } from './HeroStage'
import { ProcessSteps } from './ProcessSteps'
import { TechnologyCloud } from './TechnologyCloud'
import { FeatureGrid } from './FeatureGrid'
import { ProjectCard } from './ProjectCard'
import { CTABand } from './CTABand'
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'
import { GlassPanel } from '@/components/visuals/GlassPanel'
import { FloatingCard } from '@/components/visuals/FloatingCard'

const highlightIcons: LucideIcon[] = [Layers, Gauge, ShieldCheck, Headphones]

/** Highlights the last two words of a sentence (design: "Des logiciels sur mesure pour vos ambitions."). */
function splitTitle(text: string): ReactNode {
  const words = text.split(' ')
  if (words.length < 4) return <GradientText tone="dark">{text}</GradientText>
  const head = words.slice(0, -2).join(' ')
  const tail = words.slice(-2).join(' ')
  return (
    <>
      {head} <GradientText tone="dark">{tail}</GradientText>
    </>
  )
}

interface ServiceDetailViewProps {
  service: Service
  /** Overrides the default hero headline (service tagline). */
  heroTitle?: ReactNode
  heroVisual?: ReactNode
  /** Service-specific sections inserted right after the hero (diagrams…). */
  children?: ReactNode
  /** Hide the generic "domaines d'intervention" grid when the page provides its own. */
  showFeatures?: boolean
}

/** Portfolio category most representative of each service, used to rank related projects. */
const serviceCategory: Partial<Record<string, ProjectCategory>> = {
  'ia-data': 'IA',
  'cloud-devops': 'Cloud',
  'applications-mobiles': 'Mobile',
  'developpement-web': 'Web',
  'transformation-digitale': 'Entreprise',
  'developpement-logiciel': 'Entreprise',
}

export function ServiceDetailView({ service, heroTitle, heroVisual, children, showFeatures = true }: ServiceDetailViewProps) {
  const techs = service.technologies.map(getTechnology)
  const category = serviceCategory[service.slug]
  const score = (p: Project) =>
    (category && p.categories.includes(category) ? 10 : 0) + p.technologies.filter((t) => service.technologies.includes(t)).length
  const related = projects
    .filter((p) => score(p) > 0)
    .sort((a, b) => score(b) - score(a))
    .slice(0, 3)
  const others = services.filter((s) => s.slug !== service.slug)

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Services', href: '/services' }, { label: service.title }]}
        eyebrow={service.title}
        title={heroTitle ?? splitTitle(service.tagline)}
        description={service.longDescription}
        actions={
          <>
            <ButtonLink to={`${START_PROJECT_HREF}?service=${service.slug}`} size="lg">
              Démarrer un projet
            </ButtonLink>
            <ButtonLink to="#processus" variant="outline-dark" size="lg" icon={CirclePlay} arrow={false}>
              Voir notre processus
            </ButtonLink>
          </>
        }
        highlights={service.highlights.map((h, i) => ({ title: h, description: '', icon: highlightIcons[i % highlightIcons.length] }))}
        visual={
          heroVisual ?? (
            <HeroStage laptop="code" theme={themes.nashsoftDark} title="nashsoft">
              <GlassPanel
                title="Technologies que nous utilisons"
                columns={2}
                className="top-[2%] right-0 hidden sm:block"
                items={techs.slice(0, 6).map((t) => ({ label: t.name, mono: t.mono, color: t.color }))}
              />
              <FloatingCard tone="dark" icon={service.icon} title="Conçu pour durer" description="Des applications puissantes et évolutives." className="bottom-[2%] left-0" delay={0.3} />
            </HeroStage>
          )
        }
      />

      {children}

      {/* Process */}
      <Section tone="light" id="processus" className="scroll-mt-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Notre processus"
            title={
              <>
                De l’idée à la production en <GradientText>6 étapes</GradientText>
              </>
            }
            description="Nous adoptons une approche méthodique et agile pour garantir la réussite de chaque projet, de la conception à la maintenance."
          />
          <ButtonLink to={START_PROJECT_HREF} className="self-start lg:self-auto">
            Parler de votre projet
          </ButtonLink>
        </div>
        <ProcessSteps variant="cards" cols="lg:grid-cols-6" className="mt-10" />
      </Section>

      {/* Technologies */}
      <Section tone="navy" background={<AnimatedGrid tone="dark" />}>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.6fr]">
          <SectionTitle
            tone="dark"
            eyebrow="Nos technologies"
            title={
              <>
                Un stack moderne pour des solutions <GradientText tone="dark">performantes</GradientText>
              </>
            }
            description="Nous utilisons les technologies les plus fiables et les plus modernes pour construire des applications rapides, sécurisées et évolutives."
          >
            <ButtonLink to="/services">Tous nos services</ButtonLink>
          </SectionTitle>
          <TechnologyCloud items={techs} tone="dark" cols="grid-cols-2 sm:grid-cols-3" />
        </div>
      </Section>

      {/* What we deliver */}
      {showFeatures && (
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <div>
            <SectionTitle eyebrow="Ce que nous faisons" title={`${service.title} : nos domaines d’intervention`} className="max-w-2xl" />
            <FeatureGrid items={service.features} columns={2} className="mt-10" />
          </div>
          <Reveal className="lg:pt-24">
            <div className="rounded-2xl border border-brand-100 bg-gradient-to-br from-light to-mist p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-navy">Livrables</h3>
              <p className="mt-1 text-sm text-slate">Ce que vous recevez à chaque projet.</p>
              <ul className="mt-6 space-y-3.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-navy">
                    <span aria-hidden className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <ButtonLink to={`${START_PROJECT_HREF}?service=${service.slug}`} className="mt-8 w-full">
                Demander un devis
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      )}

      {/* Related work */}
      {related.length > 0 && (
        <Section tone="light">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle eyebrow="Exemples de réalisations" title="Des projets qui parlent d’eux-mêmes" />
            <ButtonLink to="/projets" variant="link">
              Voir tous les projets
            </ButtonLink>
          </div>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <RevealItem key={p.slug}>
                <ProjectCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      )}

      {/* Why us */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center">
          <SectionTitle
            eyebrow="Pourquoi nous choisir"
            title={
              <>
                Une expertise qui fait <GradientText>la différence</GradientText>
              </>
            }
            description="Nous ne sommes pas seulement des développeurs. Nous sommes votre partenaire technologique pour la réussite de vos projets."
          />
          <FeatureGrid items={whyNashsoft} columns={2} />
        </div>
      </Section>

      {/* Other services */}
      <Section tone="light" spacing="sm">
        <Reveal>
          <h2 className="font-display text-sm font-semibold text-navy">Découvrez nos autres expertises</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  to={serviceHref(s.slug)}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm text-navy transition-colors hover:border-brand/40 hover:text-brand"
                >
                  <s.icon aria-hidden className="size-4 text-brand" />
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <CTABand
        eyebrow="Prêt à lancer votre projet ?"
        title={`Transformons votre idée en solution ${service.shortTitle === 'Mobile' ? 'mobile' : 'digitale'}.`}
        description="Parlons de votre projet et trouvons ensemble la meilleure approche."
        cta={{ label: 'Démarrer un projet', href: `${START_PROJECT_HREF}?service=${service.slug}` }}
      />
    </>
  )
}
