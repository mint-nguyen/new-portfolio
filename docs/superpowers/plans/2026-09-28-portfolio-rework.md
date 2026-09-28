# Portfolio Rework Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild mintnguyen.com as a full-width landing page that presents Mint as a Founding Engineer who built Hatch's product from the first commit and guides a team of 7+, with a mint-and-coral brand, count-up stats, principle cards, a timeline, case studies, a "Now" section, confetti, and drifting blobs.

**Architecture:** Every piece of personal content lives in `config/*.ts`; components only render. A `Section` wrapper gives each block its id, container, heading and scroll-in fade. New sections are built as new files while the old page keeps compiling; the final wiring task swaps `pages/index.tsx`, deletes the legacy components, and greps for template leftovers. Motion respects `prefers-reduced-motion` everywhere via framer-motion's `useReducedMotion`.

**Tech Stack:** Next 12.1, React 17, TypeScript 4.3, Chakra UI 1.6.5 (`mode()` helper for color mode, no semantic tokens), framer-motion 4.1.17 (`repeat`/`repeatType`, `useReducedMotion`; **never pass a `transition` prop to a `motion(ChakraComponent)`, use `motion.div` or put transitions in variants**), react-intersection-observer 8, react-icons 4.12, canvas-confetti 1.9.

**Verification model:** The repo has no test runner and the approved spec adds none. Each task ends with `npx tsc --noEmit` (fast typecheck of old and new code together). Milestone tasks run `yarn build`. The last task runs the dev server and captures Edge headless screenshots. Treat a red typecheck exactly like a failing test: fix before committing.

**Spec:** `docs/superpowers/specs/2026-09-28-portfolio-rework-design.md`

---

## File map

Created:

| File | Responsibility |
| --- | --- |
| `config/profile.ts` | name, title, tagline, headline parts, hero copy, chips, socials, email, resume, site URL |
| `config/nav.ts` | nav links |
| `config/stats.ts` | impact counters |
| `config/team.ts` | "How I help the team ship" cards and intro |
| `config/works.ts` | case studies |
| `config/now.ts` | Now tiles and stamp |
| `config/experience.ts` | replaces `experience.tsx`: roles as strings, milestone, education |
| `hooks/usePalette.ts` | current-mode palette object |
| `hooks/useScrolled.ts` | true once page scrolled past a threshold |
| `hooks/useCountUp.ts` | rAF count-up |
| `hooks/useColorModeFromQuery.ts` | `?mode=light|dark` sets color mode (used for screenshots, handy for sharing) |
| `components/Ui/Chip.tsx` | pill with optional icon, three fills |
| `components/Ui/SocialLinks.tsx` | circular icon links from `profile.socials` |
| `components/Layout/Section.tsx` | section shell |
| `components/Background/Blobs.tsx` | drifting gradient blobs |
| `components/Background/CursorGlow.tsx` | desktop cursor glow |
| `components/Nav/index.tsx`, `Links.tsx`, `MobileDrawer.tsx`, `Toggle.tsx`, `ThemeToggle.tsx`, `ResumeButton.tsx` | sticky nav |
| `components/Sections/Hero/index.tsx`, `Orbit.tsx`, `ScrollCue.tsx` | hero |
| `components/Sections/Impact/index.tsx`, `Counter.tsx` | counters |
| `components/Sections/About/Toolbox.tsx` | skill chips |
| `components/Sections/Team/index.tsx`, `PrincipleCard.tsx` | principles |
| `components/Sections/Experience/Timeline.tsx`, `TimelineItem.tsx`, `EducationItem.tsx` | timeline |
| `components/Sections/Work/index.tsx`, `CaseStudyCard.tsx` | case studies |
| `components/Sections/Now/index.tsx` | Now tiles |
| `components/Sections/Contact/index.tsx`, `Footer.tsx`, `useConfetti.ts` | say hi, footer |
| `components/Misc/ConsoleGreeting.tsx` | console easter egg |
| `scripts/og/index.html` | OG image source |
| `public/og.png` | generated OG image |

Modified: `config/theme.ts`, `config/animations.ts`, `config/skills.ts`, `styles/globals.css`, `pages/_document.tsx`, `pages/_app.tsx`, `pages/index.tsx`, `components/Layout/FadeWhenVisible.tsx`, `components/Logo/index.tsx`, `components/Sections/About/index.tsx`, `components/Sections/Experience/index.tsx`, `components/Misc/OpenGraphHead.tsx`, `components/Misc/FavIconProvider.tsx`, `package.json`, `.nvmrc`.

Deleted (in the task noted): `public/certification/` (T1), `components/Logo/styles.module.css` (T5), `components/Sections/About/Detail.tsx`, `SkillSetModal.tsx`, `styles.module.css` (T8), `config/experience.tsx`, `components/Sections/Experience/ExperienceTab.tsx`, `styles.module.css` (T10), and in T15: `components/Sidebar/`, `components/Avatar/`, `components/Menu/`, `components/Misc/ScrollMore.tsx`, `components/Sections/DevToArticles/`, `components/Sections/FeaturedWorks/`, `components/Sections/GetInTouch/`, `config/sidebar.ts`, `types/article.ts`, `hooks/useScrollDirection.tsx`.

---

### Task 1: Dependencies and housekeeping

**Files:**
- Modify: `package.json` (via yarn)
- Modify: `.nvmrc`
- Delete: `public/certification/Lawingco-Sitecore 10 NET Developer Cert.pdf`

- [ ] **Step 1: Install and bump dependencies**

Run from the repo root:

```bash
yarn add react-icons@^4.12.0 canvas-confetti@^1.9.4
yarn add -D @types/canvas-confetti@^1.9.0
```

Expected: `success Saved 3 new dependencies` (or similar), `package.json` shows `"react-icons": "^4.12.0"`, `"canvas-confetti": "^1.9.4"`, `"@types/canvas-confetti": "^1.9.0"`.

- [ ] **Step 2: Verify the renamed icons exist**

```bash
node -e "const si=require('react-icons/si'); for (const n of ['SiNodedotjs','SiNextdotjs','SiNestjs','SiChakraui','SiMui','SiFirebase','SiPython']) console.log(n, typeof si[n])"
```

Expected: every line ends with `function`.

- [ ] **Step 3: Update `.nvmrc` and remove the template author's certificate**

```bash
printf '22\n' > .nvmrc
git rm -q "public/certification/Lawingco-Sitecore 10 NET Developer Cert.pdf"
```

Expected: `public/certification` no longer exists.

- [ ] **Step 4: Confirm the old code still builds with react-icons 4.12**

The old `config/skills.ts` and `About/Detail.tsx` import icons that were renamed in react-icons 4.3 (`SiNodeDotJs`, `SiNextDotJs`, `SiVueDotJs`, `SiSocketDotIo`, `SiMaterialUi`, `SiVisualstudiocode`). Run:

```bash
npx tsc --noEmit
```

Expected: errors only in `config/skills.ts` and `components/Sections/About/Detail.tsx` about missing exported members. Fix them now with the smallest change so the build stays green until Task 8 replaces those files. In `config/skills.ts` replace the import block's renamed names, and in `Detail.tsx` do the same:

```ts
// config/skills.ts: replace these names in the import list and in the arrays below
// SiNodeDotJs -> SiNodedotjs, SiNextDotJs -> SiNextdotjs, SiVueDotJs -> SiVuedotjs,
// SiSocketDotIo -> SiSocketdotio, SiMaterialUi -> SiMui, SiVisualstudiocode -> SiVisualstudiocode
```

Use `sed`:

```bash
sed -i 's/SiNodeDotJs/SiNodedotjs/g; s/SiNextDotJs/SiNextdotjs/g; s/SiVueDotJs/SiVuedotjs/g; s/SiSocketDotIo/SiSocketdotio/g; s/SiMaterialUi/SiMui/g' config/skills.ts components/Sections/About/Detail.tsx
npx tsc --noEmit
```

Expected: no output (exit 0). If `SiVisualstudiocode` or `SiMicrosoftsqlserver` is reported missing, delete that entry from `config/skills.ts` (both are unused by the new design).

- [ ] **Step 5: Build and commit**

```bash
yarn build 2>&1 | tail -15
git add -A
git commit -m "chore: bump react-icons, add canvas-confetti, node 22, drop template cert

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: build output includes `Compiled successfully` and the `/` route; commit succeeds.

---

### Task 2: Theme, palette, global styles, fonts, animations

**Files:**
- Modify: `config/theme.ts` (rewrite)
- Create: `hooks/usePalette.ts`
- Modify: `styles/globals.css` (rewrite)
- Modify: `pages/_document.tsx`
- Modify: `config/animations.ts` (append)

- [ ] **Step 1: Rewrite `config/theme.ts`**

The two legacy exports `ThemeMode` and `mobileBreakpointsMap` stay until Task 15 because old components import them.

```ts
import {
  extendTheme,
  ColorMode,
  ChakraTheme,
  ThemeComponentProps,
} from '@chakra-ui/react'
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

type Props = ThemeComponentProps<ChakraTheme>
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
          transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
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
```

- [ ] **Step 2: Create `hooks/usePalette.ts`**

```ts
import { useColorModeValue } from '@chakra-ui/react'
import { palette, Palette } from 'config/theme'

const usePalette = (): Palette => useColorModeValue(palette.light, palette.dark)

export default usePalette
```

- [ ] **Step 3: Rewrite `styles/globals.css`**

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 88px;
}

html,
body {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

body::-webkit-scrollbar {
  width: 0.4em;
}
body::-webkit-scrollbar-track-piece {
  width: 10px;
}
body::-webkit-scrollbar-thumb {
  background: rgba(127, 140, 134, 0.5);
  border-radius: 1em;
}

:focus-visible {
  outline: 2px solid #7ee0bc;
  outline-offset: 3px;
  border-radius: 6px;
}

.skip-link {
  position: absolute;
  top: 8px;
  left: -9999px;
  z-index: 1000;
  padding: 10px 16px;
  border-radius: 999px;
  background: #7ee0bc;
  color: #0e1512;
  font-weight: 600;
}
.skip-link:focus {
  left: 8px;
}

@media (max-width: 480px) {
  body::-webkit-scrollbar {
    width: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 4: Update `pages/_document.tsx` (fonts and ColorModeScript)**

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode="dark" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
```

