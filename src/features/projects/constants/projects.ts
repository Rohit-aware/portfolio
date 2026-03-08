import type { Project } from '@/types'

export const PROJECTS_DATA: readonly Project[] = [
  {
    id: 'clms',
    title: 'CLMS — Client & Lead Management System',
    description:
      'A business productivity mobile application designed to manage leads, clients, and project activities. The platform helps teams track client interactions, manage project requirements, schedule meetings, and monitor business targets through a centralized dashboard.',

    category: 'Client Management',

    techStack: [
      'React Native',
      'Redux Toolkit',
      'REST APIs',
      'Firebase Push Notifications',
      'Azure DevOps',
      'Laravel',
    ],

    responsibilities: [
      'Developed the cross-platform React Native mobile application for Android and iOS',
      'Implemented lead management workflows including lead creation, project requirements, and activity tracking',
      'Built meeting reminders and activity scheduling system with notification support',
      'Designed dashboard analytics for tracking leads, projects, and team activities',
      'Integrated document uploads and activity logs for requirement discussions',
      'Optimized large data rendering and improved application performance',
      'Handled React Native version migration and dependency upgrades'
    ],

    hasMigration: true,
    migrationDetails:
      'Migrated React Native from v0.64 → v0.79.2, upgrading React Navigation, Redux Toolkit, and native dependencies.',

    portfolioUrl: 'https://www.mypcot.com/portfolio/clms'
  },

  {
    id: 'fantasy11',
    title: 'Fantasy 11 — Fantasy Sports Gaming Platform',

    description:
      'A real-time fantasy sports mobile platform where users create teams, join contests, and compete on live match leaderboards. The application provides real-time score updates, contest participation, and performance analytics for users.',

    category: 'Fantasy Sports',

    techStack: [
      'React Native',
      'Redux',
      'WebSocket',
      'REST APIs',
      'Firebase',
      'Azure DevOps',
      'Node Js',
      'Firebase Push Notifications',
    ],

    responsibilities: [
      'Developed dynamic team creation interface for selecting players and forming fantasy teams',
      'Implemented real-time score updates and leaderboard refresh using WebSockets',
      'Built contest participation flow including team submission and ranking updates',
      'Integrated wallet and transaction systems for contest entry and winnings',
      'Optimized UI performance during live match traffic spikes'
    ],

    hasMigration: false,

    portfolioUrl: 'https://www.mypcot.com/portfolio/fantasy-eleven'
  },

  {
    id: 'trolley',
    title: 'Trolley — Mobile E-Commerce Platform',

    description:
      'A mobile e-commerce platform enabling users to browse products, manage carts, place orders, and track deliveries. The app integrates with a Laravel-based backend for product, inventory, and order management.',

    category: 'E-Commerce',

    techStack: [
      'React Native',
      'Redux Toolkit',
      'Laravel',
      'REST APIs',
      'Firebase Push Notifications',
    ],

    responsibilities: [
      'Developed the complete mobile shopping experience including product browsing, filtering, and cart management',
      'Integrated Laravel APIs for product listings, orders, inventory, and user management',
      'Implemented secure checkout and payment processing workflows',
      'Built order history and order tracking interfaces',
      'Added wishlist, reviews, and ratings functionality',
      'Performed React Native version migration and resolved dependency compatibility issues'
    ],

    hasMigration: true,
    migrationDetails:
      'Migrated React Native from v0.64 → v0.79.2 and updated dependencies and navigation libraries to support the latest architecture.',
    portfolioUrl: 'https://www.mypcot.com/portfolio/trolley'
  },

  {
    id: 'maak',
    title: 'MAAK — Digital Banking & Financial Services App',

    description:
      'A secure financial services mobile platform developed for the African market. The app enables multi-bank card management, financial transactions, and service provider integrations with enterprise-grade security compliance.',

    category: 'Banking & Finance',

    techStack: [
      'React Native',
      'REST APIs',
      'Figma',
      'CI for Apis',
      'Azure DevOps'
    ],

    responsibilities: [
      'Developed and stabilized the React Native mobile application for Android and iOS',
      'Improved UI/UX using Adobe XD design updates to enhance usability',
      'Integrated multi-bank card routing system for financial transactions',
      'Built service provider portals for managing platform services',
      'Resolved performance issues with third-party banking integrations',
      'Handled React Native framework upgrade and dependency migrations',
      'Participated in security audit and VAPT compliance preparation'
    ],

    hasMigration: true,

    migrationDetails:
      'Migrated React Native from v0.64 → v0.79.2 and updated all major dependencies to support the new architecture.',

    portfolioUrl: 'https://www.mypcot.com/portfolio/maak'
  },
  {
    id: 'bnpl',
    title: 'MAAK, BNPL — Customer & Merchant Apps',

    description:
      'A fintech platform implementing a Buy Now, Pay Later (BNPL) ecosystem with two mobile applications: a Customer App and a Merchant App. Customers can discover service providers, book services, and make payments using card, wallet, cash, or BNPL installment plans. Merchants manage bookings, verify payments, and generate QR codes for in-store payments.',

    category: 'Banking & Finance',

    techStack: [
      'React Native',
      'Node.js',
      'REST APIs',
      'Firebase Push Notifications',
      'QR Code Payments',
      'Figma',
      'Azure DevOps',
      'Payment Gateway Integration'
    ],

    responsibilities: [
      'Developed Customer and Merchant mobile applications using React Native',
      'Implemented BNPL (Buy Now Pay Later) payment flow with bank installment options',
      'Built service discovery, booking, and payment workflows',
      'Integrated QR-based payment system for merchant transactions',
      'Implemented push notifications for bookings, payments, and installment reminders',
      'Integrated Node.js backend APIs for transactions, bookings, and services',
      'Optimized performance and improved UI/UX across both mobile apps',
      'Handled React Native version upgrades and dependency management'
    ],

    hasMigration: false,
    isOngoing: true,

    migrationDetails:
      'Upgraded React Native from v0.64 → v0.79 and refactored modules to support BNPL payment flows and QR payment features.',

    portfolioUrl: 'https://www.mypcot.com/portfolio/maak'
  }
] as const