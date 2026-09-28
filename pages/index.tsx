import { Box } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import OpenGraphHead from 'components/Misc/OpenGraphHead'
import CursorGlow from 'components/Background/CursorGlow'
import Nav from 'components/Nav'
import Hero from 'components/Sections/Hero'
import Impact from 'components/Sections/Impact'
import About from 'components/Sections/About'
import Team from 'components/Sections/Team'
import Experience from 'components/Sections/Experience'

// Below the fold: load after first paint.
const Work = dynamic(() => import('components/Sections/Work'))
const Now = dynamic(() => import('components/Sections/Now'))
const Contact = dynamic(() => import('components/Sections/Contact'))

const Portfolio = (): JSX.Element => (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
    />
    <Script id="google-analytics">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
      `}
    </Script>
    <OpenGraphHead />
    <a href="#content" className="skip-link">
      Skip to content
    </a>
    <CursorGlow />
    <Nav />
    <Box as="main" id="content">
      <Hero />
      <Impact />
      <About />
      <Team />
      <Experience />
      <Work />
      <Now />
      <Contact />
    </Box>
  </>
)

export default Portfolio
