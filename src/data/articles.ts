import type { Article } from '@/types'
import { themes } from './themes'

export const articleCategories = ['Tous', 'Transformation digitale', 'Développement', 'IA & Data', 'Cloud', 'Entreprise'] as const

export const articles: Article[] = [
  {
    slug: 'digitaliser-processus-pme',
    image: '/images/article-digital.webp',
    title: 'Digitaliser les processus d’une PME : par où commencer ?',
    excerpt:
      'Tableurs, papier, WhatsApp… Beaucoup d’entreprises fonctionnent encore ainsi. Voici une méthode pragmatique pour prioriser vos premiers chantiers numériques.',
    category: 'Transformation digitale',
    date: '2026-09-12',
    readTime: 6,
    author: 'Équipe Nashsoft',
    cover: { variant: 'dashboard', theme: themes.nashsoft },
    content: [
      {
        paragraphs: [
          'La transformation digitale n’est pas un projet unique mais une suite de décisions. Le piège le plus courant consiste à vouloir tout changer d’un coup, avec un logiciel censé tout faire. Les projets qui réussissent commencent petit, mesurent les résultats et élargissent progressivement.',
        ],
      },
      {
        heading: '1. Cartographier ce qui existe',
        paragraphs: [
          'Listez vos processus clés — ventes, achats, stock, facturation, RH — et notez pour chacun les outils utilisés, les personnes impliquées et le temps passé. Cette photographie révèle rapidement les tâches répétitives et les ressaisies.',
        ],
      },
      {
        heading: '2. Choisir un premier chantier à fort impact',
        paragraphs: ['Le bon premier projet combine trois critères :'],
        list: [
          'un gain visible rapidement (temps, argent ou erreurs évitées) ;',
          'un périmètre limité, livrable en quelques semaines ;',
          'des utilisateurs motivés, prêts à adopter l’outil.',
        ],
      },
      {
        heading: '3. Construire ou adopter ?',
        paragraphs: [
          'Pour des besoins standards (comptabilité, CRM, ERP), une solution existante comme Odoo, bien configurée, est souvent le meilleur choix. Pour un processus qui fait votre différence concurrentielle, un développement sur mesure se justifie.',
          'Dans tous les cas, exigez la propriété de vos données et la possibilité de les exporter.',
        ],
      },
      {
        heading: '4. Accompagner le changement',
        paragraphs: [
          'Un outil non utilisé ne sert à rien. Prévoyez la formation, désignez un référent interne et suivez quelques indicateurs simples pendant les premiers mois pour ajuster.',
        ],
      },
    ],
  },
  {
    slug: 'integrer-mobile-money',
    image: '/images/article-mobile-money.webp',
    title: 'Intégrer le Mobile Money dans vos applications',
    excerpt:
      'MTN MoMo et Orange Money sont incontournables en Afrique centrale. Architecture, sécurité et expérience utilisateur : les points d’attention pour une intégration fiable.',
    category: 'Développement',
    date: '2026-08-28',
    readTime: 7,
    author: 'Équipe Nashsoft',
    cover: { variant: 'mobile', theme: themes.finance },
    content: [
      {
        paragraphs: [
          'Au Cameroun, le paiement mobile est souvent le moyen de paiement principal de vos clients. L’intégrer correctement conditionne directement votre taux de conversion.',
        ],
      },
      {
        heading: 'Agrégateur ou intégration directe ?',
        paragraphs: [
          'Les opérateurs proposent des API directes, mais un agrégateur de paiement simplifie l’intégration de plusieurs opérateurs avec une seule interface. Le choix dépend de vos volumes, de vos frais et de votre besoin de contrôle.',
        ],
      },
      {
        heading: 'Une architecture asynchrone',
        paragraphs: [
          'Un paiement Mobile Money n’est pas instantané : le client doit valider sur son téléphone. Votre backend doit donc initier la transaction, puis attendre une notification (webhook) de confirmation.',
        ],
        list: [
          'Stockez chaque transaction avec un statut (en attente, réussie, échouée).',
          'Vérifiez systématiquement la signature des webhooks.',
          'Prévoyez une vérification périodique des transactions restées en attente.',
          'Rendez vos traitements idempotents pour éviter les doubles crédits.',
        ],
      },
      {
        heading: 'Soigner l’expérience utilisateur',
        paragraphs: [
          'Indiquez clairement au client qu’il va recevoir une demande de validation, affichez un état d’attente explicite et proposez de relancer la demande en cas d’expiration.',
        ],
      },
    ],
  },
  {
    slug: 'flutter-react-native-web',
    image: '/images/article-flutter.webp',
    title: 'Flutter, React Native ou web : quelle technologie pour votre application ?',
    excerpt:
      'Le choix technologique influence les coûts, les délais et l’évolutivité. Nous comparons les options selon vos contraintes réelles.',
    category: 'Développement',
    date: '2026-08-05',
    readTime: 5,
    author: 'Équipe Nashsoft',
    cover: { variant: 'mobile', theme: themes.autofix },
    content: [
      {
        paragraphs: [
          'Il n’existe pas de « meilleure » technologie dans l’absolu. La bonne réponse dépend de vos utilisateurs, de votre budget et des fonctionnalités dont vous avez besoin.',
        ],
      },
      {
        heading: 'Flutter',
        paragraphs: [
          'Une base de code pour iOS et Android, un rendu identique sur toutes les plateformes et d’excellentes performances. Idéal pour des applications riches en interface et utilisées hors ligne.',
        ],
      },
      {
        heading: 'React Native',
        paragraphs: [
          'Pertinent si votre équipe maîtrise déjà React ou si vous souhaitez partager de la logique avec une application web existante.',
        ],
      },
      {
        heading: 'Application web progressive (PWA)',
        paragraphs: [
          'Pour un premier produit ou un outil interne, une application web responsive peut suffire : pas de publication sur les stores, mises à jour instantanées et coûts réduits.',
        ],
        list: [
          'Besoin d’accès matériel avancé (Bluetooth, capteurs) → mobile natif ou Flutter.',
          'Budget serré et usage principalement sur ordinateur → web.',
          'Grand public sur smartphone → Flutter ou React Native.',
        ],
      },
    ],
  },
  {
    slug: 'ia-cas-usage-entreprises',
    image: '/images/article-ai.webp',
    title: '5 cas d’usage concrets de l’IA pour les entreprises africaines',
    excerpt:
      'Au-delà du buzz, l’intelligence artificielle apporte déjà des gains mesurables. Cinq applications réalistes à envisager dès aujourd’hui.',
    category: 'IA & Data',
    date: '2026-07-18',
    readTime: 6,
    author: 'Équipe Nashsoft',
    cover: { variant: 'analytics', theme: themes.nashsoftDark },
    content: [
      {
        paragraphs: [
          'L’IA la plus utile est souvent la moins spectaculaire : elle automatise une tâche répétitive ou éclaire une décision grâce aux données que vous possédez déjà.',
        ],
      },
      {
        heading: 'Cinq cas d’usage éprouvés',
        paragraphs: ['Voici des applications que nous rencontrons régulièrement :'],
        list: [
          'Prévision des ventes et des stocks pour réduire ruptures et invendus.',
          'Extraction automatique d’informations à partir de factures et formulaires.',
          'Vision par ordinateur pour le contrôle qualité ou le diagnostic (voir AutoFix Car).',
          'Assistants conversationnels connectés à votre documentation interne.',
          'Détection d’anomalies dans les transactions financières.',
        ],
      },
      {
        heading: 'Commencer par les données',
        paragraphs: [
          'Un modèle ne vaut que par les données qui l’alimentent. Avant tout projet IA, un audit rapide permet de vérifier la qualité, le volume et l’accessibilité de vos données — et d’éviter des investissements prématurés.',
        ],
      },
    ],
  },
  {
    slug: 'sauvegardes-cloud-pme',
    image: '/images/article-backup.webp',
    title: 'Sauvegardes et cloud : protéger les données de votre entreprise',
    excerpt:
      'Panne matérielle, vol, rançongiciel : la perte de données peut paralyser une entreprise. La règle 3-2-1 et une supervision simple suffisent souvent.',
    category: 'Cloud',
    date: '2026-06-30',
    readTime: 4,
    author: 'Équipe Nashsoft',
    cover: { variant: 'table', theme: themes.logistics },
    content: [
      {
        paragraphs: [
          'La question n’est pas de savoir si un incident arrivera, mais quand. Une stratégie de sauvegarde bien pensée transforme une catastrophe potentielle en simple contretemps.',
        ],
      },
      {
        heading: 'La règle 3-2-1',
        paragraphs: ['Une règle simple, reconnue par les professionnels :'],
        list: ['3 copies de vos données ;', 'sur 2 supports différents ;', 'dont 1 copie hors site (cloud).'],
      },
      {
        heading: 'Tester la restauration',
        paragraphs: [
          'Une sauvegarde qui n’a jamais été restaurée n’est pas une sauvegarde fiable. Planifiez des tests de restauration réguliers et documentez la procédure.',
        ],
      },
      {
        heading: 'Superviser',
        paragraphs: [
          'Des alertes automatiques en cas d’échec de sauvegarde, d’espace disque insuffisant ou d’indisponibilité d’un service permettent d’agir avant que l’incident n’impacte vos clients.',
        ],
      },
    ],
  },
  {
    slug: 'odoo-erp-pme',
    image: '/images/article-odoo.webp',
    title: 'Odoo pour les PME : un ERP modulaire et adaptable',
    excerpt:
      'Ventes, stocks, comptabilité, production : Odoo permet de démarrer petit et d’ajouter des modules au fil de la croissance. Retour d’expérience.',
    category: 'Entreprise',
    date: '2026-06-10',
    readTime: 5,
    author: 'Équipe Nashsoft',
    cover: { variant: 'dashboard', theme: themes.odoo },
    content: [
      {
        paragraphs: [
          'Odoo est une suite open source qui couvre la plupart des besoins de gestion d’une PME. Sa force : sa modularité, qui permet de n’activer que ce dont vous avez besoin.',
        ],
      },
      {
        heading: 'Configurer avant de développer',
        paragraphs: [
          'La majorité des besoins se couvrent par la configuration standard. Le développement de modules spécifiques doit être réservé à ce qui fait réellement la particularité de votre métier — comme la gestion de la production dans notre projet de boulangerie.',
        ],
      },
      {
        heading: 'Les clés d’un déploiement réussi',
        paragraphs: ['D’après nos projets :'],
        list: [
          'Reprendre des données propres (articles, clients, stocks initiaux).',
          'Former les utilisateurs par rôle, pas par module.',
          'Démarrer avec 2 ou 3 modules puis étendre.',
          'Prévoir hébergement, sauvegardes et mises à jour dès le départ.',
        ],
      },
    ],
  },
]

export const getArticleBySlug = (slug: string) => articles.find((a) => a.slug === slug)
export const articleHref = (slug: string) => `/insights/${slug}`

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
