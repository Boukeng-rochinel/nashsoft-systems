import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { AppRoutes } from '@/routes/AppRoutes'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { LanguageProvider } from '@/components/layout/LanguageProvider'

export function App() {
  return (
    // "user": Framer Motion disables transform/layout animations when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  )
}
