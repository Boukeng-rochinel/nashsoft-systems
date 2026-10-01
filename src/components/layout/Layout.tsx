import { Suspense, useEffect } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { pageTransition } from '@/lib/motion'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/**
 * Theme by route, as in the reference designs:
 * the homepage is the light enterprise theme (light nav + light footer);
 * inner pages open on a dark technology hero (dark nav + dark footer).
 */
const lightRoutes = new Set(['/'])

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

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="size-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
      <span className="sr-only">Chargement…</span>
    </div>
  )
}

export function Layout() {
  const location = useLocation()
  // Captured element: the exiting page keeps rendering its own route during the exit animation.
  const outlet = useOutlet()
  const tone = lightRoutes.has(location.pathname) ? 'light' : 'dark'

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />
      <Navbar tone={tone} />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={location.pathname} variants={pageTransition} initial="initial" animate="enter" exit="exit">
            <Suspense fallback={<PageFallback />}>{outlet}</Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer tone={tone} />
    </div>
  )
}
