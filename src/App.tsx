import { BrowserRouter } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { AppRoutes } from '@/routes/AppRoutes'

export function App() {
  return (
    // "user": Framer Motion disables transform/layout animations when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MotionConfig>
  )
}
