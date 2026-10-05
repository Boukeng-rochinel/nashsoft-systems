import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Check, CircleAlert, Expand, Images, Lightbulb, Tag } from 'lucide-react'
import type { Project } from '@/types'
import { getProjectBySlug, projectHref, projects } from '@/data/projects'
import { getTechnology } from '@/data/technologies'
import { START_PROJECT_HREF } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { projectSeo } from '@/data/seo'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { TechMark } from '@/components/ui/TechTile'
import { PageHero } from '@/components/sections/PageHero'
import { HeroImage } from '@/components/sections/HeroImage'
import { FloatingCard } from '@/components/visuals/FloatingCard'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { CTABand } from '@/components/sections/CTABand'
import { Lightbox } from '@/components/sections/Lightbox'
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'
import { ArchitectureStack } from '@/components/visuals/ArchitectureStack'
import { Laptop, Phone } from '@/components/visuals/Devices'
import { Screen } from '@/components/visuals/Screen'

function splitLast(title: string) {
  const words = title.split(' ')
  if (words.length === 1) return <GradientText>{title}</GradientText>
  return (
    <>
      {words.slice(0, -1).join(' ')} <GradientText>{words[words.length - 1]}</GradientText>
    </>
  )
}

function HeroVisual({ project }: { project: Project }) {
  const phoneFirst = project.cover.device === 'phone'
  return (
    <HeroImage src={project.image} alt={project.imageAlt}>
      {/* Product UI layered over the photograph */}
      <div className={phoneFirst ? 'absolute -bottom-8 -left-4 w-[24%] sm:-left-8' : 'absolute -bottom-8 -left-4 w-[52%] sm:-left-10'}>
        {phoneFirst ? (
          <Phone variant="mobile" theme={project.theme} title={project.title} />
        ) : (
          <Laptop variant={project.cover.variant} theme={project.theme} title={project.title} />
        )}
      </div>
      <FloatingCard icon={Tag} title={project.type} description={project.industry} className="top-[8%] -right-2 hidden sm:block lg:-right-8" delay={0.3} />
    </HeroImage>
  )
}

function GalleryThumb({ project, index, onOpen, large = false }: { project: Project; index: number; onOpen: (i: number) => void; large?: boolean }) {
  const item = project.gallery[index]
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative block w-full overflow-hidden rounded-xl border border-line bg-navy text-left shadow-card focus-visible:ring-2 focus-visible:ring-brand"
      aria-label={`Agrandir : ${item.title}`}
    >
      <div className={large ? 'aspect-[16/10]' : 'aspect-[4/3]'}>
        {item.device === 'phone' ? (
          <div className="flex size-full items-center justify-center" style={{ background: `linear-gradient(160deg, #0a1a33, ${project.theme.accent}55)` }}>
            <div className="w-[34%] transition-transform duration-500 group-hover:scale-105">
              <Phone variant={item.variant} theme={project.theme} title={project.title} />
            </div>
          </div>
        ) : (
          <div className="@container size-full transition-transform duration-500 group-hover:scale-105">
            <Screen variant={item.variant} theme={project.theme} title={project.title} />
          </div>
        )}
      </div>
      <span className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/80 via-transparent to-transparent p-3 opacity-90 transition-opacity group-hover:opacity-100">
        <span className="flex w-full items-center justify-between text-xs font-semibold text-white">
          {item.title}
          <Expand aria-hidden className="size-4" />
        </span>
      </span>
    </button>
  )
}

