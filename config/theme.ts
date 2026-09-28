import { extendTheme, ColorMode } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Legacy exports, removed in the final wiring task once old components are gone.
interface IThemeMode {
  Light: ColorMode
  Dark: ColorMode
}
export const ThemeMode: IThemeMode = { Light: 'light', Dark: 'dark' }
export const mobileBreakpointsMap = { base: true, md: true, lg: true, xl: false }

export type Palette = {
  bg: string
  surface: string
  surfaceBorder: string
  text: string
  muted: string
  mint: string
  mintSoft: string
  onMint: string
  coral: string
  coralSoft: string
  gradient: string
  glow: string
  navBg: string
  blobA: string
  blobB: string
  logoBg: string
}

export const palette: { dark: Palette; light: Palette } = {
  dark: {
    bg: '#0E1512',
    surface: '#152019',
    surfaceBorder: 'rgba(126, 224, 188, 0.14)',
    text: '#EAF4EE',
    muted: '#9FB5A9',
    mint: '#7EE0BC',
    mintSoft: 'rgba(126, 224, 188, 0.12)',
    onMint: '#0E1512',
    coral: '#FF8A5B',
    coralSoft: 'rgba(255, 138, 91, 0.14)',
    gradient: 'linear(to-r, #7EE0BC, #FFB86B)',
    glow: 'rgba(126, 224, 188, 0.10)',
    navBg: 'rgba(14, 21, 18, 0.82)',
    blobA: '#7EE0BC',
    blobB: '#FF8A5B',
    logoBg: '#FFFFFF',
  },
  light: {
    bg: '#F6FAF7',
    surface: '#FFFFFF',
    surfaceBorder: 'rgba(31, 122, 92, 0.16)',
    text: '#12211A',
    muted: '#4E6A5C',
    mint: '#1F7A5C',
    mintSoft: 'rgba(31, 122, 92, 0.10)',
    onMint: '#FFFFFF',
    coral: '#E4633A',
    coralSoft: 'rgba(228, 99, 58, 0.12)',
    gradient: 'linear(to-r, #1F7A5C, #E4633A)',
    glow: 'rgba(31, 122, 92, 0.08)',
    navBg: 'rgba(246, 250, 247, 0.82)',
    blobA: '#8FE8C7',
    blobB: '#FFC48A',
    logoBg: '#FFFFFF',
  },
}

// Chakra passes different props shapes to global styles and component variants; both fit this.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = Record<string, any>
const pick = (key: keyof Palette) => (props: Props) =>
  mode(palette.light[key], palette.dark[key])(props)

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  colors: {
    mint: {
      50: '#EAFBF3',
      100: '#CFF5E3',
      200: '#A8EDCF',
      300: '#7EE0BC',
      400: '#4FCFA3',
      500: '#2FB183',
      600: '#25946D',
      700: '#1F7A5C',
      800: '#175C46',
      900: '#0F3D2F',
    },
    coral: {
      200: '#FFD2B8',
      300: '#FFB86B',
      400: '#FF8A5B',
      500: '#E4633A',
      600: '#C24E2A',
    },
  },
  styles: {
    global: (props: Props) => ({
      body: {
        bg: pick('bg')(props),
        color: pick('text')(props),
        transitionProperty: 'background-color',
        transitionDuration: '0.3s',
      },
      '::selection': {
        bg: pick('mintSoft')(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
      variants: {
        solidMint: (props: Props) => ({
          bg: pick('mint')(props),
          color: pick('onMint')(props),
          boxShadow: '0 10px 30px -12px rgba(126, 224, 188, 0.6)',
          transition:
            'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
          _hover: {
            bg: pick('coral')(props),
            color: '#FFFFFF',
            transform: 'translateY(-2px)',
            boxShadow: '0 14px 34px -12px rgba(255, 138, 91, 0.7)',
            textDecoration: 'none',
          },
          _active: { transform: 'translateY(0)' },
        }),
        outlineMint: (props: Props) => ({
          borderWidth: '2px',
          borderColor: pick('mint')(props),
          color: pick('mint')(props),
          bg: 'transparent',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          _hover: {
            bg: pick('mintSoft')(props),
            transform: 'translateY(-2px)',
            textDecoration: 'none',
          },
          _active: { transform: 'translateY(0)' },
        }),
        ghostNav: (props: Props) => ({
          color: pick('text')(props),
          fontWeight: 500,
          _hover: { bg: pick('mintSoft')(props), color: pick('mint')(props) },
        }),
      },
    },
    Link: {
      baseStyle: (props: Props) => ({
        color: pick('mint')(props),
        transition: 'color 0.2s ease',
        _hover: { color: pick('coral')(props), textDecoration: 'none' },
        _focus: { boxShadow: 'none' },
      }),
    },
    Heading: {
      baseStyle: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
    },
  },
})

export default theme
