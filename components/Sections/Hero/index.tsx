import {
  Box,
  Button,
  Container,
  Heading,
  Grid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { RiDownloadLine, RiSendPlaneLine } from 'react-icons/ri'
import { profile } from 'config/profile'
import { fadeInUp, simpleOpacity, stagger } from 'config/animations'
import Blobs from 'components/Background/Blobs'
import SocialLinks from 'components/Ui/SocialLinks'
import Orbit from './Orbit'
import ScrollCue from './ScrollCue'
import usePalette from 'hooks/usePalette'

const MotionStack = motion(Stack)
const MotionText = motion(Text)
const MotionHeading = motion(Heading)
const MotionBox = motion(Box)

const Hero = () => {
  const p = usePalette()
  const { headline } = profile
  return (
    <Box
      as="section"
      id="top"
      aria-label="Introduction"
      position="relative"
      overflow="hidden"
      pt={{ base: 28, md: 32 }}
      pb={{ base: 16, md: 24 }}
      minH={{ lg: 'min(92vh, 880px)' }}
      display="flex"
      alignItems="center"
    >
      <Blobs variant="hero" />
      <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <Grid templateColumns={{ base: '1fr', lg: '1.15fr 1fr' }} gap={{ base: 12, lg: 10 }} alignItems="center">
          <MotionStack variants={stagger} initial="initial" animate="animate" spacing={6}>
            <MotionText
              variants={fadeInUp}
              as="span"
              fontSize="md"
              fontWeight={600}
              letterSpacing="0.14em"
              textTransform="uppercase"
              color={p.mint}
            >
              {profile.eyebrow}
            </MotionText>
            <MotionHeading
              as="h1"
              variants={fadeInUp}
              fontSize={{ base: '2.5rem', md: '3.2rem', xl: '3.7rem' }}
              lineHeight={1.05}
              fontWeight={800}
            >
              {headline.before}
              <Text as="span" bgGradient={p.gradient} bgClip="text">
                {headline.gradient}
              </Text>
              {headline.middle}
              <Text as="span" color={p.coral}>
                {headline.accent}
              </Text>
              {headline.after}
            </MotionHeading>
            <MotionText
              variants={fadeInUp}
              fontSize={{ base: 'md', md: 'lg' }}
              color={p.muted}
              maxW="560px"
            >
              {profile.heroSub}
            </MotionText>
            <MotionStack
              variants={fadeInUp}
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
            >
              <Button
                as="a"
                href={`mailto:${profile.email}`}
                variant="solidMint"
                size="lg"
                rightIcon={<RiSendPlaneLine />}
              >
                Let's talk
              </Button>
              <Button
                as="a"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                variant="outlineMint"
                size="lg"
                rightIcon={<RiDownloadLine />}
              >
                Download resume
              </Button>
            </MotionStack>
            <MotionBox variants={simpleOpacity}>
              <SocialLinks />
            </MotionBox>
          </MotionStack>
          <Orbit />
        </Grid>
      </Container>
      <ScrollCue />
    </Box>
  )
}

export default Hero
