import { useEffect, useCallback } from 'react'
import { useDashboardStore } from '../store/dashboardStore'
import { fetchDashboardData } from '../services/firestoreService'

export function useDashboardData() {
  const { filterRange, data, isLoading, error, setFilterRange, setData, setLoading, setError } = useDashboardStore()

  const loadData = useCallback(async (days: number) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetchDashboardData(days)
      setData(res)
    } catch (err: any) {
      setError(err?.message || 'Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }, [setData, setLoading, setError])

  useEffect(() => {
    const days = filterRange === '7d' ? 7 : filterRange === '30d' ? 30 : 90
    loadData(days)
  }, [filterRange, loadData])

  const refetch = useCallback(() => {
    const days = filterRange === '7d' ? 7 : filterRange === '30d' ? 30 : 90
    loadData(days)
  }, [filterRange, loadData])

  return { filterRange, setFilterRange, data, isLoading, error, refetch }
}
