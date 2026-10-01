import {
  BadgeCheck,
  CalendarCheck,
  ChartColumn,
  ClipboardList,
  CookingPot,
  FileText,
  GraduationCap,
  ClockFading,
  LayoutDashboard,
  MapPin,
  MessageSquareQuote,
  MonitorSmartphone,
  Package,
  Palette,
  ScanSearch,
  ShoppingCart,
  Trophy,
  UtensilsCrossed,
  Wallet,
  Gauge,
  Search,
  Send,
  Cable,
} from 'lucide-react'
import type { Project, ProjectCategory } from '@/types'
import { themes } from './themes'

export const projectCategories: Array<'Tous' | ProjectCategory> = ['Tous', 'Web', 'Mobile', 'IA', 'Entreprise', 'Cloud']

export const projects: Project[] = [
  {
    slug: 'restaurant-elegance',
    image: '/images/project-restaurant.webp',
    imageAlt: 'Assiette gastronomique dressée dans un restaurant',
    title: 'Restaurant Elegance',
    type: 'Application web',
    categories: ['Web'],
    industry: 'Restauration',
    year: 2025,
    summary: 'Site de réservation de restaurant avec une expérience utilisateur élégante et moderne.',
    description:
      'Restaurant Elegance est une plateforme de réservation en ligne conçue pour offrir une expérience culinaire unique. Les clients découvrent le menu, réservent une table et partagent leur avis ; l’équipe gère les réservations depuis un tableau de bord dédié.',
    problem:
      'Les réservations se faisaient uniquement par téléphone, entraînant des oublis, des doubles réservations et une faible visibilité en ligne. Le menu, imprimé, était difficile à mettre à jour.',
    solution:
      'Un site web premium, rapide et responsive, doté d’un moteur de réservation en temps réel, d’un menu en ligne administrable et d’un back-office pour gérer les tables, les créneaux et les avis clients.',
    features: [
      { title: 'Réservation de tables', description: 'Choix de la date, du créneau et du nombre de convives avec confirmation instantanée.', icon: CalendarCheck },
      { title: 'Menu en ligne', description: 'Carte administrable avec photos, catégories et allergènes.', icon: UtensilsCrossed },
      { title: 'Avis clients', description: 'Collecte et modération des avis pour renforcer la confiance.', icon: MessageSquareQuote },
      { title: 'Design élégant', description: 'Une identité visuelle raffinée, fidèle à l’expérience en salle.', icon: Palette },
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Vercel'],
    architecture: [
      { layer: 'Interface', items: ['React + TypeScript', 'Tailwind CSS', 'Animations Framer Motion'] },
      { layer: 'API', items: ['Node.js / Express', 'Validation des réservations', 'Notifications e-mail'] },
      { layer: 'Données', items: ['PostgreSQL', 'Créneaux & tables', 'Avis clients'] },
      { layer: 'Hébergement', items: ['Vercel (frontend)', 'Serveur API managé', 'CDN images'] },
    ],
    outcomes: [
      { title: 'Réservations 24/7', description: 'Les clients réservent à toute heure, sans appel téléphonique.' },
      { title: 'Zéro double réservation', description: 'Les créneaux sont verrouillés en temps réel.' },
      { title: 'Menu toujours à jour', description: 'L’équipe modifie la carte en quelques secondes.' },
    ],
    gallery: [
      { id: 're-1', title: 'Page d’accueil', caption: 'Hero immersif et mise en avant des plats signatures.', variant: 'landing', device: 'laptop' },
      { id: 're-2', title: 'Menu en ligne', caption: 'Carte par catégories avec photos et prix.', variant: 'catalog', device: 'laptop' },
      { id: 're-3', title: 'Réservation mobile', caption: 'Parcours de réservation optimisé pour smartphone.', variant: 'mobile', device: 'phone' },
      { id: 're-4', title: 'Back-office', caption: 'Gestion des réservations et du plan de salle.', variant: 'table', device: 'laptop' },
    ],
    theme: themes.restaurant,
    cover: { variant: 'landing', device: 'both' },
    featured: true,
  },
  {
    slug: 'autofix-car',
    image: '/images/project-autofix.webp',
    imageAlt: 'Mécanicien inspectant le moteur d’un véhicule',
    title: 'AutoFix Car',
    type: 'Application mobile',
    categories: ['Mobile', 'IA'],
    industry: 'Automobile',
    year: 2025,
    summary: 'Application mobile de diagnostic automobile avec IA et intégration OBD-II.',
    description:
      'AutoFix Car est une application mobile qui utilise l’IA et la reconnaissance d’images pour interpréter les voyants du tableau de bord et les bruits du moteur, et fournir des diagnostics détaillés, même hors ligne.',
    problem:
      'Face à un voyant allumé ou un bruit suspect, les conducteurs ne savent pas s’il faut s’inquiéter ni à qui s’adresser, et subissent parfois des réparations inutiles.',
    solution:
      'Une application Flutter qui combine un modèle de vision embarqué (TensorFlow Lite) pour reconnaître les voyants, l’analyse audio des bruits moteur, la lecture OBD-II et la localisation des mécaniciens à proximité.',
    features: [
      { title: 'Diagnostic par IA', description: 'Reconnaissance des voyants et analyse des sons du moteur.', icon: ScanSearch },
      { title: 'OBD-II', description: 'Lecture des codes défauts via un adaptateur Bluetooth.', icon: Cable },
      { title: 'Historique des diagnostics', description: 'Suivi de l’état du véhicule dans le temps.', icon: ClockFading },
      { title: 'Localisation de mécaniciens', description: 'Garages recommandés à proximité via Google Maps.', icon: MapPin },
    ],
    technologies: ['Flutter', 'Firebase', 'TensorFlow Lite', 'PostgreSQL', 'Cloudinary'],
    architecture: [
      { layer: 'Application', items: ['Flutter (iOS & Android)', 'Caméra & micro', 'Bluetooth OBD-II'] },
      { layer: 'IA embarquée', items: ['TensorFlow Lite', 'Classification des voyants', 'Analyse audio'] },
      { layer: 'Backend', items: ['Firebase Auth', 'Cloud Functions', 'PostgreSQL'] },
      { layer: 'Services', items: ['Cloudinary (médias)', 'Google Maps', 'Notifications push'] },
    ],
    outcomes: [
      { title: 'Diagnostic hors ligne', description: 'Le modèle embarqué fonctionne sans connexion.' },
      { title: 'Décisions éclairées', description: 'Le conducteur comprend la gravité avant de consulter.' },
      { title: 'Mise en relation', description: 'Accès direct à des mécaniciens de confiance.' },
    ],
    gallery: [
      { id: 'af-1', title: 'Tableau de bord', caption: 'État du véhicule et raccourcis de diagnostic.', variant: 'mobile', device: 'phone' },
      { id: 'af-2', title: 'Analyse IA', caption: 'Résultat de la reconnaissance d’un voyant.', variant: 'analytics', device: 'phone' },
      { id: 'af-3', title: 'Historique', caption: 'Chronologie des diagnostics et interventions.', variant: 'table', device: 'phone' },
      { id: 'af-4', title: 'Console d’administration', caption: 'Suivi des modèles et des retours utilisateurs.', variant: 'dashboard', device: 'laptop' },
    ],
    theme: themes.autofix,
    cover: { variant: 'mobile', device: 'phone' },
    featured: true,
  },
  {
    slug: 'igwork',
    image: '/images/project-igwork.webp',
    imageAlt: 'Freelance travaillant sur un ordinateur portable',
    title: 'IGWork / Hustlers DEV WAR',
    type: 'Plateforme web',
    categories: ['Web', 'Entreprise'],
    industry: 'Freelancing',
    year: 2025,
    summary: 'Plateforme de freelancing pour le marché camerounais, alternative locale à Upwork et Fiverr.',
    description:
      'IGWork met en relation les talents freelances et les entreprises. La plateforme offre un espace sécurisé pour publier des missions, recevoir des propositions, suivre les projets et payer via Mobile Money. Hustlers DEV WAR y ajoute des compétitions de développement.',
    problem:
      'Les freelances camerounais peinent à accéder aux plateformes internationales (paiements, vérification, frais) et les entreprises locales manquent d’un canal fiable pour trouver des talents vérifiés.',
    solution:
      'Une marketplace complète avec vérification d’identité (KYC), système de propositions, messagerie, paiements Mobile Money et crypto, tableaux de bord personnalisés et compétitions de code.',
    features: [
      { title: 'Profils vérifiés (KYC)', description: 'Vérification d’identité pour instaurer la confiance.', icon: BadgeCheck },
      { title: 'Propositions', description: 'Publication de missions et réponses structurées des freelances.', icon: Send },
      { title: 'Paiements mobiles', description: 'Mobile Money et crypto, avec séquestre sécurisé.', icon: Wallet },
      { title: 'Compétitions DEV WAR', description: 'Défis de code chronométrés et classements.', icon: Trophy },
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Tailwind CSS'],
    architecture: [
      { layer: 'Interface', items: ['React SPA', 'Tailwind CSS', 'Tableaux de bord par rôle'] },
      { layer: 'API', items: ['Node.js / Express', 'Authentification JWT', 'Messagerie temps réel'] },
      { layer: 'Données', items: ['MongoDB', 'Profils & KYC', 'Missions & contrats'] },
      { layer: 'Paiements', items: ['Mobile Money', 'Séquestre', 'Crypto (optionnel)'] },
    ],
    outcomes: [
      { title: 'Confiance renforcée', description: 'Chaque profil est vérifié avant la première mission.' },
      { title: 'Paiements locaux', description: 'Des moyens de paiement adaptés au marché camerounais.' },
      { title: 'Communauté active', description: 'Les compétitions valorisent et révèlent les talents.' },
    ],
    gallery: [
      { id: 'ig-1', title: 'Accueil', caption: 'Recherche de talents et de missions.', variant: 'landing', device: 'laptop' },
      { id: 'ig-2', title: 'Tableau de bord freelance', caption: 'Propositions, gains et missions en cours.', variant: 'dashboard', device: 'laptop' },
      { id: 'ig-3', title: 'Messagerie', caption: 'Échanges entre clients et freelances.', variant: 'chat', device: 'laptop' },
      { id: 'ig-4', title: 'Application mobile', caption: 'Suivi des missions en déplacement.', variant: 'mobile', device: 'phone' },
    ],
    theme: themes.igwork,
    cover: { variant: 'dashboard', device: 'laptop' },
    featured: true,
  },
  {
    slug: 'eduteklearn',
    image: '/images/project-eduteklearn.webp',
    imageAlt: 'Jeune apprenante suivant un cours en ligne',
    title: 'Eduteklearn',
    type: 'Plateforme e-learning',
    categories: ['Web', 'Cloud'],
    industry: 'Éducation',
    year: 2025,
    summary: 'Plateforme d’apprentissage en ligne moderne pour se former, apprendre et progresser à son rythme.',
    description:
      'Eduteklearn propose des cours en ligne, des parcours de formation et des outils pédagogiques interactifs pour les apprenants et les formateurs, avec suivi de progression et certificats.',
    problem:
      'Les centres de formation manquaient d’un outil unique pour publier leurs cours, suivre la progression des apprenants et délivrer des certificats, ce qui limitait leur portée au présentiel.',
    solution:
      'Une plateforme cloud responsive avec catalogue de cours, lecteur vidéo, quiz, suivi de progression, génération de certificats et espace formateur.',
    features: [
      { title: 'Cours en ligne', description: 'Vidéos, documents et quiz organisés en modules.', icon: GraduationCap },
      { title: 'Suivi des progrès', description: 'Tableaux de progression pour apprenants et formateurs.', icon: ChartColumn },
      { title: 'Certificats', description: 'Génération automatique de certificats vérifiables.', icon: FileText },
      { title: 'Interface intuitive', description: 'Une expérience claire sur ordinateur et mobile.', icon: MonitorSmartphone },
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    architecture: [
      { layer: 'Interface', items: ['React + TypeScript', 'Lecteur vidéo', 'Mode responsive'] },
      { layer: 'API', items: ['Node.js', 'Gestion des rôles', 'Génération PDF'] },
      { layer: 'Données', items: ['PostgreSQL', 'Cours & modules', 'Progression'] },
      { layer: 'Cloud', items: ['Stockage vidéo', 'CDN', 'Sauvegardes automatisées'] },
    ],
    outcomes: [
      { title: 'Formation à distance', description: 'Les cours deviennent accessibles partout, à tout moment.' },
      { title: 'Suivi précis', description: 'Formateurs et apprenants visualisent la progression.' },
      { title: 'Certification', description: 'Des certificats délivrés automatiquement en fin de parcours.' },
    ],
    gallery: [
      { id: 'ed-1', title: 'Catalogue de cours', caption: 'Parcours et formations disponibles.', variant: 'learning', device: 'laptop' },
      { id: 'ed-2', title: 'Progression', caption: 'Suivi détaillé par module.', variant: 'analytics', device: 'laptop' },
      { id: 'ed-3', title: 'Cours sur mobile', caption: 'Apprendre en déplacement.', variant: 'mobile', device: 'phone' },
      { id: 'ed-4', title: 'Espace formateur', caption: 'Gestion des apprenants et des contenus.', variant: 'table', device: 'laptop' },
    ],
    theme: themes.edutek,
    cover: { variant: 'learning', device: 'both' },
    featured: true,
  },
  {
    slug: 'nashsoft-systems-website',
    image: '/images/project-nashsoft.webp',
    imageAlt: 'Poste de travail avec deux écrans',
    title: 'Nashsoft Systems',
    type: 'Site web corporate',
    categories: ['Web'],
    industry: 'Technologie',
    year: 2026,
    summary: 'Site vitrine professionnel pour présenter nos services, nos solutions et notre expertise.',
    description:
      'Le site que vous consultez : une vitrine premium conçue pour présenter l’offre de Nashsoft Systems, ses réalisations et faciliter la prise de contact avec un parcours « Démarrer un projet ».',
    problem:
      'Nashsoft Systems avait besoin d’une présence en ligne à la hauteur de son expertise, capable de convaincre des décideurs et de générer des demandes qualifiées.',
    solution:
      'Un site React + TypeScript au design sur mesure, animé avec Framer Motion, avec contenu centralisé, pages services détaillées, études de cas et formulaire de projet validé côté client.',
    features: [
      { title: 'Design moderne et responsive', description: 'Une interface soignée de 320 px à 1920 px.', icon: MonitorSmartphone },
      { title: 'Présentation des services', description: 'Pages dédiées pour chaque expertise.', icon: LayoutDashboard },
      { title: 'Portfolio de projets', description: 'Filtres, études de cas et galeries.', icon: Search },
      { title: 'Formulaire de contact', description: 'Demande de projet validée avec React Hook Form + Zod.', icon: ClipboardList },
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    architecture: [
      { layer: 'Interface', items: ['React 19 + TypeScript', 'Tailwind CSS', 'Framer Motion'] },
      { layer: 'Contenu', items: ['Données centralisées (src/data)', 'Types stricts', 'SEO par page'] },
      { layer: 'Formulaires', items: ['React Hook Form', 'Zod', 'Service API découplé'] },
      { layer: 'Déploiement', items: ['Build Vite', 'CDN', 'CI GitHub'] },
    ],
    outcomes: [
      { title: 'Image de marque forte', description: 'Une identité cohérente sur toutes les pages.' },
      { title: 'Demandes qualifiées', description: 'Un formulaire structuré pour cadrer chaque projet.' },
      { title: 'Évolutif', description: 'Contenu centralisé, prêt à accueillir un CMS ou un portail client.' },
    ],
    gallery: [
      { id: 'ns-1', title: 'Accueil', caption: 'Hero, services et processus.', variant: 'landing', device: 'laptop' },
      { id: 'ns-2', title: 'Services', caption: 'Présentation détaillée des expertises.', variant: 'catalog', device: 'laptop' },
      { id: 'ns-3', title: 'Version mobile', caption: 'Navigation pensée pour le mobile.', variant: 'mobile', device: 'phone' },
      { id: 'ns-4', title: 'Démarrer un projet', caption: 'Formulaire de demande de projet.', variant: 'chat', device: 'laptop' },
    ],
    theme: themes.nashsoft,
    cover: { variant: 'landing', device: 'laptop' },
    featured: false,
  },
  {
    slug: 'gestion-boulangerie-odoo',
    image: '/images/project-bakery.webp',
    imageAlt: 'Vitrine de boulangerie remplie de viennoiseries',
    title: 'Gestion de Boulangerie (Odoo)',
    type: 'Module ERP Odoo',
    categories: ['Entreprise', 'Cloud'],
    industry: 'Agroalimentaire',
    year: 2025,
    summary: 'Module Odoo personnalisé pour la gestion complète d’une boulangerie.',
    description:
      'Ce module étend Odoo pour gérer les stocks de matières premières, la production quotidienne, les ventes en boutique et les commandes, avec des rapports et tableaux de bord adaptés au métier de boulanger.',
    problem:
      'La boulangerie suivait sa production et ses stocks sur papier et tableur : pertes non mesurées, ruptures de farine et aucune visibilité sur la rentabilité par produit.',
    solution:
      'Un module Odoo sur mesure : nomenclatures (recettes), ordres de production quotidiens, gestion des stocks, point de vente et rapports de marge, hébergés dans le cloud.',
    features: [
      { title: 'Produits & stocks', description: 'Matières premières, produits finis et alertes de réapprovisionnement.', icon: Package },
      { title: 'Suivi de la production', description: 'Recettes, ordres de fabrication et pertes.', icon: CookingPot },
      { title: 'Ventes & commandes', description: 'Point de vente et commandes clients.', icon: ShoppingCart },
      { title: 'Rapports & tableaux de bord', description: 'Marges, ventes et production en un coup d’œil.', icon: Gauge },
    ],
    technologies: ['Odoo', 'Python', 'PostgreSQL'],
    architecture: [
      { layer: 'Interface', items: ['Odoo Web', 'Point de vente', 'Vues personnalisées'] },
      { layer: 'Module métier', items: ['Python (ORM Odoo)', 'Recettes & production', 'Règles de stock'] },
      { layer: 'Données', items: ['PostgreSQL', 'Stocks', 'Ventes'] },
      { layer: 'Hébergement', items: ['Serveur cloud', 'Sauvegardes quotidiennes', 'Accès sécurisé'] },
    ],
    outcomes: [
      { title: 'Stocks maîtrisés', description: 'Alertes automatiques avant rupture de matières premières.' },
      { title: 'Rentabilité visible', description: 'Marge calculée par produit et par jour.' },
      { title: 'Moins de papier', description: 'Production et ventes centralisées dans un seul outil.' },
    ],
    gallery: [
      { id: 'od-1', title: 'Tableau de bord', caption: 'Ventes et production du jour.', variant: 'dashboard', device: 'laptop' },
      { id: 'od-2', title: 'Stocks', caption: 'Niveaux de stock et alertes.', variant: 'table', device: 'laptop' },
      { id: 'od-3', title: 'Rapports', caption: 'Analyse des marges par produit.', variant: 'analytics', device: 'laptop' },
      { id: 'od-4', title: 'Point de vente', caption: 'Encaissement rapide en boutique.', variant: 'catalog', device: 'laptop' },
    ],
    theme: themes.odoo,
    cover: { variant: 'dashboard', device: 'laptop' },
    featured: false,
  },
]

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
export const featuredProjects = projects.filter((p) => p.featured)
export const projectHref = (slug: string) => `/projets/${slug}`
