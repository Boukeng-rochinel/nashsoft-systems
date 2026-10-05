import type { Article, Project, Service } from '@/types'
import { site } from './site'
import { services, serviceHref } from './services'
import { projects, projectHref } from './projects'
import { articles, articleHref } from './articles'

/**
 * Page metadata, shared by the pages (usePageMeta) and the build step that
 * writes per-route HTML heads and sitemap.xml (see `seo()` in vite.config.ts).
 */
export interface PageSeo {
  title: string
  description: string
  /** Absolute path under public/ — used for Open Graph / Twitter cards. */
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

export const DEFAULT_OG_IMAGE = '/images/hero-home.webp'

export const formatTitle = (title: string) => (title === site.name ? `${site.name} — Ideas · Code · Solutions` : `${title} | ${site.name}`)

export const pageSeo = {
  home: { title: site.name, description: site.description },
  services: {
    title: 'Services',
    description:
      'Développement logiciel, web et mobile, IA, cloud & DevOps, data, cybersécurité, transformation digitale et conseil IT : les expertises de Nashsoft Systems.',
    image: '/images/hero-services.webp',
  },
  aiData: {
    title: 'IA & Data',
    description:
      'Transformez vos données en intelligence : machine learning, vision par ordinateur, analyse prédictive, automatisation et tableaux de bord avec Nashsoft Systems.',
    image: '/images/hero-ai.webp',
  },
  cloud: {
    title: 'Cloud & Infrastructure',
    description:
      'Déploiement cloud, Docker, CI/CD, supervision, sauvegardes et sécurité : Nashsoft Systems conçoit et exploite une infrastructure fiable pour vos applications.',
    image: '/images/hero-cloud.webp',
  },
  solutions: {
    title: 'Solutions',
    description:
      'Solutions digitales sur mesure pour l’éducation, la finance, la santé, le retail, la logistique, l’hôtellerie et le secteur public : ERP, e-commerce, gestion d’entreprise et plus.',
    image: '/images/hero-solutions.webp',
  },
  projects: {
    title: 'Projets',
    description:
      'Applications web, mobiles, IA et logiciels d’entreprise : découvrez les réalisations de Nashsoft Systems — Restaurant Elegance, AutoFix Car, IGWork, Eduteklearn et plus.',
    image: '/images/hero-projects.webp',
  },
  about: {
    title: 'À propos',
    description:
      'Nashsoft Systems est une entreprise technologique basée à Douala qui conçoit des solutions digitales innovantes pour accompagner les entreprises et organisations dans leur transformation numérique.',
    image: '/images/hero-about.webp',
  },
  careers: {
    title: 'Carrières',
    description: 'Rejoignez Nashsoft Systems à Douala : postes ouverts en développement web, mobile, backend, design UI/UX et stages.',
    image: '/images/hero-careers.webp',
  },
  insights: {
    title: 'Insights',
    description: 'Analyses, guides et retours d’expérience des ingénieurs Nashsoft Systems : transformation digitale, développement, IA, cloud et entreprise.',
    image: '/images/hero-insights.webp',
  },
  startProject: {
    title: 'Démarrer un projet',
    description:
      'Parlez-nous de votre projet : site web, application mobile, logiciel d’entreprise, IA ou cloud. Réponse sous 24 h ouvrées et devis gratuit par Nashsoft Systems.',
  },
  contact: {
    title: 'Contact',
    description: `Contactez Nashsoft Systems à ${site.contact.city} : ${site.contact.email} · ${site.contact.phone}. Une question, un projet ou un partenariat ? Nous vous répondons sous 24 h ouvrées.`,
    image: '/images/hero-contact.webp',
  },
  notFound: { title: 'Page introuvable', description: 'La page demandée n’existe pas ou a été déplacée.', noindex: true },
} satisfies Record<string, PageSeo>

export const serviceSeo = (s: Service): PageSeo => ({ title: s.title, description: `${s.tagline} ${s.description}`, image: s.image })

export const projectSeo = (p: Project): PageSeo => ({ title: `${p.title} — Étude de cas`, description: p.summary, image: p.image, type: 'article' })

export const articleSeo = (a: Article): PageSeo => ({ title: a.title, description: a.excerpt, image: a.image, type: 'article' })

export interface SeoRoute extends PageSeo {
  path: string
  /** YYYY-MM-DD; omitted when the page has no meaningful content date. */
  lastmod?: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

/** Services with a dedicated page instead of the generic service template. */
const dedicatedServicePages: Record<string, PageSeo> = { 'ia-data': pageSeo.aiData, 'cloud-devops': pageSeo.cloud }

/** Every indexable URL of the site — the source for sitemap.xml and pre-rendered heads. */
export function seoRoutes(): SeoRoute[] {
  const latestArticle = articles.map((a) => a.date).sort().at(-1)
  return [
    { path: '/', ...pageSeo.home, changefreq: 'weekly', priority: 1 },
    { path: '/services', ...pageSeo.services, changefreq: 'monthly', priority: 0.9 },
    ...services.map((s) => ({
      path: serviceHref(s.slug),
      ...(dedicatedServicePages[s.slug] ?? serviceSeo(s)),
      changefreq: 'monthly' as const,
      priority: 0.8,
    })),
    { path: '/solutions', ...pageSeo.solutions, changefreq: 'monthly', priority: 0.8 },
    { path: '/projets', ...pageSeo.projects, changefreq: 'monthly', priority: 0.8 },
    ...projects.map((p) => ({ path: projectHref(p.slug), ...projectSeo(p), changefreq: 'yearly' as const, priority: 0.7 })),
    { path: '/a-propos', ...pageSeo.about, changefreq: 'yearly', priority: 0.6 },
    { path: '/carrieres', ...pageSeo.careers, changefreq: 'monthly', priority: 0.6 },
    { path: '/insights', ...pageSeo.insights, lastmod: latestArticle, changefreq: 'weekly', priority: 0.7 },
    ...articles.map((a) => ({ path: articleHref(a.slug), ...articleSeo(a), lastmod: a.date, changefreq: 'yearly' as const, priority: 0.6 })),
    { path: '/demarrer-un-projet', ...pageSeo.startProject, changefreq: 'yearly', priority: 0.9 },
    { path: '/contact', ...pageSeo.contact, changefreq: 'yearly', priority: 0.7 },
  ]
}
