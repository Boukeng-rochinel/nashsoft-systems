/**
 * Contact form backend — framework-agnostic.
 *
 * Used by the production Node server (server/index.ts) and by the Vite dev
 * server middleware. Every submission must carry a Cloudflare Turnstile token,
 * which is verified server-side before anything is e-mailed. Secrets
 * (TURNSTILE_SECRET_KEY, SMTP_*) are read from the server environment only.
 */
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { contactMessageSchema, contactRequestSchema } from '../src/lib/validation'

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 }

const envelopeSchema = z.object({
  kind: z.enum(['project', 'message']),
  turnstileToken: z.string().min(1).max(2048),
})

export interface ContactEnv {
  turnstileSecret?: string
  smtp: {
    host?: string
    port?: string
    /** "true" for implicit TLS (port 465); STARTTLS is negotiated otherwise. */
    secure?: string
    user?: string
    pass?: string
  }
  /** Inbox that receives the requests. */
  to?: string
  /** Sender address; must be allowed by the SMTP account. Defaults to SMTP user. */
  from?: string
  /** Client identifier for rate limiting and Turnstile (IP address). */
  clientIp?: string
}

export interface ContactResult {
  status: number
  body: { ok: true } | { error: string; code: string }
}

/* Best-effort in-memory rate limiting (single Node process on the VPS). */
const hits = new Map<string, number[]>()

function rateLimited(clientId: string): boolean {
  const now = Date.now()
  const recent = (hits.get(clientId) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(clientId, recent)
  if (hits.size > 5000) hits.clear() // bound memory
  return recent.length > RATE_LIMIT.max
}

async function verifyTurnstile(token: string, secret: string, ip?: string): Promise<boolean> {
  const form = new URLSearchParams({ secret, response: token })
  if (ip) form.set('remoteip', ip)
  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: form, signal: AbortSignal.timeout(10_000) })
    const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[] }
    if (!data.success) console.warn('[contact] Turnstile rejected', data['error-codes'])
    return data.success === true
  } catch (err) {
    console.error('[contact] Turnstile verification failed', err)
    return false
  }
}

type Mail = { subject: string; text: string; replyTo: string }

function composeMail(kind: 'project' | 'message', payload: unknown): Mail | null {
  if (kind === 'project') {
    const parsed = contactRequestSchema.safeParse(payload)
    if (!parsed.success) return null
    const d = parsed.data
    const lines = [
      `Nom : ${d.fullName}`,
      d.company ? `Entreprise : ${d.company}` : null,
      `E-mail : ${d.email}`,
      `Téléphone : ${d.phone}`,
      `Type de projet : ${d.projectType}`,
      `Budget estimé : ${d.budget ?? 'Non précisé'}`,
      '',
      'Description :',
      d.description,
    ]
    return { subject: `Nouveau projet — ${d.projectType} — ${d.fullName}`, text: lines.filter((l) => l !== null).join('\n'), replyTo: d.email }
  }

  const parsed = contactMessageSchema.safeParse(payload)
  if (!parsed.success) return null
  const d = parsed.data
  const lines = [`Nom : ${d.fullName}`, `E-mail : ${d.email}`, d.phone ? `Téléphone : ${d.phone}` : null, d.subject ? `Sujet : ${d.subject}` : null, '', d.message]
  return { subject: `${d.subject ?? 'Message'} — ${d.fullName}`, text: lines.filter((l) => l !== null).join('\n'), replyTo: d.email }
}

export async function handleContact(payload: unknown, env: ContactEnv): Promise<ContactResult> {
  const { smtp } = env
  if (!env.turnstileSecret || !smtp.host || !smtp.user || !smtp.pass) {
    return { status: 503, body: { code: 'not_configured', error: 'Le formulaire n’est pas encore configuré. Écrivez-nous directement par e-mail.' } }
  }

  const envelope = envelopeSchema.safeParse(payload)
  if (!envelope.success) {
    return { status: 400, body: { code: 'captcha_missing', error: 'Veuillez confirmer que vous n’êtes pas un robot.' } }
  }

  if (rateLimited(env.clientIp ?? 'anonymous')) {
    return { status: 429, body: { code: 'rate_limited', error: 'Trop de demandes en peu de temps. Réessayez dans quelques minutes.' } }
  }

  if (!(await verifyTurnstile(envelope.data.turnstileToken, env.turnstileSecret, env.clientIp))) {
    return { status: 403, body: { code: 'captcha_failed', error: 'La vérification anti-robot a échoué. Rechargez la vérification et réessayez.' } }
  }

  // Bots fill the hidden honeypot field: pretend success, send nothing.
  const honeypot = (payload as { website?: unknown }).website
  if (typeof honeypot === 'string' && honeypot.length > 0) return { status: 200, body: { ok: true } }

  const mail = composeMail(envelope.data.kind, payload)
  if (!mail) {
    return { status: 400, body: { code: 'invalid_request', error: 'Certains champs sont invalides. Vérifiez le formulaire.' } }
  }

  const port = Number(smtp.port) || 587
  const transport = nodemailer.createTransport({
    host: smtp.host,
    port,
    secure: smtp.secure ? smtp.secure === 'true' : port === 465,
    auth: { user: smtp.user, pass: smtp.pass },
  })

  try {
    await transport.sendMail({
      from: { name: 'Site Nashsoft Systems', address: env.from || smtp.user },
      to: env.to || smtp.user,
      replyTo: mail.replyTo,
      subject: `[Site web] ${mail.subject}`,
      text: `${mail.text}\n\n—\nEnvoyé depuis le formulaire du site · IP ${env.clientIp ?? 'inconnue'} · ${new Date().toISOString()}`,
    })
  } catch (err) {
    // Log server-side only; SMTP errors can contain account details.
    console.error('[contact] SMTP send failed', err)
    return { status: 502, body: { code: 'send_failed', error: 'L’envoi a échoué. Réessayez ou écrivez-nous directement par e-mail.' } }
  }

  return { status: 200, body: { ok: true } }
}
