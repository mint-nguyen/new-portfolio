import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import { stats } from 'config/stats'
import Counter from './Counter'

const Impact = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <Box as="section" id="impact" aria-label="Highlights" py={{ base: 4, md: 8 }}>
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <SimpleGrid ref={ref} columns={{ base: 2, md: 4 }} spacing={{ base: 4, md: 6 }}>
          {stats.map((s, i) => (
            <Counter key={s.label} stat={s} active={inView} index={i} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Impact
