export const AnalyticsEvent = {
  SESSION_START: 'session_start',
  PAGE_VIEW: 'page_view',
  RESUME_DOWNLOADED: 'resume_downloaded',
  CONTACT_SUBMITTED: 'contact_submitted',
  APP_ERROR: 'app_error',
  API_ERROR: 'api_error',
  FIREBASE_ERROR: 'firebase_error',
  SECTION_VIEWED: 'section_viewed',
  GITHUB_CLICKED: 'github_clicked',
  LINKEDIN_CLICKED: 'linkedin_clicked',
  EMAIL_CLICKED: 'email_clicked',
} as const

export type AnalyticsEventType = (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent]
