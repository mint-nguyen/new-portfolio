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
      'Small PRs, honest code review, and a release process that carries a change from laptop to production without drama. Boring releases are a feature.',
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
      "Architecture, APIs, UI, and the Figma file. If it's on the critical path, I'll learn it, fix it, or find who can.",
  },
]
