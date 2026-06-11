import React, { memo, useState, useCallback } from 'react'
import {
  ExternalLink,
  Github,
  Package,
  Brain,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Lightbulb,
  Layers,
  Zap,
  Terminal,
} from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import type { LabProject } from '@/types'

interface LabCardProps {
  readonly project: LabProject
  readonly index: number
}

const TYPE_CONFIG = {
  'npm-package': {
    icon: Package,
    label: 'npm Package',
    badgeClass: 'bg-red-500/10 text-red-400 border-red-500/20',
    accentClass: 'text-red-400',
  },
  'ai-project': {
    icon: Brain,
    label: 'AI Project',
    badgeClass: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    accentClass: 'text-violet-400',
  },
} as const

const LabCard: React.FC<LabCardProps> = memo(({ project, index }) => {
  const [showLearnings, setShowLearnings] = useState(false)
  const [copied, setCopied] = useState(false)

  const config = TYPE_CONFIG[project.type]
  const TypeIcon = config.icon

  const handleCopy = useCallback(async () => {
    if (!project.installCommand) return
    try {
      await navigator.clipboard.writeText(project.installCommand)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard not available */
    }
  }, [project.installCommand])

  const toggleLearnings = useCallback(() => setShowLearnings((p) => !p), [])

  return (
    <div
      className={cn(
        'card-glass p-5 flex flex-col h-full',
        'transition-all duration-300 ease-out',
        'hover:border-primary/25 hover:shadow-[0_0_24px_hsl(var(--primary)/0.06)]',
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* ── Header: Type badge + Version ── */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
            config.badgeClass,
          )}
        >
          <TypeIcon size={12} aria-hidden="true" />
          {config.label}
        </span>

        {project.version && (
          <span className="text-xs font-mono text-muted-foreground/60 bg-surface px-2 py-0.5 rounded-md border border-border">
            v{project.version}
          </span>
        )}
      </div>

      {/* ── Title ── */}
      <h3 className="heading-md text-foreground mb-2 leading-tight">
        {project.title}
      </h3>

      {/* ── Description ── */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {project.description}
      </p>

      {/* ── Install Command (npm packages) ── */}
      {project.installCommand && (
        <div className="mb-4 group">
          <div className="flex items-center gap-2 mb-1.5">
            <Terminal size={11} className={config.accentClass} aria-hidden="true" />
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
              Install
            </span>
          </div>
          <div className="flex items-center gap-2 bg-surface/80 rounded-lg border border-border px-3 py-2">
            <code className="text-xs font-mono text-foreground/80 flex-1 select-all">
              {project.installCommand}
            </code>
            <button
              onClick={handleCopy}
              aria-label="Copy install command"
              className={cn(
                'shrink-0 p-1 rounded-md transition-all duration-200',
                'text-muted-foreground hover:text-foreground hover:bg-surface-elevated',
              )}
            >
              {copied ? (
                <Check size={13} className="text-emerald-400" />
              ) : (
                <Copy size={13} />
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Tech Stack ── */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Layers size={11} className="text-primary" aria-hidden="true" />
          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
            Tech Stack
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* ── Highlights ── */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={11} className="text-primary" aria-hidden="true" />
          <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
            Highlights
          </span>
        </div>
        <ul className="space-y-1.5">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-primary/60 shrink-0 mt-0.5" aria-hidden="true">
                ›
              </span>
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Key Learnings (AI projects, expandable) ── */}
      {project.keyLearnings && project.keyLearnings.length > 0 && (
        <div className="mb-4">
          <button
            onClick={toggleLearnings}
            className={cn(
              'flex items-center gap-2 w-full text-left mb-2 group/btn',
              'transition-colors duration-200',
            )}
          >
            <Lightbulb
              size={11}
              className="text-amber-400"
              aria-hidden="true"
            />
            <span className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest group-hover/btn:text-foreground transition-colors">
              Key Learnings
            </span>
            {showLearnings ? (
              <ChevronUp size={12} className="ml-auto text-muted-foreground/50" />
            ) : (
              <ChevronDown size={12} className="ml-auto text-muted-foreground/50" />
            )}
          </button>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-out',
              showLearnings ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0',
            )}
          >
            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/12">
              <ul className="space-y-1.5">
                {project.keyLearnings.map((l, i) => (
                  <li key={i} className="flex gap-2 text-xs text-amber-200/70">
                    <span className="text-amber-400/50 shrink-0 mt-0.5" aria-hidden="true">
                      ✦
                    </span>
                    <span className="leading-relaxed">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── GitHub Activity Badge ── */}
      {project.githubUrl && (
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          {project.language && (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400" aria-hidden="true" />
              {project.language}
            </span>
          )}
          {project.lastUpdated && (
            <span className="text-xs text-muted-foreground/40">
              Updated {project.lastUpdated}
            </span>
          )}
        </div>
      )}

      {/* ── Spacer to push links to bottom ── */}
      <div className="mt-auto" />

      {/* ── Action Links ── */}
      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
        {project.npmUrl && (
          <a
            href={project.npmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 transition-colors"
          >
            <Package size={12} aria-hidden="true" />
            npm ↗
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={12} aria-hidden="true" />
            GitHub ↗
          </a>
        )}
        {!project.githubUrl && !project.npmUrl && (
          <span className="text-xs text-muted-foreground/35">
            Private project
          </span>
        )}
        <a
          href={project.githubUrl ?? project.npmUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
        >
          View Source <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
})

LabCard.displayName = 'LabCard'
export default LabCard
