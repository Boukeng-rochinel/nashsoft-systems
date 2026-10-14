import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Feature } from '@/types'
import { cn } from '@/lib/cn'
import { fadeUp, stagger } from '@/lib/motion'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs'
import { t } from '@/i18n'

interface PageHeroProps {
  breadcrumbs?: Crumb[]
  eyebrow?: string
  /** Optional icon shown before the eyebrow. */
  eyebrowIcon?: LucideIcon
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  highlights?: Feature[]
  /** Full-bleed background photograph (public/images). Without one, a flat navy band is used. */
  image?: string
  /** `full`: fills the viewport below the header (homepage) · `page`: shorter, for inner pages. */
  size?: 'full' | 'page'
  className?: string
}

/**
 * Hero used on every page: full-bleed photograph under a flat navy veil,
 * white headline with one accented phrase (<AccentText>), pill CTAs.
 * Always dark — the photo veil makes it so regardless of the site theme.
 */
export function PageHero({ breadcrumbs, eyebrow, eyebrowIcon: EyebrowIcon, title, description, actions, highlights, image, size = 'page', className }: PageHeroProps) {
  return (
    <section
      data-theme="dark"
      className={cn(
        'relative isolate flex items-center overflow-hidden bg-navy-950 text-slate-200',
        size === 'full' ? 'min-h-[calc(100svh-4.5rem)] lg:min-h-[calc(100svh-5rem)]' : 'min-h-[30rem] lg:min-h-[min(40rem,calc(100svh-5rem))]',
        className,
      )}
    >
      {image && (
        <>
          <img src={image} alt="" width={1600} height={1200} fetchPriority="high" decoding="async" className="absolute inset-0 -z-20 size-full object-cover" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-navy-950/65" />
        </>
      )}

      <Container className="w-full py-16 sm:py-20">
        <motion.div variants={stagger(0.09, 0.05)} initial="hidden" animate="show" className="max-w-2xl">
          {breadcrumbs && (
            <motion.div variants={fadeUp} className="mb-6">
              <Breadcrumbs items={breadcrumbs} tone="dark" />
            </motion.div>
          )}
          {eyebrow && (
            <motion.p variants={fadeUp} className="eyebrow flex items-center gap-2 text-brand-300">
              {EyebrowIcon && <EyebrowIcon aria-hidden className="size-4" strokeWidth={2} />}
              {t(eyebrow)}
            </motion.p>
          )}
          <motion.h1
            variants={fadeUp}
            className={cn(
              'mt-5 leading-[1.08] font-semibold text-white',
              size === 'full' ? 'text-[2.3rem] sm:text-[3.4rem] lg:text-[4rem]' : 'text-[2.1rem] sm:text-5xl lg:text-[3.2rem]',
            )}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-slate-200 sm:text-[1.05rem]">
              {description}
            </motion.p>
          )}
          {actions && (
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
              {actions}
            </motion.div>
          )}
          {highlights && highlights.length > 0 && (
            <motion.ul variants={fadeUp} className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/15 pt-6 sm:grid-cols-4">
              {highlights.map((h) => (
                <li key={h.title} className="flex items-center gap-2.5 text-[0.78rem] leading-tight">
                  {h.icon && <h.icon aria-hidden className="size-5 shrink-0 text-brand-300" strokeWidth={1.8} />}
                  <span>
                    <span className="block font-semibold text-white">{t(h.title)}</span>
                    {h.description && <span className="text-slate-300">{t(h.description)}</span>}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
