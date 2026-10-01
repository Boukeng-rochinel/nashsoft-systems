import {
  Briefcase,
  Building,
  Calculator,
  GraduationCap,
  HeartPulse,
  Hotel,
  Landmark,
  Megaphone,
  Package,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Bus,
  Cog,
} from 'lucide-react'
import type { Industry, SolutionCategory } from '@/types'
import { themes } from './themes'

export const industries: Industry[] = [
  {
    slug: 'education',
    name: 'Éducation',
    icon: GraduationCap,
    headline: 'Modernisez l’éducation avec le numérique',
    description:
      'Plateformes d’apprentissage, gestion des établissements, suivi des étudiants, e-learning et communication avec les parents.',
    solutions: ['Plateforme e-learning', 'Gestion des étudiants et des notes', 'Suivi des formations', 'Portail parents'],
    challenges: ['Suivi pédagogique dispersé', 'Communication école-famille', 'Accès aux cours à distance'],
    visual: 'learning',
    theme: themes.edutek,
  },
  {
    slug: 'finance',
    name: 'Finance',
    icon: Landmark,
    headline: 'Des outils financiers sécurisés et temps réel',
    description:
      'Solutions sécurisées pour gérer vos finances, vos opérations et vos clients : microfinance, tontines digitales, reporting et conformité.',
    solutions: ['Gestion des comptes et crédits', 'Paiements Mobile Money', 'Tableaux de bord financiers', 'Reporting réglementaire'],
    challenges: ['Sécurité des transactions', 'Rapprochements manuels', 'Visibilité en temps réel'],
    visual: 'analytics',
    theme: themes.finance,
  },
  {
    slug: 'sante',
    name: 'Santé',
    icon: HeartPulse,
    headline: 'Améliorez la qualité des soins',
    description:
      'Dossiers patients, prise de rendez-vous, gestion de pharmacie et télé-suivi pour les cliniques, hôpitaux et laboratoires.',
    solutions: ['Dossier patient informatisé', 'Prise de rendez-vous en ligne', 'Gestion de pharmacie et stocks', 'Facturation et assurances'],
    challenges: ['Dossiers papier', 'Files d’attente', 'Traçabilité des médicaments'],
    visual: 'dashboard',
    theme: themes.health,
  },
  {
    slug: 'retail',
    name: 'Retail',
    icon: ShoppingBag,
    headline: 'Vendez plus, en boutique et en ligne',
    description:
      'Caisse, gestion des stocks, e-commerce et fidélisation : une vision unifiée de vos ventes et de vos clients.',
    solutions: ['Point de vente (POS)', 'Gestion des stocks multi-sites', 'Boutique e-commerce', 'Programme de fidélité'],
    challenges: ['Ruptures de stock', 'Ventes non tracées', 'Canaux déconnectés'],
    visual: 'catalog',
    theme: themes.retail,
  },
  {
    slug: 'logistique',
    name: 'Logistique',
    icon: Truck,
    headline: 'Pilotez votre chaîne logistique en temps réel',
    description:
      'Suivi des flottes et des livraisons, gestion d’entrepôt et optimisation des trajets pour réduire vos coûts.',
    solutions: ['Suivi GPS des livraisons', 'Gestion d’entrepôt', 'Optimisation des tournées', 'Preuve de livraison mobile'],
    challenges: ['Visibilité des colis', 'Coûts de carburant', 'Coordination des chauffeurs'],
    visual: 'table',
    theme: themes.logistics,
  },
  {
    slug: 'hotellerie',
    name: 'Hôtellerie',
    icon: Hotel,
    headline: 'Une expérience client mémorable',
    description:
      'Réservations en ligne, gestion des chambres et des tables, menus digitaux et avis clients pour hôtels et restaurants.',
    solutions: ['Réservation en ligne', 'Gestion des chambres et des tables', 'Menu digital et commandes', 'Avis et fidélisation'],
    challenges: ['Réservations par téléphone', 'Double réservation', 'Visibilité en ligne'],
    visual: 'landing',
    theme: themes.restaurant,
  },
  {
    slug: 'gouvernement',
    name: 'Gouvernement',
    icon: Building,
    headline: 'Des services publics plus efficaces',
    description:
      'Dématérialisation des procédures, portails citoyens et outils de gestion pour une administration plus efficace et transparente.',
    solutions: ['Portails citoyens', 'Dématérialisation des démarches', 'Gestion documentaire', 'Tableaux de bord de pilotage'],
    challenges: ['Procédures papier', 'Délais de traitement', 'Transparence'],
    visual: 'table',
    theme: themes.government,
  },
  {
    slug: 'services-professionnels',
    name: 'Services professionnels',
    icon: Briefcase,
    headline: 'Concentrez-vous sur vos clients',
    description:
      'CRM, facturation, gestion de projets et portails clients pour cabinets, agences et sociétés de services.',
    solutions: ['CRM et suivi commercial', 'Facturation et devis', 'Gestion de projets et du temps', 'Portail client sécurisé'],
    challenges: ['Suivi client dispersé', 'Facturation manuelle', 'Temps non facturé'],
    visual: 'chat',
    theme: themes.services,
  },
]

export const solutionCategories: SolutionCategory[] = [
  { title: 'Gestion d’entreprise', description: 'Des solutions pour optimiser votre gestion quotidienne et améliorer votre productivité.', icon: Briefcase },
  { title: 'ERP', description: 'Une suite intégrée pour gérer vos processus métiers de bout en bout.', icon: Cog },
  { title: 'E-commerce', description: 'Vendez en ligne avec une plateforme sécurisée, rapide et performante.', icon: ShoppingCart },
  { title: 'Éducation', description: 'Des solutions digitales pour moderniser l’apprentissage et la formation.', icon: GraduationCap },
  { title: 'Santé', description: 'Des outils pour améliorer la qualité des soins et la gestion des structures médicales.', icon: HeartPulse },
  { title: 'Finance', description: 'Des solutions sécurisées pour gérer vos finances et vos opérations.', icon: Landmark },
  { title: 'Logistique', description: 'Optimisez votre chaîne logistique et suivez vos opérations en temps réel.', icon: Package },
  { title: 'Hôtellerie & Restauration', description: 'Gérez vos réservations, votre stock et l’expérience client.', icon: Hotel },
  { title: 'Secteur public', description: 'Des solutions pour une administration plus efficace et plus transparente.', icon: Building },
  { title: 'Transport', description: 'Gestion des flottes, suivi des livraisons et optimisation des trajets.', icon: Bus },
  { title: 'Comptabilité', description: 'Facturation, trésorerie et reporting financier automatisés.', icon: Calculator },
  { title: 'Média & Communication', description: 'Des outils pour créer, diffuser et gérer vos contenus digitaux.', icon: Megaphone },
]
