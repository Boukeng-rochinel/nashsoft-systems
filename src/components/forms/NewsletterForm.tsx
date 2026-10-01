import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Check, LoaderCircle } from 'lucide-react'
import { newsletterSchema, type NewsletterRequest } from '@/lib/validation'
import { subscribeNewsletter } from '@/lib/api'
import { cn } from '@/lib/cn'

export function NewsletterForm({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const id = useId()
  const dark = tone === 'dark'
  const [done, setDone] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterRequest>({ resolver: zodResolver(newsletterSchema) })

  const onSubmit = async (data: NewsletterRequest) => {
    const result = await subscribeNewsletter(data)
    if (result.status === 'mailto') {
      window.location.assign(result.href)
      setDone('Votre messagerie s’est ouverte pour confirmer l’inscription.')
    } else if (result.status === 'sent') {
      setDone('Merci ! Vous êtes inscrit·e.')
    } else {
      setDone(result.message)
      return
    }
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="sr-only">
        Votre adresse e-mail
      </label>
      <div
        className={cn(
          'flex items-center rounded-full border p-1 pl-4 transition-colors focus-within:border-brand',
          dark ? 'border-white/15 bg-white/5' : 'border-line-strong bg-white',
          errors.email && 'border-red-400',
        )}
      >
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="Votre email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? `${id}-error` : done ? `${id}-status` : undefined}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate',
            dark ? 'text-white placeholder:text-slate-400' : 'text-navy',
          )}
          {...register('email')}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="S’inscrire à la newsletter"
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white transition-transform hover:scale-105 disabled:opacity-60"
        >
          {isSubmitting ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : done ? <Check aria-hidden className="size-4" /> : <ArrowRight aria-hidden className="size-4" />}
        </button>
      </div>
      {errors.email && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-red-500">
          {errors.email.message}
        </p>
      )}
      {done && !errors.email && (
        <p id={`${id}-status`} role="status" className={cn('mt-2 text-xs', dark ? 'text-cyan' : 'text-brand')}>
          {done}
        </p>
      )}
    </form>
  )
}
