# Portfolio rework: Founding Engineer who guides the team

Date: 2026-09-28
Status: approved by Mint (design), pending spec review
Site: https://mintnguyen.com/ (Firebase Hosting)

## 1. Goal

Turn the current "Software Engineer" IC page into a full-width landing page
that presents Mint as a Founding Engineer who built Hatch's product from the
first commit and now guides a team of 7+ engineers. The tone is professional
and experienced, but bubbly, exciting and full of energy. Every word of
personal content must be editable in `config/` without touching a component.

The finished site also becomes the single source of truth for the resume and
cover letter that follow this project.

## 2. Non-goals

- No framework or library upgrade beyond a patch bump of `react-icons`
  within v4 (needed for missing brand icons). Next 12.1, React 17, Chakra
  UI v1, framer-motion v4 stay.
- No testimonials section (no real quotes available).
- No blog. The dev.to section and its fetch are removed.
- No CMS, no forms, no backend. The page is fully static.
- No fix for the broken ESLint plugin load (`es-abstract` exports error).
  It does not block `next build`; it is noted for a later chore.

## 3. Facts (source of truth for copy)

| Fact | Value |
| --- | --- |
| Name | Mint Nguyen |
| Title (everywhere) | Founding Engineer |
| Tagline | Building the product, guiding the team |
| Company | Hatch Inc., https://www.hatchlabs.app/ |
| Product | Loan management platform for personal and business lending; automates decisioning and disbursements |
| At Hatch since | February 2024 |
| Team growth milestone | Second half of 2025: engineering team scaled to 7+; Mint became the go-to guide for onboarding, code review and architecture |
| Team size shown | "7+" (never an exact number) |
| Coding professionally since | 2020 (years shipping is computed as current year minus 2020) |
| Companies | 4 (Hatch, Rocketplace, RCS, InterU/Base) |
| Location | Calgary, AB |
| Email | pnguyen.lhp@gmail.com |
| Socials | LinkedIn, GitHub, Instagram (existing URLs in `config/sidebar.ts`) |
| Resume file | `/Mint_Nguyen.pdf` (existing; replaced later by the resume project) |
| Education | BS Information Technology, Fairleigh Dickinson University (Vancouver), Jan 2021 to May 2024, Summa Cum Laude, Honor's List every semester |
| Currently learning | System design and architecture; engineering management |
| Off-screen | Hiking around Calgary, mint tea, movies, anime ("weeb stuff") |

Never use the words "Tech Lead" or "manager" as a title. Leadership is
described in taglines and bullets only.

### Template leftovers to remove

This repo began as KL Lawingco's portfolio. The following are theirs and must
not ship:

- `public/certification/Lawingco-Sitecore 10 NET Developer Cert.pdf` (delete)
- Alt text "KL Lawingco Avatar" and "KL Lawingco Logo"
- dev.to username `klawingco` and the `Article` type
- Open Graph URL `https://kllawingco.netlify.app/`
- Component name `KLSite`, element ids `klAvatar`, `mainGrid` naming

## 4. Brand system

### Colors (defined in `config/theme.ts`)

| Token | Dark mode | Light mode | Use |
| --- | --- | --- | --- |
| `bg` | `#0E1512` deep green-black | `#F6FAF7` warm off-white | body background |
| `surface` | `#152019` | `#FFFFFF` | cards, nav when scrolled |
| `surfaceBorder` | `rgba(126,224,188,0.14)` | `rgba(31,122,92,0.16)` | card borders |
| `text` | `#EAF4EE` | `#12211A` | body text |
| `muted` | `#9FB5A9` | `#4E6A5C` | secondary text |
| `mint` | `#7EE0BC` | `#1F7A5C` | primary accent, links, icons |
| `mintSoft` | `rgba(126,224,188,0.12)` | `rgba(31,122,92,0.10)` | chip and tile fills |
| `coral` | `#FF8A5B` | `#E4633A` | secondary accent: hover, highlights, one word in the headline |
| `gradient` | `linear(to-r, #7EE0BC, #FFB86B)` | `linear(to-r, #1F7A5C, #E4633A)` | headline word, counter numbers |

