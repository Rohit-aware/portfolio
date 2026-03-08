# Rohit Aware — Portfolio

Production-grade React Native developer portfolio.

## Stack
- **React 18** + **TypeScript** (strict mode, zero `any`)
- **Vite** — fast dev, chunk-split builds
- **Tailwind CSS** — semantic CSS variables, dark/light tokens
- **No external animation library** — pure CSS + IntersectionObserver

## Architecture
```
src/
  app/            → Root App.tsx (composition only)
  pages/Home/     → Page-level section components (lazy-loaded)
  components/     → Shared layout + UI components
  hooks/          → useTheme, useScrollSpy, useNavScroll, useReveal, useContactForm
  animations/     → AnimatedCursor, CatCompanion, RevealWrapper
  constants/      → navigation, skills, projects, experience
  services/       → contactService (Formspree)
  utils/          → cn, scroll helpers
  theme/          → themeScript (flash prevention)
  types/          → Global TypeScript types (single source of truth)
```

## Setup
```bash
npm install
cp .env.example .env
# Add your VITE_FORMSPREE_ID to .env

npm run dev       # Development
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint
npm run format    # Prettier
```

## Key Features
- **Animated top navbar** — sliding indicator pill tracks active section via IntersectionObserver
- **Scroll progress bar** — thin primary-colour bar at bottom of nav
- **Auto-hide on scroll down** — nav hides when scrolling down, returns on up
- **Cat companion** — SVG cat follows scroll position, faces scroll direction
- **Custom animated cursor** — lagging ring + exact dot, hover scale
- **Theme system** — dark/light, localStorage persist, flash prevention
- **Lazy loading** — all below-fold sections code-split
- **Split-panel projects** — sticky list + detail panel, no height clipping

## Production Checklist
- [ ] Add VITE_FORMSPREE_ID to env
- [ ] Replace `[app screenshot]` with real images
- [ ] Update resumeUrl to real PDF path
- [ ] Set VITE_SHOW_DEV_NOTICES=false in production env
