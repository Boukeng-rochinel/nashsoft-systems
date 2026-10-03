import type { NavItem, NavLinkItem } from '@/types'
import { services, serviceHref } from './services'
import { industries } from './industries'
import { projects, projectHref } from './projects'
import { Briefcase, Building, Mail, Newspaper, Package } from 'lucide-react'

export const START_PROJECT_HREF = '/demarrer-un-projet'

export const industryHref = (slug: string) => `/solutions?secteur=${slug}#secteurs`

const serviceLinks = (slugs: string[]): NavLinkItem[] =>
  slugs.map((slug) => {
    const s = services.find((x) => x.slug === slug)
    if (!s) throw new Error(`Unknown service slug: ${slug}`)
    return { label: s.title, href: serviceHref(s.slug) }
  })

const latestYear = Math.max(...projects.map((p) => p.year))

/** Order follows the reference designs: Accueil · Services · Solutions · Projets · À propos · Insights · Contact. */
export const primaryNav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: services.slice(0, 7).map((s) => ({
      label: s.title,
      href: serviceHref(s.slug),
      description: s.description,
      icon: s.icon,
    })),
    menu: {
      kind: 'links',
      columns: [
        [
          { title: 'Développement', links: serviceLinks(['developpement-logiciel', 'developpement-web', 'applications-mobiles']) },
          { title: 'Conseil', links: serviceLinks(['transformation-digitale', 'conseil-it']) },
        ],
        [{ title: 'Data & Infrastructure', links: serviceLinks(['ia-data', 'cloud-devops', 'data-engineering', 'cybersecurite']) }],
        [
          {
            title: 'Solutions par secteur',
            split: true,
            links: industries.map((i) => ({ label: i.name, href: industryHref(i.slug) })),
          },
        ],
      ],
      cta: { label: 'Tous nos services', href: '/services' },
    },
  },
  { label: 'Solutions', href: '/solutions' },
  {
    label: 'Produits',
    href: '/projets',
    children: projects.map((p) => ({ label: p.title, href: projectHref(p.slug), description: p.summary, icon: Package })),
    menu: {
      kind: 'products',
      products: projects.map((p) => ({
        title: p.title,
        summary: p.summary,
        meta: `${p.industry} · ${p.technologies.slice(0, 3).join(', ')}`,
        href: projectHref(p.slug),
        isNew: p.year === latestYear,
      })),
      cta: { label: 'Voir toutes nos réalisations', href: '/projets' },
    },
  },
  {
    label: 'À propos',
    href: '/a-propos',
    children: [
      { label: 'À propos', href: '/a-propos', description: 'Notre histoire, notre mission et nos valeurs.', icon: Building },
      { label: 'Carrières', href: '/carrieres', description: 'Rejoignez une équipe qui construit l’avenir numérique.', icon: Briefcase },
      { label: 'Insights', href: '/insights', description: 'Analyses et conseils de nos ingénieurs.', icon: Newspaper },
      { label: 'Contact', href: '/contact', description: 'Écrivez-nous ou passez nous voir à Douala.', icon: Mail },
    ],
    menu: {
      kind: 'brand',
      groups: [
        {
          title: 'Entreprise',
          links: [
            { label: 'Qui sommes-nous', href: '/a-propos' },
            { label: 'Carrières', href: '/carrieres' },
            { label: 'Contact', href: '/contact' },
          ],
        },
        {
          title: 'Ressources',
          links: [
            { label: 'Insights', href: '/insights' },
            { label: 'Réalisations', href: '/projets' },
            { label: 'Solutions', href: '/solutions' },
          ],
        },
      ],
      cta: { label: 'Démarrer un projet', href: START_PROJECT_HREF },
    },
  },
  { label: 'Contact', href: '/contact' },
]

export const footerNav = {
  navigation: [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Projets', href: '/projets' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Carrières', href: '/carrieres' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  services: services.slice(0, 6).map((s) => ({ label: s.title, href: serviceHref(s.slug) })),
  legal: [
    { label: 'Politique de confidentialité', href: '/confidentialite' },
    { label: 'Conditions d’utilisation', href: '/conditions' },
  ],
}
