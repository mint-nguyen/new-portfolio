import { useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { palette } from 'config/theme'

const colors = [palette.dark.mint, palette.dark.coral, '#FFB86B', '#FFFFFF']

/** Returns a click handler that fires three confetti bursts. No-op under reduced motion. */
const useConfetti = (): (() => void) => {
  const reduce = useReducedMotion()
  return useCallback(() => {
    if (reduce) return
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors })
      setTimeout(
        () =>
          confetti({
            particleCount: 60,
            spread: 100,
            angle: 60,
            origin: { x: 0, y: 0.8 },
            colors,
          }),
        150
      )
      setTimeout(
        () =>
          confetti({
            particleCount: 60,
            spread: 100,
            angle: 120,
            origin: { x: 1, y: 0.8 },
            colors,
          }),
        300
      )
    })
  }, [reduce])
}

export default useConfetti
