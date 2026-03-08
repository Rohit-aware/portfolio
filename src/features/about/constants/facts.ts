import { Briefcase, MapPin, Code2, Rocket } from 'lucide-react'

export interface AboutFact {
  readonly icon:  typeof Briefcase
  readonly label: string
  readonly value: string
}

export const ABOUT_FACTS: readonly AboutFact[] = [
  { icon: Briefcase, label: 'Currently',  value: 'React Native Developer @ Mypcot Infotech'   },
  { icon: MapPin,    label: 'Based in',   value: 'Pune, Maharashtra (working in Mumbai)'       },
  { icon: Code2,     label: 'Speciality', value: 'Cross-platform mobile apps · RN migrations' },
  { icon: Rocket,    label: 'Shipped',    value: '5 production apps on Play Store & App Store' },
] as const
