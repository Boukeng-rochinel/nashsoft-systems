import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import type { Article } from '@/types'
import { articleHref, formatDate } from '@/data/articles'
import { cn } from '@/lib/cn'

/** Insight card: photo, category, title, excerpt, date and reading time. */
export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      to={articleHref(article.slug)}
      className={cn(
        'group flex h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        featured ? 'flex-col lg:flex-row' : 'flex-col',
      )}
    >
      <div className={cn('relative overflow-hidden bg-mist', featured ? 'aspect-[16/10] lg:aspect-auto lg:w-[55%]' : 'aspect-[16/10]')}>
        <img
          src={article.image}
          alt=""
          width={1200}
          height={750}
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand shadow-card">{article.category}</span>
      </div>
      <div className={cn('flex flex-1 flex-col', featured ? 'p-7 lg:p-10' : 'p-6')}>
        <p className="flex items-center gap-2 text-xs text-slate">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden>·</span>
          <Clock aria-hidden className="size-3.5" />
          {article.readTime} min de lecture
        </p>
        <h3 className={cn('mt-3 font-display font-bold text-navy', featured ? 'text-2xl leading-tight lg:text-[1.9rem]' : 'text-lg leading-snug')}>{article.title}</h3>
        <p className={cn('mt-3 flex-1 leading-relaxed text-slate', featured ? 'text-base' : 'text-sm')}>{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Lire l’article <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
