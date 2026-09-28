import Head from 'next/head'
import { profile } from 'config/profile'

const title = `${profile.name} | ${profile.title}`
const image = `${profile.siteUrl}og.png`

const OpenGraphHead = () => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={profile.description} />
    <link rel="canonical" href={profile.siteUrl} />
    <meta name="theme-color" content="#0E1512" />

    <meta property="og:type" content="profile" />
    <meta property="og:title" content={title} />
    <meta property="og:site_name" content={profile.name} />
    <meta property="og:url" content={profile.siteUrl} />
    <meta property="og:description" content={profile.description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={`${profile.name}, ${profile.title}`} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={profile.description} />
    <meta name="twitter:image" content={image} />
  </Head>
)

export default OpenGraphHead
