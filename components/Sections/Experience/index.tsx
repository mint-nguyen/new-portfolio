import { memo } from 'react'
import Section from 'components/Layout/Section'
import Timeline from './Timeline'

const Experience = () => (
  <Section
    id="experience"
    eyebrow="Experience"
    heading="Where I've worked."
    intro="Four companies since 2020, each one a bigger slice of the stack. The last one I helped build from the ground up."
  >
    <Timeline />
  </Section>
)

export default memo(Experience)
