import type { ContactMessage, ContactRequest, NewsletterRequest } from '@/lib/validation'
import { site } from '@/data/site'

/**
 * Form submission layer.
 *
 * No backend is bundled with this site. When `VITE_CONTACT_ENDPOINT` /
 * `VITE_NEWSLETTER_ENDPOINT` are configured, requests are POSTed as JSON.
 * Otherwise the contact form falls back to opening the visitor's e-mail
 * client with a pre-filled message, so no request is ever silently lost.
 */

export type SubmitResult = { status: 'sent' } | { status: 'mailto'; href: string } | { status: 'error'; message: string }

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined

async function postJson(url: string, body: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) return { status: 'error', message: `Le serveur a répondu ${res.status}. Réessayez dans un instant.` }
    return { status: 'sent' }
  } catch {
    return { status: 'error', message: 'Connexion impossible. Vérifiez votre réseau puis réessayez.' }
  }
}

export function buildContactMailto(data: ContactRequest): string {
  const subject = `Nouveau projet — ${data.projectType} — ${data.fullName}`
  const lines = [
    `Nom : ${data.fullName}`,
    data.company ? `Entreprise : ${data.company}` : null,
    `E-mail : ${data.email}`,
    `Téléphone : ${data.phone}`,
    `Type de projet : ${data.projectType}`,
    `Budget estimé : ${data.budget ?? 'Non précisé'}`,
    '',
    'Description :',
    data.description,
  ].filter((l): l is string => l !== null)
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
}

export async function submitContactRequest(data: ContactRequest): Promise<SubmitResult> {
  if (CONTACT_ENDPOINT) return postJson(CONTACT_ENDPOINT, { ...data, source: 'website', submittedAt: new Date().toISOString() })
  return { status: 'mailto', href: buildContactMailto(data) }
}

export async function submitContactMessage(data: ContactMessage): Promise<SubmitResult> {
  const { website, ...payload } = data
  // Bots fill the hidden honeypot field: pretend success, send nothing.
  if (website) return { status: 'sent' }
  if (CONTACT_ENDPOINT) return postJson(CONTACT_ENDPOINT, { ...payload, kind: 'message', source: 'website', submittedAt: new Date().toISOString() })
  const subject = `${payload.subject ?? 'Message'} — ${payload.fullName}`
  const body = [`Nom : ${payload.fullName}`, `E-mail : ${payload.email}`, payload.phone ? `Téléphone : ${payload.phone}` : null, '', payload.message]
    .filter((l): l is string => l !== null)
    .join('\n')
  return { status: 'mailto', href: `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` }
}

export async function subscribeNewsletter(data: NewsletterRequest): Promise<SubmitResult> {
  if (NEWSLETTER_ENDPOINT) return postJson(NEWSLETTER_ENDPOINT, data)
  const subject = encodeURIComponent('Inscription à la newsletter')
  const body = encodeURIComponent(`Merci de m’inscrire à la newsletter Nashsoft Systems : ${data.email}`)
  return { status: 'mailto', href: `mailto:${site.contact.email}?subject=${subject}&body=${body}` }
}
