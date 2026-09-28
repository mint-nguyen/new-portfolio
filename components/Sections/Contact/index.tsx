import { memo } from 'react'
import { Button, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { motion, useReducedMotion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RiMailLine } from 'react-icons/ri'
import Section from 'components/Layout/Section'
import SocialLinks from 'components/Ui/SocialLinks'
import Footer from './Footer'
import useConfetti from './useConfetti'
import { profile } from 'config/profile'
import usePalette from 'hooks/usePalette'

const kaomoji: Variants = {
  shake: {
    rotate: [0, 15, 0, -15, 0],
    transition: { delay: 1.0, duration: 0.5, repeat: 2, ease: 'easeInOut' },
  },
  jump: {
    y: [0, -30, 0],
    transition: { delay: 1.6, duration: 0.5, repeat: 3, ease: 'easeInOut' },
  },
}

const Contact = () => {
  const p = usePalette()
  const reduce = useReducedMotion()
  const fire = useConfetti()
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <Section id="contact" eyebrow="Contact">
      <Stack spacing={6} maxW="720px">
        <Heading as="h2" id="contact-heading" fontSize={{ base: '3xl', md: '4xl' }} lineHeight={1.15}>
          Say hi!{' '}
          <motion.button
            ref={ref}
            type="button"
            onClick={fire}
            aria-label="Celebrate with confetti"
            variants={kaomoji}
            animate={inView && !reduce ? ['shake', 'jump'] : false}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'inline-block',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              font: 'inherit',
              color: p.mint,
              padding: 0,
            }}
          >
            (⁀ᗢ⁀)
          </motion.button>
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color={p.muted}>
          I'm a bubbly person and I love putting a smile on everyone's face.
          Coding, guiding teams, movies, weeb stuff, anything is cool. If you're
          in Calgary and love hiking, ask! Message me on any social or shoot me
          an{' '}
          <Link href={`mailto:${profile.email}`} fontWeight={600}>
            email
          </Link>
          .
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} align={{ sm: 'center' }}>
          <Button
            as="a"
            href={`mailto:${profile.email}`}
            variant="solidMint"
            size="lg"
            leftIcon={<RiMailLine />}
            onClick={fire}
          >
            Email me
          </Button>
          <SocialLinks />
        </Stack>
      </Stack>
      <Footer />
    </Section>
  )
}

export default memo(Contact)