Mint on `bg` in dark mode is roughly 11:1 contrast; dark mint on off-white in
light mode is roughly 5.5:1. Both pass AA for body text.

Colors are applied with Chakra's `mode(light, dark)(props)` helper, the
pattern the theme already uses. Semantic tokens are not available in the
installed Chakra version and are not used.

### Type

Poppins only. Add weights 700 and 800 to the Google Fonts link in
`pages/_document.tsx`. Headline scale: hero h1 `clamp(2.4rem, 6vw, 4.5rem)`
at weight 800; section h2 `3xl`/`4xl` at weight 700; body `md`; eyebrows
`sm` uppercase with letter-spacing.

### Motion

| Effect | Where | Implementation | Reduced motion |
| --- | --- | --- | --- |
| Fade-up on scroll | every section | existing `FadeInWhenVisible` (react-intersection-observer + framer) | rendered visible, no transform |
| Stagger children | hero, cards, chips | existing `stagger` variants | off |
| Drifting blobs | behind hero, faint behind Now | 3 absolutely positioned divs, radial gradient, `filter: blur(80px)`, framer `animate` keyframes with `repeat: Infinity, repeatType: 'mirror'`, 18 to 26 s | static, no animation |
| Cursor glow | whole page, desktop only | fixed div, `pointer-events: none`, radial gradient of `mint` at 8 percent, position updated in `requestAnimationFrame` from `mousemove`; mounted only when `(hover: hover)` matches | not mounted |
| Count-up | impact strip | custom `useCountUp` hook: rAF loop, ease-out cubic, 1.2 s, starts when 30 percent in view | jumps to final value |
| Confetti | contact section, on click of the kaomoji or "Say hi" button | `canvas-confetti` 1.9.x, mint and coral particles, two bursts | not fired |
| Console easter egg | once on mount in `_app` | `console.log` with `%c` styles: greeting, email, GitHub link | always (not motion) |

Reduced motion is read with framer-motion's `useReducedMotion`, which the
installed version exports.

## 5. Page structure and copy

One page, `pages/index.tsx`. A `Section` wrapper gives every block an id,
a centered container (`maxW="1200px"`, `px={{ base: 4, md: 8 }}`), vertical
padding (`py={{ base: 16, md: 24 }}`), and an optional eyebrow and heading.
Copy below is the initial draft and lives in `config/`; Mint edits it there.

### 5.1 Nav (sticky)

Leaf logo left. Links from `config/nav.ts`: About `#about`, Team `#team`,
Experience `#experience`, Work `#work`, Now `#now`, Contact `#contact`.
Right side: theme toggle, "Resume" outline button linking to
`/Mint_Nguyen.pdf`. Transparent at top, `surface` with border once scrolled.
Mobile: existing animated hamburger opens a full-screen drawer with the same
links and the Resume button. Skip-to-content link is the first focusable
element.

### 5.2 Hero (`#top`, min height 90vh)

- Eyebrow: "Hey, I'm Mint"
- H1: "I build products from the first commit, and guide the teams that
  grow around them." ("first commit" in gradient, "guide" in coral)
- Sub: "Founding Engineer at Hatch. I've been here since day one, shipping a
  loan management platform for lenders. As the team grew to 7+, I became the
  person everyone pings about the codebase. APIs, frontends, Figma, deploy
  pipelines, and the glue in between."
- Buttons: "Let's talk" (solid mint, mailto) and "Download resume" (outline).
- Social icon row.
- Right column (below text on mobile): the leaf logo at roughly 220px inside a
  soft mint blob, with three floating chips that bob on their own loops:
  "7+ engineers guided", "Shipping since 2020", "Calgary, AB".
- Scroll cue at the bottom center: small mouse icon that bounces.

