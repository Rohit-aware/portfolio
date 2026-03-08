import { useState, useCallback, useMemo } from 'react'
import { PROJECTS_DATA } from '../constants/projects'
import type { FilterOption } from '../constants/filters'
import type { Project } from '@/types'

interface UseProjectFilterReturn {
  readonly activeFilter:  FilterOption
  readonly filtered:      readonly Project[]
  readonly activeProject: Project | undefined
  readonly handleFilter:  (f: FilterOption) => void
  readonly handleSelect:  (id: string) => void
}

export const useProjectFilter = (): UseProjectFilterReturn => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All')
  const [selectedId,   setSelectedId]   = useState<string>(PROJECTS_DATA[0]?.id ?? '')

  const filtered = useMemo(
    () => activeFilter === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(p => p.category === activeFilter),
    [activeFilter]
  )

  const activeProject = useMemo(
    () => filtered.find(p => p.id === selectedId) ?? filtered[0],
    [filtered, selectedId]
  )

  const handleFilter = useCallback((f: FilterOption): void => {
    setActiveFilter(f)
    const first = f === 'All' ? PROJECTS_DATA[0] : PROJECTS_DATA.find(p => p.category === f)
    if (first) setSelectedId(first.id)
  }, [])

  const handleSelect = useCallback((id: string): void => {
    setSelectedId(id)
  }, [])

  return { activeFilter, filtered, activeProject, handleFilter, handleSelect }
}
