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