### 5.3 Impact strip (`#impact`)

Four counters in a row (2 by 2 on mobile), numbers in gradient:

| Value | Label |
| --- | --- |
| computed years (2026 minus 2020 = 6) | years shipping |
| 7+ | engineers guided |
| 4 | companies |
| ∞ | mint teas |

The ∞ tile does not count up; it pops in with a scale animation.

### 5.4 About (`#about`) "What I do."

Paragraph: "I've been coding professionally for {years} years. These days I
spend my time as a Founding Engineer at Hatch: setting technical direction,
reviewing code, unblocking teammates, and still shipping features myself. I
care about architecture, APIs, nitty-gritty business logic, and the front end
that makes it all feel effortless." Keep the two tooltips: "nitty-gritty
business logic" ("Ha! Or more accurately, tech debt") and "mint tea" ("I love
mint tea!").

Toolbox: grouped icon chips rendered inline (no modal), groups and items from
`config/skills.ts`:

| Group | Items |
| --- | --- |
| Languages | TypeScript, JavaScript (ES6+), Python |
| Backend | Node, NestJS, GraphQL, Django |
| Frontend | React, Next.js, Redux, React Native |
| Data | PostgreSQL, MySQL, MongoDB, Redis |
| Infra and delivery | Docker, Azure DevOps, Google Cloud, Firebase |
| Design and UI | Figma, Chakra UI, Material UI, Framer Motion |

"Currently learning" row with a sparkle icon: "System design and
architecture", "Engineering management".

Icons come from `react-icons` v4 (bumped to the latest 4.x so `SiNestjs`
and `SiChakraui` exist). Any icon still missing falls back to a generic
code icon; the build must not depend on an icon's presence.

### 5.5 How I help the team ship (`#team`)

Four cards from `config/team.ts`, each with an icon, title, and two
sentences:

1. **Onboard fast, unblock faster.** New engineers get a map of the codebase,
   a real PR in their first week, and me one message away. Nobody stays stuck
   for a day.
2. **Ship small, ship safe.** Small PRs, honest code review, and pipelines
   that carry a change from laptop to production without drama. Boring
   releases are a feature.
3. **Translate business into build.** I sit with the founders to turn a fuzzy
   goal into scope, wireframes in Figma, and a plan the team can actually
   execute.
4. **Own the whole path.** Architecture, APIs, UI, and the deploy button. If
   it's on the critical path, I'll learn it, fix it, or find who can.

### 5.6 Experience (`#experience`) "Where I've worked."

Vertical timeline, newest first, logo beside each entry, from
`config/experience.tsx`. A milestone marker (small mint dot with a label)
sits inside the Hatch entry, rendered below the date line and above the
bullets.

- **Hatch Inc.**, Founding Engineer, Feb 2024 to Present. Milestone, late
  2025: "Team scaled to 7+. Became the go-to guide for onboarding, reviews
  and architecture." Bullets:
  - Built the loan management platform for personal and business lending from
    the first commit: decision automation, disbursements, and the admin
    tooling around them.
  - Guide a team of 7+ engineers through the codebase: onboarding, code
    review standards, and architecture decisions.
  - Work directly with founders and stakeholders to gather requirements,
    define scope, and keep delivery aligned with business goals.
  - Design wireframes and mockups in Figma, then ship them.
  - Own the deployment pipeline from development to production.
- **Rocketplace Inc.**, Software Engineer, Sep 2022 to Nov 2023. Existing
  bullets, with the performance figure set to the 20 percent on the resume
  (the site currently says 40; see open items).
- **Resilience Corporate Services**, Frontend Developer, Feb 2022 to Sep
  2022. Existing bullets.
- **InterU Network Inc. (Base)**, Data Engineer, Oct 2021 to Feb 2022.
  Existing bullets, typo "effi ciency" fixed.
- **Education** row at the end: BS Information Technology, Fairleigh
  Dickinson University, Vancouver, 2021 to 2024. Summa Cum Laude, Honor's
  List every semester.

