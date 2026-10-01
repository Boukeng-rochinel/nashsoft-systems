import { useEffect, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

/** Animates from 0 to `target` once `start` becomes true. Honors reduced motion. */
export function useCountUp(target: number, start: boolean, duration = 1.6) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start || reduce) return
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [start, target, duration, reduce])

  // Reduced motion: show the final figure immediately, no animation.
  return reduce ? target : value
}
