import { Suspense, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { pageTransition } from '@/lib/motion'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import { CardSkeletonGrid } from '@/components/ui/CardSkeleton'
import { ChatLauncher } from '@/components/chat/ChatLauncher'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { CookieConsent } from './CookieConsent'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

/**
 * Shown while a lazy page chunk downloads (noticeable on slow 3G):
 * a skeleton of the page — hero lines + a row of cards — instead of a spinner,
 * so the layout doesn't jump when the content arrives.
 */
function PageFallback({ tone }: { tone: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const block = cn('skeleton rounded-md', dark && 'skeleton-dark')
  return (
    <div data-theme={tone} className={dark ? 'bg-navy-950' : 'bg-white'}>
      <div className="mx-auto w-full max-w-[1240px] px-4 pt-14 pb-16 sm:px-6 lg:px-8" role="status" aria-live="polite" aria-label="Chargement de la page…">
        <div aria-hidden className="max-w-xl space-y-4">
          <div className={cn(block, 'h-3 w-32')} />
          <div className={cn(block, 'h-10 w-full sm:h-12')} />
          <div className={cn(block, 'h-10 w-4/5 sm:h-12')} />
          <div className={cn(block, 'mt-6 h-4 w-full')} />
          <div className={cn(block, 'h-4 w-11/12')} />
          <div className="flex gap-3 pt-4">
            <div className={cn(block, 'h-12 w-44 rounded-full')} />
            <div className={cn(block, 'h-12 w-40 rounded-full')} />
          </div>
        </div>
        <CardSkeletonGrid count={3} tone={tone} className="mt-16" announce={false} />
      </div>
    </div>
  )
}

export function Layout() {
  const location = useLocation()
  // Captured element: the exiting page keeps rendering its own route during the exit animation.
  const outlet = useOutlet()
  // Light enterprise theme by default on every page; visitors can switch to the dark technology theme.
  const { theme: tone } = useTheme()

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Navbar tone={tone} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} variants={pageTransition} initial="initial" animate="enter" exit="exit">
            <Suspense fallback={<PageFallback tone={tone} />}>{outlet}</Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer tone={tone} />
      <ChatLauncher />
      <CookieConsent />
    </div>
  )
}
