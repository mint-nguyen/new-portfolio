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
