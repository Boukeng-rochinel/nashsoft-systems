import {
  MonitorCog,
  Award,
  Boxes,
  Cpu,
  Gem,
  Handshake,
  Headphones,
  Layers,
  LifeBuoy,
  Rocket,
  Search,
  PenTool,
  CodeXml,
  TestTubeDiagonal,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Target,
  Eye,
  Users,
} from 'lucide-react'
import type { Feature, LinkFeature, ProcessStep, Stat } from '@/types'

export const site = {
  name: 'Nashsoft Systems',
  tagline: 'IDEAS · CODE · SOLUTIONS',
  url: 'https://nashsoft.orviat.com',
  description:
    'Nashsoft Systems conçoit et développe des logiciels, plateformes web et mobiles ainsi que des solutions innovantes pour aider les entreprises et organisations à atteindre leurs objectifs.',
  logo: {
    /** Original brand file supplied by Nashsoft Systems (opaque light background). */
    original: '/logo/logo.png',
    /** Same lockup with the background removed — used on light surfaces. */
    lockup: '/logo/logo-transparent.png',
    /** "N" mark only — used on dark surfaces with a light wordmark, and as favicon. */
    mark: '/logo/logo-mark.png',
  },
  contact: {
    email: 'contact@nashsoft.cm',
    careersEmail: 'contact@nashsoft.cm',
    phone: '+237 6 72 34 56 78',
    phoneHref: 'tel:+237672345678',
    city: 'Douala, Cameroun',
    hours: 'Lun – Ven · 8h00 – 18h00 (WAT)',
  },
  /**
   * Social profiles. Leave a URL empty to hide the icon.
   * Only configured profiles are rendered in the footer.
   */
  social: {
    linkedin: '',
    github: '',
    x: '',
    youtube: '',
  },
  foundedIn: 'Douala',
} as const

export const stats: Stat[] = [
  { value: 15, suffix: '+', label: 'Projets réalisés', caption: 'Des solutions qui font la différence', icon: Rocket },
  { value: 10, suffix: '+', label: 'Technologies', caption: 'Des outils modernes et performants', icon: Cpu },
  { value: 5, suffix: '+', label: 'Secteurs d’activité', caption: 'Une expertise multisectorielle', icon: Layers },
  { value: 24, display: '24/7', label: 'Support digital', caption: 'Toujours à vos côtés', icon: Headphones },
]

export const heroHighlights: Feature[] = [
  { title: 'Solutions sur mesure', description: 'À vos besoins', icon: Boxes },
  { title: 'Technologies modernes', description: 'Et performantes', icon: ShieldCheck },
  { title: 'Équipe d’experts', description: 'Passionnés', icon: Users },
  { title: 'Accompagnement', description: 'Long terme', icon: LifeBuoy },
]

export const processSteps: ProcessStep[] = [
  { title: 'Découverte', description: 'Analyse de vos besoins, de vos utilisateurs et de vos objectifs.', icon: Search },
  { title: 'Conception', description: 'Design UX/UI, prototypes et architecture technique.', icon: PenTool },
  { title: 'Développement', description: 'Codage itératif, revues de code et intégration continue.', icon: CodeXml },
  { title: 'Tests', description: 'Validation qualité, performance et sécurité.', icon: TestTubeDiagonal },
  { title: 'Déploiement', description: 'Mise en production, configuration et formation.', icon: Rocket },
  { title: 'Évolution', description: 'Support, maintenance et croissance continue.', icon: TrendingUp },
]

export const whyNashsoft: LinkFeature[] = [
  {
    title: 'Solutions sur mesure',
    description: 'Chaque projet est unique. Nous concevons des solutions adaptées à vos objectifs, à votre secteur et à votre budget.',
    icon: CodeXml,
    href: '/solutions',
  },
  {
    title: 'Technologies modernes',
    description: 'React, TypeScript, Flutter, Node.js, Python, cloud : un stack éprouvé pour des produits rapides et évolutifs.',
    icon: MonitorCog,
    href: '/services',
  },
  {
    title: 'Ingénierie rigoureuse',
    description: 'Architecture claire, code revu, tests automatisés et documentation : la qualité est intégrée dès le départ.',
    icon: ShieldCheck,
    href: '/projets',
  },
  {
    title: 'Accompagnement durable',
    description: 'Nous restons à vos côtés après la livraison : maintenance, évolutions et conseils pour faire grandir votre produit.',
    icon: Handshake,
    href: '/a-propos',
  },
]

export const values: Feature[] = [
  { title: 'Excellence', description: 'Nous visons la qualité dans tout ce que nous faisons, du code à la relation client.', icon: Gem },
  { title: 'Innovation', description: 'Nous explorons constamment de nouvelles possibilités technologiques.', icon: Sparkles },
  { title: 'Engagement', description: 'Nous sommes engagés à vos côtés, à chaque étape de votre projet.', icon: Handshake },
  { title: 'Intégrité', description: 'Nous bâtissons des relations durables fondées sur la transparence et la confiance.', icon: ShieldCheck },
]

export const missionVision: Feature[] = [
  {
    title: 'Notre mission',
    description:
      'Développer des solutions technologiques innovantes et accessibles, qui répondent aux besoins réels de nos clients et contribuent au développement du numérique en Afrique.',
    icon: Target,
  },
  {
    title: 'Notre vision',
    description:
      'Devenir une référence en Afrique centrale dans le domaine des solutions digitales, reconnue pour son expertise, son innovation et son impact positif sur la société.',
    icon: Eye,
  },
]

export const teamDisciplines: Feature[] = [
  { title: 'Développeurs', description: 'Web, mobile et backend, experts des technologies modernes.', icon: CodeXml },
  { title: 'Designers UI/UX', description: 'Des interfaces claires, accessibles et qui ont du sens.', icon: PenTool },
  { title: 'Chefs de projet', description: 'Planification, communication et livraison dans les délais.', icon: Award },
  { title: 'Experts cloud & IA', description: 'Infrastructure fiable et intelligence appliquée à vos données.', icon: Cpu },
]
