import { heroHighlights } from '@/data/site'
import { START_PROJECT_HREF } from '@/data/navigation'
import { ButtonLink } from '@/components/ui/Button'
import { AccentText } from '@/components/ui/AccentText'
import { PlayLink } from '@/components/ui/PlayLink'
import { PageHero } from './PageHero'
import { t } from '@/i18n'

/** Homepage hero: the shared photo hero at full viewport height. */
export function HomeHero() {
  return (
    <PageHero
      size="full"
      image="/images/hero-home.webp"
      eyebrow={t('Ideas · Code · Solutions')}
      title={
        <>{t('Nous transformons vos idées en')}{' '}<AccentText>{t('solutions digitales.')}</AccentText>
        </>
      }
      description={t('Nashsoft Systems conçoit et développe des logiciels, plateformes web et mobiles ainsi que des solutions innovantes pour aider les entreprises et organisations à atteindre leurs objectifs.')}
      actions={
        <>
          <ButtonLink to={START_PROJECT_HREF} size="lg" arrow={false} className="w-full sm:w-auto">{t('Démarrer un projet')}</ButtonLink>
          <PlayLink to="/#processus">{t('Voir notre processus')}</PlayLink>
        </>
      }
      highlights={heroHighlights}
    />
  )
}
