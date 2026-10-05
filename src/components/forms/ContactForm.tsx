import { useId, useState, type ReactNode } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import { Building2, ChevronDown, CircleCheck, LoaderCircle, Mail, Phone, RotateCcw, Send, User, type LucideIcon } from 'lucide-react'
import {
  BUDGET_RANGES,
  DESCRIPTION_MAX,
  PROJECT_TYPES,
  contactRequestSchema,
  type ContactRequest,
  type ContactRequestInput,
  type ProjectType,
} from '@/lib/validation'
import { submitContactRequest } from '@/lib/api'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import { Link } from 'react-router-dom'
import { useCaptcha } from '@/hooks/useCaptcha'
import { Turnstile } from './Turnstile'

type Tone = 'light' | 'dark'

interface ContactFormProps {
  tone?: Tone
  /** Pre-selected project type (e.g. from `?type=` in the URL). */
  defaultProjectType?: ProjectType
  /** Ask for the company name (Contact page) — optional field. */
  withCompany?: boolean
  submitLabel?: string
}

type Status = { kind: 'sent' } | { kind: 'mailto'; href: string } | null

const emptyToUndefined = (v: unknown) => (v === '' ? undefined : v)

function Field({
  id,
  label,
  required,
  error,
  hint,
  tone,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  hint?: ReactNode
  tone: Tone
  children: ReactNode
}) {
  const dark = tone === 'dark'
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className={cn('text-[0.8rem] font-medium', dark ? 'text-slate-200' : 'text-navy')}>
          {label}
          {required ? (
            <span aria-hidden className={dark ? 'text-cyan' : 'text-brand'}>
              {' '}
              *
            </span>
          ) : (
            <span className={cn('font-normal', dark ? 'text-slate-400' : 'text-slate')}> (optionnel)</span>
          )}
        </label>
        {hint}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className={cn('mt-1.5 text-xs', dark ? 'text-red-300' : 'text-red-600')}>
          {error}
        </p>
      )}
    </div>
  )
}

const fieldClass = (tone: Tone, invalid: boolean) =>
  cn(
    'w-full rounded-xl border text-sm transition-[border-color,box-shadow] outline-none focus:ring-4',
    tone === 'dark'
      ? 'border-white/12 bg-white/[0.04] text-white placeholder:text-slate-400 focus:border-cyan/70 focus:ring-cyan/10 [&>option]:bg-white [&>option]:text-navy'
      : 'border-line-strong bg-white text-navy placeholder:text-slate/70 focus:border-brand focus:ring-brand/10',
    invalid && (tone === 'dark' ? 'border-red-400/70' : 'border-red-400'),
  )

function IconInput({ icon: Icon, tone, children }: { icon: LucideIcon; tone: Tone; children: ReactNode }) {
  return (
    <div className="relative">
      <Icon aria-hidden className={cn('pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2', tone === 'dark' ? 'text-slate-400' : 'text-slate')} />
      {children}
    </div>
  )
}

function SelectWrap({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown aria-hidden className={cn('pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2', tone === 'dark' ? 'text-slate-400' : 'text-slate')} />
    </div>
  )
}

