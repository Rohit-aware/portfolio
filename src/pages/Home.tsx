import React, { Suspense, lazy, memo } from 'react'
import Hero from '@/features/hero/index'
import { FLAGS } from '@/config/featureFlags'

/**
 * Home — page composition only.
 * Hero is eager (above fold, LCP-critical).
 * All below-fold features are lazy-loaded and feature-flagged.
 * Page stays thin — zero logic lives here.
 */

const AboutSection = lazy(() => import('@/features/about/AboutSection'))
const SkillsSection = lazy(() => import('@/features/skills/SkillsSection'))
const ProjectsSection = lazy(() => import('@/features/projects/ProjectsSection'))
const ExperienceSection = lazy(() => import('@/features/experience/ExperienceSection'))
const ContactSection = lazy(() => import('@/features/contact/ContactSection'))

const SectionSkeleton: React.FC = () => (
  <div className="section-padding" aria-hidden="true">
    <div className="section-container">
      <div className="h-64 bg-card rounded-2xl border border-border animate-pulse" />
    </div>
  </div>
)

const Home: React.FC = memo(() => (
  <main id="main-content">
    <Hero />
    {FLAGS.SECTION_ABOUT && <Suspense fallback={<SectionSkeleton />}><AboutSection /></Suspense>}
    {FLAGS.SECTION_SKILLS && <Suspense fallback={<SectionSkeleton />}><SkillsSection /></Suspense>}
    {FLAGS.SECTION_PROJECTS && <Suspense fallback={<SectionSkeleton />}><ProjectsSection /></Suspense>}
    {FLAGS.SECTION_EXPERIENCE && <Suspense fallback={<SectionSkeleton />}><ExperienceSection /></Suspense>}
    {FLAGS.SECTION_CONTACT && <Suspense fallback={<SectionSkeleton />}><ContactSection /></Suspense>}
  </main>
))

Home.displayName = 'Home'
export default Home
