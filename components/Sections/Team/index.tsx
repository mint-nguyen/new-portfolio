import { memo } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Section from 'components/Layout/Section'
import PrincipleCard from './PrincipleCard'
import { principles, teamIntro } from 'config/team'

const Team = () => (
  <Section id="team" eyebrow="Team" heading="How I help the team ship." intro={teamIntro}>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
      {principles.map((principle, i) => (
        <PrincipleCard key={principle.title} principle={principle} index={i} />
      ))}
    </SimpleGrid>
  </Section>
)

export default memo(Team)