export function ContactForm({ tone = 'light', defaultProjectType, withCompany = false, submitLabel = 'Envoyer ma demande' }: ContactFormProps) {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const dark = tone === 'dark'
  const [status, setStatus] = useState<Status>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const captcha = useCaptcha()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactRequestInput, unknown, ContactRequest>({
    resolver: zodResolver(contactRequestSchema),
    defaultValues: { projectType: defaultProjectType, description: '' },
    mode: 'onTouched',
  })

  const descriptionLength = useWatch({ control, name: 'description' })?.length ?? 0

  const onSubmit = async (data: ContactRequest) => {
    setServerError(null)
    const token = captcha.requireToken()
    if (token === false) return
    const result = await submitContactRequest(data, token)
    if (token) captcha.reset()
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
    reset({ projectType: defaultProjectType, description: '' })
  }

  const describe = (name: keyof ContactRequestInput) => (errors[name] ? `${id(name)}-error` : undefined)

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status ? (
        <motion.div
          key="done"
          role="status"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center py-10 text-center"
        >
          <span className={cn('inline-flex size-14 items-center justify-center rounded-full', dark ? 'bg-cyan/10 text-cyan' : 'bg-brand-50 text-brand')}>
            <CircleCheck aria-hidden className="size-7" />
          </span>
          <h3 className={cn('mt-5 font-display text-xl font-bold', dark ? 'text-white' : 'text-navy')}>
            {status.kind === 'sent' ? 'Merci, votre demande est envoyée !' : 'Plus qu’un clic pour envoyer votre demande'}
          </h3>
          <p className={cn('mt-2 max-w-sm text-sm leading-relaxed', dark ? 'text-slate-300' : 'text-slate')}>
            {status.kind === 'sent' ? (
              <>Un chef de projet vous recontacte sous 24 h ouvrées. Pensez à vérifier vos courriers indésirables.</>
            ) : (
              <>
                Votre messagerie s’est ouverte avec un e-mail pré-rempli : il vous suffit de l’envoyer. Rien ne s’est ouvert ?{' '}
                <a href={status.href} className={cn('font-semibold underline underline-offset-2', dark ? 'text-cyan' : 'text-brand')}>
                  Ouvrir l’e-mail
                </a>{' '}
                ou écrivez-nous à {site.contact.email}.
              </>
            )}
          </p>
          <button
            type="button"
            onClick={() => setStatus(null)}
            className={cn('mt-6 inline-flex items-center gap-2 text-sm font-semibold', dark ? 'text-cyan hover:text-white' : 'text-brand hover:text-violet')}
          >
            <RotateCcw aria-hidden className="size-4" /> Envoyer une autre demande
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-describedby={`${uid}-required`}
          className="grid gap-5 sm:grid-cols-2"
        >
          <p id={`${uid}-required`} className="sr-only">
            Les champs marqués d’un astérisque sont obligatoires.
          </p>

          <Field id={id('fullName')} label="Nom complet" required error={errors.fullName?.message} tone={tone}>
            <IconInput icon={User} tone={tone}>
              <input
                id={id('fullName')}
                autoComplete="name"
                placeholder="Votre nom"
                aria-invalid={!!errors.fullName}
                aria-describedby={describe('fullName')}
                className={cn(fieldClass(tone, !!errors.fullName), 'h-12 pr-4 pl-10')}
                {...register('fullName')}
              />
            </IconInput>
          </Field>

          <Field id={id('email')} label="E-mail" required error={errors.email?.message} tone={tone}>
            <IconInput icon={Mail} tone={tone}>
              <input
                id={id('email')}
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="votre@email.com"
                aria-invalid={!!errors.email}
                aria-describedby={describe('email')}
                className={cn(fieldClass(tone, !!errors.email), 'h-12 pr-4 pl-10')}
                {...register('email')}
              />
            </IconInput>
          </Field>

          <Field id={id('phone')} label="Téléphone" required error={errors.phone?.message} tone={tone}>
            <IconInput icon={Phone} tone={tone}>
              <input
                id={id('phone')}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+237 6 12 34 56 78"
                aria-invalid={!!errors.phone}
                aria-describedby={describe('phone')}
                className={cn(fieldClass(tone, !!errors.phone), 'h-12 pr-4 pl-10')}
                {...register('phone')}
              />
            </IconInput>
          </Field>

          {withCompany && (
            <Field id={id('company')} label="Entreprise / organisation" error={errors.company?.message} tone={tone}>
              <IconInput icon={Building2} tone={tone}>
                <input
                  id={id('company')}
                  autoComplete="organization"
                  placeholder="Nom de votre structure"
                  aria-invalid={!!errors.company}
                  aria-describedby={describe('company')}
                  className={cn(fieldClass(tone, !!errors.company), 'h-12 pr-4 pl-10')}
                  {...register('company', { setValueAs: emptyToUndefined })}
                />
              </IconInput>
            </Field>
          )}

          <Field id={id('projectType')} label="Type de projet" required error={errors.projectType?.message} tone={tone}>
            <SelectWrap tone={tone}>
              <select
                id={id('projectType')}
                aria-invalid={!!errors.projectType}
                aria-describedby={describe('projectType')}
                className={cn(fieldClass(tone, !!errors.projectType), 'h-12 appearance-none pr-10 pl-4')}
                {...register('projectType', { setValueAs: emptyToUndefined })}
              >
                <option value="">Sélectionnez</option>
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </SelectWrap>
          </Field>

          <Field id={id('budget')} label="Budget estimé" error={errors.budget?.message} tone={tone}>
            <SelectWrap tone={tone}>
              <select
                id={id('budget')}
                aria-describedby={describe('budget')}
                className={cn(fieldClass(tone, !!errors.budget), 'h-12 appearance-none pr-10 pl-4')}
                {...register('budget', { setValueAs: emptyToUndefined })}
              >
                <option value="">Sélectionnez</option>
                {BUDGET_RANGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </SelectWrap>
          </Field>

          <div className="sm:col-span-2">
            <Field
              id={id('description')}
              label="Description de votre projet"
              required
              error={errors.description?.message}
              tone={tone}
              hint={
                <span
                  aria-live="polite"
                  className={cn('text-[0.7rem] tabular-nums', descriptionLength > DESCRIPTION_MAX ? 'text-red-500' : dark ? 'text-slate-400' : 'text-slate')}
                >
                  {descriptionLength}/{DESCRIPTION_MAX}
                </span>
              }
            >
              <textarea
                id={id('description')}
                rows={5}
                placeholder="Décrivez brièvement votre projet, vos objectifs et vos attentes…"
                aria-invalid={!!errors.description}
                aria-describedby={describe('description')}
                className={cn(fieldClass(tone, !!errors.description), 'min-h-32 resize-y px-4 py-3 leading-relaxed')}
                {...register('description')}
              />
            </Field>
          </div>

          <div className="sm:col-span-2">
            <label className={cn('flex cursor-pointer items-start gap-3 text-[0.8rem] leading-relaxed', dark ? 'text-slate-300' : 'text-slate')}>
              <input
                type="checkbox"
                aria-invalid={!!errors.consent}
                aria-describedby={describe('consent')}
                className="mt-0.5 size-4 shrink-0 cursor-pointer rounded accent-brand"
                {...register('consent')}
              />
              <span>
                J’accepte que Nashsoft Systems utilise ces informations pour me recontacter au sujet de mon projet.{' '}
                <Link to="/confidentialite" className={cn('font-medium underline underline-offset-2', dark ? 'text-cyan' : 'text-brand')}>
                  Politique de confidentialité
                </Link>
              </span>
            </label>
            {errors.consent && (
              <p id={`${id('consent')}-error`} role="alert" className={cn('mt-1.5 text-xs', dark ? 'text-red-300' : 'text-red-600')}>
                {errors.consent.message}
              </p>
            )}
          </div>

          {captcha.siteKey && (
            <Turnstile key={captcha.widgetKey} siteKey={captcha.siteKey} onToken={captcha.setToken} tone={tone} error={captcha.error} className="sm:col-span-2" />
          )}

          {serverError && (
            <p role="alert" className="rounded-xl border border-red-300/60 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-cyan via-brand to-violet font-display text-[0.95rem] font-semibold text-white shadow-[0_14px_34px_-12px_rgb(8_125_255/0.8)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgb(8_125_255/0.9)] disabled:pointer-events-none disabled:opacity-70 sm:col-span-2"
          >
            {isSubmitting ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <Send aria-hidden className="size-4" />}
            {isSubmitting ? 'Envoi en cours…' : submitLabel}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
