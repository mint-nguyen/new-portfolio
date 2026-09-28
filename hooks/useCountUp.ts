import { useEffect, useState } from 'react'

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from 0 to `target` once `active` becomes true.
 * `instant` (reduced motion) jumps straight to the target.
 */
const useCountUp = (
  target: number,
  active: boolean,
  duration = 1200,
  instant = false
): number => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined
    if (instant) {
      setValue(target)
      return undefined
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setValue(Math.round(easeOutCubic(t) * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration, instant])

  return value
}

export default useCountUp
