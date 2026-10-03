import { BrainCircuit, CirclePlay, Cloud, CodeXml } from 'lucide-react'
import { heroHighlights } from '@/data/site'
import { START_PROJECT_HREF } from '@/data/navigation'
import { ButtonLink } from '@/components/ui/Button'
import { GradientText } from '@/components/ui/GradientText'
import { FloatingCard } from '@/components/visuals/FloatingCard'
import { PageHero } from './PageHero'
import { HeroImage } from './HeroImage'

/** Homepage hero — reference: homepage design (light by default, follows the site theme). */
export function HomeHero() {
  return (
    <PageHero
      eyebrow="Ideas · Code · Solutions"
      title={
        <>
          Nous transformons vos idées en <GradientText>solutions digitales.</GradientText>
        </>
      }
      description="Nashsoft Systems conçoit et développe des logiciels, plateformes web et mobiles ainsi que des solutions innovantes pour aider les entreprises et organisations à atteindre leurs objectifs."
      actions={
        <>
          <ButtonLink to={START_PROJECT_HREF} size="lg">
            Démarrer un projet
          </ButtonLink>
          <ButtonLink to="/#processus" variant="secondary" size="lg" icon={CirclePlay} arrow={false}>
            Voir notre processus
          </ButtonLink>
        </>
      }
      highlights={heroHighlights}
      visual={
        <HeroImage src="/images/hero-home.webp" alt="Équipe de développeurs collaborant devant un écran de code">
          <FloatingCard icon={CodeXml} title="Web & Mobile Apps" description="Des applications performantes et sur mesure." className="top-[5%] -left-2 sm:-left-6" />
          <FloatingCard
            icon={Cloud}
            title="Cloud & Infrastructure"
            description="Une infrastructure fiable et sécurisée."
            className="top-[42%] -right-2 hidden sm:block lg:-right-8"
            delay={0.25}
          />
          <FloatingCard icon={BrainCircuit} title="IA & Data" description="Des données qui créent de la valeur." className="bottom-[5%] left-[6%]" delay={0.5} />
        </HeroImage>
      }
    />
  )
}
