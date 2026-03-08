/**
 * resume.ts — resume download utility.
 *
 * Drop your PDF at:  /public/resume-rohit-aware.pdf
 * (matches the path in SITE_META.resumeUrl)
 *
 * The downloadResume() function:
 *  1. Creates a temporary <a> with `download` attribute
 *  2. Triggers a native browser download (never opens new tab)
 *  3. Cleans up the element immediately after dispatch
 *  4. Returns a boolean indicating whether the file path is configured
 *
 * To update the resume: replace the file at /public/resume-rohit-aware.pdf
 * The filename in the download prompt is set by RESUME_FILENAME below.
 */

import { SITE_META } from '@/constants/navigation'

const RESUME_FILENAME = 'Rohit_Aware_Resume.pdf'

/**
 * downloadResume — triggers a browser download of the resume PDF.
 * Safe to call from any click handler; no side-effects beyond download.
 */
export const downloadResume = (): void => {
  const a = document.createElement('a')
  a.href = SITE_META.resumeUrl        // e.g. /resume-rohit-aware.pdf
  a.download = RESUME_FILENAME
  a.rel = 'noopener noreferrer'
  a.style.display = 'none'

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/**
 * openResume — opens the resume in a new browser tab (view, not download).
 */
export const openResume = (): void => {
  window.open(SITE_META.resumeUrl, '_blank', 'noopener,noreferrer')
}
