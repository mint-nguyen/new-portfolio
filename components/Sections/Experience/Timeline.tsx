import { Box } from '@chakra-ui/react'
import { experiences } from 'config/experience'
import TimelineItem from './TimelineItem'
import EducationItem from './EducationItem'
import usePalette from 'hooks/usePalette'

const Timeline = () => {
  const p = usePalette()
  return (
    <Box
      as="ol"
      listStyleType="none"
      m={0}
      p={0}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: '20px',
        bottom: '20px',
        left: { base: '17px', md: '39px' },
        width: '2px',
        bg: p.surfaceBorder,
      }}
    >
      {experiences.map((item) => (
        <TimelineItem key={item.key} item={item} />
      ))}
      <EducationItem />
    </Box>
  )
}

export default Timeline
