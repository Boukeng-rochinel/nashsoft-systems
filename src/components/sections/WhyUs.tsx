import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket, ShieldCheck, Star, Users } from 'lucide-react'
import { whyNashsoft } from '@/data/site'
import { cn } from '@/lib/cn'
import { fadeUp, revealViewport, stagger } from '@/lib/motion'
import { GradientText } from '@/components/ui/GradientText'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

/** One accent per card, in order: blue · violet · green · orange. */
const tones = [
  { card: 'from-white to-brand-50/70 border-brand-100', tile: 'bg-brand-50 text-brand', blob: 'bg-brand-100/60', text: 'text-brand', button: 'bg-brand' },
  { card: 'from-white to-violet-50/80 border-violet-100', tile: 'bg-violet-50 text-violet', blob: 'bg-violet-100/60', text: 'text-violet', button: 'bg-violet' },
  { card: 'from-white to-emerald-50/80 border-emerald-100', tile: 'bg-emerald-50 text-emerald-600', blob: 'bg-emerald-100/60', text: 'text-emerald-700', button: 'bg-emerald-600' },
  { card: 'from-white to-orange-50/80 border-orange-100', tile: 'bg-orange-50 text-orange-500', blob: 'bg-orange-100/60', text: 'text-orange-600', button: 'bg-orange-500' },
]

const trust = [
  { label: 'Solutions sur mesure', icon: Rocket, color: 'text-brand' },
  { label: 'Fiabilité et qualité', icon: ShieldCheck, color: 'text-emerald-600' },
  { label: 'Votre succès, notre priorité', icon: Users, color: 'text-violet' },
]

/** "Pourquoi nous choisir": pitch on the left, four tinted link cards on the right. */
export function WhyUs() {
  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:gap-14">
      <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={revealViewport} className="relative">
        <motion.p variants={fadeUp} className="eyebrow inline-flex items-center gap-2.5 rounded-full bg-brand-50 py-2 pr-4 pl-2 text-brand">
          <span aria-hidden className="inline-flex size-6 items-center justify-center rounded-full bg-white">
            <Star className="size-3.5 fill-brand" />
          </span>
          Pourquoi nous choisir
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-6 text-[2rem] leading-[1.1] font-bold sm:text-[2.6rem]">
          Une expertise qui fait{' '}
          <span className="relative inline-block">
            <GradientText>la différence</GradientText>
            <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-2 left-[2%] h-2.5 w-[86%]">
              <path d="M2 9 C 50 3, 130 1, 198 6" fill="none" stroke="url(#why-underline)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="why-underline" x1="0" x2="1">
                  <stop offset="0" stopColor="#087DFF" />
                  <stop offset="1" stopColor="#6338F5" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-7 max-w-md text-base leading-relaxed text-slate sm:text-[1.05rem]">
          Nous ne sommes pas seulement des développeurs. Nous sommes votre partenaire technologique pour la réussite de vos projets.
        </motion.p>
        <motion.ul variants={fadeUp} className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-line bg-light/80 p-4 sm:grid-cols-3 sm:gap-0 sm:p-5">
          {trust.map((t, i) => (
            <li key={t.label} className={cn('flex items-center gap-3 sm:px-4', i > 0 && 'sm:border-l sm:border-line', i === 0 && 'sm:pl-1')}>
              <t.icon aria-hidden className={cn('size-6 shrink-0', t.color)} strokeWidth={1.8} />
              <span className="text-sm leading-snug text-navy/80">{t.label}</span>
            </li>
          ))}
        </motion.ul>
        <div
          aria-hidden
          className="mt-8 hidden h-12 w-32 bg-[radial-gradient(circle,var(--color-line-strong)_1.5px,transparent_1.5px)] bg-[length:16px_16px] lg:block"
        />
      </motion.div>

      <RevealGroup className="grid gap-5 sm:grid-cols-2">
        {whyNashsoft.map((item, i) => {
          const tone = tones[i % tones.length]
          return (
            <RevealItem key={item.title} className="h-full">
              <Link
                to={item.href}
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover sm:p-7',
                  tone.card,
                )}
              >
                <span aria-hidden className={cn('absolute -top-10 -right-10 size-36 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125', tone.blob)} />
                <div className="relative flex items-start justify-between">
                  <span aria-hidden className={cn('inline-flex size-14 items-center justify-center rounded-2xl', tone.tile)}>
                    <item.icon className="size-7" strokeWidth={1.6} />
                  </span>
                  <span className={cn('rounded-lg bg-white/80 px-2.5 py-1 font-display text-sm font-bold', tone.text)}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="relative mt-5 font-display text-lg font-bold text-navy sm:text-xl">{item.title}</h3>
                <p className="relative mt-2.5 flex-1 text-sm leading-relaxed text-slate">{item.description}</p>
                <div className="relative mt-6 flex items-center justify-between">
                  <span className={cn('inline-flex items-center gap-1.5 text-sm font-semibold', tone.text)}>
                    En savoir plus <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span aria-hidden className={cn('inline-flex size-9 items-center justify-center rounded-full text-white shadow-card transition-transform group-hover:scale-110', tone.button)}>
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          )
        })}
      </RevealGroup>
    </div>
  )
}
