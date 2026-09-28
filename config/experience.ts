export type Milestone = { when: string; label: string }

export type Experience = {
  key: string
  name: string
  longName: string
  tagline: string
  url: string
  position: string
  duration: string
  logo: string
  /** Marker background when the logo needs a dark backdrop (white-on-transparent art). */
  logoBg?: string
  milestone?: Milestone
  roles: string[]
}

export const experiences: Experience[] = [
  {
    key: 'hatch',
    name: 'Hatch',
    longName: 'Hatch Inc.',
    tagline: 'Automates decision-making and disbursements across lending.',
    url: 'https://www.hatchlabs.app/',
    position: 'Founding Engineer',
    duration: 'Feb 2024 – Present',
    logo: '/worked_at_logos/hatch/blue-transparent.png',
    milestone: {
      when: 'Late 2025',
      label:
        'Team scaled to 7+. Became the go-to guide for onboarding, reviews and architecture.',
    },
    roles: [
      'Built the loan management platform for personal and business lending from the first commit: decision automation, disbursements, and the admin tooling around them.',
      'Guide a team of 7+ engineers through the codebase: onboarding, code review standards, and architecture decisions.',
      'Work directly with founders and stakeholders to gather requirements, define scope, and keep delivery aligned with business goals.',
      'Design wireframes and mockups in Figma, then ship them.',
      'Own the deployment pipeline from development to production.',
    ],
  },
  {
    key: 'rocketplace',
    name: 'Rocketplace',
    longName: 'Rocketplace Inc.',
    tagline: 'Making crypto approachable to everyone.',
    url: 'https://www.crunchbase.com/organization/rocketplace',
    position: 'Software Engineer',
    duration: 'Sep 2022 – Nov 2023',
    logo: '/worked_at_logos/rocketplace/rocket_place_logo.jpg',
    roles: [
      'Maintained and optimized existing software systems, resolving bugs and improving reliability and security.',
      'Collaborated with a cross-functional team to design and deploy new web features, resulting in a 20% increase in website performance.',
      'Revamped the dashboard and portfolio pages, leading to a 10% increase in signups.',
    ],
  },
  {
    key: 'rcs',
    name: 'RCS',
    longName: 'Resilience Corporate Services',
    tagline: 'Resilience Corporate Services Inc.',
    url: 'https://resiliencecorporateservices.com/',
    position: 'Frontend Developer',
    duration: 'Feb 2022 – Sep 2022',
    logo: '/worked_at_logos/rcs/rcs.png',
    roles: [
      'Solely responsible for frontend development.',
      "Worked closely with TradeX's data scientists to build a web application visualizing the arbitrage vehicle platform.",
    ],
  },
  {
    key: 'interu',
    name: 'Base',
    longName: 'InterU Network Inc.',
    tagline: 'Quantifying soft skills with AI.',
    url: 'https://base.town/',
    position: 'Data Engineer',
    duration: 'Oct 2021 – Feb 2022',
    logo: '/worked_at_logos/base/base_name.png',
    logoBg: '#121212',
    roles: [
      'Developed and maintained scalable data pipelines to process and analyze large volumes of data.',
      'Optimized database performance and query execution to improve overall system efficiency.',
    ],
  },
]

export const education = {
  degree: 'BS Information Technology',
  school: 'Fairleigh Dickinson University',
  location: 'Vancouver, BC',
  duration: '2021 – 2024',
  honors: ['Summa Cum Laude', "Honor's List every semester"],
}
