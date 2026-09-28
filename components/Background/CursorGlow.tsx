import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import usePalette from 'hooks/usePalette'

const SIZE = 420

const CursorGlow = () => {
  const reduce = useReducedMotion()
  const p = usePalette()
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (reduce) return undefined
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return undefined
    setEnabled(true)

    let raf = 0
    let x = -SIZE
    let y = -SIZE
    const paint = () => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - SIZE / 2}px, ${
          y - SIZE / 2
        }px, 0)`
      }
      raf = 0
    }
    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(paint)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1,
        transform: `translate3d(-${SIZE}px, -${SIZE}px, 0)`,
        background: `radial-gradient(circle, ${p.glow} 0%, transparent 60%)`,
        willChange: 'transform',
      }}
    />
  )
}

export default CursorGlow
