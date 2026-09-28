import { memo } from 'react'
import { Stack } from '@chakra-ui/react'
import Section from 'components/Layout/Section'
import CaseStudyCard from './CaseStudyCard'
import { works } from 'config/works'

const Work = () => (
  <Section
    id="work"
    eyebrow="Work"
    heading="Things I've shipped."
    intro="Problem, what I did, and what changed. No fluff, a little colour."
  >
    <Stack spacing={{ base: 6, md: 10 }}>
      {works.map((work, i) => (
        <CaseStudyCard key={work.title} work={work} index={i} />
      ))}
    </Stack>
  </Section>
)

export default memo(Work)
