export type Work = {
  title: string
  image: string
  objectPosition?: string
  problem: string
  didWhat: string
  outcome: string
  metric?: string
  tags: string[]
  ctaLabel: string
  ctaUrl: string
}

export const works: Work[] = [
  {
    title: 'Hatch application processing platform',
    image: '/works/hatch.png',
    objectPosition: 'top left',
    problem:
      'Lenders were vetting applicants by hand across disconnected tools: identity documents, KYC and KYB checks, bank statements, background checks. Slow to approve and easy to get wrong.',
    didWhat:
      'Built the platform end to end from the first commit. Designed the flows in Figma, wired identity verification (IDV), KYC, KYB, instant bank verification (IBV) and background checks into one automated flow.',
    outcome:
      'One platform that takes an application from submission to decision automatically, and a release process the team trusts. Now guiding the 7+ engineers who keep shipping it.',
    tags: ['Next.js', 'TypeScript', 'Node', 'PostgreSQL', 'AWS', 'Figma'],
    ctaLabel: 'See the Figma sample',
    ctaUrl:
      'https://www.figma.com/design/hV82zLGtFam6OJgud988Ex/Sample-Display',
  },
  {
    title: 'React UI component library',
    image: '/works/react-ui.png',
    objectPosition: 'top left',
    problem:
      'Every new dashboard started from scratch, re-solving the same layout, form, and theming problems.',
    didWhat:
      'Built a themeable component kit on top of Material UI with Next.js and TypeScript, with real flows and pages as living examples.',
    outcome:
      'A drop-in kit with a clean, premium look that takes a dashboard from empty repo to polished demo in an afternoon.',
    tags: ['React', 'Next.js', 'TypeScript', 'Material UI'],
    ctaLabel: 'Open the live demo',
    ctaUrl: 'https://react-ui-library-mint.web.app/',
  },
]
