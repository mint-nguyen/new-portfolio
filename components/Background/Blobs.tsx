import { Box } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import usePalette from 'hooks/usePalette'

type BlobSpec = {
  tone: 'a' | 'b'
  size: number
  style: React.CSSProperties
  path: { x: number[]; y: number[] }
  duration: number
}

const blobs: BlobSpec[] = [
  {
    tone: 'a',
    size: 560,
    style: { top: '-12%', left: '-10%' },
    path: { x: [0, 60, -30, 0], y: [0, -40, 30, 0] },
    duration: 22,
  },
  {
    tone: 'b',
    size: 460,
    style: { top: '28%', right: '-12%' },
    path: { x: [0, -50, 20, 0], y: [0, 40, -30, 0] },
    duration: 26,
  },
  {
    tone: 'a',
    size: 380,
    style: { bottom: '-18%', left: '32%' },
    path: { x: [0, 40, -40, 0], y: [0, -30, 20, 0] },
    duration: 18,
  },
]

const Blobs = ({ variant = 'hero' }: { variant?: 'hero' | 'soft' }) => {
  const p = usePalette()
  const reduce = useReducedMotion()
  const opacity = variant === 'hero' ? 0.5 : 0.22

  return (
    <Box
      aria-hidden
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      overflow="hidden"
      zIndex={0}
      pointerEvents="none"
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            opacity,
            filter: 'blur(80px)',
            background: `radial-gradient(circle at 30% 30%, ${
              b.tone === 'a' ? p.blobA : p.blobB
            } 0%, transparent 70%)`,
            willChange: 'transform',
            ...b.style,
          }}
          animate={reduce ? undefined : b.path}
          transition={
            reduce
              ? undefined
              : {
                  duration: b.duration,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }
          }
        />
      ))}
    </Box>
  )
}

export default Blobs
