import { Bot, BrainCircuit, ChartColumn, ChartLine, ScanEye, Workflow } from 'lucide-react'
import type { Expertise } from '@/types'

export const aiExpertises: Expertise[] = [
  {
    title: 'Machine Learning',
    description: 'Modèles de classification, de prévision et de recommandation entraînés sur vos données.',
    icon: BrainCircuit,
    image: '/images/ai-ml.webp',
    imageAlt: 'Équipe analysant des modèles de données autour d’ordinateurs portables',
    details:
      'Nous partons de vos données historiques pour entraîner des modèles qui classent, prévoient ou recommandent. Chaque modèle est évalué sur des indicateurs métier clairs avant d’être intégré à vos applications.',
    useCases: ['Scoring de clients et de prospects', 'Recommandation de produits', 'Détection d’anomalies et de fraude', 'Classification automatique de demandes'],
    technologies: ['Python', 'scikit-learn', 'TensorFlow', 'PyTorch', 'PostgreSQL'],
  },
  {
    title: 'Vision par ordinateur',
    description: 'Reconnaissance d’images, contrôle qualité visuel et lecture de documents.',
    icon: ScanEye,
    image: '/images/ai-vision.webp',
    imageAlt: 'Ingénieure travaillant sur un poste de contrôle industriel',
    details:
      'Des modèles qui « voient » : identifier un objet, repérer un défaut sur une chaîne, lire un voyant ou un document. Ils peuvent tourner sur smartphone, hors ligne, ou sur vos serveurs.',
    useCases: ['Contrôle qualité visuel', 'Lecture de pièces d’identité et de reçus', 'Diagnostic à partir de photos', 'Comptage et suivi d’objets'],
    technologies: ['Python', 'TensorFlow', 'TensorFlow Lite', 'PyTorch', 'Flutter'],
  },
  {
    title: 'Analyse prédictive',
    description: 'Anticipez la demande, les risques de défaut ou le départ de clients.',
    icon: ChartLine,
    image: '/images/ai-predictive.webp',
    imageAlt: 'Écran affichant des courbes de tendance et des prévisions',
    details:
      'Transformez l’historique de votre activité en prévisions fiables. Nous construisons des modèles de séries temporelles et de risque, puis les restituons sous forme d’alertes et de tableaux de bord.',
    useCases: ['Prévision des ventes et des stocks', 'Risque de défaut de paiement', 'Prédiction de l’attrition client', 'Planification des ressources'],
    technologies: ['Python', 'scikit-learn', 'PostgreSQL', 'Power BI'],
  },
  {
    title: 'Automatisation IA',
    description: 'Extraction de données de factures et formulaires, tri et routage automatique.',
    icon: Workflow,
    image: '/images/ai-automation.webp',
    imageAlt: 'Deux collaboratrices traitant des documents sur ordinateur',
    details:
      'Libérez vos équipes des tâches répétitives. Nos pipelines lisent vos documents, extraient les informations utiles, les vérifient et les envoient vers les bons outils : ERP, CRM ou messagerie.',
    useCases: ['Saisie automatique de factures', 'Tri et routage des e-mails', 'Vérification de dossiers clients', 'Synchronisation avec Odoo'],
    technologies: ['Python', 'Node.js', 'Odoo', 'Docker'],
  },
  {
    title: 'Tableaux de bord data',
    description: 'Indicateurs clés en temps réel pour vos décideurs, sur ordinateur et mobile.',
    icon: ChartColumn,
    image: '/images/ai-dashboards.webp',
    imageAlt: 'Ordinateur portable affichant un tableau de bord analytique',
    details:
      'Nous centralisons vos sources de données et concevons des tableaux de bord lisibles, pensés pour les décisions de chaque équipe, accessibles en temps réel sur ordinateur comme sur mobile.',
    useCases: ['Pilotage commercial et financier', 'Suivi des opérations et de la logistique', 'Indicateurs RH et de performance', 'Rapports automatisés'],
    technologies: ['Power BI', 'PostgreSQL', 'React', 'Python'],
  },
  {
    title: 'Assistants intelligents',
    description: 'Chatbots et assistants connectés à votre documentation et à vos outils.',
    icon: Bot,
    image: '/images/ai-assistants.webp',
    imageAlt: 'Personne échangeant avec un assistant sur son smartphone',
    details:
      'Des assistants conversationnels qui répondent à partir de vos propres contenus — procédures, catalogues, FAQ — et peuvent agir dans vos outils, sur le site, WhatsApp ou en interne.',
    useCases: ['Support client 24/7', 'Assistant interne pour les procédures', 'Qualification de prospects', 'Recherche dans la documentation'],
    technologies: ['Python', 'Node.js', 'React', 'PostgreSQL'],
  },
]
