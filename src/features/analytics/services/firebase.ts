import type { FirebaseApp } from 'firebase/app'
import type { Firestore } from 'firebase/firestore'
import type { Analytics } from 'firebase/analytics'
import { logError } from '@/features/analytics-logger/facade/logError'
import { ErrorSeverity } from '@/shared/domain/errorSeverity'

export interface FirebaseInstances {
  app: FirebaseApp | null
  db: Firestore | null
  analytics: Analytics | null
  isMock: boolean
}

export class FirebaseService {
  private static instance: FirebaseService | null = null
  private initPromise: Promise<void> | null = null
  private _app: FirebaseApp | null = null
  private _db: Firestore | null = null
  private _analytics: Analytics | null = null
  private _isMock = false

  private constructor() {}

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService()
    }
    return FirebaseService.instance
  }

  public isMock(): boolean {
    return (
      !import.meta.env.VITE_FIREBASE_API_KEY || !import.meta.env.VITE_FIREBASE_PROJECT_ID
    )
  }

  public async initialize(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise
    }

    if (this.isMock()) {
      this._isMock = true
      this.initPromise = Promise.resolve()
      return this.initPromise
    }

    this.initPromise = (async (): Promise<void> => {
      try {
        const { initializeApp } = await import('firebase/app')
        const { getFirestore } = await import('firebase/firestore')
        const { getAnalytics, isSupported } = await import('firebase/analytics')

        const firebaseConfig = {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
          measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
        }

        this._app = initializeApp(firebaseConfig)
        const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID
        this._db = databaseId ? getFirestore(this._app, databaseId) : getFirestore(this._app)

        const supported = await isSupported()
        if (supported) {
          this._analytics = getAnalytics(this._app)
        }
      } catch (error) {
        this._isMock = true
        logError(error, ErrorSeverity.HIGH, false)
      }
    })()

    return this.initPromise
  }

  public get app(): FirebaseApp | null {
    return this._app
  }

  public get db(): Firestore | null {
    return this._db
  }

  public get analytics(): Analytics | null {
    return this._analytics
  }

  public get isMockMode(): boolean {
    return this._isMock
  }
}

export async function initFirebase(): Promise<FirebaseInstances> {
  const service = FirebaseService.getInstance()
  await service.initialize()
  return {
    app: service.app,
    db: service.db,
    analytics: service.analytics,
    isMock: service.isMockMode,
  }
}
