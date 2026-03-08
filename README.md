<div align="center">

# Rohit Aware — Portfolio

**React Native Developer · 3+ Years · Pune, India**

[![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-38BDF8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat)](LICENSE)

[Live Demo](https://rohitaware.dev) · [LinkedIn](https://www.linkedin.com/in/rohitaware) · [Email](mailto:awarerohit01@gmail.com)

</div>

---

## About

Personal portfolio built to showcase 3+ years of React Native engineering at Mypcot Infotech — 5 production apps shipped across Android and iOS, multiple RN version migrations from v0.64 → v0.79.2, and a VAPT-certified banking application.

The portfolio itself is also a technical statement: production-grade architecture, zero external UI libraries, feature-flag driven, and fully typed with strict TypeScript.

---

## Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Framework  | React 18 with concurrent features            |
| Language   | TypeScript 5 (strict mode)                   |
| Build tool | Vite 5 with manual chunk splitting           |
| Styling    | Tailwind CSS 3 + CSS custom properties       |
| Animation  | Pure CSS keyframes + rAF loops (no Framer)   |
| Icons      | Lucide React                                 |
| State      | React hooks only — no external state library |
| Deployment | Static SPA — works on any CDN                |

---

## Features

### Sections

- **Hero** — Scramble-reveal name animation with 3D particle globe. Toggleable to a retro CRT terminal boot sequence via feature flag.
- **About** — Bio and quick-facts grid.
- **Skills** — Three selectable views: VS Code–style TypeScript editor (default), SVG orbit constellation with hover tooltips, or a legacy pill grid.
- **Projects** — Master–detail layout for 5 production apps with tech stack, responsibilities, migration callouts, and store links.
- **Experience** — Company selector with full role detail.
- **Contact** — Mailto-based form. No backend, no Formspree. Works offline.

### Developer experience

- **Feature flags** — single `featureFlags.ts` file controls every section and UI variant. Toggle any feature with one boolean.
- **Resume download** — `downloadResume()` utility triggers native browser download. Drop your PDF at `/public/resume-rohit-aware.pdf` and it just works.
- **Dark / light theme** — CSS variable–based theme with `localStorage` persistence and a flash-free inline script.
- **Animated cursor** — Custom spotlight cursor with CSS-only implementation.
- **Portfolio chatbot** — Rule-based intent classifier that answers questions about skills, projects, and experience using real portfolio data.
- **Analytics badge** — Passive visit counter via CountAPI. No cookies, no trackers.

---

## Architecture

This project follows a **feature-based architecture** — the kind you'd use on a team, not a side project.

```
src/
├── features/
│   ├── hero/
│   │   ├── components/      # ScrambleName, HeroStats, HeroHighlights, TerminalWindow, ...
│   │   ├── constants/       # bootSequence.ts, hero.ts, commands.ts
│   │   ├── hooks/           # useBootSequence.ts
│   │   ├── HeroSection.tsx
│   │   ├── TerminalHero.tsx
│   │   └── index.tsx        # flag router
│   ├── about/
│   │   ├── components/      # AboutText, AboutFactCard, AboutFactsGrid
│   │   └── constants/
│   ├── skills/
│   │   ├── components/      # ConstellationSkills, LegacySkills, SkillsTerminal subcomponents
│   │   ├── constants/       # skills.ts, tierConfig.ts, terminal.ts
│   │   ├── hooks/           # useLineReveal.ts
│   │   ├── SkillsSection.tsx
│   │   └── SkillsTerminal.tsx
│   ├── projects/
│   │   ├── components/      # ProjectListItem, ProjectDetail
│   │   └── constants/       # projects.ts, filters.ts, categoryColors.ts
│   ├── experience/
│   │   ├── components/      # CompanyList, ExperienceDetail
│   │   └── constants/
│   └── contact/
│       ├── components/      # ContactForm, ContactInfo, FormField
│       ├── constants/       # connectLinks.ts
│       └── hooks/           # useContactForm.ts
│
├── shared/
│   ├── components/          # RevealWrapper, SectionHeader
│   ├── hooks/               # useTheme, useTypewriter, useScrollSpy, useContactForm, ...
│   └── utils/               # cn.ts, scroll.ts, resume.ts
│
├── pages/
│   └── Home.tsx             # composes features, zero logic
│
├── app/
│   └── App.tsx              # root shell, global overlays
│
├── animations/              # AnimatedCursor, Globe3D, Phone3D, EmojiCloud, RevealWrapper
├── components/layout/       # Navbar, Footer
├── components/ui/           # AnalyticsBadge, PortfolioChat
├── config/
│   └── featureFlags.ts      # all feature toggles in one place
├── constants/               # thin re-exports for backwards compat
├── services/                # portfolioChatEngine, analyticsService
└── types/
    └── index.ts
```

**Design rules enforced:**

- No child components defined inside parent files
- All subcomponents extracted to a `components/` folder
- Feature-specific hooks in a `hooks/` folder
- Constants never defined inline — always in a `constants/` file
- Page files are composition-only — no logic, no local state

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Clone
git clone https://github.com/rohitaware/portfolio.git
cd portfolio

# Install
npm install

# Development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview   # serve the dist/ folder locally
```

### Lint & format

```bash
npm run lint        # ESLint (zero warnings policy)
npm run lint:fix    # auto-fix
npm run format      # Prettier
```

---

## Configuration

### Adding your resume

Drop your PDF at:

```
public/resume-rohit-aware.pdf
```

The download button in the Navbar and the terminal hero's `./resume` command will both work automatically. The filename shown to the user on download is set in `src/shared/utils/resume.ts`.

### Feature flags

All features are controlled from a single file:

```ts
// src/config/featureFlags.ts

export const FLAGS = {
  SECTION_ABOUT: true, // hide any section instantly
  SECTION_SKILLS: true,
  SECTION_PROJECTS: true,
  SECTION_EXPERIENCE: true,
  SECTION_CONTACT: true,

  HERO_TERMINAL: false, // true → CRT terminal boot sequence
  HERO_3D_GLOBE: true, // false → CSS Phone3D mockup

  SKILLS_TERMINAL: true, // VS Code editor (highest priority)
  SKILLS_RADIAL: true, // Constellation (fallback if TERMINAL=false)
  // Legacy pills (fallback if both false)

  PORTFOLIO_CHAT: true, // floating chatbot FAB
  ANIMATED_CURSOR: true, // spotlight cursor
}
```

Skills view priority: `SKILLS_TERMINAL` → `SKILLS_RADIAL` → Legacy.

### Theme customisation

All colours are CSS custom properties in `src/index.css`. Both light and dark variants are defined under `[data-theme="light"]` and `[data-theme="dark"]`. Change the HSL values there to retheme the entire site.

---

## Project Highlights

### MAAK — Banking & Finance App

VAPT security audit and CBOS certification. Built for the African banking market with multi-bank card management, transaction routing, and an agent service provider panel.

### CLMS — Client & Loan Management System

Full loan lifecycle from application through disbursement and repayment tracking. 1000+ client record lists rendered with FlatList virtualisation. Migrated from RN v0.64 → v0.79.2 in production.

### Trolley — E-Commerce

WooCommerce REST API integration, multi-gateway payment flow, push notification order tracking. Production on both Play Store and App Store.

### Fantasy 11 — Sports Fantasy Platform

Real-time WebSocket score updates, dynamic team builder with drag-and-drop, live leaderboard during matches.

### Studio Sunlife — Fitness & Wellness

Live streaming for virtual classes, subscription management, in-app purchases, instructor availability system.

---

## Performance

- Code split by feature via dynamic `import()` + React `Suspense`
- Vendor chunk (React) and icons chunk isolated in Vite config
- All below-fold sections are lazy-loaded
- No runtime CSS-in-JS — Tailwind utility classes only
- Animations use `requestAnimationFrame` and `will-change` appropriately
- `RevealWrapper` uses `IntersectionObserver` — no scroll listeners for reveal effects

---

## Scripts Reference

| Command            | Description                               |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Start Vite dev server at `localhost:5173` |
| `npm run build`    | Type-check + production build to `dist/`  |
| `npm run preview`  | Serve `dist/` locally                     |
| `npm run lint`     | ESLint with zero-warnings policy          |
| `npm run lint:fix` | Auto-fix ESLint issues                    |
| `npm run format`   | Prettier on all `src/**/*.{ts,tsx,css}`   |

---

## License

MIT — use whatever you want, attribution appreciated but not required.

---

<div align="center">

Built by **Rohit Aware** — React Native Developer based in Pune, Maharashtra.

[LinkedIn](https://www.linkedin.com/in/rohitaware) · [GitHub](https://github.com/rohitaware) · [awarerohit01@gmail.com](mailto:awarerohit01@gmail.com)

</div>
