import { IconType } from 'react-icons'
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa'
import { RiMapPin2Line, RiTeamLine, RiRocket2Line } from 'react-icons/ri'

export const SINCE_YEAR = 2020
export const yearsShipping = new Date().getFullYear() - SINCE_YEAR

export type Social = { label: string; href: string; icon: IconType }
export type HeroChip = { icon: IconType; label: string }

export const profile = {
  name: 'Mint Nguyen',
  firstName: 'Mint',
  title: 'Founding Engineer',
  tagline: 'Building the product, guiding the team.',
  company: { name: 'Hatch', url: 'https://www.hatchlabs.app/' },
  location: 'Calgary, AB',
  email: 'pnguyen.lhp@gmail.com',
  github: 'https://github.com/mint-nguyen',
  resumeUrl: '/Mint_Nguyen.pdf',
  siteUrl: 'https://mintnguyen.com/',
  description:
    'Founding Engineer at Hatch. Building products from the first commit and guiding the teams that grow around them. Calgary, AB.',
  eyebrow: "Hey, I'm Mint",
  headline: {
    before: 'I build products from the ',
    gradient: 'first commit',
    middle: ', and ',
    accent: 'guide',
    after: ' the teams that grow around them.',
  },
  heroSub:
    "Founding Engineer at Hatch. I've been here since day one, shipping an automated application processing platform for lenders, from identity and bank verification to background checks. As the team grew to 7+, I became the person everyone pings about the codebase. APIs, frontends, Figma, and the glue in between.",
  heroChips: [
    { icon: RiTeamLine, label: '7+ engineers guided' },
    { icon: RiRocket2Line, label: `Shipping since ${SINCE_YEAR}` },
    { icon: RiMapPin2Line, label: 'Calgary, AB' },
  ] as HeroChip[],
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/mintnguyen/',
      icon: FaLinkedin,
    },
    {
      label: 'GitHub',
      href: 'https://github.com/mint-nguyen',
      icon: FaGithub,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/mint.ng.mint/',
      icon: FaInstagram,
    },
  ] as Social[],
}
