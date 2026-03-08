import React, { memo } from 'react'
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react'
import { EXPERIENCE_DATA } from '@/features/experience/constants/experience'

type Experience = (typeof EXPERIENCE_DATA)[number]

interface ExperienceDetailProps {
  readonly exp: Experience
}

const ExperienceDetail: React.FC<ExperienceDetailProps> = memo(({ exp }) => (
  <div className="card-glass p-6">
    <div className="flex items-start gap-4 mb-5">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
        <Briefcase size={20} className="text-primary" aria-hidden="true" />
      </div>
      <div>
        <h3 className="heading-md text-foreground">{exp.role}</h3>
        <p className="text-sm text-primary font-semibold mt-0.5">{exp.company}</p>
      </div>
    </div>

    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-5">
      <span className="flex items-center gap-1.5">
        <Calendar size={11} aria-hidden="true" />
        {exp.startDate} – {exp.endDate} · {exp.duration}
      </span>
      <span className="flex items-center gap-1.5">
        <MapPin size={11} aria-hidden="true" />
        {exp.location}
      </span>
    </div>

    <ul className="space-y-2.5 mb-5">
      {exp.responsibilities.map((r, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
          <ChevronRight size={14} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
          <span className="leading-relaxed">{r}</span>
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
      {exp.techStack.map(t => <span key={t} className="tag">{t}</span>)}
    </div>
  </div>
))

ExperienceDetail.displayName = 'ExperienceDetail'
export default ExperienceDetail
