import Head from 'next/head'
import useColorModeFromQuery from 'hooks/useColorModeFromQuery'

const FavIconProvider = ({ children }: { children: JSX.Element }) => {
  useColorModeFromQuery()
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  )
}

export default FavIconProvider
