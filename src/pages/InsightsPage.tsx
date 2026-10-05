import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { articleCategories, articles } from '@/data/articles'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { cn } from '@/lib/cn'
import { Section } from '@/components/ui/Section'
import { GradientText } from '@/components/ui/GradientText'
import { PageHero } from '@/components/sections/PageHero'
import { HeroImage } from '@/components/sections/HeroImage'
import { ArticleCard } from '@/components/sections/ArticleCard'
import { CTABand } from '@/components/sections/CTABand'

type Category = (typeof articleCategories)[number]

const isCategory = (value: string | null): value is Category => articleCategories.some((c) => c === value)

/** Insights: featured article, category filter (kept in the URL) and article grid. */
export default function InsightsPage() {
  usePageMeta(pageSeo.insights)
  const [params, setParams] = useSearchParams()
  const raw = params.get('categorie')
  const category: Category = isCategory(raw) ? raw : 'Tous'

  const sorted = useMemo(() => [...articles].sort((a, b) => b.date.localeCompare(a.date)), [])
  const [featured, ...rest] = sorted
  const list = category === 'Tous' ? rest : sorted.filter((a) => a.category === category)

  const select = (c: Category) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (c === 'Tous') next.delete('categorie')
        else next.set('categorie', c)
        return next
      },
      { replace: true, preventScrollReset: true },
    )

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Insights' }]}
        eyebrow="Insights"
        title={
          <>
            Idées, analyses et <GradientText>retours d’expérience.</GradientText>
          </>
        }
        description="Nos ingénieurs partagent ce qu’ils apprennent sur le terrain : transformation digitale des PME, développement, IA, cloud et outils de gestion adaptés au marché camerounais."
        visual={<HeroImage src="/images/hero-insights.webp" alt="Carnet et ordinateur portable sur un bureau de travail" />}
      />

      {category === 'Tous' && featured && (
        <Section tone="white" spacing="sm">
          <p className="eyebrow mb-5 text-brand">À la une</p>
          <ArticleCard article={featured} featured />
        </Section>
      )}

      <Section tone="light" id="articles" className="scroll-mt-20">
        <div role="tablist" aria-label="Filtrer par catégorie" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {articleCategories.map((c) => {
            const active = c === category
            return (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => select(c)}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-navy hover:border-brand/40 hover:text-brand',
                )}
              >
                {c}
              </button>
            )
          })}
        </div>

        <motion.ul layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((a) => (
              <motion.li
                key={a.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
              >
                <ArticleCard article={a} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {list.length === 0 && <p className="mt-8 text-center text-slate">Aucun article dans cette catégorie pour le moment.</p>}
      </Section>

      <CTABand
        eyebrow="Un sujet en tête ?"
        title="Parlons de votre projet digital."
        description="Nos équipes vous conseillent sur la meilleure approche technique pour votre activité."
      />
    </>
  )
}
