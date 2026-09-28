import { Box, Flex, Image } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from 'config/profile'
import { popIn } from 'config/animations'
import Chip from 'components/Ui/Chip'
import usePalette from 'hooks/usePalette'

const chipPositions: React.CSSProperties[] = [
  { top: '6%', left: '0%' },
  { bottom: '12%', left: '6%' },
  { top: '40%', right: '0%' },
]

const Orbit = () => {
  const p = usePalette()
  const reduce = useReducedMotion()
  return (
    <Flex
      position="relative"
      justify="center"
      align="center"
      minH={{ base: '320px', md: '440px' }}
      role="img"
      aria-label={`${profile.name}, ${profile.title} in ${profile.location}`}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={popIn}
        style={{ position: 'relative' }}
      >
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        >
          <Box
            boxSize={{ base: '260px', md: '340px' }}
            borderRadius="50%"
            bg={`radial-gradient(circle at 35% 30%, ${p.mintSoft} 0%, ${p.surface} 70%)`}
            borderWidth="1px"
            borderColor={p.surfaceBorder}
            boxShadow={`0 30px 80px -30px ${p.mint}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/logo.png"
              alt=""
              boxSize={{ base: '150px', md: '210px' }}
              objectFit="contain"
              htmlWidth={210}
              htmlHeight={210}
            />
          </Box>
        </motion.div>
      </motion.div>

      {profile.heroChips.map((chip, i) => (
        <motion.div
          key={chip.label}
          style={{ position: 'absolute', ...chipPositions[i] }}
          initial={{ opacity: 0, y: 12 }}
          animate={
            reduce
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: [0, -10, 0] }
          }
          transition={
            reduce
              ? { duration: 0.4, delay: 0.6 + i * 0.15 }
              : {
                  opacity: { duration: 0.4, delay: 0.6 + i * 0.15 },
                  y: {
                    duration: 4 + i,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: 0.6 + i * 0.15,
                  },
                }
          }
        >
          <Chip icon={chip.icon} label={chip.label} size="sm" />
        </motion.div>
      ))}
    </Flex>
  )
}

export default Orbit
