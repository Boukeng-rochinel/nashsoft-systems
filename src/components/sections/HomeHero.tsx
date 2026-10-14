import { heroHighlights } from '@/data/site'
import { START_PROJECT_HREF } from '@/data/navigation'
import { ButtonLink } from '@/components/ui/Button'
import { AccentText } from '@/components/ui/AccentText'
import { PlayLink } from '@/components/ui/PlayLink'
import { PageHero } from './PageHero'

/** Homepage hero: the shared photo hero at full viewport height. */
export function HomeHero() {
  return (
    <PageHero
      size="full"
      image="/images/hero-home.webp"
      eyebrow="Ideas · Code · Solutions"
      title={
        <>
          Nous transformons vos idées en <AccentText>solutions digitales.</AccentText>
        </>
      }
      description="Nashsoft Systems conçoit et développe des logiciels, plateformes web et mobiles ainsi que des solutions innovantes pour aider les entreprises et organisations à atteindre leurs objectifs."
      actions={
        <>
          <ButtonLink to={START_PROJECT_HREF} size="lg" arrow={false} className="w-full sm:w-auto">
            Démarrer un projet
          </ButtonLink>
          <PlayLink to="/#processus">Voir notre processus</PlayLink>
        </>
      }
      highlights={heroHighlights}
    />
  )
}
