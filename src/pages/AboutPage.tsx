import { Quote, Users } from 'lucide-react'
import { missionVision, site, stats, teamDisciplines, values } from '@/data/site'
import { usePageMeta } from '@/hooks/usePageMeta'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GradientText } from '@/components/ui/GradientText'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { HeroImage } from '@/components/sections/HeroImage'
import { Stats } from '@/components/sections/Stats'
import { CTABand } from '@/components/sections/CTABand'
import { FloatingCard } from '@/components/visuals/FloatingCard'
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'
import { BrandN } from '@/components/visuals/BrandN'

/** Photographs for each discipline, in the order of `teamDisciplines`. */
const teamImages = ['/images/team-dev.webp', '/images/team-design.webp', '/images/team-pm.webp', '/images/team-cloud.webp']

export default function AboutPage() {
  usePageMeta({
    title: 'À propos',
    description:
      'Nashsoft Systems est une entreprise technologique basée à Douala qui conçoit des solutions digitales innovantes pour accompagner les entreprises et organisations dans leur transformation numérique.',
  })

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'À propos' }]}
        eyebrow="À propos"
        title={
          <>
            Plus qu’un prestataire, <GradientText>un partenaire.</GradientText>
          </>
        }
        description="Nashsoft Systems est une entreprise technologique camerounaise qui conçoit et développe des solutions digitales innovantes pour accompagner les entreprises et organisations dans leur transformation numérique."
        actions={
          <>
            <ButtonLink to="/services" size="lg">
              Découvrir nos services
            </ButtonLink>
            <ButtonLink to="/projets" variant="secondary" size="lg" arrow={false}>
              Voir nos réalisations
            </ButtonLink>
          </>
        }
        visual={
          <HeroImage src="/images/hero-about.webp" alt="Ingénieur Nashsoft Systems travaillant sur plusieurs écrans de code">
            <FloatingCard icon={Users} title="Une équipe pluridisciplinaire" description={`Basée à ${site.contact.city}`} className="bottom-[6%] left-0" delay={0.3} />
          </HeroImage>
        }
      />

      {/* Story */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionTitle eyebrow="Notre histoire" title="Une passion devenue réalité" />
            <Reveal className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-slate">
              <p>
                Nashsoft Systems est née d’une vision simple : utiliser la technologie comme un levier pour créer des opportunités et résoudre des
                problèmes réels. Fondée au Cameroun par une équipe de passionnés, l’entreprise a grandi autour d’une conviction forte :
                l’innovation doit être accessible, utile et adaptée aux réalités locales.
              </p>
              <p>
                Aujourd’hui, Nashsoft Systems accompagne des entreprises, des organisations et des particuliers dans leurs projets digitaux, en
                combinant expertise technique, créativité et engagement.
              </p>
              <p className="pt-2">
                <span className="block font-display text-xl font-semibold text-brand italic">Nashsoft Systems</span>
                <span className="text-[0.85rem]">L’innovation au service de votre avenir.</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative">
            <div className="overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgb(6_20_38/0.5)]">
              <img
                src="/images/about-story.webp"
                alt="L’équipe Nashsoft Systems réunie autour d’un ordinateur portable"
                width={1600}
                height={1200}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] size-full object-cover"
              />
            </div>
            <figure className="relative mx-4 -mt-16 rounded-2xl border border-line bg-white/95 p-6 shadow-float backdrop-blur sm:absolute sm:right-[-1.5rem] sm:bottom-[-2rem] sm:mx-0 sm:mt-0 sm:w-72 lg:right-[-2.5rem]">
              <Quote aria-hidden className="size-7 text-brand" strokeWidth={2.2} />
              <blockquote className="mt-3 text-[0.9rem] leading-relaxed text-navy">
                Nous croyons en un avenir où chaque idée peut devenir une solution digitale puissante.
              </blockquote>
              <figcaption className="mt-3 font-display text-sm font-semibold text-brand italic">— Nashsoft Systems</figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Mission & vision */}
      <Section tone="navy" background={<AnimatedGrid tone="dark" />}>
        <BrandN className="absolute top-10 left-[30%] -z-10 hidden w-56 opacity-20 lg:block" />
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.6fr]">
          <SectionTitle
            tone="dark"
            eyebrow="Notre mission & vision"
            title="Des objectifs clairs pour un impact durable"
            description="Nous aidons les entreprises et organisations à exploiter la puissance du numérique pour améliorer leurs performances, innover et créer de la valeur durable."
          />
          <RevealGroup className="grid gap-5 sm:grid-cols-2">
            {missionVision.map((m) => (
              <RevealItem key={m.title}>
                <article className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-cyan/40">
                  {m.icon && (
                    <span aria-hidden className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand to-violet text-white shadow-glow">
                      <m.icon className="size-6" strokeWidth={1.8} />
                    </span>
                  )}
                  <h3 className="mt-6 font-display text-xl font-bold text-white">{m.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-slate-300">{m.description}</p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Values */}
      <Section tone="light">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center">
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui nous guide au quotidien" />
          <RevealGroup className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {values.map((v, i) => (
              <RevealItem key={v.title} className={i > 0 ? 'lg:border-l lg:border-line lg:pl-8' : ''}>
                {v.icon && <v.icon aria-hidden className="size-8 text-brand" strokeWidth={1.6} />}
                <h3 className="mt-4 font-display text-[1.02rem] font-semibold text-navy">{v.title}</h3>
                <p className="mt-2 pr-4 text-[0.85rem] leading-relaxed text-slate">{v.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Impact */}
      <Section tone="dark" background={<AnimatedGrid tone="dark" />}>
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_2fr]">
          <SectionTitle
            tone="dark"
            eyebrow="Notre impact"
            title="Quelques chiffres qui parlent d’eux-mêmes"
            description="Ces chiffres reflètent notre engagement, notre expertise et la confiance de nos clients à travers le Cameroun et au-delà."
          >
            <ButtonLink to="/projets">Découvrir nos projets</ButtonLink>
          </SectionTitle>
          <Stats items={stats} variant="dark" />
        </div>
      </Section>

      {/* Team */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-center">
          <SectionTitle
            eyebrow="Notre équipe"
            title="Des experts passionnés à votre service"
            description="Notre équipe réunit des développeurs, designers, chefs de projet et experts en technologie, tous animés par la même mission : transformer vos idées en solutions concrètes."
          >
            <ButtonLink to="/carrieres">Rejoindre notre équipe</ButtonLink>
          </SectionTitle>
          <RevealGroup className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {teamDisciplines.map((t, i) => (
              <RevealItem key={t.title}>
                <article className="group h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-shadow hover:shadow-card-hover">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={teamImages[i]}
                      alt=""
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative p-4 pt-6">
                    {t.icon && (
                      <span aria-hidden className="absolute -top-5 left-4 inline-flex size-10 items-center justify-center rounded-xl bg-white text-brand shadow-card">
                        <t.icon className="size-5" strokeWidth={1.8} />
                      </span>
                    )}
                    <h3 className="font-display text-[0.95rem] font-semibold text-navy">{t.title}</h3>
                    <p className="mt-1 text-[0.8rem] leading-snug text-slate">{t.description}</p>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CTABand eyebrow="Travaillons ensemble" title="Prêt à donner vie à votre projet ?" description="Contactez-nous dès aujourd’hui et discutons de vos besoins." />
    </>
  )
}