Existing typos in the Hatch bullets ("businessobjectives", "andexperiences",
"bestpractices") are fixed.

### 5.7 Featured work (`#work`) "Things I've shipped."

Case-study cards from `config/works.ts`, alternating image side on desktop,
image on top on mobile. Each card: numeral, title, three labelled paragraphs
(Problem, What I did, Outcome), stack tags, CTA button, cover image with
hover zoom.

1. **Hatch loan management platform** (image `/works/hatch.png`, link to the
   existing Figma sample)
   - Problem: Lenders were running personal and business loans through
     disconnected tools and manual decisions. Approvals were slow and
     disbursements error-prone.
   - What I did: Built the platform end to end from the first commit. Designed
     the flows in Figma, automated decisioning and disbursement, and set up
     the pipeline that takes a change from dev to production.
   - Outcome: One platform for both loan types, decisions and payouts that run
     themselves, and a release process the team trusts. Now guiding the 7+
     engineers who keep shipping it.
   - Tags: Next.js, TypeScript, Node, PostgreSQL, Azure DevOps, Figma
2. **React UI component library** (image `/works/react-ui.png`, link to the
   existing live demo)
   - Problem: Every new dashboard started from scratch, re-solving the same
     layout, form, and theming problems.
   - What I did: Built a themeable component kit on top of Material UI with
     Next.js and TypeScript, with real flows and pages as living examples.
   - Outcome: A drop-in kit with a clean, premium look that takes a dashboard
     from empty repo to polished demo in an afternoon.
   - Tags: React, Next.js, TypeScript, Material UI

No numeric outcomes are invented. A `metric` field exists on each work item
and is rendered as a highlighted line only when set.

### 5.8 Now (`#now`) "Right now."

Four tiles from `config/now.ts`, stamped "Updated September 2026":

- **Building.** A loan management platform at Hatch, with a team I'm proud of.
- **Learning.** System design and architecture at scale, and the craft of
  engineering management.
- **Off-screen.** Hiking around Calgary, mint tea in hand, and yes, weeb stuff.
- **Open to.** Chatting about guiding small teams, startup life, or your side
  project.

### 5.9 Contact and footer (`#contact`) "Say hi! (⁀ᗢ⁀)"

The kaomoji keeps its shake-and-jump animation on view and fires confetti on
click. Paragraph: "I'm a bubbly person and I love putting a smile on
everyone's face. Coding, guiding teams, movies, weeb stuff, anything is cool.
If you're in Calgary and love hiking, ask! Message me on any social or shoot
me an email." Buttons: "Email me" (solid, also fires confetti) and the social
icons. Footer: GitHub icon, "Designed and built with ♥ by Mint Nguyen ©
{current year}".

## 6. Code architecture

### Config (all personal content)

| File | Exports |
| --- | --- |
| `config/profile.ts` | name, title, tagline, headline parts, hero sub, location, email, resumeUrl, socials (moves from `sidebar.ts`, which is deleted), heroChips |
| `config/stats.ts` | `Stat[]` with `value: number \| string`, `label`, `countUp: boolean`; years value computed at module load from `SINCE_YEAR = 2020` |
| `config/skills.ts` | `SkillGroup[]` (label, items with name and icon) and `currentlyLearning: string[]`; `splitSkills` is deleted |
| `config/team.ts` | `Principle[]` (icon, title, body) |
| `config/experience.tsx` | existing shape plus optional `milestone?: { when: string; label: string }` on an entry, and an `Education` record |
| `config/works.ts` | `Work[]` (title, image, problem, didWhat, outcome, metric?, tags, ctaLabel, ctaUrl, objectPosition?) |
| `config/now.ts` | `NowItem[]` (icon, label, body) and `updatedLabel` |
| `config/nav.ts` | `NavLink[]` (label, href) |
| `config/theme.ts` | palette above, `Button` variants `solidMint` and `outlineMint`, `Tag` variant `chip`, global body styles |
| `config/animations.ts` | existing variants kept; add `floatY` (chip bob), `blobDrift`, `popIn` |

