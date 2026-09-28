import { Flex, HStack, Icon, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { RiGraduationCapLine, RiMedalLine } from 'react-icons/ri'
import { education } from 'config/experience'
import Chip from 'components/Ui/Chip'
import usePalette from 'hooks/usePalette'
import { Card, Marker } from './TimelineItem'

const EducationItem = () => {
  const p = usePalette()
  return (
    <Flex as="li" position="relative" pl={{ base: 14, md: 28 }}>
      <Marker>
        <Icon as={RiGraduationCapLine} color={p.mint} boxSize={{ base: 5, md: 8 }} />
      </Marker>
      <Card>
        <Stack spacing={1}>
          <Flex justify="space-between" align="baseline" wrap="wrap">
            <Text fontWeight={700} fontSize={{ base: 'md', md: 'lg' }}>
              {education.degree}
            </Text>
            <Text fontSize="sm" color={p.muted}>
              {education.duration}
            </Text>
          </Flex>
          <HStack spacing={2}>
            <Text fontWeight={600} color={p.mint}>
              {education.school}
            </Text>
            <Text fontSize="sm" color={p.muted}>
              · {education.location}
            </Text>
          </HStack>
        </Stack>
        <Wrap mt={4} spacing={2}>
          {education.honors.map((h) => (
            <WrapItem key={h}>
              <Chip icon={RiMedalLine} label={h} variant="coral" size="sm" />
            </WrapItem>
          ))}
        </Wrap>
      </Card>
    </Flex>
  )
}

export default EducationItem
