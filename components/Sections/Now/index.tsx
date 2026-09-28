import { memo } from 'react'
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { RiTimeLine } from 'react-icons/ri'
import Section from 'components/Layout/Section'
import Blobs from 'components/Background/Blobs'
import Chip from 'components/Ui/Chip'
import { nowItems, nowUpdated } from 'config/now'
import usePalette from 'hooks/usePalette'

const Now = () => {
  const p = usePalette()
  return (
    <Section
      id="now"
      eyebrow="Now"
      heading="Right now."
      background={<Blobs variant="soft" />}
      overflow="hidden"
    >
      <Box mb={6}>
        <Chip icon={RiTimeLine} label={nowUpdated} size="sm" />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
        {nowItems.map((item) => (
          <Box
            key={item.label}
            p={6}
            borderRadius="2xl"
            bg={p.surface}
            borderWidth="1px"
            borderColor={p.surfaceBorder}
            transition="transform 0.25s ease, border-color 0.25s ease"
            _hover={{ transform: 'translateY(-6px)', borderColor: p.coral }}
          >
            <Flex
              boxSize="44px"
              borderRadius="xl"
              bg={p.coralSoft}
              color={p.coral}
              align="center"
              justify="center"
              mb={4}
            >
              <Icon as={item.icon} boxSize={5} />
            </Flex>
            <Heading
              as="h3"
              fontSize="xs"
              fontWeight={700}
              textTransform="uppercase"
              letterSpacing="0.12em"
              color={p.muted}
              mb={2}
            >
              {item.label}
            </Heading>
            <Text fontSize="md">{item.body}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  )
}

export default memo(Now)
