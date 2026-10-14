import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import type { Article } from '@/types'
import { articles, formatDate, getArticleBySlug } from '@/data/articles'
import { usePageMeta } from '@/hooks/usePageMeta'
import { articleSeo } from '@/data/seo'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { PageHero } from '@/components/sections/PageHero'
import { Reveal } from '@/components/ui/Reveal'
import { ArticleCard } from '@/components/sections/ArticleCard'
import { CTABand } from '@/components/sections/CTABand'

function ArticleView({ article }: { article: Article }) {
  usePageMeta(articleSeo(article))
  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category)
  const more = (related.length >= 3 ? related : [...related, ...articles.filter((a) => a.slug !== article.slug && a.category !== article.category)]).slice(0, 3)

  return (
    <>
      <article>
        <PageHero
          breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Insights', href: '/insights' }, { label: article.category }]}
          eyebrow={article.category}
          image={article.image}
          title={article.title}
          description={
            <>
              {article.excerpt}
              <span className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-300">
                <span className="font-semibold text-white">{article.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock aria-hidden className="size-4" />
                  {article.readTime} min de lecture
                </span>
              </span>
            </>
          }
        />

        <Container className="py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <Reveal className="space-y-10">
              {article.content.map((section, i) => (
                <section key={section.heading ?? i}>
                  {section.heading && <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">{section.heading}</h2>}
                  <div className={section.heading ? 'mt-4 space-y-4' : 'space-y-4'}>
                    {section.paragraphs.map((p) => (
                      <p key={p} className={i === 0 && !section.heading ? 'text-lg leading-relaxed text-navy/85' : 'leading-[1.8] text-[#3c4a5f]'}>
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.list && (
                    <ul className="mt-4 space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3 leading-relaxed text-[#3c4a5f]">
                          <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </Reveal>
            <Link to="/insights" className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-600">
              <ArrowLeft aria-hidden className="size-4" />
              Tous les articles
            </Link>
          </div>
        </Container>
      </article>

      {more.length > 0 && (
        <Section tone="light">
          <h2 className="font-display text-2xl font-bold text-navy">À lire aussi</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Section>
      )}

      <CTABand />
    </>
  )
}

export default function ArticlePage() {
  const { slug = '' } = useParams()
  const article = getArticleBySlug(slug)
  if (!article) return <Navigate to="/404" replace />
  return <ArticleView key={article.slug} article={article} />
}
