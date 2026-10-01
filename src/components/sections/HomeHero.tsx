import { motion } from 'framer-motion'
import { BrainCircuit, CirclePlay, Cloud, CodeXml } from 'lucide-react'
import { heroHighlights } from '@/data/site'
import { themes } from '@/data/themes'
import { START_PROJECT_HREF } from '@/data/navigation'
import { fadeUp, stagger } from '@/lib/motion'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'
import { AnimatedGrid } from '@/components/visuals/AnimatedGrid'
import { BrandN } from '@/components/visuals/BrandN'
import { FloatingCard } from '@/components/visuals/FloatingCard'
import { Laptop, Phone } from '@/components/visuals/Devices'

/** Light enterprise hero — reference: homepage design (light). */
export function HomeHero() {
  return (
    <section data-theme="light" className="relative isolate overflow-hidden bg-white">
      {/* Backdrop: soft blue wash on the right + faint grid */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_85%_30%,#e3efff_0%,#f3f7fd_45%,#ffffff_75%)]" />
      <AnimatedGrid tone="light" glow={false} className="-z-10 opacity-70" />

      <Container className="grid items-center gap-12 pt-10 pb-16 md:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:pt-16 lg:pb-20">
        <motion.div variants={stagger(0.09)} initial="hidden" animate="show" className="max-w-[40rem]">
          <motion.p variants={fadeUp} className="eyebrow text-brand">
            Ideas · Code · Solutions
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-4 text-[2.2rem] leading-[1.1] font-extrabold sm:text-[2.9rem] xl:text-[3.15rem]">
            Nous transformons vos idées en <GradientText>solutions digitales.</GradientText>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-5 text-base leading-relaxed text-slate sm:text-[1.05rem]">
            Nashsoft Systems conçoit et développe des logiciels, plateformes web et mobiles ainsi que des solutions innovantes pour aider
            les entreprises et organisations à atteindre leurs objectifs.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={START_PROJECT_HREF} size="lg">
              Démarrer un projet
            </ButtonLink>
            <ButtonLink to="/#processus" variant="secondary" size="lg" icon={CirclePlay}>
              Voir notre processus
            </ButtonLink>
          </motion.div>
          <motion.ul variants={fadeUp} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {heroHighlights.map((h) => (
              <li key={h.title} className="flex items-center gap-2.5">
                {h.icon && (
                  <span aria-hidden className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-brand/15 bg-white text-brand shadow-card">
                    <h.icon className="size-4" strokeWidth={1.8} />
                  </span>
                )}
                <span className="text-[0.7rem] leading-tight">
                  <span className="block font-semibold text-navy">{h.title}</span>
                  <span className="text-slate">{h.description}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual composition */}
        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[-6%] right-[2%] -z-10 w-[62%] opacity-[0.22]"
          >
            <BrandN className="aspect-square w-full" />
          </motion.div>
          <div aria-hidden className="absolute top-[10%] left-[12%] -z-10 size-72 rounded-full bg-brand/15 blur-3xl" />
          <div aria-hidden className="absolute right-[6%] bottom-[0%] -z-10 size-56 rounded-full bg-violet/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative px-[6%] pt-[14%] pb-[10%]"
          >
            <Laptop variant="dashboard" theme={themes.nashsoft} title="Nashsoft" />
            <div className="absolute right-[3%] bottom-[6%] w-[19%]">
              <Phone variant="mobile" theme={themes.nashsoft} title="Nashsoft" />
            </div>
          </motion.div>

          <FloatingCard icon={CodeXml} title="Web & Mobile Apps" description="Des applications performantes et sur mesure." className="top-[2%] left-0 sm:left-[2%]" />
          <FloatingCard
            icon={Cloud}
            title="Cloud & Infrastructure"
            description="Une infrastructure fiable et sécurisée."
            className="top-[0%] right-0 hidden sm:block"
            delay={0.25}
          />
          <FloatingCard icon={BrainCircuit} title="IA & Data" description="Des données qui créent de la valeur." className="right-[2%] bottom-[-2%] sm:right-[22%]" delay={0.5} />
        </div>
      </Container>
    </section>
  )
}
