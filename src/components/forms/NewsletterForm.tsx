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
      <div className="relative flex items-center">
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          placeholder="Votre adresse email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? `${id}-error` : done ? `${id}-status` : undefined}
          className={cn(
            'h-14 w-full rounded-full border pr-16 pl-6 text-[0.92rem] transition-[border-color,box-shadow] outline-none focus:ring-4',
            dark
              ? 'border-white/15 bg-white/5 text-white placeholder:text-slate-400 focus:border-cyan/60 focus:ring-cyan/10'
              : 'border-line-strong bg-white text-navy placeholder:text-slate focus:border-brand focus:ring-brand/10',
            errors.email && 'border-red-400',
          )}
          {...register('email')}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="S’inscrire à la newsletter"
          className="absolute -right-1 inline-flex size-[60px] shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_24px_-8px_rgb(8_125_255/0.8)] transition-all hover:scale-105 hover:bg-brand-600 disabled:opacity-60"
        >
          {isSubmitting ? <LoaderCircle aria-hidden className="size-5 animate-spin" /> : done ? <Check aria-hidden className="size-5" /> : <ArrowRight aria-hidden className="size-5" />}
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
