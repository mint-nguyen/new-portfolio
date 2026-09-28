import { memo } from 'react'
import { Box, Icon, SimpleGrid, Stack, Text, Tooltip } from '@chakra-ui/react'
import { RiCupLine } from 'react-icons/ri'
import Section from 'components/Layout/Section'
import Toolbox from './Toolbox'
import { profile, yearsShipping } from 'config/profile'
import usePalette from 'hooks/usePalette'

const Emphasis = ({ tip, children }: { tip: string; children: string }) => {
  const p = usePalette()
  return (
    <Tooltip label={tip} hasArrow placement="top" bg={p.mint} color={p.onMint}>
      <Text
        as="span"
        color={p.mint}
        fontWeight={600}
        cursor="help"
        borderBottom="2px dotted"
        borderColor={p.mint}
      >
        {children}
      </Text>
    </Tooltip>
  )
}

const About = () => {
  const p = usePalette()
  return (
    <Section id="about" eyebrow="About" heading="What I do.">
      <SimpleGrid columns={{ base: 1, lg: 5 }} spacing={{ base: 10, lg: 16 }}>
        <Stack
          gridColumn={{ lg: 'span 2' }}
          spacing={5}
          fontSize={{ base: 'md', md: 'lg' }}
          color={p.muted}
        >
          <Text>
            I've been coding professionally for{' '}
            <Text as="span" color={p.text} fontWeight={700}>
              {yearsShipping} years
            </Text>
            . These days I spend my time as a{' '}
            <Text as="span" color={p.text} fontWeight={700}>
              {profile.title}
            </Text>{' '}
            at {profile.company.name}: setting technical direction, reviewing
            code, unblocking teammates, and still shipping features myself.
          </Text>
          <Text>
            I care about <b>architecture</b>, <b>APIs</b>,{' '}
            <Emphasis tip="Ha! Or more accurately, tech debt">
              nitty-gritty business logic
            </Emphasis>
            , and the <b>front end</b> that makes it all feel effortless.
          </Text>
          <Text>
            Here are the tools that are my cup of{' '}
            <Emphasis tip="I love mint tea!">mint tea</Emphasis>{' '}
            <Icon as={RiCupLine} color={p.mint} verticalAlign="middle" />.
          </Text>
        </Stack>
        <Box gridColumn={{ lg: 'span 3' }}>
          <Toolbox />
        </Box>
      </SimpleGrid>
    </Section>
  )
}

export default memo(About)
