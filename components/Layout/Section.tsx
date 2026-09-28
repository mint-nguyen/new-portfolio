import { ReactNode } from 'react'
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import FadeInWhenVisible from './FadeWhenVisible'
import usePalette from 'hooks/usePalette'

export type SectionProps = {
  id: string
  eyebrow?: string
  heading?: string
  intro?: string
  children: ReactNode
  /** Rendered behind the container, e.g. <Blobs variant="soft" /> */
  background?: ReactNode
  overflow?: 'hidden' | 'visible'
}

/**
 * The section's accessible name is always the element with id `${id}-heading`.
 * When `heading` is omitted, the child must render a heading with that id.
 */
const Section = ({
  id,
  eyebrow,
  heading,
  intro,
  children,
  background,
  overflow = 'visible',
}: SectionProps) => {
  const p = usePalette()
  const headingId = `${id}-heading`
  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={headingId}
      position="relative"
      overflow={overflow}
      py={{ base: 16, md: 24 }}
    >
      {background}
      <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <FadeInWhenVisible>
          {(eyebrow || heading || intro) && (
            <Stack spacing={3} mb={{ base: 8, md: 12 }} maxW="720px">
              {eyebrow && (
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight={600}
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  color={p.mint}
                >
                  {eyebrow}
                </Text>
              )}
              {heading && (
                <Heading
                  as="h2"
                  id={headingId}
                  fontSize={{ base: '3xl', md: '4xl' }}
                  lineHeight={1.15}
                >
                  {heading}
                </Heading>
              )}
              {intro && (
                <Text fontSize={{ base: 'md', md: 'lg' }} color={p.muted}>
                  {intro}
                </Text>
              )}
            </Stack>
          )}
          {children}
        </FadeInWhenVisible>
      </Container>
    </Box>
  )
}

export default Section
