import React, { memo, useState, useCallback, useMemo } from 'react'
import { PROJECTS_DATA } from '@/features/projects/constants/projects'
import { PROJECT_FILTERS, type FilterOption } from '@/features/projects/constants/filters'
import RevealWrapper from '@/shared/components/RevealWrapper'
import { cv } from '@/shared/utils/cn'
import ProjectListItem from '@/features/projects/components/ProjectListItem'
import ProjectDetail from '@/features/projects/components/ProjectDetail'

const filterPillV = cv(
  'px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200',
  {
    state: {
      active: 'bg-primary/15 text-primary border-primary/30',
      inactive: 'text-muted-foreground border-border hover:text-foreground hover:border-primary/20',
    }
  },
)

const ProjectsSection: React.FC = memo(() => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All')
  const [selectedId, setSelectedId] = useState<string>(PROJECTS_DATA[0]?.id ?? '')

  const filtered = useMemo(
    () => activeFilter === 'All' ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.category === activeFilter),
    [activeFilter],
  )
  const activeProject = useMemo(
    () => filtered.find(p => p.id === selectedId) ?? filtered[0],
    [filtered, selectedId],
  )

  const handleFilter = useCallback((f: FilterOption): void => {
    setActiveFilter(f)
    const first = f === 'All' ? PROJECTS_DATA[0] : PROJECTS_DATA.find(p => p.category === f)
    if (first) setSelectedId(first.id)
  }, [])

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section-padding bg-surface/30">
      <div className="section-container">
        <RevealWrapper className="mb-8">
          <div className="text-center mb-6">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Projects</p>
            <h2 id="projects-heading" className="heading-lg text-foreground">Featured Work</h2>
            <p className="text-sm text-muted-foreground mt-2">Production applications built at Mypcot Infotech.</p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-6 sm:mb-8" role="group" aria-label="Filter by category">
            {PROJECT_FILTERS.map(f => (
              <button key={f} onClick={() => handleFilter(f)} aria-pressed={activeFilter === f}
                className={filterPillV({ state: activeFilter === f ? 'active' : 'inactive' })}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-3 lg:gap-4 lg:items-start">

            {/* Project list
                Mobile:  horizontal scrollable pill row (no-scrollbar hides the track)
                Desktop: vertical sticky sidebar
            */}
            <div className="flex flex-row gap-2 overflow-x-auto pb-1 no-scrollbar lg:flex-col lg:overflow-x-visible lg:sticky lg:top-24">
              {filtered.map((p, i) => (
                <ProjectListItem
                  key={p.id}
                  title={p.title.split('—')[0]?.trim() ?? p.title}
                  category={p.category}
                  index={i}
                  isActive={p.id === activeProject?.id}
                  hasMigration={p.hasMigration}
                  onClick={() => setSelectedId(p.id)}
                  isOngoing={p.isOngoing ?? false}
                />
              ))}
            </div>

            {/* Detail panel */}
            <div>
              {activeProject
                ? <ProjectDetail key={activeProject.id} project={activeProject} />
                : <div className="card-glass flex items-center justify-center p-12">
                  <p className="text-muted-foreground text-sm">Select a project</p>
                </div>
              }
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  )
})

ProjectsSection.displayName = 'ProjectsSection'
export default ProjectsSection
