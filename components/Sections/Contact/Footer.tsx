import { Box, Icon, Link, Text } from '@chakra-ui/react'
import { RiGithubFill, RiHeart3Line } from 'react-icons/ri'
import { profile } from 'config/profile'
import usePalette from 'hooks/usePalette'

const Footer = () => {
  const p = usePalette()
  const year = new Date().getFullYear()
  return (
    <Box as="footer" textAlign="center" pt={{ base: 16, md: 24 }} color={p.muted} fontSize="sm">
      <Link href={profile.github} isExternal aria-label="GitHub" display="inline-block" mb={2}>
        <Icon as={RiGithubFill} boxSize={6} />
      </Link>
      <Text>
        Designed and built with <Icon as={RiHeart3Line} color={p.coral} verticalAlign="middle" /> by{' '}
        {profile.name} © {year}
      </Text>
    </Box>
  )
}

export default Footer
