import { FirebaseService } from '@/features/analytics/services/firebase'
import { ERROR_COLLECTION } from '../constants/errorAnalytics'
import { AnalyticsErrorDocument } from '../types/errorAnalytics.types'

let firestoreSDK: typeof import('firebase/firestore') | null = null

async function getFirestoreSDK() {
  if (!firestoreSDK) {
    firestoreSDK = await import('firebase/firestore')
  }
  return firestoreSDK
}

export class ErrorFirestoreService {
  private static instance: ErrorFirestoreService | null = null

  private constructor() {}

  public static getInstance(): ErrorFirestoreService {
    if (!ErrorFirestoreService.instance) {
      ErrorFirestoreService.instance = new ErrorFirestoreService()
    }
    return ErrorFirestoreService.instance
  }

  public async logError(errorDoc: AnalyticsErrorDocument): Promise<void> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.db) {
      return
    }

    try {
      const { doc, setDoc } = await getFirestoreSDK()
      await setDoc(doc(service.db, ERROR_COLLECTION, errorDoc.id), errorDoc)
    } catch (error) {}
  }

  public async logErrorsBatch(errorDocs: AnalyticsErrorDocument[]): Promise<void> {
    const service = FirebaseService.getInstance()
    await service.initialize()

    if (service.isMockMode || !service.db || errorDocs.length === 0) {
      return
    }

    try {
      const { writeBatch, doc } = await getFirestoreSDK()
      const batch = writeBatch(service.db)
      errorDocs.forEach((docData) => {
        const docRef = doc(service.db!, ERROR_COLLECTION, docData.id)
        batch.set(docRef, docData)
      })
      await batch.commit()
    } catch (error) {}
  }
}

export async function logErrorToFirestore(
  errorDoc: AnalyticsErrorDocument,
): Promise<void> {
  await ErrorFirestoreService.getInstance().logError(errorDoc)
}

export async function logErrorsBatchToFirestore(
  errorDocs: AnalyticsErrorDocument[],
): Promise<void> {
  await ErrorFirestoreService.getInstance().logErrorsBatch(errorDocs)
}
