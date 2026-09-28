import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'config/theme'
import FavIconProvider from 'components/Misc/FavIconProvider'
import ConsoleGreeting from 'components/Misc/ConsoleGreeting'

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <FavIconProvider>
        <>
          <ConsoleGreeting />
          <Component {...pageProps} />
        </>
      </FavIconProvider>
    </ChakraProvider>
  )
}

export default App
