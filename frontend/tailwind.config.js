/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
          soft: '#EEF2FF',
          glow: 'rgba(79, 70, 229, 0.15)',
        },
        background: {
          main: '#F8FAFC',
          card: '#FFFFFF',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
        status: {
          error: '#EF4444',
          warning: '#F59E0B',
          success: '#22C55E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'soft-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'card': '0 2px 8px rgba(15, 23, 42, 0.04)',
        'card-hover': '0 8px 24px rgba(15, 23, 42, 0.12)',
        'brand': '0 4px 16px rgba(79, 70, 229, 0.15)',
        'brand-lg': '0 8px 24px rgba(79, 70, 229, 0.25)',
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-up': 'fade-up 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'typing': 'typing 2s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'typing': {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'blink': {
          '0%, 50%': { borderColor: 'transparent' },
          '50%, 100%': { borderColor: '#4F46E5' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}