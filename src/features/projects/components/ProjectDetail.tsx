import React, { memo } from 'react'
import { ExternalLink, Github, Smartphone, Layers, ArrowRight } from 'lucide-react'
import { PROJECTS_DATA } from '@/features/projects/constants/projects'

type Project = (typeof PROJECTS_DATA)[number]

interface ProjectDetailProps {
  readonly project: Project
}

const ProjectDetail: React.FC<ProjectDetailProps> = memo(({ project }) => (
  <div className="card-glass p-6">
    <div className="relative h-44 rounded-xl bg-gradient-to-br from-surface to-surface-elevated border border-border flex items-center justify-center mb-5 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Smartphone size={22} className="text-primary" aria-hidden="true" />
        </div>
        <span className="text-xs font-mono text-muted-foreground/40">[app screenshot]</span>
      </div>
      {project.hasMigration && (
        <div className="absolute top-3 left-3">
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-amber-500/12 text-amber-400 border border-amber-500/25">
            RN Migration
          </span>
        </div>
      )}
    </div>

    <h3 className="heading-md text-foreground mb-2">{project.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.description}</p>

    {project.hasMigration && project.migrationDetails && (
      <div className="mb-4 p-3 rounded-xl bg-amber-500/6 border border-amber-500/15">
        <p className="text-xs font-mono text-amber-400/85 leading-relaxed">⚡ {project.migrationDetails}</p>
      </div>
    )}

    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2.5">
        <Layers size={12} className="text-primary" aria-hidden="true" />
        <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">Tech Stack</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {project.techStack.map(tech => <span key={tech} className="tag">{tech}</span>)}
      </div>
    </div>

    <div className="mb-5">
      <div className="flex items-center gap-2 mb-2.5">
        <ArrowRight size={12} className="text-primary" aria-hidden="true" />
        <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">Responsibilities</span>
      </div>
      <ul className="space-y-1.5">
        {project.responsibilities.map((r, i) => (
          <li key={i} className="flex gap-2 text-xs text-muted-foreground">
            <span className="text-primary/60 shrink-0 mt-0.5" aria-hidden="true">›</span>
            <span className="leading-relaxed">{r}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
      {project.androidUrl && (
        <a href={project.androidUrl} target="_blank" rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors">Android ↗</a>
      )}
      {project.iosUrl && (
        <a href={project.iosUrl} target="_blank" rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-primary transition-colors">iOS ↗</a>
      )}
      {!project.githubUrl && (
        <span className="flex items-center gap-1 text-xs text-muted-foreground/35">
          <Github size={11} aria-hidden="true" /> Private repo
        </span>
      )}
      <a href={project.portfolioUrl} target="_blank" rel="noopener noreferrer"
        className="ml-auto flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
        Case Study <ExternalLink size={11} aria-hidden="true" />
      </a>
    </div>
  </div>
))

ProjectDetail.displayName = 'ProjectDetail'
export default ProjectDetail
