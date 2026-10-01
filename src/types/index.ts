import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Shared                                                              */
/* ------------------------------------------------------------------ */

export interface Feature {
  title: string
  description: string
  icon?: LucideIcon
}

export interface Stat {
  value: number
  suffix?: string
  /** Displayed verbatim instead of an animated counter (e.g. "24/7"). */
  display?: string
  label: string
  caption: string
  icon: LucideIcon
}

export interface ProcessStep {
  title: string
  description: string
  icon: LucideIcon
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavChild {
  label: string
  href: string
  description: string
  icon: LucideIcon
}

export interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export interface Service {
  slug: string
  title: string
  /** Short label used in navigation and chips. */
  shortTitle: string
  tagline: string
  description: string
  longDescription: string
  icon: LucideIcon
  technologies: string[]
  features: Feature[]
  deliverables: string[]
  highlights: string[]
}

/* ------------------------------------------------------------------ */
/* Technologies                                                        */
/* ------------------------------------------------------------------ */

export type TechnologyCategory =
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Base de données'
  | 'Cloud & DevOps'
  | 'IA & Data'
  | 'ERP'
  | 'Outils'

export interface Technology {
  name: string
  category: TechnologyCategory
  /** Short monogram displayed inside the technology tile. */
  mono: string
  /** Brand color used for the monogram tile. */
  color: string
  /** Optional foreground override for light brand colors. */
  foreground?: string
}

/* ------------------------------------------------------------------ */
/* Industries                                                          */
/* ------------------------------------------------------------------ */

export interface Industry {
  slug: string
  name: string
  icon: LucideIcon
  headline: string
  description: string
  solutions: string[]
  challenges: string[]
  /** Product mockup rendered for the industry. */
  visual: ScreenVariant
  theme: ProjectTheme
}

export interface SolutionCategory {
  title: string
  description: string
  icon: LucideIcon
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectCategory = 'Web' | 'Mobile' | 'IA' | 'Entreprise' | 'Cloud'

export type ScreenVariant =
  | 'dashboard'
  | 'landing'
  | 'mobile'
  | 'table'
  | 'analytics'
  | 'catalog'
  | 'learning'
  | 'chat'
  | 'code'

export interface ProjectTheme {
  /** Screen background. */
  bg: string
  /** Cards / panels background. */
  surface: string
  /** Primary accent. */
  accent: string
  /** Secondary accent. */
  accent2: string
  /** Primary text color within the screen. */
  text: string
  /** Muted text / placeholder bars. */
  muted: string
  /** Sidebar / navigation background. */
  nav: string
}

export interface GalleryItem {
  id: string
  title: string
  caption: string
  variant: ScreenVariant
  device: 'laptop' | 'phone'
}

export interface ArchitectureLayer {
  layer: string
  items: string[]
}

export interface ProjectOutcome {
  title: string
  description: string
}

export interface Project {
  slug: string
  title: string
  /** Short product type, e.g. "Application web". */
  type: string
  categories: ProjectCategory[]
  industry: string
  year: number
  summary: string
  description: string
  problem: string
  solution: string
  features: Feature[]
  technologies: string[]
  architecture: ArchitectureLayer[]
  outcomes: ProjectOutcome[]
  gallery: GalleryItem[]
  theme: ProjectTheme
  cover: { variant: ScreenVariant; device: 'laptop' | 'phone' | 'both' }
  featured: boolean
}

/* ------------------------------------------------------------------ */
/* Careers & Insights                                                  */
/* ------------------------------------------------------------------ */

export type EmploymentType = 'CDI' | 'CDD' | 'Stage' | 'Freelance'

export interface Job {
  slug: string
  title: string
  department: string
  location: string
  type: EmploymentType
  mode: 'Sur site' | 'Hybride' | 'Télétravail'
  level: string
  summary: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
}

export interface ArticleSection {
  heading?: string
  paragraphs: string[]
  list?: string[]
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: 'Transformation digitale' | 'Développement' | 'IA & Data' | 'Cloud' | 'Entreprise'
  date: string
  readTime: number
  author: string
  cover: { variant: ScreenVariant; theme: ProjectTheme }
  content: ArticleSection[]
}

/* ------------------------------------------------------------------ */
/* Forms & domain records                                              */
/* ------------------------------------------------------------------ */

export type { ContactRequest, NewsletterRequest } from '@/lib/validation'

/**
 * Reservation record used by hospitality solutions (e.g. Restaurant Elegance).
 * Kept here so the future client portal can share the same contract.
 */
export interface Reservation {
  id: string
  customerName: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  notes?: string
  status: 'pending' | 'confirmed' | 'cancelled'
}
