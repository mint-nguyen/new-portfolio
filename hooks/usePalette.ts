import { useColorModeValue } from '@chakra-ui/react'
import { palette, Palette } from 'config/theme'

const usePalette = (): Palette => useColorModeValue(palette.light, palette.dark)

export default usePalette