### Components

| Path | Purpose | Depends on |
| --- | --- | --- |
| `components/Layout/Section.tsx` | id, container, padding, eyebrow, heading, wraps `FadeInWhenVisible` | Chakra, FadeInWhenVisible |
| `components/Layout/FadeWhenVisible.tsx` | existing; add reduced-motion bypass | framer, react-intersection-observer |
| `components/Background/Blobs.tsx` | drifting gradient blobs, `variant: 'hero' \| 'soft'` | framer, useReducedMotion |
| `components/Background/CursorGlow.tsx` | desktop cursor glow | framer, useReducedMotion |
| `components/Nav/index.tsx`, `Nav/Links.tsx`, `Nav/MobileDrawer.tsx`, `Nav/Toggle.tsx` | sticky nav; replaces `components/Menu/*` | config/nav, config/profile, Logo |
| `components/Logo/index.tsx` | existing, alt text fixed, no fixed positioning | |
| `components/Sections/Hero/index.tsx`, `Hero/Orbit.tsx` | hero copy, CTAs, socials; leaf-in-blob with floating chips | config/profile, Blobs |
| `components/Sections/Impact/index.tsx`, `Impact/Counter.tsx`, `hooks/useCountUp.ts` | counters | config/stats |
| `hooks/useScrolled.ts` | returns true once `window.scrollY` passes 24px, rAF-throttled; drives the nav background | none |
| `components/Sections/About/index.tsx`, `About/Toolbox.tsx` | paragraph and chips; replaces `Detail.tsx` and `SkillSetModal.tsx` | config/skills |
| `components/Sections/Team/index.tsx`, `Team/PrincipleCard.tsx` | four principle cards | config/team |
| `components/Sections/Experience/index.tsx`, `Experience/Timeline.tsx`, `Experience/TimelineItem.tsx` | timeline and education row; replaces `ExperienceTab.tsx` | config/experience |
| `components/Sections/Work/index.tsx`, `Work/CaseStudyCard.tsx` | case studies; replaces `FeaturedWorks/*` | config/works |
| `components/Sections/Now/index.tsx` | four tiles | config/now |
| `components/Sections/Contact/index.tsx`, `Contact/useConfetti.ts` | say hi, confetti, footer; replaces `GetInTouch` | config/profile, canvas-confetti |
| `components/Misc/OpenGraphHead.tsx` | corrected meta, OG image, Twitter card | config/profile |
| `components/Misc/ConsoleGreeting.tsx` | easter egg, renders nothing | config/profile |

Deleted: `components/Sidebar/*`, `components/Avatar/*`, `components/Menu/*`,
`components/Misc/ScrollMore.tsx`, `components/Sections/DevToArticles/*`,
`components/Sections/About/Detail.tsx`, `SkillSetModal.tsx`,
`components/Sections/Experience/ExperienceTab.tsx`,
`components/Sections/FeaturedWorks/*`, `components/Sections/GetInTouch/*`,
`config/sidebar.ts`, `types/article.ts`, `hooks/useScrollDirection.tsx`
(replaced by a 20-line `useScrolled` hook for the nav background), and the
Sitecore certificate PDF.

### Page and app

- `pages/index.tsx`: renders Nav, CursorGlow, then the sections in order
  inside a `<main id="content">`. No `getStaticProps`. Google Analytics
  scripts stay.
- `pages/_app.tsx`: rename `KLSite` to `App`; mount `ConsoleGreeting`.
- `pages/_document.tsx`: font weights 700 and 800 added.
- `styles/globals.css`: keep scrollbar and smooth scroll; remove the grid
  and tablet hacks that targeted the old layout; add `scroll-padding-top` for
  the sticky nav and a `:focus-visible` outline in mint.

