import { useId, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ChevronDown, CircleCheck, LoaderCircle, RotateCcw, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT_SUBJECTS, contactMessageSchema, type ContactMessage, type ContactMessageInput } from '@/lib/validation'
import { submitContactMessage } from '@/lib/api'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'

type Status = { kind: 'sent' } | { kind: 'mailto'; href: string } | null

const emptyToUndefined = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v)

const field = (invalid: boolean) =>
  cn(
    'w-full rounded-lg border bg-white text-sm text-navy transition-[border-color,box-shadow] outline-none placeholder:text-slate/70 focus:border-brand focus:ring-4 focus:ring-brand/10',
    'on-dark:border-white/12 on-dark:bg-white/[0.04] on-dark:text-white on-dark:placeholder:text-slate-400 on-dark:focus:border-cyan/70 on-dark:focus:ring-cyan/10',
    invalid ? 'border-red-400' : 'border-line-strong',
  )

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[0.85rem] font-medium text-navy on-dark:text-slate-200">
        {label}
        {required && (
          <span aria-hidden className="text-red-500">
            {' '}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-600 on-dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

/** General enquiry form (Contact page). Spam is filtered with a honeypot instead of a CAPTCHA. */
export function ContactMessageForm() {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const [status, setStatus] = useState<Status>(null)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactMessageInput, unknown, ContactMessage>({ resolver: zodResolver(contactMessageSchema), mode: 'onTouched' })

  const describe = (name: keyof ContactMessageInput) => (errors[name] ? `${id(name)}-error` : undefined)

  const onSubmit = async (data: ContactMessage) => {
    setServerError(null)
    const result = await submitContactMessage(data)
    if (result.status === 'error') {
      setServerError(result.message)
      return
    }
    if (result.status === 'mailto') {
      window.location.assign(result.href)
      setStatus({ kind: 'mailto', href: result.href })
    } else {
      setStatus({ kind: 'sent' })
    }
    reset()
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status ? (
        <motion.div key="done" role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-12 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand on-dark:bg-cyan/10 on-dark:text-cyan">
            <CircleCheck aria-hidden className="size-7" />
          </span>
          <h3 className="mt-5 font-display text-xl font-bold text-navy on-dark:text-white">
            {status.kind === 'sent' ? 'Merci, votre message est envoyé !' : 'Plus qu’un clic pour envoyer votre message'}
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate on-dark:text-slate-300">
            {status.kind === 'sent' ? (
              'Nous vous répondons dans les plus brefs délais, généralement sous 24 h ouvrées.'
            ) : (
              <>
                Votre messagerie s’est ouverte avec le message pré-rempli : il vous suffit de l’envoyer. Rien ne s’est ouvert ?{' '}
                <a href={status.href} className="font-semibold text-brand underline underline-offset-2 on-dark:text-cyan">
                  Ouvrir l’e-mail
                </a>{' '}
                ou écrivez à {site.contact.email}.
              </>
            )}
          </p>
          <button type="button" onClick={() => setStatus(null)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-violet on-dark:text-cyan">
            <RotateCcw aria-hidden className="size-4" /> Écrire un autre message
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
          <Field id={id('fullName')} label="Nom complet" required error={errors.fullName?.message}>
            <input
              id={id('fullName')}
              autoComplete="name"
              placeholder="Votre nom"
              aria-required
              aria-invalid={!!errors.fullName}
              aria-describedby={describe('fullName')}
              className={cn(field(!!errors.fullName), 'h-12 px-4')}
              {...register('fullName')}
            />
          </Field>

          <Field id={id('email')} label="Email" required error={errors.email?.message}>
            <input
              id={id('email')}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="votre@email.com"
              aria-required
              aria-invalid={!!errors.email}
              aria-describedby={describe('email')}
              className={cn(field(!!errors.email), 'h-12 px-4')}
              {...register('email')}
            />
          </Field>

          <Field id={id('phone')} label="Téléphone" error={errors.phone?.message}>
            <input
              id={id('phone')}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+237 6 72 34 56 78"
              aria-invalid={!!errors.phone}
              aria-describedby={describe('phone')}
              className={cn(field(!!errors.phone), 'h-12 px-4')}
              {...register('phone', { setValueAs: emptyToUndefined })}
            />
          </Field>

          <Field id={id('subject')} label="Sujet" error={errors.subject?.message}>
            <div className="relative">
              <select
                id={id('subject')}
                defaultValue=""
                aria-describedby={describe('subject')}
                className={cn(field(!!errors.subject), 'h-12 appearance-none pr-10 pl-4 [&>option]:bg-white [&>option]:text-navy')}
                {...register('subject', { setValueAs: emptyToUndefined })}
              >
                <option value="">Choisissez un sujet</option>
                {CONTACT_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-slate on-dark:text-slate-400" />
            </div>
          </Field>

          <div className="sm:col-span-2">
            <Field id={id('message')} label="Message" required error={errors.message?.message}>
              <textarea
                id={id('message')}
                rows={5}
                placeholder="Écrivez votre message ici…"
                aria-required
                aria-invalid={!!errors.message}
                aria-describedby={describe('message')}
                className={cn(field(!!errors.message), 'min-h-36 resize-y px-4 py-3 leading-relaxed')}
                {...register('message')}
              />
            </Field>
          </div>

          {/* Honeypot — invisible to people and assistive tech. */}
          <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
            <label htmlFor={id('website')}>Site web</label>
            <input id={id('website')} tabIndex={-1} autoComplete="off" {...register('website')} />
          </div>

          {serverError && (
            <p role="alert" className="rounded-lg border border-red-300/60 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
              {serverError}
            </p>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-brand via-brand to-violet font-display text-[0.95rem] font-semibold text-white shadow-[0_14px_30px_-14px_rgb(8_125_255/0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgb(8_125_255/0.95)] disabled:pointer-events-none disabled:opacity-70"
            >
              {isSubmitting ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <Send aria-hidden className="size-4" />}
              {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
              {!isSubmitting && <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />}
            </button>
            <p className="mt-3 text-center text-[0.75rem] text-slate on-dark:text-slate-400">
              En envoyant ce message, vous acceptez notre{' '}
              <Link to="/confidentialite" className="font-medium text-brand hover:text-violet on-dark:text-cyan">
                politique de confidentialité
              </Link>
              .
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
