import { IconButton, useColorMode } from '@chakra-ui/react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import usePalette from 'hooks/usePalette'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const p = usePalette()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      icon={isDark ? <RiSunLine /> : <RiMoonLine />}
      onClick={toggleColorMode}
      variant="ghost"
      isRound
      color={p.text}
      _hover={{ bg: p.mintSoft, color: p.mint, transform: 'rotate(20deg)' }}
      transition="all 0.2s ease"
    />
  )
}

export default ThemeToggle