### Data flow

Static config modules imported by components. No fetches, no runtime state
beyond color mode, nav open/closed, in-view flags and the count-up numbers.

### Error handling

- Images use Chakra `fallback` skeletons (existing pattern).
- Anything touching `window`, `matchMedia`, or `document` runs in
  `useEffect` or an event handler, never during render, so SSG never breaks.
- Confetti import is dynamic inside the click handler so the library never
  loads on the server and never blocks first paint.
- A missing icon in `config/skills.ts` renders the fallback icon.

## 7. Metadata and assets

- Title: "Mint Nguyen | Founding Engineer". Description: "Founding Engineer
  at Hatch. Building products from the first commit and guiding the teams
  that grow around them. Calgary, AB."
- `og:url` and canonical: `https://mintnguyen.com/`. `og:type` profile.
  `og:image` `/og.png` (1200 by 630). Twitter `summary_large_image`.
- OG image: `scripts/og/index.html` (inline styles, Poppins from Google
  Fonts, dark palette, leaf logo, name, title, tagline) rendered with Edge
  headless: `msedge --headless=new --screenshot=public/og.png
  --window-size=1200,630 file:///C:/Users/pnguy/Projects/kl_portfolio/scripts/og/index.html`. Python with
  Pillow is the fallback if the headless render fails.
- Favicon stays `/logo.ico`.
- `.nvmrc` updated to `22`, the version that actually builds.

## 8. Responsive behaviour

- Breakpoints: `base` (phone), `md` (tablet, 768), `lg` (desktop, 992).
- Hero: two columns from `lg`, stacked below with the orbit under the text.
- Impact: 4 columns from `md`, 2 by 2 below.
- Toolbox: chips wrap; groups stack.
- Team cards: 4 columns at `lg`, 2 at `md`, 1 below.
- Timeline: single column always; logo left of the line from `md`, above the
  text below.
- Case studies: image beside text from `md`, on top below.
- Now: 4 tiles at `lg`, 2 at `md`, 1 below.
- No horizontal scroll at any width; blobs are `overflow: hidden` inside the
  hero.

## 9. Accessibility

- Semantic `header`, `nav`, `main`, `section` with `aria-labelledby`
  headings, `footer`.
- Skip link, visible focus ring, buttons with labels on icon-only controls.
- Contrast as in section 4. Coral is used only for decoration and hover, not
  for body text.
- All motion respects `prefers-reduced-motion`.

## 10. Verification

There is no test framework in the repo and none is added. Done means all of
the following are true and evidenced:

1. `yarn build` exits 0 with "Compiled successfully" and the `/` page listed
   as static.
2. `npx tsc --noEmit` exits 0.
3. With `yarn dev` running, Edge headless screenshots at 1440 by 900 and
   390 by 844, in dark and light mode, are captured to the scratchpad and
   reviewed: no overflow, no clipped text, nav readable over the hero.
4. Manual checks in the browser: every nav link scrolls to its section with
   the sticky nav not covering the heading; Resume opens the PDF; theme
   toggle persists across reload; confetti fires on click; console greeting
   prints once; with reduced motion on, nothing drifts or counts.
5. `grep -ri "lawingco\|klawingco\|netlify\|tech lead" --include=*.ts
   --include=*.tsx --include=*.css .` (excluding `node_modules`, `.next`,
   `.firebase`, `docs`) returns nothing.

## 11. Open items for Mint (edit in config, none block the build)

- Exact month of the team-growth milestone (spec says "late 2025").
- Rocketplace performance figure: site says 40 percent, resume says 20.
  Spec uses 20. Change in `config/experience.tsx` if 40 is right.
- Date differences between site and resume for RCS (Feb vs Mar 2022) and
  InterU (end Feb vs Jul 2022). Spec keeps the site's dates.
- Wording of the four "How I help the team ship" cards and the Hatch bullets.
- Replace `/Mint_Nguyen.pdf` when the new resume is produced.
