import { Box, Text } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { Stat } from 'config/stats'
import useCountUp from 'hooks/useCountUp'
import usePalette from 'hooks/usePalette'

const Counter = ({
  stat,
  active,
  index,
}: {
  stat: Stat
  active: boolean
  index: number
}) => {
  const reduce = useReducedMotion()
  const p = usePalette()
  const isNumber = typeof stat.value === 'number'
  const n = useCountUp(isNumber ? (stat.value as number) : 0, active, 1200, !!reduce)
  const display = isNumber ? `${n}${stat.suffix ?? ''}` : String(stat.value)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        active
          ? { opacity: 1, scale: reduce ? 1 : [0.85, 1.05, 1] }
          : undefined
      }
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
    >
      <Box
        p={{ base: 4, md: 6 }}
        borderRadius="2xl"
        bg={p.surface}
        borderWidth="1px"
        borderColor={p.surfaceBorder}
        textAlign="center"
        transition="transform 0.2s ease, border-color 0.2s ease"
        _hover={{ transform: 'translateY(-4px)', borderColor: p.mint }}
      >
        <Text
          as="div"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight={800}
          lineHeight={1}
          bgGradient={p.gradient}
          bgClip="text"
        >
          {display}
        </Text>
        <Text
          mt={2}
          fontSize="xs"
          fontWeight={600}
          color={p.muted}
          textTransform="uppercase"
          letterSpacing="0.1em"
        >
          {stat.label}
        </Text>
      </Box>
    </motion.div>
  )
}

export default Counter
