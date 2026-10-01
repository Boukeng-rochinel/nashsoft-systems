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

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, 'Saisissez votre e-mail.').pipe(z.email('Adresse e-mail invalide.')),
})

export type NewsletterRequest = z.infer<typeof newsletterSchema>
