import type { NavItem } from '@/types'
import { services, serviceHref } from './services'
import { Briefcase, Building, Newspaper } from 'lucide-react'

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
  },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Projets', href: '/projets' },
  {
    label: 'À propos',
    href: '/a-propos',
    children: [
      { label: 'À propos', href: '/a-propos', description: 'Notre histoire, notre mission et nos valeurs.', icon: Building },
      { label: 'Carrières', href: '/carrieres', description: 'Rejoignez une équipe qui construit l’avenir numérique.', icon: Briefcase },
      { label: 'Insights', href: '/insights', description: 'Analyses et conseils de nos ingénieurs.', icon: Newspaper },
    ],
  },
  { label: 'Insights', href: '/insights' },
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

export const START_PROJECT_HREF = '/demarrer-un-projet'
