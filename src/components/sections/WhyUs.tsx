import { Link } from '@/i18n/router'
import { motion } from 'framer-motion'
import { ArrowRight, Rocket, ShieldCheck, Star, Users } from 'lucide-react'
import { whyNashsoft } from '@/data/site'
import { cn } from '@/lib/cn'
import { fadeUp, revealViewport, stagger } from '@/lib/motion'
import { AccentText } from '@/components/ui/AccentText'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { t as tr } from '@/i18n'

const trust = [
  { label: 'Solutions sur mesure', icon: Rocket },
  { label: 'Fiabilité et qualité', icon: ShieldCheck },
  { label: 'Votre succès, notre priorité', icon: Users },
]

/** "Pourquoi nous choisir": pitch on the left, four white link cards on the right. */
export function WhyUs() {
  return (
    <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-center lg:gap-14">
      <motion.div variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={revealViewport} className="relative">
        <motion.p variants={fadeUp} className="eyebrow inline-flex items-center gap-2.5 rounded-full bg-brand-50 py-2 pr-4 pl-2 text-brand">
          <span aria-hidden className="inline-flex size-6 items-center justify-center rounded-full bg-white">
            <Star className="size-3.5 fill-brand" />
          </span>{tr('Pourquoi nous choisir')}</motion.p>
        <motion.h2 variants={fadeUp} className="mt-6 text-[2rem] leading-[1.1] font-bold sm:text-[2.6rem]">{tr('Une expertise qui fait')}{' '}
          <AccentText>{tr('la différence')}</AccentText>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-7 max-w-md text-base leading-relaxed text-slate sm:text-[1.05rem]">{tr('Nous ne sommes pas seulement des développeurs. Nous sommes votre partenaire technologique pour la réussite de vos projets.')}</motion.p>
        <motion.ul variants={fadeUp} className="mt-8 grid grid-cols-1 gap-4 rounded-2xl border border-line bg-light/80 p-4 sm:grid-cols-3 sm:gap-0 sm:p-5">
          {trust.map((t, i) => (
            <li key={t.label} className={cn('flex items-center gap-3 sm:px-4', i > 0 && 'sm:border-l sm:border-line', i === 0 && 'sm:pl-1')}>
              <t.icon aria-hidden className="size-6 shrink-0 text-brand" strokeWidth={1.8} />
              <span className="text-sm leading-snug text-navy/80">{tr(t.label)}</span>
            </li>
          ))}
        </motion.ul>
      </motion.div>

      <RevealGroup className="grid gap-5 sm:grid-cols-2">
        {whyNashsoft.map((item, i) => (
          <RevealItem key={item.title} className="h-full">
            <Link
              to={item.href}
              className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card-hover sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span aria-hidden className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand">
                  <item.icon className="size-7" strokeWidth={1.6} />
                </span>
                <span className="font-display text-sm font-semibold text-slate">{tr(String(i + 1).padStart(2, '0'))}</span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy sm:text-xl">{tr(item.title)}</h3>
              <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate">{tr(item.description)}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">{tr('En savoir plus')}{' '}<ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span aria-hidden className="inline-flex size-9 items-center justify-center rounded-full bg-brand text-white transition-colors group-hover:bg-brand-600">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  )
}