function ProjectDetail({ project }: { project: Project }) {
  usePageMeta(projectSeo(project))
  const [lightbox, setLightbox] = useState<number | null>(null)
  const idx = projects.findIndex((p) => p.slug === project.slug)
  const prev = projects[(idx - 1 + projects.length) % projects.length]
  const next = projects[(idx + 1) % projects.length]

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Projets', href: '/projets' }, { label: project.title }]}
        eyebrow={project.type}
        title={splitLast(project.title)}
        description={project.summary}
        actions={
          <>
            <ButtonLink to={`${START_PROJECT_HREF}?reference=${project.slug}`} size="lg">
              Démarrer un projet similaire
            </ButtonLink>
            <ButtonLink to="#galerie" variant="secondary" size="lg" icon={Images} arrow={false}>
              Voir la galerie
            </ButtonLink>
          </>
        }
        highlights={[
          { title: project.industry, description: 'Secteur', icon: Tag },
          { title: String(project.year), description: 'Année', icon: CalendarDays },
          { title: project.categories.join(' · '), description: 'Catégorie', icon: Images },
        ]}
        visual={<HeroVisual project={project} />}
      />

      {/* Overview — reference design: description | technologies | preview */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:gap-12">
          <Reveal>
            <h2 className="font-display text-xl font-bold text-navy">Aperçu du projet</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate">{project.description}</p>
            <ul className="mt-6 space-y-3.5">
              {project.features.map((f) => (
                <li key={f.title} className="flex items-center gap-3 text-sm font-medium text-navy">
                  {f.icon && (
                    <span aria-hidden className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand">
                      <f.icon className="size-4" strokeWidth={1.8} />
                    </span>
                  )}
                  {f.title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-xl font-bold text-navy">Technologies utilisées</h2>
            <ul className="mt-5 grid grid-cols-3 gap-4">
              {project.technologies.map((name) => {
                const tech = getTechnology(name)
                return (
                  <li key={name} className="flex flex-col items-center gap-2 text-center">
                    <TechMark tech={tech} size="lg" />
                    <span className="text-[0.7rem] font-medium text-navy">{tech.name}</span>
                  </li>
                )
              })}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <h2 className="font-display text-xl font-bold text-navy">Aperçu visuel</h2>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {project.gallery.slice(0, 4).map((g, i) => (
                <GalleryThumb key={g.id} project={project} index={i} onOpen={setLightbox} />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setLightbox(0)}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_-10px_rgb(8_125_255/0.8)] transition-transform hover:-translate-y-0.5"
            >
              Voir plus d’images <ArrowRight aria-hidden className="size-3.5" />
            </button>
          </Reveal>
        </div>
      </Section>

      {/* Problem / Solution */}
      <Section tone="light">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="h-full">
            <article className="h-full rounded-2xl border border-line bg-white p-7 shadow-card sm:p-8">
              <span aria-hidden className="inline-flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                <CircleAlert className="size-6" strokeWidth={1.8} />
              </span>
              <p className="eyebrow mt-6 text-amber-600">Le problème</p>
              <h2 className="mt-2 font-display text-2xl font-bold text-navy">Le défi à relever</h2>
              <p className="mt-4 leading-relaxed text-slate">{project.problem}</p>
            </article>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <article className="relative h-full overflow-hidden rounded-2xl bg-navy p-7 text-slate-300 sm:p-8" data-theme="dark">
              <div aria-hidden className="absolute -top-16 -right-16 size-56 rounded-full bg-brand/30 blur-3xl" />
              <span aria-hidden className="relative inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-violet text-white">
                <Lightbulb className="size-6" strokeWidth={1.8} />
              </span>
              <p className="eyebrow relative mt-6 text-cyan">La solution</p>
              <h2 className="relative mt-2 font-display text-2xl font-bold text-white">Notre réponse</h2>
              <p className="relative mt-4 leading-relaxed">{project.solution}</p>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Features */}
      <Section tone="white">
        <SectionTitle
          eyebrow="Fonctionnalités"
          title={
            <>
              Ce que la solution <GradientText>permet</GradientText>
            </>
          }
          className="mb-12"
        />
        <FeatureGrid items={project.features} columns={4} />
      </Section>

      {/* Architecture */}
      <Section tone="navy" background={<AnimatedGrid tone="dark" />}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <div>
            <SectionTitle
              tone="dark"
              eyebrow="Architecture"
              title={
                <>
                  Une architecture <GradientText>claire et évolutive</GradientText>
                </>
              }
              description="Chaque couche a une responsabilité précise, ce qui rend le produit simple à maintenir et à faire évoluer."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-lg bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-cyan ring-1 ring-white/10">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ArchitectureStack layers={project.architecture} />
        </div>
      </Section>

      {/* Screenshots */}
      <Section tone="light" id="galerie" className="scroll-mt-20">
        <SectionTitle eyebrow="Captures d’écran" title="Les interfaces en détail" description="Cliquez sur une interface pour l’agrandir." className="mb-10" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {project.gallery.map((g, i) => (
            <RevealItem key={g.id}>
              <GalleryThumb project={project} index={i} onOpen={setLightbox} large />
              <p className="mt-3 text-sm text-slate">{g.caption}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Results */}
      <Section tone="white">
        <SectionTitle
          eyebrow="Résultats"
          title={
            <>
              Ce que le projet a <GradientText>changé</GradientText>
            </>
          }
          className="mb-12"
        />
        <RevealGroup className="grid gap-5 md:grid-cols-3">
          {project.outcomes.map((o) => (
            <RevealItem key={o.title}>
              <div className="h-full rounded-2xl border border-brand-100 bg-gradient-to-br from-light to-mist p-6">
                <span aria-hidden className="inline-flex size-9 items-center justify-center rounded-full bg-brand text-white">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-navy">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{o.description}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Prev / next */}
        <nav aria-label="Autres projets" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          <Link to={projectHref(prev.slug)} className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-light">
            <ArrowLeft aria-hidden className="size-5 text-brand transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-xs text-slate">Projet précédent</span>
              <span className="font-display font-semibold text-navy">{prev.title}</span>
            </span>
          </Link>
          <Link to={projectHref(next.slug)} className="group flex items-center justify-end gap-4 rounded-xl p-3 text-right transition-colors hover:bg-light">
            <span>
              <span className="block text-xs text-slate">Projet suivant</span>
              <span className="font-display font-semibold text-navy">{next.title}</span>
            </span>
            <ArrowRight aria-hidden className="size-5 text-brand transition-transform group-hover:translate-x-1" />
          </Link>
        </nav>
      </Section>

      <CTABand eyebrow="Vous avez un projet en tête ?" title="Discutons de votre idée." description="Discutons de votre idée et trouvons ensemble la meilleure solution." />

      <Lightbox items={project.gallery} theme={project.theme} title={project.title} index={lightbox} onClose={() => setLightbox(null)} onNavigate={setLightbox} />
    </>
  )
}

export default function ProjectDetailPage() {
  const { slug = '' } = useParams()
  const project = getProjectBySlug(slug)
  if (!project) return <Navigate to="/404" replace />
  // Keyed so state (lightbox) resets when navigating between projects.
  return <ProjectDetail key={project.slug} project={project} />
}
