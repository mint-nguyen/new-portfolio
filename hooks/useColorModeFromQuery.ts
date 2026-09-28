import { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'

/** `?mode=light` or `?mode=dark` forces the color mode (used for screenshots and shareable links). */
const useColorModeFromQuery = (): void => {
  const { setColorMode } = useColorMode()
  useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get('mode')
    if (mode !== 'light' && mode !== 'dark') return undefined
    // Defer one tick: ChakraProvider's own mount effect runs after this child
    // effect and would otherwise overwrite the value with the stored mode.
    const id = window.setTimeout(() => setColorMode(mode), 0)
    return () => window.clearTimeout(id)
  }, [setColorMode])
}

export default useColorModeFromQuery
