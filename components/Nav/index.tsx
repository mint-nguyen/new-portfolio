import {
  Box,
  Container,
  Flex,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavLinks from './Links'
import ThemeToggle from './ThemeToggle'
import ResumeButton from './ResumeButton'
import MenuToggle from './Toggle'
import MobileDrawer from './MobileDrawer'
import useScrolled from 'hooks/useScrolled'
import usePalette from 'hooks/usePalette'

const Nav = () => {
  const scrolled = useScrolled()
  const p = usePalette()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg={scrolled ? p.navBg : 'transparent'}
      borderBottomWidth="1px"
      borderColor={scrolled ? p.surfaceBorder : 'transparent'}
      backdropFilter={scrolled ? 'blur(12px)' : undefined}
      transition="background-color 0.25s ease, border-color 0.25s ease"
    >
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <Flex h="72px" align="center" justify="space-between">
          <Logo />
          <HStack
            spacing={2}
            display={{ base: 'none', lg: 'flex' }}
            as="nav"
            aria-label="Primary"
          >
            <NavLinks />
            <ThemeToggle />
            <ResumeButton />
          </HStack>
          <HStack spacing={1} display={{ base: 'flex', lg: 'none' }}>
            <ThemeToggle />
            <MenuToggle isOpen={isOpen} onClick={isOpen ? onClose : onOpen} />
          </HStack>
        </Flex>
      </Container>
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Nav
