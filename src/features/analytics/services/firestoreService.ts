import { FirebaseService } from './firebase'
import { ANALYTICS_COLLECTION } from '../constants/analytics'
import { SessionDocument, DashboardAnalyticsData } from '../types/analytics.types'
import { logError } from '@/features/analytics-logger/facade/logError'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'
import { generateMockDashboardData } from './mockAnalyticsService'

export class FirestoreService {
  private static instance: FirestoreService | null = null

  private constructor() {}

  public static getInstance(): FirestoreService {
    if (!FirestoreService.instance) {
      FirestoreService.instance = new FirestoreService()
    }
    return FirestoreService.instance
  }

  public async createSession(session: SessionDocument): Promise<void> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.db) {
      return
    }

    try {
      const { doc, setDoc } = await import('firebase/firestore')
      await setDoc(doc(service.db, ANALYTICS_COLLECTION, session.sessionId), session, { merge: true })
    } catch (error) {
      logError(error, ErrorSeverity.MEDIUM, true)
    }
  }

  public async updateSession(
    sessionId: string,
    updates: Partial<SessionDocument>,
  ): Promise<void> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.db) {
      return
    }

    try {
      const { doc, updateDoc } = await import('firebase/firestore')
      await updateDoc(doc(service.db, ANALYTICS_COLLECTION, sessionId), updates)
    } catch (error) {
      logError(error, ErrorSeverity.MEDIUM, true)
    }
  }

  public async registerSessionAndIncrementCounters(
    visitorId: string,
    isNewVisitor: boolean,
    isNewSession: boolean,
    deviceType: string,
    browser: string,
    os: string
  ): Promise<number> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.db) {
      return 0
    }

    try {
      const { doc, runTransaction, serverTimestamp, arrayUnion, increment } = await import('firebase/firestore')
      const globalRef = doc(service.db, 'counters', 'global')
      const visitorRef = doc(service.db, 'visitors', visitorId)

      const finalCount = await runTransaction(service.db, async (transaction) => {
        const globalSnap = await transaction.get(globalRef)
        const visitorSnap = await transaction.get(visitorRef)

        let currentVisits = 0
        let currentSessions = 0
        let currentVisitors = 0

        if (globalSnap.exists()) {
          const data = globalSnap.data()
          currentVisits = data.totalVisits ?? 0
          currentSessions = data.totalSessions ?? 0
          currentVisitors = data.uniqueVisitors ?? 0
        }

        const nextVisits = currentVisits + 1
        const nextSessions = isNewSession ? currentSessions + 1 : currentSessions
        const nextVisitors = isNewVisitor ? currentVisitors + 1 : currentVisitors

        transaction.set(
          globalRef,
          {
            totalVisits: nextVisits,
            totalSessions: nextSessions,
            uniqueVisitors: nextVisitors,
          },
          { merge: true }
        )

        if (!visitorSnap.exists()) {
          transaction.set(visitorRef, {
            firstSeenAt: serverTimestamp(),
            lastSeenAt: serverTimestamp(),
            deviceHistory: [deviceType],
            sessionCount: 1,
            lastDevice: deviceType,
            lastBrowser: browser,
            lastOS: os,
          })
        } else {
          transaction.update(visitorRef, {
            lastSeenAt: serverTimestamp(),
            deviceHistory: arrayUnion(deviceType),
            sessionCount: increment(isNewSession ? 1 : 0),
            lastDevice: deviceType,
            lastBrowser: browser,
            lastOS: os,
          })
        }

        return nextVisits
      })

      return finalCount
    } catch (error) {
      logError(error, ErrorSeverity.MEDIUM, true)

      try {
        const { doc, setDoc, arrayUnion, increment } = await import('firebase/firestore')
        const globalRef = doc(service.db, 'counters', 'global')
        const visitorRef = doc(service.db, 'visitors', visitorId)

        await setDoc(
          globalRef,
          {
            totalVisits: increment(1),
            totalSessions: increment(isNewSession ? 1 : 0),
            uniqueVisitors: increment(isNewVisitor ? 1 : 0),
          },
          { merge: true }
        )

        await setDoc(
          visitorRef,
          {
            lastSeenAt: new Date().getTime(),
            deviceHistory: arrayUnion(deviceType),
            sessionCount: increment(isNewSession ? 1 : 0),
            lastDevice: deviceType,
            lastBrowser: browser,
            lastOS: os,
          },
          { merge: true }
        )
      } catch (fallbackErr) {}

      return 0
    }
  }

  public listenToGlobalCounters(onUpdate: (count: number) => void): (() => void) | null {
    const service = FirebaseService.getInstance()
    let unsubscribe: (() => void) | null = null
    let active = true

    service.initialize().then(() => {
      if (!active || service.isMockMode || !service.db) return

      import('firebase/firestore').then(({ doc, onSnapshot }) => {
        if (!active || service.isMockMode || !service.db) return
        const globalRef = doc(service.db, 'counters', 'global')
        unsubscribe = onSnapshot(
          globalRef,
          (docSnap) => {
            if (docSnap.exists()) {
              const count = docSnap.data()?.totalVisits ?? 0
              onUpdate(count)
            }
          },
          () => {}
        )
      }).catch(() => {})
    }).catch(() => {})

    return () => {
      active = false
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }

  public async fetchDashboardData(days: number): Promise<DashboardAnalyticsData> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.db) {
      return generateMockDashboardData(days)
    }

    const {
      collection,
      doc,
      getDoc,
      getDocs,
      query,
      where,
      orderBy,
      limit,
      getCountFromServer,
    } = await import('firebase/firestore')

    const globalRef = doc(service.db, 'counters', 'global')
    const globalSnap = await getDoc(globalRef)
    const globalData = globalSnap.exists() ? globalSnap.data() : {}

    const totalVisits = globalData.totalVisits ?? 0
    const totalVisitors = globalData.uniqueVisitors ?? 0

    const returningQuery = query(collection(service.db, 'visitors'), where('sessionCount', '>', 1))
    const returningSnap = await getCountFromServer(returningQuery)
    const returningVisitors = returningSnap.data().count

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayQuery = query(collection(service.db, 'sessions'), where('startedAt', '>=', todayStart.getTime()))
    const todaySnap = await getCountFromServer(todayQuery)
    const visitsToday = todaySnap.data().count

    const rangeStart = Date.now() - days * 24 * 60 * 60 * 1000
    const sessionsQuery = query(
      collection(service.db, 'sessions'),
      where('startedAt', '>=', rangeStart),
      orderBy('startedAt', 'asc')
    )
    const sessionsSnap = await getDocs(sessionsQuery)
    const sessions = sessionsSnap.docs.map((d) => d.data() as SessionDocument)

    const dateGroup: Record<string, { visits: number; visitors: Set<string> }> = {}
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      dateGroup[dateStr] = { visits: 0, visitors: new Set() }
    }

    const platformGroup: Record<string, number> = { Mobile: 0, Tablet: 0, Desktop: 0 }
    const browserGroup: Record<string, number> = {}
    const osGroup: Record<string, number> = {}

    sessions.forEach((s) => {
      const dateStr = new Date(s.startedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      if (dateGroup[dateStr]) {
        dateGroup[dateStr].visits++
        dateGroup[dateStr].visitors.add(s.visitorId)
      }

      if (platformGroup[s.deviceType] !== undefined) {
        platformGroup[s.deviceType]++
      } else {
        platformGroup[s.deviceType] = 1
      }

      browserGroup[s.browser] = (browserGroup[s.browser] || 0) + 1
      osGroup[s.os] = (osGroup[s.os] || 0) + 1
    })

    const chartData = Object.entries(dateGroup).map(([date, data]) => ({
      date,
      visits: data.visits,
      visitors: data.visitors.size,
    }))

    const platforms = Object.entries(platformGroup).map(([name, value]) => ({
      name,
      value,
    }))

    const browsers = Object.entries(browserGroup)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    const oss = Object.entries(osGroup)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)

    const recentQuery = query(
      collection(service.db, 'visitors'),
      orderBy('lastSeenAt', 'desc'),
      limit(5)
    )
    const recentSnap = await getDocs(recentQuery)
    const recentVisitors = recentSnap.docs.map((d) => {
      const data = d.data()
      return {
        id: d.id,
        browser: data.lastBrowser ?? 'Other',
        os: data.lastOS ?? 'Other',
        deviceType: data.lastDevice ?? 'Desktop',
        sessionCount: data.sessionCount ?? 1,
        lastSeen: data.lastSeenAt ? (typeof data.lastSeenAt.toMillis === 'function' ? data.lastSeenAt.toMillis() : data.lastSeenAt) : Date.now(),
      }
    })

    return {
      kpis: {
        totalVisitors,
        totalVisits,
        returningVisitors,
        visitsToday,
      },
      chartData,
      platforms,
      browsers,
      oss,
      recentVisitors,
      lastUpdated: Date.now(),
    }
  }
}

export async function createSession(session: SessionDocument): Promise<void> {
  await FirestoreService.getInstance().createSession(session)
}

export async function updateSession(
  sessionId: string,
  updates: Partial<SessionDocument>,
): Promise<void> {
  await FirestoreService.getInstance().updateSession(sessionId, updates)
}

export async function registerSessionAndIncrementCounters(
  visitorId: string,
  isNewVisitor: boolean,
  isNewSession: boolean,
  deviceType: string,
  browser: string,
  os: string
): Promise<number> {
  return await FirestoreService.getInstance().registerSessionAndIncrementCounters(
    visitorId,
    isNewVisitor,
    isNewSession,
    deviceType,
    browser,
    os
  )
}

export function listenToGlobalCounters(
  onUpdate: (count: number) => void
): (() => void) | null {
  return FirestoreService.getInstance().listenToGlobalCounters(onUpdate)
}

export async function fetchDashboardData(days: number): Promise<DashboardAnalyticsData> {
  return await FirestoreService.getInstance().fetchDashboardData(days)
}
