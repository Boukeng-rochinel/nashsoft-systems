import { useSearchParams } from 'react-router-dom'
import { Link } from '@/i18n/router'
import { ArrowRight, MessageSquare, PencilRuler, CodeXml, LifeBuoy, SearchCheck } from 'lucide-react'
import type { ProcessStep } from '@/types'
import { solutionCategories } from '@/data/industries'
import { START_PROJECT_HREF } from '@/data/navigation'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { Section } from '@/components/ui/Section'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { AccentText } from '@/components/ui/AccentText'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { PageHero } from '@/components/sections/PageHero'
import { IndustrySelector } from '@/components/sections/IndustrySelector'
import { CTABand } from '@/components/sections/CTABand'
import { t } from '@/i18n'

/**
 * Where each category card leads: the matching sector tab when there is one,
 * otherwise the project form with the closest project type pre-selected.
 */
const categoryLinks: Record<string, string> = {
  'Éducation': '?secteur=education#secteurs',
  'Santé': '?secteur=sante#secteurs',
  'Finance': '?secteur=finance#secteurs',
  'Logistique': '?secteur=logistique#secteurs',
  'Transport': '?secteur=logistique#secteurs',
  'Hôtellerie & Restauration': '?secteur=hotellerie#secteurs',
  'Secteur public': '?secteur=gouvernement#secteurs',
  ERP: `${START_PROJECT_HREF}?type=ERP`,
  'E-commerce': `${START_PROJECT_HREF}?type=E-commerce`,
  'Gestion d’entreprise': `${START_PROJECT_HREF}?type=${encodeURIComponent('Logiciel d’entreprise')}`,
  'Comptabilité': `${START_PROJECT_HREF}?type=${encodeURIComponent('Logiciel d’entreprise')}`,
  'Média & Communication': `${START_PROJECT_HREF}?type=${encodeURIComponent('Site web')}`,
}

const customSteps: ProcessStep[] = [
  { title: 'Analyse des besoins', description: 'Nous étudions vos processus, vos utilisateurs et vos objectifs.', icon: SearchCheck },
  { title: 'Conception', description: 'Nous imaginons la meilleure solution et la validons avec vous sur maquettes.', icon: PencilRuler },
  { title: 'Développement', description: 'Nous construisons une solution robuste, testée et évolutive.', icon: CodeXml },
  { title: 'Support & Maintenance', description: 'Nous restons à vos côtés pour assurer la performance sur le long terme.', icon: LifeBuoy },
]

export default function SolutionsPage() {
  usePageMeta(pageSeo.solutions)
  const [params] = useSearchParams()
  const sector = params.get('secteur')

  return (
    <>
      <PageHero
        eyebrow={t('Nos solutions')}
        title={
          <>{t('Des solutions digitales pour')}{' '}<AccentText>{t('tous les secteurs.')}</AccentText>
          </>
        }
        description={t('Nous concevons des solutions sur mesure adaptées aux besoins spécifiques de chaque secteur d’activité. Des outils modernes, flexibles et évolutifs pour accompagner votre croissance.')}
        actions={
          <>
            <ButtonLink to="#categories" size="lg">{t('Explorer nos solutions')}</ButtonLink>
            <ButtonLink to="/contact" variant="secondary" size="lg" icon={MessageSquare} arrow={false}>{t('Parler à notre équipe')}</ButtonLink>
          </>
        }
        image="/images/hero-solutions.webp"
      />

      {/* Categories */}
      <Section tone="white" id="categories" className="scroll-mt-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <SectionTitle eyebrow={t('Nos solutions')} title={t('Nos solutions par catégorie')} />
          <Reveal>
            <p className="max-w-lg text-[0.95rem] leading-relaxed text-slate lg:border-l lg:border-line lg:pl-8">{t('Découvrez nos solutions adaptées à vos besoins. Chaque solution est conçue pour vous aider à être plus efficace, plus productif et plus compétitif.')}</p>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutionCategories.map((c) => (
            <RevealItem key={c.title}>
              <Link
                to={categoryLinks[c.title] ?? START_PROJECT_HREF}
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover"
              >
                <div className="flex items-start gap-3.5">
                  <span aria-hidden className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <c.icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-[0.95rem] font-semibold text-navy">{t(c.title)}</h3>
                    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate">{t(c.description)}</p>
                  </div>
                </div>
                <span aria-hidden className="mt-auto ml-auto inline-flex size-8 translate-y-1 items-center justify-center rounded-full bg-light text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Sector focus */}
      <Section tone="dark" id="secteurs" className="scroll-mt-20">
        <div className="grid items-start gap-10 lg:grid-cols-[0.75fr_1.6fr]">
          <SectionTitle
            tone="dark"
            eyebrow={t('Focus secteurs')}
            title={
              <>{t('Des solutions adaptées à chaque')}{' '}<AccentText tone="dark">{t('secteur d’activité')}</AccentText>
              </>
            }
            description={t('Nous comprenons les défis uniques de chaque industrie. C’est pourquoi nous proposons des solutions personnalisées qui répondent aux besoins spécifiques de votre secteur.')}
          >
            <ButtonLink to={START_PROJECT_HREF}>{t('Parler de votre secteur')}</ButtonLink>
          </SectionTitle>
          <IndustrySelector key={sector ?? 'default'} tone="dark" initialSlug={sector} />
        </div>
      </Section>

      {/* Custom solutions */}
      <Section tone="light">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.6fr]">
          <SectionTitle
            eyebrow={t('Nos solutions sur mesure')}
            title={t('Une solution unique pour votre entreprise')}
            description={t('Vous avez un besoin spécifique ? Nous développons des solutions sur mesure qui s’adaptent parfaitement à vos objectifs et à votre mode de fonctionnement.')}
          >
            <ButtonLink to={START_PROJECT_HREF}>{t('Discuter de votre projet')}</ButtonLink>
          </SectionTitle>
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {customSteps.map((s) => (
              <RevealItem key={s.title}>
                <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                  <span aria-hidden className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <s.icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 font-display text-[0.95rem] font-semibold text-navy">{t(s.title)}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-slate">{t(s.description)}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CTABand
        eyebrow={t('Prêt à passer à la prochaine étape ?')}
        title={t('Parlons de votre projet.')}
        description={t('Que ce soit pour une solution standard ou sur mesure, notre équipe est là pour vous accompagner.')}
      />
    </>
  )
}