- [ ] **Step 5: Append new variants to `config/animations.ts`**

Add before the `export {` block, and add the two names to the export list:

```ts
const popIn = {
  initial: {
    scale: 0.7,
    opacity: 0,
  },
  animate: {
    scale: [0.7, 1.06, 1],
    opacity: 1,
    transition: {
      duration: DURATIONS.Normal,
      ease: easing,
    },
  },
}

// Dynamic variant: pass the delay through the `custom` prop.
const floatY = {
  animate: (delay = 0) => ({
    y: [0, -10, 0],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
      delay,
    },
  }),
}
```

The export block becomes:

```ts
export {
  DURATIONS,
  easing,
  fadeInUp,
  fadeInUpSlower,
  letterSpace,
  stagger,
  galleryStagger,
  simpleOpacity,
  menuAnim,
  scaleUp,
  avatarAnimation,
  popIn,
  floatY,
}
```

- [ ] **Step 6: Typecheck, build, commit**

```bash
npx tsc --noEmit && yarn build 2>&1 | tail -12
git add -A
git commit -m "feat(theme): mint and coral palette, button variants, fonts, global styles

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: tsc silent, build `Compiled successfully`. The old page will look off (variants gone) but must compile.

---

### Task 3: Content config (profile, nav, stats, team, works, now)

**Files:**
- Create: `config/profile.ts`, `config/nav.ts`, `config/stats.ts`, `config/team.ts`, `config/works.ts`, `config/now.ts`

- [ ] **Step 1: Create `config/profile.ts`**

```ts
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
    "Founding Engineer at Hatch. I've been here since day one, shipping a loan management platform for lenders. As the team grew to 7+, I became the person everyone pings about the codebase. APIs, frontends, Figma, deploy pipelines, and the glue in between.",
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
```

- [ ] **Step 2: Create `config/nav.ts`**

```ts
export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Team', href: '#team' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Now', href: '#now' },
  { label: 'Contact', href: '#contact' },
]
```

- [ ] **Step 3: Create `config/stats.ts`**

```ts
import { yearsShipping } from './profile'

export type Stat = {
  value: number | string
  suffix?: string
  label: string
}

export const stats: Stat[] = [
  { value: yearsShipping, label: 'years shipping' },
  { value: 7, suffix: '+', label: 'engineers guided' },
  { value: 4, label: 'companies' },
  { value: '∞', label: 'mint teas' },
]
```

- [ ] **Step 4: Create `config/team.ts`**

```ts
import { IconType } from 'react-icons'
import {
  RiRocket2Line,
  RiGitPullRequestLine,
  RiCompass3Line,
  RiRouteLine,
} from 'react-icons/ri'

export type Principle = { icon: IconType; title: string; body: string }

export const teamIntro =
  "The team grew, and someone had to draw the map. Here's how I keep 7+ engineers moving without getting in their way."

export const principles: Principle[] = [
  {
    icon: RiRocket2Line,
    title: 'Onboard fast, unblock faster.',
    body:
      'New engineers get a map of the codebase, a real PR in their first week, and me one message away. Nobody stays stuck for a day.',
  },
  {
    icon: RiGitPullRequestLine,
    title: 'Ship small, ship safe.',
    body:
      'Small PRs, honest code review, and pipelines that carry a change from laptop to production without drama. Boring releases are a feature.',
  },
  {
    icon: RiCompass3Line,
    title: 'Translate business into build.',
    body:
      'I sit with the founders to turn a fuzzy goal into scope, wireframes in Figma, and a plan the team can actually execute.',
  },
  {
    icon: RiRouteLine,
    title: 'Own the whole path.',
    body:
      "Architecture, APIs, UI, and the deploy button. If it's on the critical path, I'll learn it, fix it, or find who can.",
  },
]
```

- [ ] **Step 5: Create `config/works.ts`**

```ts
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
    title: 'Hatch loan management platform',
    image: '/works/hatch.png',
    objectPosition: 'top left',
    problem:
      'Lenders were running personal and business loans through disconnected tools and manual decisions. Approvals were slow and disbursements error-prone.',
    didWhat:
      'Built the platform end to end from the first commit. Designed the flows in Figma, automated decisioning and disbursement, and set up the pipeline that takes a change from dev to production.',
    outcome:
      'One platform for both loan types, decisions and payouts that run themselves, and a release process the team trusts. Now guiding the 7+ engineers who keep shipping it.',
    tags: ['Next.js', 'TypeScript', 'Node', 'PostgreSQL', 'Azure DevOps', 'Figma'],
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
```

- [ ] **Step 6: Create `config/now.ts`**

```ts
import { IconType } from 'react-icons'
import {
  RiHammerLine,
  RiBookOpenLine,
  RiLandscapeLine,
  RiChat3Line,
} from 'react-icons/ri'

export type NowItem = { icon: IconType; label: string; body: string }

export const nowUpdated = 'Updated September 2026'

export const nowItems: NowItem[] = [
  {
    icon: RiHammerLine,
    label: 'Building',
    body: "A loan management platform at Hatch, with a team I'm proud of.",
  },
  {
    icon: RiBookOpenLine,
    label: 'Learning',
    body:
      'System design and architecture at scale, and the craft of engineering management.',
  },
  {
    icon: RiLandscapeLine,
    label: 'Off-screen',
    body: 'Hiking around Calgary, mint tea in hand, and yes, weeb stuff.',
  },
  {
    icon: RiChat3Line,
    label: 'Open to',
    body:
      'Chatting about guiding small teams, startup life, or your side project.',
  },
]
```

- [ ] **Step 7: Typecheck and commit**

```bash
npx tsc --noEmit
git add config/
git commit -m "feat(config): profile, nav, stats, team principles, works, now content

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: tsc silent.

---

### Task 4: Layout primitives, hooks, background effects

**Files:**
- Create: `hooks/useScrolled.ts`, `hooks/useCountUp.ts`, `hooks/useColorModeFromQuery.ts`
- Create: `components/Ui/Chip.tsx`, `components/Ui/SocialLinks.tsx`
- Modify: `components/Layout/FadeWhenVisible.tsx` (rewrite)
- Create: `components/Layout/Section.tsx`
- Create: `components/Background/Blobs.tsx`, `components/Background/CursorGlow.tsx`

- [ ] **Step 1: Create `hooks/useScrolled.ts`**

```ts
import { useEffect, useState } from 'react'

const useScrolled = (threshold = 24): boolean => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > threshold)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}

export default useScrolled
```

- [ ] **Step 2: Create `hooks/useCountUp.ts`**

```ts
import { useEffect, useState } from 'react'

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts from 0 to `target` once `active` becomes true.
 * `instant` (reduced motion) jumps straight to the target.
 */
const useCountUp = (
  target: number,
  active: boolean,
  duration = 1200,
  instant = false
): number => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return undefined
    if (instant) {
      setValue(target)
      return undefined
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setValue(Math.round(easeOutCubic(t) * target))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration, instant])

  return value
}

export default useCountUp
```

- [ ] **Step 3: Create `hooks/useColorModeFromQuery.ts`**

```ts
import { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'

/** `?mode=light` or `?mode=dark` forces the color mode (used for screenshots and shareable links). */
const useColorModeFromQuery = (): void => {
  const { setColorMode } = useColorMode()
  useEffect(() => {
    const mode = new URLSearchParams(window.location.search).get('mode')
    if (mode === 'light' || mode === 'dark') setColorMode(mode)
  }, [setColorMode])
}

export default useColorModeFromQuery
```

- [ ] **Step 4: Create `components/Ui/Chip.tsx`**

```tsx
import { HStack, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import usePalette from 'hooks/usePalette'

export type ChipProps = {
  label: string
  icon?: IconType
  variant?: 'solid' | 'soft' | 'coral'
  size?: 'sm' | 'md'
}

const Chip = ({ label, icon, variant = 'solid', size = 'md' }: ChipProps) => {
  const p = usePalette()
  const fills = {
    solid: { bg: p.surface, color: p.text, iconColor: p.mint, border: p.surfaceBorder },
    soft: { bg: p.mintSoft, color: p.text, iconColor: p.mint, border: 'transparent' },
    coral: { bg: p.coralSoft, color: p.text, iconColor: p.coral, border: 'transparent' },
  }[variant]
  return (
    <HStack
      spacing={2}
      px={size === 'sm' ? 3 : 4}
      py={size === 'sm' ? 1 : 2}
      borderRadius="full"
      bg={fills.bg}
      color={fills.color}
      borderWidth="1px"
      borderColor={fills.border}
      boxShadow={variant === 'solid' ? '0 8px 24px rgba(0, 0, 0, 0.12)' : undefined}
      fontSize={size === 'sm' ? 'sm' : 'md'}
      fontWeight={500}
      whiteSpace="nowrap"
    >
      {icon && <Icon as={icon} color={fills.iconColor} boxSize={size === 'sm' ? 4 : 5} />}
      <Text as="span">{label}</Text>
    </HStack>
  )
}

export default Chip
```

- [ ] **Step 5: Create `components/Ui/SocialLinks.tsx`**

```tsx
import { HStack, IconButton } from '@chakra-ui/react'
import { profile } from 'config/profile'
import usePalette from 'hooks/usePalette'

const SocialLinks = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const p = usePalette()
  return (
    <HStack spacing={2}>
      {profile.socials.map((s) => (
        <IconButton
          key={s.label}
          as="a"
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={s.label}
          icon={<s.icon />}
          size={size}
          isRound
          variant="ghost"
          color={p.muted}
          borderWidth="1px"
          borderColor={p.surfaceBorder}
          transition="all 0.2s ease"
          _hover={{
            color: p.mint,
            borderColor: p.mint,
            transform: 'translateY(-3px)',
            bg: p.mintSoft,
          }}
        />
      ))}
    </HStack>
  )
}

export default SocialLinks
```

