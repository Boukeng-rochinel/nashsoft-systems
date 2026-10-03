import { z } from 'zod'

export const PROJECT_TYPES = [
  'Site web',
  'Application mobile',
  'Logiciel d’entreprise',
  'Solution IA',
  'Cloud & infrastructure',
  'E-commerce',
  'ERP',
  'Autre',
] as const

export const BUDGET_RANGES = [
  'Moins de 500K FCFA',
  '500K – 1M FCFA',
  '1M – 5M FCFA',
  '5M+ FCFA',
  'À discuter',
] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

/** Narrows a URL value (e.g. `?type=ERP`) to a known project type. */
export const isProjectType = (value: string | null): value is ProjectType =>
  value !== null && (PROJECT_TYPES as readonly string[]).includes(value)

export const DESCRIPTION_MAX = 1000

const phoneRegex = /^\+?[0-9\s().-]{8,20}$/

export const contactRequestSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Veuillez indiquer votre nom complet.')
    .max(80, 'Le nom ne doit pas dépasser 80 caractères.'),
  email: z.string().trim().min(1, 'L’adresse e-mail est requise.').pipe(z.email('Adresse e-mail invalide.')),
  phone: z
    .string()
    .trim()
    .min(1, 'Le numéro de téléphone est requis.')
    .regex(phoneRegex, 'Numéro de téléphone invalide (ex. +237 6 12 34 56 78).'),
  company: z.string().trim().max(80, '80 caractères maximum.').optional(),
  projectType: z.enum(PROJECT_TYPES, { error: 'Sélectionnez un type de projet.' }),
  budget: z.enum(BUDGET_RANGES).optional(),
  description: z
    .string()
    .trim()
    .min(20, 'Décrivez votre projet en quelques phrases (20 caractères minimum).')
    .max(DESCRIPTION_MAX, `${DESCRIPTION_MAX} caractères maximum.`),
  consent: z.literal(true, { error: 'Votre accord est nécessaire pour être recontacté.' }),
})

export type ContactRequest = z.infer<typeof contactRequestSchema>
export type ContactRequestInput = z.input<typeof contactRequestSchema>

export const CONTACT_SUBJECTS = [
  'Demande de devis',
  'Informations sur nos services',
  'Partenariat',
  'Support client',
  'Carrières',
  'Autre',
] as const

export const MESSAGE_MAX = 2000

/** General enquiry from the Contact page (lighter than the project brief). */
export const contactMessageSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Veuillez indiquer votre nom complet.')
    .max(80, 'Le nom ne doit pas dépasser 80 caractères.'),
  email: z.string().trim().min(1, 'L’adresse e-mail est requise.').pipe(z.email('Adresse e-mail invalide.')),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, 'Numéro de téléphone invalide (ex. +237 6 12 34 56 78).')
    .optional(),
  subject: z.enum(CONTACT_SUBJECTS).optional(),
  message: z
    .string()
    .trim()
    .min(10, 'Votre message est un peu court (10 caractères minimum).')
    .max(MESSAGE_MAX, `${MESSAGE_MAX} caractères maximum.`),
  /** Honeypot: hidden from people, filled in by bots. */
  website: z.string().max(0).optional(),
})

export type ContactMessage = z.infer<typeof contactMessageSchema>
export type ContactMessageInput = z.input<typeof contactMessageSchema>

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, 'Saisissez votre e-mail.').pipe(z.email('Adresse e-mail invalide.')),
})

export type NewsletterRequest = z.infer<typeof newsletterSchema>
