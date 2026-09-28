import { Box, Icon } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { RiMouseLine } from 'react-icons/ri'
import usePalette from 'hooks/usePalette'

const ScrollCue = () => {
  const reduce = useReducedMotion()
  const p = usePalette()
  return (
    <Box
      aria-hidden
      position="absolute"
      bottom={6}
      left="50%"
      transform="translateX(-50%)"
      display={{ base: 'none', lg: 'block' }}
      color={p.muted}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
      >
        <Icon as={RiMouseLine} boxSize={6} />
      </motion.div>
    </Box>
  )
}

export default ScrollCue
