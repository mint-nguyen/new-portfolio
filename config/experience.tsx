import { Link } from '@chakra-ui/react'

export type Company = 'HatchInc' | 'Rocketplace' | 'RCS' | 'Base'

export type CompanyDetail = {
  name: string
  longName: string
  subDetail?: string
  url: string
  position: string
  duration: string
  logo: {
    light: string
    dark?: string
  }
  roles?: JSX.Element[]
}

export const Experiences: {
  [key in Company]: CompanyDetail
} = {
  HatchInc: {
    name: 'Hatch',
    longName: 'Hatch Inc.',
    subDetail:
      'Automates decision-making processes and disbursements across lending industries.',
    url: 'https://www.hatchlabs.app/',
    position: 'Founding Engineer',
    duration: 'Feb 2024 - Present',
    logo: {
      light: '/worked_at_logos/hatch/blue-transparent.png',
      dark: '/worked_at_logos/hatch/blue-transparent.png',
    },
    roles: [
      <>
        Co-lead technical team in the development of a comprehensive loan
        management system for both personal and business loans.
      </>,
      <>
        Collaborate directly with stakeholders to gather requirements, define
        project scope, and ensure alignment with businessobjectives.
      </>,
      <>
        Design wireframes and mockups using Figma, translating requirements into
        visual designs for user interfaces andexperiences.
      </>,
      <>
        Manage end-to-end code base activities including code reviews, ensuring
        adherence to coding standards and bestpractices.
      </>,
      <>
        Orchestrate deployment pipelines from development through to production,
        ensuring seamless and reliable releases.
      </>,
    ],
  },
  Rocketplace: {
    name: 'Rocketplace',
    longName: 'Rocketplace Inc.',
    subDetail: 'Make crypto approachable to everyone',
    url: 'https://www.crunchbase.com/organization/rocketplace',
    position: 'Software Engineer',
    duration: 'Sep 2022 - Nov 2023',
    logo: {
      light: '/worked_at_logos/rocketplace/rocket_place_logo.jpg',
      dark: '/worked_at_logos/rocketplace/rocket_place_logo.jpg',
    },
    roles: [
      <>
        Maintained and optimized existing software systems, resolving bugs and
        improving system reliability and security.
      </>,
      <>
        Collaborated with a cross-functional team to design and deploy new
        features for web applications, resulting in a 40% increase in website
        performance.
      </>,
      <>
        Revamp the whole dashboard and portfolio page, leading to a 10% increase
        in signups.
      </>,
    ],
  },
  RCS: {
    name: 'RCS',
    longName: 'Resilience Corporate Services',
    subDetail: 'Resilience Corporate Services Inc.',
    url: 'https://resiliencecorporateservices.com/',
    position: 'Frontend Developer',
    duration: 'Feb 2022 - Sep 2022',
    logo: {
      light: '/worked_at_logos/rcs/rcs.png',
      dark: '/worked_at_logos/rcs/rcs.png',
    },
    roles: [
      <>Exclusively responsible for frontend development.</>,
      <>
        Collaborating closely with TradeX's data scientists to create a web
        application visualizing the arbitrage vehicle platform.
      </>,
    ],
  },
  Base: {
    name: 'Base',
    longName: 'InterU Network Inc.',
    subDetail: 'QUANTIFYING SOFT SKILLS WITH AI',
    url: 'https://base.town/',
    position: 'Data Engineer',
    duration: 'Oct 2021 - Feb 2022',
    logo: {
      light: '/worked_at_logos/base/base_name.png',
      dark: '/worked_at_logos/base/base_name.png',
    },
    roles: [
      <>
        Developed and maintained scalable data pipelines to process and analyze
        large volumes of data.
      </>,
      <>
        Optimized database performance and query execution to improve overall
        system effi ciency
      </>,
    ],
  },
}

export const ExperiencesList = [
  Experiences.HatchInc,
  Experiences.Rocketplace,
  Experiences.RCS,
  Experiences.Base,
]
