import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Briefcase, FolderKanban, Layers, Mail } from 'lucide-react'
import { usePageMeta } from '@/hooks/usePageMeta'
import { pageSeo } from '@/data/seo'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { AnimatedGrid, LightStreaks } from '@/components/visuals/AnimatedGrid'
import { NOutline } from '@/components/visuals/BrandN'

const shortcuts = [
  { label: 'Nos services', href: '/services', icon: Layers },
  { label: 'Nos projets', href: '/projets', icon: FolderKanban },
  { label: 'Carrières', href: '/carrieres', icon: Briefcase },
  { label: 'Contact', href: '/contact', icon: Mail },
]

export default function NotFoundPage() {
  usePageMeta(pageSeo.notFound)

  return (
    <section data-theme="dark" className="relative isolate overflow-hidden bg-navy-950 text-slate-300">
      <AnimatedGrid className="-z-10" />
      <LightStreaks className="-z-10 opacity-50" />
      <NOutline className="absolute top-1/2 right-[-10%] -z-10 hidden w-[42rem] -translate-y-1/2 opacity-40 lg:block" />
      <Container className="flex min-h-[72vh] flex-col justify-center py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gradient-cyan font-display text-[6rem] leading-none font-extrabold tracking-tighter sm:text-[9rem]"
        >
          404
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-xl">
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Cette page s’est perdue dans le code.</h1>
          <p className="mt-4 leading-relaxed text-slate-300">
            L’adresse demandée n’existe pas ou a été déplacée. Revenez à l’accueil ou explorez l’une de nos rubriques.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/" icon={ArrowLeft} arrow={false}>
              Retour à l’accueil
            </ButtonLink>
            <ButtonLink to="/demarrer-un-projet" variant="outline-dark">
              Démarrer un projet
            </ButtonLink>
          </div>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-14 grid max-w-2xl gap-3 sm:grid-cols-2"
        >
          {shortcuts.map((s) => (
            <li key={s.href}>
              <Link
                to={s.href}
                className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white transition-colors hover:border-cyan/40 hover:bg-white/[0.06]"
              >
                <span className="flex items-center gap-3">
                  <s.icon aria-hidden className="size-4 text-cyan" />
                  {s.label}
                </span>
                <ArrowUpRight aria-hidden className="size-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan" />
              </Link>
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
