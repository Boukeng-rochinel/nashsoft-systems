import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Activer le thème clair' : 'Activer le thème sombre'}
      aria-pressed={dark}
      title={dark ? 'Thème clair' : 'Thème sombre'}
      className={cn(
        'relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full transition-colors',
        dark ? 'text-cyan hover:bg-white/10' : 'text-brand hover:bg-light',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          {dark ? <Moon aria-hidden className="size-[18px]" /> : <Sun aria-hidden className="size-[18px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