- [ ] **Step 6: Rewrite `components/Layout/FadeWhenVisible.tsx`**

```tsx
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeInUpSlower } from 'config/animations'

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const reduce = useReducedMotion()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px 0px -8% 0px',
  })

  if (reduce) return <div>{children}</div>

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      variants={fadeInUpSlower}
    >
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible
```

- [ ] **Step 7: Create `components/Layout/Section.tsx`**

The section's accessible name is always the element with id `${id}-heading`. When `heading` is omitted, the child must render a heading with that id.

```tsx
import { ReactNode } from 'react'
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import FadeInWhenVisible from './FadeWhenVisible'
import usePalette from 'hooks/usePalette'

export type SectionProps = {
  id: string
  eyebrow?: string
  heading?: string
  intro?: string
  children: ReactNode
  /** Rendered behind the container, e.g. <Blobs variant="soft" /> */
  background?: ReactNode
  overflow?: 'hidden' | 'visible'
}

const Section = ({
  id,
  eyebrow,
  heading,
  intro,
  children,
  background,
  overflow = 'visible',
}: SectionProps) => {
  const p = usePalette()
  const headingId = `${id}-heading`
  return (
    <Box
      as="section"
      id={id}
      aria-labelledby={headingId}
      position="relative"
      overflow={overflow}
      py={{ base: 16, md: 24 }}
    >
      {background}
      <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <FadeInWhenVisible>
          {(eyebrow || heading || intro) && (
            <Stack spacing={3} mb={{ base: 8, md: 12 }} maxW="720px">
              {eyebrow && (
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight={600}
                  letterSpacing="0.14em"
                  textTransform="uppercase"
                  color={p.mint}
                >
                  {eyebrow}
                </Text>
              )}
              {heading && (
                <Heading
                  as="h2"
                  id={headingId}
                  fontSize={{ base: '3xl', md: '4xl' }}
                  lineHeight={1.15}
                >
                  {heading}
                </Heading>
              )}
              {intro && (
                <Text fontSize={{ base: 'md', md: 'lg' }} color={p.muted}>
                  {intro}
                </Text>
              )}
            </Stack>
          )}
          {children}
        </FadeInWhenVisible>
      </Container>
    </Box>
  )
}

export default Section
```

- [ ] **Step 8: Create `components/Background/Blobs.tsx`**

Uses `motion.div` (not `motion(Box)`) because it needs framer's `transition` prop.

```tsx
import { Box } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import usePalette from 'hooks/usePalette'

type BlobSpec = {
  tone: 'a' | 'b'
  size: number
  style: React.CSSProperties
  path: { x: number[]; y: number[] }
  duration: number
}

const blobs: BlobSpec[] = [
  {
    tone: 'a',
    size: 560,
    style: { top: '-12%', left: '-10%' },
    path: { x: [0, 60, -30, 0], y: [0, -40, 30, 0] },
    duration: 22,
  },
  {
    tone: 'b',
    size: 460,
    style: { top: '28%', right: '-12%' },
    path: { x: [0, -50, 20, 0], y: [0, 40, -30, 0] },
    duration: 26,
  },
  {
    tone: 'a',
    size: 380,
    style: { bottom: '-18%', left: '32%' },
    path: { x: [0, 40, -40, 0], y: [0, -30, 20, 0] },
    duration: 18,
  },
]

const Blobs = ({ variant = 'hero' }: { variant?: 'hero' | 'soft' }) => {
  const p = usePalette()
  const reduce = useReducedMotion()
  const opacity = variant === 'hero' ? 0.5 : 0.22

  return (
    <Box
      aria-hidden
      position="absolute"
      top={0}
      right={0}
      bottom={0}
      left={0}
      overflow="hidden"
      zIndex={0}
      pointerEvents="none"
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            opacity,
            filter: 'blur(80px)',
            background: `radial-gradient(circle at 30% 30%, ${
              b.tone === 'a' ? p.blobA : p.blobB
            } 0%, transparent 70%)`,
            willChange: 'transform',
            ...b.style,
          }}
          animate={reduce ? undefined : b.path}
          transition={
            reduce
              ? undefined
              : {
                  duration: b.duration,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }
          }
        />
      ))}
    </Box>
  )
}

export default Blobs
```

- [ ] **Step 9: Create `components/Background/CursorGlow.tsx`**

```tsx
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import usePalette from 'hooks/usePalette'

const SIZE = 420

const CursorGlow = () => {
  const reduce = useReducedMotion()
  const p = usePalette()
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (reduce) return undefined
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!mq.matches) return undefined
    setEnabled(true)

    let raf = 0
    let x = -SIZE
    let y = -SIZE
    const paint = () => {
      if (ref.current) {
        ref.current.style.transform = `translate3d(${x - SIZE / 2}px, ${
          y - SIZE / 2
        }px, 0)`
      }
      raf = 0
    }
    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(paint)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1,
        transform: `translate3d(-${SIZE}px, -${SIZE}px, 0)`,
        background: `radial-gradient(circle, ${p.glow} 0%, transparent 60%)`,
        willChange: 'transform',
      }}
    />
  )
}

export default CursorGlow
```

- [ ] **Step 10: Typecheck and commit**

```bash
npx tsc --noEmit
git add hooks components/Ui components/Layout components/Background
git commit -m "feat(layout): section shell, chips, socials, blobs, cursor glow, hooks

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: tsc silent.

---

### Task 5: Sticky nav and logo

**Files:**
- Modify: `components/Logo/index.tsx` (rewrite)
- Delete: `components/Logo/styles.module.css`
- Create: `components/Nav/Toggle.tsx`, `ThemeToggle.tsx`, `ResumeButton.tsx`, `Links.tsx`, `MobileDrawer.tsx`, `index.tsx`

- [ ] **Step 1: Rewrite `components/Logo/index.tsx` and delete its CSS module**

```tsx
import { memo } from 'react'
import { Box, Image } from '@chakra-ui/react'

const Logo = ({ size = 40 }: { size?: number }) => (
  <Box
    as="a"
    href="#top"
    aria-label="Back to top"
    display="inline-flex"
    alignItems="center"
    transition="transform 0.25s ease"
    _hover={{ transform: 'rotate(-12deg) scale(1.08)' }}
  >
    <Image
      src="/logo.png"
      alt="Mint Nguyen leaf logo"
      htmlWidth={size}
      htmlHeight={size}
      boxSize={`${size}px`}
      objectFit="contain"
    />
  </Box>
)

export default memo(Logo)
```

```bash
git rm -q components/Logo/styles.module.css
```

- [ ] **Step 2: Create `components/Nav/Toggle.tsx`**

```tsx
import { motion } from 'framer-motion'

const Path = (props: React.ComponentProps<typeof motion.path>) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
)

const MenuToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) => (
  <motion.button
    onClick={onClick}
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
    initial={false}
    animate={isOpen ? 'open' : 'closed'}
    style={{
      width: 44,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      border: 0,
      cursor: 'pointer',
      color: 'inherit',
      borderRadius: 999,
    }}
  >
    <svg width="23" height="23" viewBox="0 0 23 18">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </motion.button>
)

export default MenuToggle
```

- [ ] **Step 3: Create `components/Nav/ThemeToggle.tsx`**

```tsx
import { IconButton, useColorMode } from '@chakra-ui/react'
import { RiMoonLine, RiSunLine } from 'react-icons/ri'
import usePalette from 'hooks/usePalette'

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const p = usePalette()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      icon={isDark ? <RiSunLine /> : <RiMoonLine />}
      onClick={toggleColorMode}
      variant="ghost"
      isRound
      color={p.text}
      _hover={{ bg: p.mintSoft, color: p.mint, transform: 'rotate(20deg)' }}
      transition="all 0.2s ease"
    />
  )
}

export default ThemeToggle
```

- [ ] **Step 4: Create `components/Nav/ResumeButton.tsx`**

```tsx
import { Button } from '@chakra-ui/react'
import { RiFileTextLine } from 'react-icons/ri'
import { profile } from 'config/profile'

const ResumeButton = ({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) => (
  <Button
    as="a"
    href={profile.resumeUrl}
    target="_blank"
    rel="noreferrer"
    variant="outlineMint"
    size={size}
    leftIcon={<RiFileTextLine />}
  >
    Resume
  </Button>
)

export default ResumeButton
```

- [ ] **Step 5: Create `components/Nav/Links.tsx`**

```tsx
import { Box, Button, Stack } from '@chakra-ui/react'
import { navLinks } from 'config/nav'
import usePalette from 'hooks/usePalette'

const NavLinks = ({
  direction = 'row',
  onNavigate,
}: {
  direction?: 'row' | 'column'
  onNavigate?: () => void
}) => {
  const p = usePalette()
  const isColumn = direction === 'column'
  return (
    <Stack
      as="ul"
      direction={direction}
      spacing={isColumn ? 2 : 1}
      listStyleType="none"
      m={0}
      p={0}
      align={isColumn ? 'stretch' : 'center'}
    >
      {navLinks.map((link) => (
        <Box as="li" key={link.href}>
          <Button
            as="a"
            href={link.href}
            onClick={onNavigate}
            variant="ghostNav"
            size={isColumn ? 'lg' : 'sm'}
            fontSize={isColumn ? '2xl' : 'sm'}
            width={isColumn ? '100%' : 'auto'}
            justifyContent={isColumn ? 'flex-start' : 'center'}
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              left: '16px',
              right: '16px',
              bottom: '6px',
              height: '2px',
              borderRadius: 'full',
              bg: p.mint,
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              transition: 'transform 0.25s ease',
            }}
            _hover={{ _after: { transform: 'scaleX(1)' } }}
          >
            {link.label}
          </Button>
        </Box>
      ))}
    </Stack>
  )
}

