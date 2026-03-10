/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        display: ["'Plus Jakarta Sans'", 'sans-serif'],
        body: ["'Plus Jakarta Sans'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        surface: 'hsl(var(--surface) / <alpha-value>)',
        primary: 'hsl(var(--primary) / <alpha-value>)',
        muted: 'hsl(var(--muted) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        'card-foreground': 'hsl(var(--card-foreground) / <alpha-value>)',
        'muted-foreground': 'hsl(var(--muted-foreground) / <alpha-value>)',
        'primary-foreground': 'hsl(var(--primary-foreground) / <alpha-value>)',
        'surface-elevated': 'hsl(var(--surface-elevated) / <alpha-value>)',
      },
      transitionDuration: { '400': '400ms' },
      keyframes: {
        fadeInUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        navSlideDown: { from: { transform: 'translateY(-100%)', opacity: '0' }, to: { transform: 'translateY(0)', opacity: '1' } },
        pulseGlow: { '0%,100%': { opacity: '0.6', transform: 'scale(1)' }, '50%': { opacity: '0.9', transform: 'scale(1.05)' } },
        scrollBounce: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(7px)' } },
        catWalk: { '0%': { transform: 'translateY(0) scaleX(1)' }, '25%': { transform: 'translateY(-6px) scaleX(1)' }, '50%': { transform: 'translateY(0) scaleX(1)' }, '75%': { transform: 'translateY(-4px) scaleX(1)' }, '100%': { transform: 'translateY(0) scaleX(1)' } },
        blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.55s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'nav-slide-down': 'navSlideDown 0.4s cubic-bezier(0.4,0,0.2,1) both',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scroll-bounce': 'scrollBounce 2.5s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
