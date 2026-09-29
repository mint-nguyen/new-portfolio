/* Single source of truth for the resume and cover letter.
   Loaded by resume.html and cover-letter.html as a plain <script> (window.RESUME)
   and by build-docx.js as a CommonJS module. Edit text here, then run resume/build.sh. */
const RESUME = {
  name: 'Mint Nguyen',
  headline: 'Full Stack Software Engineer · Founding Engineer at Hatch',
  location: 'Calgary, AB',
  email: 'pnguyen.lhp@gmail.com',
  phone: '+1 672 999 6118',
  linkedin: 'linkedin.com/in/mintnguyen',
  github: 'github.com/mint-nguyen',
  site: 'mintnguyen.com',
  summary:
    'Full stack software engineer with 6 years of shipping. Founding Engineer at Hatch, where I built a loan management platform for lenders from the first commit and now guide a team of 7+ engineers through it. Concurrently building pricing and operations software at S&T Properties, including a price-prediction model and a property management system that unifies every online travel agency. Strongest in TypeScript, React, Next.js, Node, NestJS, PostgreSQL, Python, Azure DevOps and Figma.',
  experience: [
    {
      company: 'Hatch Inc.',
      location: 'Montreal, QC (remote)',
      role: 'Founding Engineer',
      dates: 'Feb 2024 – Present',
      bullets: [
        'Built the loan management platform for personal and business lending from the first commit: decision automation, disbursements, and the admin tooling around them.',
        'Guide a team of 7+ engineers through the codebase: onboarding, code review standards, and architecture decisions.',
        'Work directly with founders and stakeholders to turn business goals into scoped, shippable work; design wireframes in Figma, then build them.',
        'Own the deployment pipeline from development to production on Azure DevOps.',
      ],
    },
    {
      company: 'S&T Properties Inc.',
      location: 'Calgary, AB',
      role: 'Full Stack Software Engineer',
      dates: 'Apr 2024 – Present',
      bullets: [
        'Build internal software for the pricing team, including a price-prediction model that informs pricing decisions and improved revenue.',
        'Build internal tools for the operations team that streamline day-to-day property operations.',
        'Building a property management system that brings every online travel agency the company lists on into one system.',
      ],
    },
    {
      company: 'Rocketplace Inc.',
      location: 'Vancouver, BC',
      role: 'Software Engineer',
      dates: 'Sep 2022 – Nov 2023',
      bullets: [
        'Designed and deployed new web features with a cross-functional team, resulting in a 20% increase in website performance.',
        'Revamped the dashboard and portfolio pages, leading to a 10% increase in signups.',
      ],
    },
    {
      company: 'Resilience Corporate Services',
      location: 'Toronto, ON',
      role: 'Frontend Developer',
      dates: 'Feb 2022 – Sep 2022',
      bullets: [
        "Sole frontend developer; built a web application visualizing TradeX's arbitrage platform alongside its data scientists.",
      ],
    },
    {
      company: 'InterU Network Inc.',
      location: 'Vancouver, BC',
      role: 'Data Engineer',
      dates: 'Oct 2021 – Feb 2022',
      bullets: [
        'Built and maintained scalable data pipelines for large-volume analysis and optimized database performance and query execution.',
      ],
    },
  ],
  skills: [
    { label: 'Languages', items: 'TypeScript, JavaScript (ES6+), Python' },
    { label: 'Backend', items: 'Node, NestJS, GraphQL, Django' },
    { label: 'Frontend', items: 'React, Next.js, Redux, React Native' },
    { label: 'Data', items: 'PostgreSQL, MySQL, MongoDB, Redis' },
    { label: 'Infra and delivery', items: 'Docker, Azure DevOps, Google Cloud, Firebase' },
    { label: 'Design and UI', items: 'Figma, Chakra UI, Material UI, Framer Motion' },
  ],
  education: {
    degree: 'BS Information Technology',
    school: 'Fairleigh Dickinson University',
    location: 'Vancouver, BC',
    dates: 'Jan 2021 – May 2024',
    honors: "Summa Cum Laude · Honor's List every semester",
  },
  coverLetter: {
    date: '[Date]',
    recipient: ['[Hiring manager name, or "Hiring team"]', '[Company]'],
    salutation: 'Dear [Hiring manager name or team],',
    paragraphs: [
      "I'm a full stack engineer who likes being there from the first commit. At Hatch I built a loan management platform for lenders from an empty repo, and as the team grew to 7+ engineers I became the person everyone pings about the codebase. I'd love to bring that same energy to the [Role] role at [Company], [one sentence on why this company].",
      "Building Hatch's platform meant owning the whole path: gathering requirements with the founders, wireframing in Figma, shipping the APIs and front ends, automating decisioning and disbursements, and running the pipeline that takes a change from laptop to production. Just as important, it meant keeping a growing team unblocked with small PRs, honest code review, and a map of the codebase that every new engineer gets in their first week.",
      'Alongside Hatch, I build internal software at S&T Properties: pricing tools with a price-prediction model that improved revenue, operations tools, and a property management system that pulls every online travel agency into one place. Different domain, same habit of turning a fuzzy business goal into something a team can ship.',
      "I work best in small teams that move fast and care about the details, which is why [Company] caught my eye. I'd welcome a conversation about how I can help. Thank you for your time, and if we do talk, the mint tea is on me.",
    ],
    closing: 'Sincerely,',
    signature: 'Mint Nguyen',
    signatureLine: 'pnguyen.lhp@gmail.com · +1 672 999 6118 · mintnguyen.com',
  },
}

if (typeof module !== 'undefined') module.exports = RESUME
