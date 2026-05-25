import { ReferrerSource } from '@/shared/domain/referrerSource'

export const ANALYTICS_COLLECTION = 'sessions'
export const HEARTBEAT_INTERVAL_MS = 60000
export const SESSION_ID_KEY = 'portfolio_session_id'
export const SESSION_START_KEY = 'portfolio_session_start'
export const SESSION_PAGES_KEY = 'portfolio_session_pages'
export const SESSION_INTERACTIONS_KEY = 'portfolio_session_interactions'
export const SESSION_RESUME_KEY = 'portfolio_session_resume'
export const SESSION_CONTACT_KEY = 'portfolio_session_contact'

export const SUPPORTED_REFERRERS = [
  ReferrerSource.LINKEDIN,
  ReferrerSource.GITHUB,
  ReferrerSource.GOOGLE,
  ReferrerSource.DIRECT,
] as const

export const TRACKED_SECTIONS = [
  'hero',
  'about',
  'skills',
  'projects',
  'experience',
  'contact',
] as const
