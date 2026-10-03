import { CodeXml, Handshake, LifeBuoy, PhoneCall, FileSignature, Rocket, Inbox, Users, Zap, Boxes } from 'lucide-react'
import type { Feature, ProcessStep } from '@/types'

/** Hero highlights on the "Démarrer un projet" page (reference design). */
export const startProjectHighlights: Feature[] = [
  { title: 'Réponse rapide', description: 'Sous 24 h ouvrées', icon: Zap },
  { title: 'Accompagnement', description: 'De A à Z', icon: LifeBuoy },
  { title: 'Équipe experte', description: 'Experts en technologies', icon: Users },
  { title: 'Solutions sur mesure', description: 'Pour vos besoins', icon: Boxes },
]

export const startProjectReasons: Feature[] = [
  {
    title: 'Des solutions sur mesure',
    description: 'Chaque projet est unique. Nous concevons des solutions adaptées à vos objectifs, à votre secteur et à votre budget.',
    icon: Boxes,
  },
  {
    title: 'Technologies modernes',
    description: 'Nous utilisons les meilleures technologies pour des produits performants, sécurisés et évolutifs.',
    icon: CodeXml,
  },
  {
    title: 'Une équipe passionnée',
    description: 'Des développeurs, designers et experts qui mettent leur savoir-faire au service de votre réussite.',
    icon: Users,
  },
  {
    title: 'Un accompagnement durable',
    description: 'Nous restons à vos côtés après la livraison pour garantir la croissance de vos projets.',
    icon: Handshake,
  },
]

/** What happens after a visitor submits the project form. */
export const nextSteps: ProcessStep[] = [
  { title: 'Réception', description: 'Votre demande arrive directement chez un chef de projet, pas dans une file d’attente.', icon: Inbox },
  { title: 'Appel découverte', description: 'Un échange de 30 minutes pour comprendre vos objectifs, vos utilisateurs et vos contraintes.', icon: PhoneCall },
  { title: 'Proposition & devis', description: 'Une proposition claire : périmètre, planning, équipe et devis détaillé, gratuitement.', icon: FileSignature },
  { title: 'Lancement', description: 'Atelier de cadrage, premières maquettes et démarrage du développement par itérations.', icon: Rocket },
]

export interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'Combien coûte un projet ?',
    answer:
      'Il n’y a pas de tarif fixe : le coût dépend du périmètre, des fonctionnalités et des intégrations. Après un premier échange, nous vous remettons un devis détaillé et gratuit, avec des options adaptées à votre budget.',
  },
  {
    question: 'Combien de temps faut-il pour livrer une application ?',
    answer:
      'Un site vitrine prend généralement quelques semaines ; une application web ou mobile complète, de deux à six mois. Nous livrons par étapes : vous voyez le produit avancer dès les premières semaines.',
  },
  {
    question: 'Travaillez-vous avec des clients hors du Cameroun ?',
    answer:
      'Oui. Basés à Douala, nous accompagnons des organisations au Cameroun, en Afrique centrale et à l’international, en français comme en anglais, avec des points réguliers en visioconférence.',
  },
  {
    question: 'Qui est propriétaire du code source ?',
    answer:
      'Vous. À la livraison, le code source, la documentation et les accès aux environnements vous sont remis. Nous pouvons ensuite assurer la maintenance si vous le souhaitez.',
  },
  {
    question: 'Proposez-vous la maintenance après la mise en ligne ?',
    answer:
      'Oui : correctifs, mises à jour de sécurité, supervision, sauvegardes et évolutions fonctionnelles, dans le cadre d’un contrat de maintenance ajusté à vos besoins.',
  },
  {
    question: 'Pouvez-vous reprendre une application existante ?',
    answer:
      'Oui. Nous commençons par un audit du code et de l’infrastructure, puis nous proposons soit des améliorations ciblées, soit une modernisation progressive vers une architecture plus moderne et maintenable.',
  },
]
