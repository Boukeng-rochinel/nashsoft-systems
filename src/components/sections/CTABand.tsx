import type { ReactNode } from 'react'
import { START_PROJECT_HREF } from '@/data/navigation'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { BrandN } from '@/components/visuals/BrandN'

interface CTABandProps {
  eyebrow?: string
  title?: ReactNode
  description?: string
  cta?: { label: string; href: string }
}

/** Closing call-to-action band (navy → electric blue, glowing N mark). */
export function CTABand({
  eyebrow = 'Prêt à démarrer ?',
  title = 'Prêt à développer votre projet ?',
  description = 'Discutons de votre idée et trouvons ensemble la meilleure solution.',
  cta = { label: 'Démarrer un projet', href: START_PROJECT_HREF },
}: CTABandProps) {
  return (
    <section data-theme="dark" className="relative isolate overflow-hidden bg-navy-900">
      <Container className="flex flex-col items-start gap-8 py-12 md:flex-row md:items-center md:justify-between md:py-14">
        <Reveal className="flex items-center gap-5 sm:gap-8">
          <BrandN className="relative hidden size-20 shrink-0 sm:block lg:size-24" />
          <div>
            {eyebrow && <p className="eyebrow mb-2 text-brand-300">{eyebrow}</p>}
            <h2 className="text-2xl font-bold text-white sm:text-[1.7rem]">{title}</h2>
            {description && <p className="mt-2 max-w-xl text-sm text-slate-300 sm:text-[0.95rem]">{description}</p>}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="shrink-0">
          <ButtonLink to={cta.href} size="lg" className="ring-1 ring-white/20">
            {cta.label}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
