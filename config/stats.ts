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