export default NavLinks
```

- [ ] **Step 6: Create `components/Nav/MobileDrawer.tsx`**

```tsx
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Stack,
  Box,
} from '@chakra-ui/react'
import NavLinks from './Links'
import ResumeButton from './ResumeButton'
import SocialLinks from 'components/Ui/SocialLinks'
import usePalette from 'hooks/usePalette'

const MobileDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const p = usePalette()
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="full">
      <DrawerOverlay />
      <DrawerContent bg={p.bg} color={p.text}>
        <DrawerBody pt={24} px={6}>
          <Stack spacing={8}>
            <NavLinks direction="column" onNavigate={onClose} />
            <Box>
              <ResumeButton size="lg" />
            </Box>
            <SocialLinks size="lg" />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MobileDrawer
```

- [ ] **Step 7: Create `components/Nav/index.tsx`**

```tsx
import {
  Box,
  Container,
  Flex,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import Logo from 'components/Logo'
import NavLinks from './Links'
import ThemeToggle from './ThemeToggle'
import ResumeButton from './ResumeButton'
import MenuToggle from './Toggle'
import MobileDrawer from './MobileDrawer'
import useScrolled from 'hooks/useScrolled'
import usePalette from 'hooks/usePalette'

const Nav = () => {
  const scrolled = useScrolled()
  const p = usePalette()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={50}
      bg={scrolled ? p.navBg : 'transparent'}
      borderBottomWidth="1px"
      borderColor={scrolled ? p.surfaceBorder : 'transparent'}
      backdropFilter={scrolled ? 'blur(12px)' : undefined}
      transition="background-color 0.25s ease, border-color 0.25s ease"
    >
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <Flex h="72px" align="center" justify="space-between">
          <Logo />
          <HStack spacing={2} display={{ base: 'none', lg: 'flex' }} as="nav" aria-label="Primary">
            <NavLinks />
            <ThemeToggle />
            <ResumeButton />
          </HStack>
          <HStack spacing={1} display={{ base: 'flex', lg: 'none' }}>
            <ThemeToggle />
            <MenuToggle isOpen={isOpen} onClick={isOpen ? onClose : onOpen} />
          </HStack>
        </Flex>
      </Container>
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export default Nav
```

- [ ] **Step 8: Typecheck and commit**

```bash
npx tsc --noEmit
git add -A components/Logo components/Nav
git commit -m "feat(nav): sticky nav with drawer, theme toggle, resume button

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: tsc silent. (The old `components/Menu` still compiles because `Logo` keeps its default export.)

---

### Task 6: Hero

**Files:**
- Create: `components/Sections/Hero/ScrollCue.tsx`, `Orbit.tsx`, `index.tsx`

- [ ] **Step 1: Create `components/Sections/Hero/ScrollCue.tsx`**

```tsx
import { Box, Icon } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { RiMouseLine } from 'react-icons/ri'
import usePalette from 'hooks/usePalette'

const ScrollCue = () => {
  const reduce = useReducedMotion()
  const p = usePalette()
  return (
    <Box
      aria-hidden
      position="absolute"
      bottom={6}
      left="50%"
      transform="translateX(-50%)"
      display={{ base: 'none', lg: 'block' }}
      color={p.muted}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{ duration: 1.6, ease: 'easeInOut', repeat: Infinity }}
      >
        <Icon as={RiMouseLine} boxSize={6} />
      </motion.div>
    </Box>
  )
}

export default ScrollCue
```

- [ ] **Step 2: Create `components/Sections/Hero/Orbit.tsx`**

```tsx
import { Box, Flex, Image } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from 'config/profile'
import { popIn } from 'config/animations'
import Chip from 'components/Ui/Chip'
import usePalette from 'hooks/usePalette'

const chipPositions: React.CSSProperties[] = [
  { top: '6%', left: '0%' },
  { bottom: '12%', left: '6%' },
  { top: '40%', right: '0%' },
]

const Orbit = () => {
  const p = usePalette()
  const reduce = useReducedMotion()
  return (
    <Flex
      position="relative"
      justify="center"
      align="center"
      minH={{ base: '320px', md: '440px' }}
      role="img"
      aria-label={`${profile.name}, ${profile.title} in ${profile.location}`}
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={popIn}
        style={{ position: 'relative' }}
      >
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        >
          <Box
            boxSize={{ base: '260px', md: '340px' }}
            borderRadius="50%"
            bg={`radial-gradient(circle at 35% 30%, ${p.mintSoft} 0%, ${p.surface} 70%)`}
            borderWidth="1px"
            borderColor={p.surfaceBorder}
            boxShadow={`0 30px 80px -30px ${p.mint}`}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/logo.png"
              alt=""
              boxSize={{ base: '150px', md: '210px' }}
              objectFit="contain"
              htmlWidth={210}
              htmlHeight={210}
            />
          </Box>
        </motion.div>
      </motion.div>

      {profile.heroChips.map((chip, i) => (
        <motion.div
          key={chip.label}
          style={{ position: 'absolute', ...chipPositions[i] }}
          initial={{ opacity: 0, y: 12 }}
          animate={
            reduce
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: [0, -10, 0] }
          }
          transition={
            reduce
              ? { duration: 0.4, delay: 0.6 + i * 0.15 }
              : {
                  opacity: { duration: 0.4, delay: 0.6 + i * 0.15 },
                  y: {
                    duration: 4 + i,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    delay: 0.6 + i * 0.15,
                  },
                }
          }
        >
          <Chip icon={chip.icon} label={chip.label} size="sm" />
        </motion.div>
      ))}
    </Flex>
  )
}

export default Orbit
```

- [ ] **Step 3: Create `components/Sections/Hero/index.tsx`**

```tsx
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { RiDownloadLine, RiSendPlaneLine } from 'react-icons/ri'
import { profile } from 'config/profile'
import { fadeInUp, simpleOpacity, stagger } from 'config/animations'
import Blobs from 'components/Background/Blobs'
import SocialLinks from 'components/Ui/SocialLinks'
import Orbit from './Orbit'
import ScrollCue from './ScrollCue'
import usePalette from 'hooks/usePalette'

const MotionStack = motion(Stack)
const MotionText = motion(Text)
const MotionHeading = motion(Heading)
const MotionBox = motion(Box)

const Hero = () => {
  const p = usePalette()
  const { headline } = profile
  return (
    <Box
      as="section"
      id="top"
      aria-label="Introduction"
      position="relative"
      overflow="hidden"
      pt={{ base: 28, md: 36 }}
      pb={{ base: 16, md: 24 }}
      minH={{ lg: '92vh' }}
      display="flex"
      alignItems="center"
    >
      <Blobs variant="hero" />
      <Container maxW="1200px" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 12, lg: 8 }} alignItems="center">
          <MotionStack variants={stagger} initial="initial" animate="animate" spacing={6}>
            <MotionText
              variants={fadeInUp}
              as="span"
              fontSize="md"
              fontWeight={600}
              letterSpacing="0.14em"
              textTransform="uppercase"
              color={p.mint}
            >
              {profile.eyebrow}
            </MotionText>
            <MotionHeading
              as="h1"
              variants={fadeInUp}
              fontSize={{ base: '2.5rem', md: '3.4rem', xl: '4.1rem' }}
              lineHeight={1.05}
              fontWeight={800}
            >
              {headline.before}
              <Text as="span" bgGradient={p.gradient} bgClip="text">
                {headline.gradient}
              </Text>
              {headline.middle}
              <Text as="span" color={p.coral}>
                {headline.accent}
              </Text>
              {headline.after}
            </MotionHeading>
            <MotionText
              variants={fadeInUp}
              fontSize={{ base: 'md', md: 'lg' }}
              color={p.muted}
              maxW="560px"
            >
              {profile.heroSub}
            </MotionText>
            <MotionStack
              variants={fadeInUp}
              direction={{ base: 'column', sm: 'row' }}
              spacing={4}
            >
              <Button
                as="a"
                href={`mailto:${profile.email}`}
                variant="solidMint"
                size="lg"
                rightIcon={<RiSendPlaneLine />}
              >
                Let's talk
              </Button>
              <Button
                as="a"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                variant="outlineMint"
                size="lg"
                rightIcon={<RiDownloadLine />}
              >
                Download resume
              </Button>
            </MotionStack>
            <MotionBox variants={simpleOpacity}>
              <SocialLinks />
            </MotionBox>
          </MotionStack>
          <Orbit />
        </SimpleGrid>
      </Container>
      <ScrollCue />
    </Box>
  )
}

export default Hero
```

- [ ] **Step 4: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Sections/Hero
git commit -m "feat(hero): headline, CTAs, orbit with floating chips, scroll cue

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: tsc silent. If `MotionText as="span"` errors on the `as` prop type, change `MotionText` to a plain `Text` wrapped in `<motion.div variants={fadeInUp}>`.

---

### Task 7: Impact strip

**Files:**
- Create: `components/Sections/Impact/Counter.tsx`, `index.tsx`

- [ ] **Step 1: Create `components/Sections/Impact/Counter.tsx`**

```tsx
import { Box, Text } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'
import { Stat } from 'config/stats'
import useCountUp from 'hooks/useCountUp'
import usePalette from 'hooks/usePalette'

const Counter = ({
  stat,
  active,
  index,
}: {
  stat: Stat
  active: boolean
  index: number
}) => {
  const reduce = useReducedMotion()
  const p = usePalette()
  const isNumber = typeof stat.value === 'number'
  const n = useCountUp(isNumber ? (stat.value as number) : 0, active, 1200, !!reduce)
  const display = isNumber ? `${n}${stat.suffix ?? ''}` : String(stat.value)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        active
          ? { opacity: 1, scale: reduce ? 1 : [0.85, 1.05, 1] }
          : undefined
      }
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
    >
      <Box
        p={{ base: 4, md: 6 }}
        borderRadius="2xl"
        bg={p.surface}
        borderWidth="1px"
        borderColor={p.surfaceBorder}
        textAlign="center"
        transition="transform 0.2s ease, border-color 0.2s ease"
        _hover={{ transform: 'translateY(-4px)', borderColor: p.mint }}
      >
        <Text
          as="div"
          fontSize={{ base: '3xl', md: '5xl' }}
          fontWeight={800}
          lineHeight={1}
          bgGradient={p.gradient}
          bgClip="text"
        >
          {display}
        </Text>
        <Text
          mt={2}
          fontSize="xs"
          fontWeight={600}
          color={p.muted}
          textTransform="uppercase"
          letterSpacing="0.1em"
        >
          {stat.label}
        </Text>
      </Box>
    </motion.div>
  )
}

export default Counter
```

- [ ] **Step 2: Create `components/Sections/Impact/index.tsx`**

```tsx
import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import { useInView } from 'react-intersection-observer'
import { stats } from 'config/stats'
import Counter from './Counter'

const Impact = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <Box as="section" id="impact" aria-label="Highlights" py={{ base: 4, md: 8 }}>
      <Container maxW="1200px" px={{ base: 4, md: 8 }}>
        <SimpleGrid ref={ref} columns={{ base: 2, md: 4 }} spacing={{ base: 4, md: 6 }}>
          {stats.map((s, i) => (
            <Counter key={s.label} stat={s} active={inView} index={i} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Impact
```

- [ ] **Step 3: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Sections/Impact
git commit -m "feat(impact): count-up stat tiles

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: About section and toolbox

**Files:**
- Modify: `config/skills.ts` (rewrite)
- Create: `components/Sections/About/Toolbox.tsx`
- Modify: `components/Sections/About/index.tsx` (rewrite)
- Delete: `components/Sections/About/Detail.tsx`, `SkillSetModal.tsx`, `styles.module.css`

- [ ] **Step 1: Rewrite `config/skills.ts`**

```ts
import { IconType } from 'react-icons'
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiNestjs,
  SiGraphql,
  SiDjango,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiAzuredevops,
  SiGooglecloud,
  SiFirebase,
  SiFigma,
  SiChakraui,
  SiMui,
  SiFramer,
} from 'react-icons/si'
import {
  RiCodeSSlashLine,
  RiServerLine,
  RiLayoutLine,
  RiDatabase2Line,
  RiStackLine,
  RiPaletteLine,
} from 'react-icons/ri'

export type Skill = { name: string; icon?: IconType }
export type SkillGroup = { label: string; icon: IconType; items: Skill[] }

export const fallbackIcon: IconType = RiCodeSSlashLine

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    icon: RiCodeSSlashLine,
    items: [
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript (ES6+)', icon: SiJavascript },
      { name: 'Python', icon: SiPython },
    ],
  },
  {
    label: 'Backend',
    icon: RiServerLine,
    items: [
      { name: 'Node', icon: SiNodedotjs },
      { name: 'NestJS', icon: SiNestjs },
      { name: 'GraphQL', icon: SiGraphql },
      { name: 'Django', icon: SiDjango },
    ],
  },
  {
    label: 'Frontend',
    icon: RiLayoutLine,
    items: [
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Redux', icon: SiRedux },
      { name: 'React Native', icon: SiReact },
    ],
  },
  {
    label: 'Data',
    icon: RiDatabase2Line,
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Redis', icon: SiRedis },
    ],
  },
  {
    label: 'Infra and delivery',
    icon: RiStackLine,
    items: [
      { name: 'Docker', icon: SiDocker },
      { name: 'Azure DevOps', icon: SiAzuredevops },
      { name: 'Google Cloud', icon: SiGooglecloud },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
  {
    label: 'Design and UI',
    icon: RiPaletteLine,
    items: [
      { name: 'Figma', icon: SiFigma },
      { name: 'Chakra UI', icon: SiChakraui },
      { name: 'Material UI', icon: SiMui },
      { name: 'Framer Motion', icon: SiFramer },
    ],
  },
]

export const currentlyLearning: string[] = [
  'System design and architecture',
  'Engineering management',
]
```

- [ ] **Step 2: Create `components/Sections/About/Toolbox.tsx`**

```tsx
import { Box, HStack, Icon, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { RiSparkling2Line } from 'react-icons/ri'
import { skillGroups, currentlyLearning, fallbackIcon } from 'config/skills'
import Chip from 'components/Ui/Chip'
import usePalette from 'hooks/usePalette'

const GroupLabel = ({
  icon,
  label,
  color,
}: {
  icon: React.ElementType
  label: string
  color: string
}) => (
  <HStack mb={3} spacing={2}>
    <Icon as={icon} color={color} boxSize={4} />
    <Text
      as="span"
      fontSize="xs"
      fontWeight={700}
      textTransform="uppercase"
      letterSpacing="0.12em"
      color={color}
    >
      {label}
    </Text>
  </HStack>
)

const Toolbox = () => {
  const p = usePalette()
  return (
    <Stack spacing={6}>
      {skillGroups.map((group) => (
        <Box key={group.label}>
          <GroupLabel icon={group.icon} label={group.label} color={p.muted} />
          <Wrap spacing={2}>
            {group.items.map((skill) => (
              <WrapItem key={skill.name}>
                <Chip
                  icon={skill.icon ?? fallbackIcon}
                  label={skill.name}
                  variant="soft"
                  size="sm"
                />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      ))}
      <Box pt={2}>
        <GroupLabel icon={RiSparkling2Line} label="Currently learning" color={p.coral} />
        <Wrap spacing={2}>
          {currentlyLearning.map((item) => (
            <WrapItem key={item}>
              <Chip icon={RiSparkling2Line} label={item} variant="coral" size="sm" />
            </WrapItem>
          ))}
        </Wrap>
      </Box>
    </Stack>
  )
}

export default Toolbox
```

- [ ] **Step 3: Rewrite `components/Sections/About/index.tsx`**

```tsx
import { memo } from 'react'
import { Box, Icon, SimpleGrid, Stack, Text, Tooltip } from '@chakra-ui/react'
import { RiCupLine } from 'react-icons/ri'
import Section from 'components/Layout/Section'
import Toolbox from './Toolbox'
import { profile, yearsShipping } from 'config/profile'
import usePalette from 'hooks/usePalette'

const Emphasis = ({ tip, children }: { tip: string; children: string }) => {
  const p = usePalette()
  return (
    <Tooltip label={tip} hasArrow placement="top" bg={p.mint} color={p.onMint}>
      <Text as="span" color={p.mint} fontWeight={600} cursor="help" borderBottom="2px dotted" borderColor={p.mint}>
        {children}
      </Text>
    </Tooltip>
  )
}

const About = () => {
  const p = usePalette()
  return (
    <Section id="about" eyebrow="About" heading="What I do.">
      <SimpleGrid columns={{ base: 1, lg: 5 }} spacing={{ base: 10, lg: 16 }}>
        <Stack gridColumn={{ lg: 'span 2' }} spacing={5} fontSize={{ base: 'md', md: 'lg' }} color={p.muted}>
          <Text>
            I've been coding professionally for{' '}
            <Text as="span" color={p.text} fontWeight={700}>
              {yearsShipping} years
            </Text>
            . These days I spend my time as a{' '}
            <Text as="span" color={p.text} fontWeight={700}>
              {profile.title}
            </Text>{' '}
            at {profile.company.name}: setting technical direction, reviewing
            code, unblocking teammates, and still shipping features myself.
          </Text>
          <Text>
            I care about <b>architecture</b>, <b>APIs</b>,{' '}
            <Emphasis tip="Ha! Or more accurately, tech debt">
              nitty-gritty business logic
            </Emphasis>
            , and the <b>front end</b> that makes it all feel effortless.
          </Text>
          <Text>
            Here are the tools that are my cup of{' '}
            <Emphasis tip="I love mint tea!">mint tea</Emphasis>{' '}
            <Icon as={RiCupLine} color={p.mint} verticalAlign="middle" />.
          </Text>
        </Stack>
        <Box gridColumn={{ lg: 'span 3' }}>
          <Toolbox />
        </Box>
      </SimpleGrid>
    </Section>
  )
}

export default memo(About)
```

- [ ] **Step 4: Delete the old About files, typecheck, commit**

```bash
git rm -q components/Sections/About/Detail.tsx components/Sections/About/SkillSetModal.tsx components/Sections/About/styles.module.css
npx tsc --noEmit
git add -A config/skills.ts components/Sections/About
git commit -m "feat(about): inline toolbox chips, currently-learning row, new copy

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: tsc silent (the old page still imports `components/Sections/About`, which still has a default export).

---

### Task 9: Team principles

**Files:**
- Create: `components/Sections/Team/PrincipleCard.tsx`, `index.tsx`

- [ ] **Step 1: Create `components/Sections/Team/PrincipleCard.tsx`**

```tsx
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { Principle } from 'config/team'
import usePalette from 'hooks/usePalette'

const PrincipleCard = ({ principle, index }: { principle: Principle; index: number }) => {
  const p = usePalette()
  return (
    <Box
      as="article"
      h="100%"
      p={{ base: 6, md: 7 }}
      borderRadius="2xl"
      bg={p.surface}
      borderWidth="1px"
      borderColor={p.surfaceBorder}
      transition="transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease"
      _hover={{
        transform: 'translateY(-6px)',
        borderColor: p.mint,
        boxShadow: '0 24px 48px -24px rgba(0, 0, 0, 0.35)',
      }}
    >
      <Flex align="center" justify="space-between" mb={5}>
        <Flex
          boxSize="48px"
          borderRadius="xl"
          bg={p.mintSoft}
          color={p.mint}
          align="center"
          justify="center"
        >
          <Icon as={principle.icon} boxSize={6} />
        </Flex>
        <Text fontSize="sm" fontWeight={700} color={p.coral}>
          0{index + 1}
        </Text>
      </Flex>
      <Heading as="h3" fontSize="lg" mb={3} lineHeight={1.3}>
        {principle.title}
      </Heading>
      <Text fontSize="md" color={p.muted}>
        {principle.body}
      </Text>
    </Box>
  )
}

export default PrincipleCard
```

- [ ] **Step 2: Create `components/Sections/Team/index.tsx`**

```tsx
import { memo } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import Section from 'components/Layout/Section'
import PrincipleCard from './PrincipleCard'
import { principles, teamIntro } from 'config/team'

const Team = () => (
  <Section id="team" eyebrow="Team" heading="How I help the team ship." intro={teamIntro}>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
      {principles.map((principle, i) => (
        <PrincipleCard key={principle.title} principle={principle} index={i} />
      ))}
    </SimpleGrid>
  </Section>
)

export default memo(Team)
```

- [ ] **Step 3: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Sections/Team
git commit -m "feat(team): how-I-help-the-team-ship principle cards

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10: Experience timeline

**Files:**
- Create: `config/experience.ts`
- Delete: `config/experience.tsx`, `components/Sections/Experience/ExperienceTab.tsx`, `components/Sections/Experience/styles.module.css`
- Create: `components/Sections/Experience/TimelineItem.tsx`, `EducationItem.tsx`, `Timeline.tsx`
- Modify: `components/Sections/Experience/index.tsx` (rewrite)

- [ ] **Step 1: Create `config/experience.ts` and delete the `.tsx`**

```ts
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
```

```bash
git rm -q config/experience.tsx components/Sections/Experience/ExperienceTab.tsx components/Sections/Experience/styles.module.css
```

- [ ] **Step 2: Create `components/Sections/Experience/TimelineItem.tsx`**

```tsx
import {
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
  Text,
} from '@chakra-ui/react'
import { RiArrowRightUpLine, RiCheckboxCircleLine, RiFlashlightLine } from 'react-icons/ri'
import { Experience } from 'config/experience'
import usePalette from 'hooks/usePalette'

export const Marker = ({ children }: { children: React.ReactNode }) => {
  const p = usePalette()
  return (
    <Flex
      position="absolute"
      left={0}
      top={0}
      boxSize={{ base: '36px', md: '80px' }}
      borderRadius="full"
      bg={p.logoBg}
      borderWidth="2px"
      borderColor={p.surfaceBorder}
      align="center"
      justify="center"
      overflow="hidden"
      p={{ base: 1, md: 3 }}
      zIndex={1}
    >
      {children}
    </Flex>
  )
}

export const Card = ({ children }: { children: React.ReactNode }) => {
  const p = usePalette()
  return (
    <Box
      flex={1}
      p={{ base: 4, md: 6 }}
      borderRadius="2xl"
      bg={p.surface}
      borderWidth="1px"
      borderColor={p.surfaceBorder}
      transition="border-color 0.2s ease, transform 0.2s ease"
      _hover={{ borderColor: p.mint, transform: 'translateX(4px)' }}
    >
      {children}
    </Box>
  )
}

const TimelineItem = ({ item }: { item: Experience }) => {
  const p = usePalette()
  return (
    <Flex as="li" position="relative" pb={{ base: 8, md: 10 }} pl={{ base: 14, md: 28 }}>
      <Marker>
        <Image
          src={item.logo}
          alt={`${item.longName} logo`}
          maxW="100%"
          maxH="100%"
          objectFit="contain"
          fallback={<Skeleton boxSize="100%" borderRadius="full" />}
        />
      </Marker>
      <Card>
        <Stack spacing={1}>
          <Flex justify="space-between" align="baseline" wrap="wrap">
            <Text fontWeight={700} fontSize={{ base: 'md', md: 'lg' }}>
              {item.position}
            </Text>
            <Text fontSize="sm" color={p.muted}>
              {item.duration}
            </Text>
          </Flex>
          <HStack spacing={2} wrap="wrap">
            <Link href={item.url} isExternal fontWeight={600} display="inline-flex" alignItems="center">
              {item.longName}
              <Icon as={RiArrowRightUpLine} ml={1} />
            </Link>
            <Text fontSize="sm" color={p.muted}>
              · {item.tagline}
            </Text>
          </HStack>
        </Stack>

        {item.milestone && (
          <HStack
            mt={4}
            spacing={3}
            p={3}
            borderRadius="xl"
            bg={p.mintSoft}
            align="flex-start"
          >
            <Icon as={RiFlashlightLine} color={p.coral} mt="2px" />
            <Text fontSize="sm">
              <Text as="span" fontWeight={700} color={p.mint}>
                {item.milestone.when}:{' '}
              </Text>
              {item.milestone.label}
            </Text>
          </HStack>
        )}

        <List spacing={2} mt={4}>
          {item.roles.map((role) => (
            <ListItem key={role} display="flex" alignItems="flex-start">
              <ListIcon as={RiCheckboxCircleLine} color={p.mint} mt="4px" flexShrink={0} />
              <Text as="span" fontSize="sm" color={p.muted}>
                {role}
              </Text>
            </ListItem>
          ))}
        </List>
      </Card>
    </Flex>
  )
}

export default TimelineItem
```

- [ ] **Step 3: Create `components/Sections/Experience/EducationItem.tsx`**

```tsx
import { Flex, HStack, Icon, Stack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { RiGraduationCapLine, RiMedalLine } from 'react-icons/ri'
import { education } from 'config/experience'
import Chip from 'components/Ui/Chip'
import usePalette from 'hooks/usePalette'
import { Card, Marker } from './TimelineItem'

const EducationItem = () => {
  const p = usePalette()
  return (
    <Flex as="li" position="relative" pl={{ base: 14, md: 28 }}>
      <Marker>
        <Icon as={RiGraduationCapLine} color={p.mint} boxSize={{ base: 5, md: 8 }} />
      </Marker>
      <Card>
        <Stack spacing={1}>
          <Flex justify="space-between" align="baseline" wrap="wrap">
            <Text fontWeight={700} fontSize={{ base: 'md', md: 'lg' }}>
              {education.degree}
            </Text>
            <Text fontSize="sm" color={p.muted}>
              {education.duration}
            </Text>
          </Flex>
          <HStack spacing={2}>
            <Text fontWeight={600} color={p.mint}>
              {education.school}
            </Text>
            <Text fontSize="sm" color={p.muted}>
              · {education.location}
            </Text>
          </HStack>
        </Stack>
        <Wrap mt={4} spacing={2}>
          {education.honors.map((h) => (
            <WrapItem key={h}>
              <Chip icon={RiMedalLine} label={h} variant="coral" size="sm" />
            </WrapItem>
          ))}
        </Wrap>
      </Card>
    </Flex>
  )
}

export default EducationItem
```

- [ ] **Step 4: Create `components/Sections/Experience/Timeline.tsx`**

```tsx
import { Box } from '@chakra-ui/react'
import { experiences } from 'config/experience'
import TimelineItem from './TimelineItem'
import EducationItem from './EducationItem'
import usePalette from 'hooks/usePalette'

const Timeline = () => {
  const p = usePalette()
  return (
    <Box
      as="ol"
      listStyleType="none"
      m={0}
      p={0}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: '20px',
        bottom: '20px',
        left: { base: '17px', md: '39px' },
        width: '2px',
        bg: p.surfaceBorder,
      }}
    >
      {experiences.map((item) => (
        <TimelineItem key={item.key} item={item} />
      ))}
      <EducationItem />
    </Box>
  )
}

export default Timeline
```

- [ ] **Step 5: Rewrite `components/Sections/Experience/index.tsx`**

```tsx
import { memo } from 'react'
import Section from 'components/Layout/Section'
import Timeline from './Timeline'

const Experience = () => (
  <Section
    id="experience"
    eyebrow="Experience"
    heading="Where I've worked."
    intro="Four companies since 2020, each one a bigger slice of the stack. The last one I helped build from the ground up."
  >
    <Timeline />
  </Section>
)

export default memo(Experience)
```

- [ ] **Step 6: Typecheck, build, commit**

```bash
npx tsc --noEmit && yarn build 2>&1 | tail -12
git add -A config/experience.ts config/experience.tsx components/Sections/Experience
git commit -m "feat(experience): vertical timeline with growth milestone and education

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: tsc silent, build `Compiled successfully`.

---

### Task 11: Featured work case studies

**Files:**
- Create: `components/Sections/Work/CaseStudyCard.tsx`, `index.tsx`

- [ ] **Step 1: Create `components/Sections/Work/CaseStudyCard.tsx`**

```tsx
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { RiExternalLinkLine } from 'react-icons/ri'
import { Work } from 'config/works'
import Chip from 'components/Ui/Chip'
import usePalette from 'hooks/usePalette'

const Labelled = ({ label, text }: { label: string; text: string }) => {
  const p = usePalette()
  return (
    <Box>
      <Text
        as="span"
        fontSize="xs"
        fontWeight={700}
        textTransform="uppercase"
        letterSpacing="0.12em"
        color={p.mint}
      >
        {label}
      </Text>
      <Text fontSize="sm" color={p.muted} mt={1}>
        {text}
      </Text>
    </Box>
  )
}

const CaseStudyCard = ({ work, index }: { work: Work; index: number }) => {
  const p = usePalette()
  const flip = index % 2 === 1
  return (
    <Box
      as="article"
      role="group"
      borderRadius="3xl"
      overflow="hidden"
      bg={p.surface}
      borderWidth="1px"
      borderColor={p.surfaceBorder}
      transition="border-color 0.25s ease, box-shadow 0.25s ease"
      _hover={{ borderColor: p.mint, boxShadow: '0 30px 60px -30px rgba(0, 0, 0, 0.45)' }}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <Box
          position="relative"
          order={{ base: 0, md: flip ? 1 : 0 }}
          minH={{ base: '220px', md: '100%' }}
          overflow="hidden"
          bg={p.mintSoft}
        >
          <Image
            src={work.image}
            alt={`${work.title} screenshot`}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition={work.objectPosition}
            loading="lazy"
            transition="transform 0.6s ease"
            _groupHover={{ transform: 'scale(1.05)' }}
            fallback={<Skeleton w="100%" h="100%" />}
          />
        </Box>
        <Stack p={{ base: 6, md: 8, lg: 10 }} spacing={4}>
          <Text fontSize="sm" fontWeight={700} color={p.coral}>
            0{index + 1}
          </Text>
          <Heading as="h3" fontSize={{ base: 'xl', md: '2xl' }} lineHeight={1.2}>
            {work.title}
          </Heading>
          <Labelled label="Problem" text={work.problem} />
          <Labelled label="What I did" text={work.didWhat} />
          <Labelled label="Outcome" text={work.outcome} />
          {work.metric && (
            <Text fontWeight={800} fontSize="lg" bgGradient={p.gradient} bgClip="text">
              {work.metric}
            </Text>
          )}
          <Wrap spacing={2}>
            {work.tags.map((tag) => (
              <WrapItem key={tag}>
                <Chip label={tag} variant="soft" size="sm" />
              </WrapItem>
            ))}
          </Wrap>
          <Box pt={2}>
            <Button
              as="a"
              href={work.ctaUrl}
              target="_blank"
              rel="noreferrer"
              variant="outlineMint"
              size="sm"
              rightIcon={<RiExternalLinkLine />}
            >
              {work.ctaLabel}
            </Button>
          </Box>
        </Stack>
      </SimpleGrid>
    </Box>
  )
}

export default CaseStudyCard
```

- [ ] **Step 2: Create `components/Sections/Work/index.tsx`**

```tsx
import { memo } from 'react'
import { Stack } from '@chakra-ui/react'
import Section from 'components/Layout/Section'
import CaseStudyCard from './CaseStudyCard'
import { works } from 'config/works'

const Work = () => (
  <Section
    id="work"
    eyebrow="Work"
    heading="Things I've shipped."
    intro="Problem, what I did, and what changed. No fluff, a little colour."
  >
    <Stack spacing={{ base: 6, md: 10 }}>
      {works.map((work, i) => (
        <CaseStudyCard key={work.title} work={work} index={i} />
      ))}
    </Stack>
  </Section>
)

export default memo(Work)
```

- [ ] **Step 3: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Sections/Work
git commit -m "feat(work): case-study cards with problem, action, outcome, tags

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 12: Now section

**Files:**
- Create: `components/Sections/Now/index.tsx`

- [ ] **Step 1: Create `components/Sections/Now/index.tsx`**

```tsx
import { memo } from 'react'
import { Box, Flex, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import { RiTimeLine } from 'react-icons/ri'
import Section from 'components/Layout/Section'
import Blobs from 'components/Background/Blobs'
import Chip from 'components/Ui/Chip'
import { nowItems, nowUpdated } from 'config/now'
import usePalette from 'hooks/usePalette'

const Now = () => {
  const p = usePalette()
  return (
    <Section
      id="now"
      eyebrow="Now"
      heading="Right now."
      background={<Blobs variant="soft" />}
      overflow="hidden"
    >
      <Box mb={6}>
        <Chip icon={RiTimeLine} label={nowUpdated} size="sm" />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
        {nowItems.map((item) => (
          <Box
            key={item.label}
            p={6}
            borderRadius="2xl"
            bg={p.surface}
            borderWidth="1px"
            borderColor={p.surfaceBorder}
            transition="transform 0.25s ease, border-color 0.25s ease"
            _hover={{ transform: 'translateY(-6px)', borderColor: p.coral }}
          >
            <Flex
              boxSize="44px"
              borderRadius="xl"
              bg={p.coralSoft}
              color={p.coral}
              align="center"
              justify="center"
              mb={4}
            >
              <Icon as={item.icon} boxSize={5} />
            </Flex>
            <Heading
              as="h3"
              fontSize="xs"
              fontWeight={700}
              textTransform="uppercase"
              letterSpacing="0.12em"
              color={p.muted}
              mb={2}
            >
              {item.label}
            </Heading>
            <Text fontSize="md">{item.body}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Section>
  )
}

export default memo(Now)
```

- [ ] **Step 2: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Sections/Now
git commit -m "feat(now): building, learning, off-screen, open-to tiles

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 13: Contact, confetti, footer

**Files:**
- Create: `components/Sections/Contact/useConfetti.ts`, `Footer.tsx`, `index.tsx`

- [ ] **Step 1: Create `components/Sections/Contact/useConfetti.ts`**

```ts
import { useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import { palette } from 'config/theme'

const colors = [palette.dark.mint, palette.dark.coral, '#FFB86B', '#FFFFFF']

/** Returns a click handler that fires three confetti bursts. No-op under reduced motion. */
const useConfetti = (): (() => void) => {
  const reduce = useReducedMotion()
  return useCallback(() => {
    if (reduce) return
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors })
      setTimeout(
        () =>
          confetti({
            particleCount: 60,
            spread: 100,
            angle: 60,
            origin: { x: 0, y: 0.8 },
            colors,
          }),
        150
      )
      setTimeout(
        () =>
          confetti({
            particleCount: 60,
            spread: 100,
            angle: 120,
            origin: { x: 1, y: 0.8 },
            colors,
          }),
        300
      )
    })
  }, [reduce])
}

export default useConfetti
```

- [ ] **Step 2: Create `components/Sections/Contact/Footer.tsx`**

```tsx
import { Box, Icon, Link, Text } from '@chakra-ui/react'
import { RiGithubFill, RiHeart3Line } from 'react-icons/ri'
import { profile } from 'config/profile'
import usePalette from 'hooks/usePalette'

const Footer = () => {
  const p = usePalette()
  const year = new Date().getFullYear()
  return (
    <Box as="footer" textAlign="center" pt={{ base: 16, md: 24 }} color={p.muted} fontSize="sm">
      <Link href={profile.github} isExternal aria-label="GitHub" display="inline-block" mb={2}>
        <Icon as={RiGithubFill} boxSize={6} />
      </Link>
      <Text>
        Designed and built with <Icon as={RiHeart3Line} color={p.coral} verticalAlign="middle" /> by{' '}
        {profile.name} © {year}
      </Text>
    </Box>
  )
}

export default Footer
```

- [ ] **Step 3: Create `components/Sections/Contact/index.tsx`**

```tsx
import { memo } from 'react'
import { Button, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { motion, useReducedMotion, Variants } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RiMailLine } from 'react-icons/ri'
import Section from 'components/Layout/Section'
import SocialLinks from 'components/Ui/SocialLinks'
import Footer from './Footer'
import useConfetti from './useConfetti'
import { profile } from 'config/profile'
import usePalette from 'hooks/usePalette'

const kaomoji: Variants = {
  shake: {
    rotate: [0, 15, 0, -15, 0],
    transition: { delay: 1.0, duration: 0.5, repeat: 2, ease: 'easeInOut' },
  },
  jump: {
    y: [0, -30, 0],
    transition: { delay: 1.6, duration: 0.5, repeat: 3, ease: 'easeInOut' },
  },
}

const Contact = () => {
  const p = usePalette()
  const reduce = useReducedMotion()
  const fire = useConfetti()
  const [ref, inView] = useInView({ triggerOnce: true })

  return (
    <Section id="contact" eyebrow="Contact">
      <Stack spacing={6} maxW="720px">
        <Heading as="h2" id="contact-heading" fontSize={{ base: '3xl', md: '4xl' }} lineHeight={1.15}>
          Say hi!{' '}
          <motion.button
            ref={ref}
            type="button"
            onClick={fire}
            aria-label="Celebrate with confetti"
            variants={kaomoji}
            animate={inView && !reduce ? ['shake', 'jump'] : false}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              display: 'inline-block',
              background: 'none',
              border: 0,
              cursor: 'pointer',
              font: 'inherit',
              color: p.mint,
              padding: 0,
            }}
          >
            (⁀ᗢ⁀)
          </motion.button>
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color={p.muted}>
          I'm a bubbly person and I love putting a smile on everyone's face.
          Coding, guiding teams, movies, weeb stuff, anything is cool. If you're
          in Calgary and love hiking, ask! Message me on any social or shoot me
          an{' '}
          <Link href={`mailto:${profile.email}`} fontWeight={600}>
            email
          </Link>
          .
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} align={{ sm: 'center' }}>
          <Button
            as="a"
            href={`mailto:${profile.email}`}
            variant="solidMint"
            size="lg"
            leftIcon={<RiMailLine />}
            onClick={fire}
          >
            Email me
          </Button>
          <SocialLinks />
        </Stack>
      </Stack>
      <Footer />
    </Section>
  )
}

export default memo(Contact)
```

- [ ] **Step 4: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Sections/Contact
git commit -m "feat(contact): say-hi with confetti, email CTA, footer

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 14: Metadata, console greeting, OG image

**Files:**
- Modify: `components/Misc/OpenGraphHead.tsx` (rewrite)
- Create: `components/Misc/ConsoleGreeting.tsx`
- Modify: `components/Misc/FavIconProvider.tsx`
- Create: `scripts/og/index.html`, generate `public/og.png`

- [ ] **Step 1: Rewrite `components/Misc/OpenGraphHead.tsx`**

```tsx
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
```

- [ ] **Step 2: Create `components/Misc/ConsoleGreeting.tsx`**

```tsx
import { useEffect } from 'react'
import { profile } from 'config/profile'

const ConsoleGreeting = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      '%cHey, you found the console! 👀',
      'font-size:16px;font-weight:700;color:#7EE0BC;'
    )
    // eslint-disable-next-line no-console
    console.log(
      `%cI like you already. Say hi: ${profile.email}  ·  ${profile.github}`,
      'font-size:12px;color:#9FB5A9;'
    )
  }, [])
  return null
}

export default ConsoleGreeting
```

- [ ] **Step 3: Update `components/Misc/FavIconProvider.tsx`**

```tsx
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
```

- [ ] **Step 4: Create `scripts/og/index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>OG image source</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;800&display=swap"
      rel="stylesheet"
    />
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      html, body { width: 1200px; height: 630px; overflow: hidden; }
      body {
        font-family: 'Poppins', sans-serif;
        background: #0e1512;
        color: #eaf4ee;
        position: relative;
      }
      .blob {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        opacity: 0.55;
      }
      .a { width: 620px; height: 620px; left: -160px; top: -200px;
           background: radial-gradient(circle at 30% 30%, #7ee0bc, transparent 70%); }
      .b { width: 520px; height: 520px; right: -140px; bottom: -220px;
           background: radial-gradient(circle at 30% 30%, #ff8a5b, transparent 70%); }
      .wrap {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 96px;
      }
      .text { max-width: 760px; }
      .eyebrow {
        font-size: 22px; font-weight: 700; letter-spacing: 0.16em;
        text-transform: uppercase; color: #7ee0bc; margin-bottom: 18px;
      }
      h1 { font-size: 72px; font-weight: 800; line-height: 1.05; letter-spacing: -0.02em; }
      .grad {
        background: linear-gradient(90deg, #7ee0bc, #ffb86b);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
      .sub { margin-top: 22px; font-size: 26px; font-weight: 500; color: #9fb5a9; }
      .url { margin-top: 36px; font-size: 20px; font-weight: 600; color: #7ee0bc; letter-spacing: 0.04em; }
      .leaf {
        width: 260px; height: 260px; border-radius: 50%; flex-shrink: 0;
        background: radial-gradient(circle at 35% 30%, rgba(126,224,188,0.18), #152019 70%);
        border: 1px solid rgba(126,224,188,0.2);
        box-shadow: 0 30px 80px -30px #7ee0bc;
        display: flex; align-items: center; justify-content: center;
      }
      .leaf img { width: 160px; height: 160px; }
    </style>
  </head>
  <body>
    <div class="blob a"></div>
    <div class="blob b"></div>
    <div class="wrap">
      <div class="text">
        <div class="eyebrow">Mint Nguyen</div>
        <h1>Founding Engineer.<br /><span class="grad">Building the product,</span><br />guiding the team.</h1>
        <div class="sub">Loan management platform at Hatch · 7+ engineers guided · Calgary, AB</div>
        <div class="url">mintnguyen.com</div>
      </div>
      <div class="leaf"><img src="../../public/logo.png" alt="" /></div>
    </div>
  </body>
</html>
```

- [ ] **Step 5: Render `public/og.png` with Edge headless**

```bash
"/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 --virtual-time-budget=8000 --screenshot="C:\Users\pnguy\Projects\kl_portfolio\public\og.png" "file:///C:/Users/pnguy/Projects/kl_portfolio/scripts/og/index.html"
ls -la public/og.png
```

Expected: `public/og.png` exists, roughly 100 to 400 KB. Open it with the Read tool and confirm: Poppins rendered (not a fallback serif), leaf visible, text not clipped. If the font is a fallback, raise `--virtual-time-budget` to 15000 and rerun.

- [ ] **Step 6: Typecheck and commit**

```bash
npx tsc --noEmit
git add components/Misc scripts/og public/og.png
git commit -m "feat(meta): corrected Open Graph tags, OG image, console greeting

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 15: Wire the page, delete legacy code, grep for leftovers

**Files:**
- Modify: `pages/index.tsx` (rewrite), `pages/_app.tsx` (rewrite), `config/theme.ts` (remove legacy exports)
- Delete: `components/Sidebar/`, `components/Avatar/`, `components/Menu/`, `components/Misc/ScrollMore.tsx`, `components/Sections/DevToArticles/`, `components/Sections/FeaturedWorks/`, `components/Sections/GetInTouch/`, `config/sidebar.ts`, `types/article.ts`, `hooks/useScrollDirection.tsx`

- [ ] **Step 1: Rewrite `pages/index.tsx`**

```tsx
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
```

- [ ] **Step 2: Rewrite `pages/_app.tsx`**

```tsx
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
```

- [ ] **Step 3: Delete legacy files**

```bash
git rm -rq components/Sidebar components/Avatar components/Menu components/Sections/DevToArticles components/Sections/FeaturedWorks components/Sections/GetInTouch
git rm -q components/Misc/ScrollMore.tsx config/sidebar.ts types/article.ts hooks/useScrollDirection.tsx
```

- [ ] **Step 4: Remove the legacy exports from `config/theme.ts`**

Delete the block between `// Legacy exports, ...` and `export const mobileBreakpointsMap = ...` inclusive, and drop `ColorMode` from the import. The top of the file becomes:

```ts
import { extendTheme, ChakraTheme, ThemeComponentProps } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

export type Palette = {
```

- [ ] **Step 5: Grep for template leftovers**

```bash
grep -rniE "lawingco|klawingco|netlify|tech lead|KLSite|klAvatar|mainGrid|dev\.to" --include=*.ts --include=*.tsx --include=*.css --include=*.json --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.firebase --exclude-dir=docs . || echo "CLEAN"
```

Expected: `CLEAN`. Note `package-lock.json` and `yarn.lock` are matched by `*.json`/none; if `package-lock.json` matches on `dev.to`-like strings, that is a false positive, ignore it.

- [ ] **Step 6: Typecheck, build, commit**

```bash
npx tsc --noEmit && yarn build 2>&1 | tail -15
git add -A
git commit -m "feat(page): full-width landing page, remove legacy layout and blog

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Expected: tsc silent; build lists `/` as `○ (Static)` with no `getStaticProps`.

---

### Task 16: Visual verification and fixes

**Files:**
- Possibly modify any component from Tasks 4 to 15 based on what the screenshots show.

- [ ] **Step 1: Start the dev server in the background**

```bash
yarn dev > "$SCRATCH/dev.log" 2>&1 &
sleep 8; grep -m1 "started server" "$SCRATCH/dev.log" || tail -5 "$SCRATCH/dev.log"
```

(`$SCRATCH` is the session scratchpad directory.) Expected: `ready - started server on 0.0.0.0:3000`.

- [ ] **Step 2: Capture screenshots with Edge headless**

```bash
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
OUT="C:\Users\pnguy\AppData\Local\Temp\claude\c--Users-pnguy-Projects-kl-portfolio\d180a4ed-90dc-4b24-87d0-a482257234b5\scratchpad\shots"
mkdir -p "$OUT"
for mode in dark light; do
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900  --virtual-time-budget=10000 --screenshot="$OUT\desktop-$mode-fold.png" "http://localhost:3000/?mode=$mode"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,6200 --virtual-time-budget=12000 --screenshot="$OUT\desktop-$mode-full.png" "http://localhost:3000/?mode=$mode"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=390,844   --virtual-time-budget=10000 --screenshot="$OUT\mobile-$mode-fold.png" "http://localhost:3000/?mode=$mode"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --window-size=390,7800  --virtual-time-budget=12000 --screenshot="$OUT\mobile-$mode-full.png" "http://localhost:3000/?mode=$mode"
done
ls -la "$OUT"
```

Expected: eight PNG files. Open each with the Read tool.

- [ ] **Step 3: Review against this checklist and fix anything failing**

- Hero: headline wraps on at most 3 lines at 1440, gradient and coral words visible, orbit chips not clipped, nav readable over blobs.
- Impact: four tiles in one row on desktop, 2 by 2 on mobile, numbers rendered (the count finishes before the screenshot because of the virtual time budget).
- About: paragraph left, chips right on desktop; stacked on mobile; no chip overflows horizontally.
- Team: 4 cards per row on desktop, 1 on mobile, equal heights.
- Experience: line runs through the logo markers; logos visible on the white marker; milestone pill shows under the Hatch header.
- Work: image beside text, alternating side; image on top on mobile.
- Now: 4 tiles, soft blobs visible but faint.
- Contact: kaomoji inline with "Say hi!", buttons and socials on one row on desktop.
- Light mode: text contrast fine, blobs pastel not muddy, nav background readable when scrolled.
- No horizontal scrollbar at 390 wide (check the mobile full shot's right edge).

For each failure, edit the responsible component, re-run the relevant screenshot command, re-check.

- [ ] **Step 4: Reduced-motion and interaction spot checks**

Chrome/Edge headless cannot toggle `prefers-reduced-motion`, so verify by code review: every `useReducedMotion` consumer (Blobs, CursorGlow, Orbit, ScrollCue, Counter, FadeInWhenVisible, Contact, useConfetti) has a no-animation branch. Then in a real browser tab open `http://localhost:3000`: click the kaomoji (confetti fires), open devtools console (greeting prints), toggle theme and reload (mode persists), press Tab once (skip link appears), click each nav link (heading lands below the nav).

- [ ] **Step 5: Stop the dev server, final build, commit**

```bash
kill %1 2>/dev/null || true
npx tsc --noEmit && yarn build 2>&1 | tail -12
git add -A
git commit -m "fix(ui): visual polish from screenshot review

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

Only commit if there were changes; otherwise skip the commit.

---

## Self-review notes

- Spec coverage: nav (T5), hero (T6), impact (T7), about and toolbox and learning row (T8), team principles (T9), timeline with milestone and education (T10), case studies with optional metric (T11), Now with stamp and soft blobs (T12), contact with confetti and computed year (T13), metadata and OG image and console greeting (T14), removals and leftovers grep (T15), responsive and light/dark verification (T16), reduced motion (T4 and each motion consumer), skip link and focus ring (T2, T15), `.nvmrc` and cert deletion (T1).
- Types: `Palette` keys used in components (`bg`, `surface`, `surfaceBorder`, `text`, `muted`, `mint`, `mintSoft`, `onMint`, `coral`, `coralSoft`, `gradient`, `glow`, `navBg`, `blobA`, `blobB`, `logoBg`) all exist in T2. `Stat` has `value`, `suffix?`, `label` (T3) and `Counter` uses exactly those (T7). `Experience` fields used in `TimelineItem` (T10) match `config/experience.ts`. `Chip` variants `solid | soft | coral` and sizes `sm | md` are used consistently in T6, T8, T10, T11, T12. `Section` props `id, eyebrow, heading, intro, background, overflow` (T4) match every caller.
- Known risks and their fallbacks are written inline: `MotionText as="span"` typing (T6), renamed icons (T1), OG font loading (T14).
