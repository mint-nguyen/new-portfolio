import { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'

/** `?mode=light` or `?mode=dark` forces the color mode (used for screenshots and shareable links). */
const useColorModeFromQuery = (): void => {
  const { setColorMode } = useColorMode()
  useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get('mode')
    if (mode === 'light' || mode === 'dark') setColorMode(mode)
  }, [setColorMode])
}

export default useColorModeFromQuery
