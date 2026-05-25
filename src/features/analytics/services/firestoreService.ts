import { FirebaseService } from './firebase'
import { ANALYTICS_COLLECTION } from '../constants/analytics'
import { SessionDocument } from '../types/analytics.types'
import { logError } from '@/features/analytics-logger/facade/logError'

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
      await setDoc(doc(service.db, ANALYTICS_COLLECTION, session.sessionId), session)
    } catch (error) {
      logError(error, 'medium', true)
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
      logError(error, 'medium', true)
    }
  }

  public async incrementVisitCount(isNewVisit: boolean): Promise<number> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.db) {
      return 0
    }

    try {
      const { doc, getDoc, setDoc, updateDoc, increment } =
        await import('firebase/firestore')
      const counterRef = doc(service.db, 'counters', 'visits')
      const docSnap = await getDoc(counterRef)

      if (!docSnap.exists()) {
        await setDoc(counterRef, { count: 1 })
        return 1
      }

      if (isNewVisit) {
        await updateDoc(counterRef, { count: increment(1) })
        const updatedSnap = await getDoc(counterRef)
        return updatedSnap.data()?.count ?? 0
      }

      return docSnap.data()?.count ?? 0
    } catch (error) {
      logError(error, 'medium', true)
      return 0
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

export async function incrementVisitCount(isNewVisit: boolean): Promise<number> {
  return await FirestoreService.getInstance().incrementVisitCount(isNewVisit)
}
