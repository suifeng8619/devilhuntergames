import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0A0A0B',
          secondary: '#141417',
          tertiary: '#1C1C20',
          elevated: '#26262B',
        },
        text: {
          primary: '#F5F5F7',
          secondary: '#9C9CA4',
          tertiary: '#6C6C74',
          disabled: '#48484E',
        },
        brand: {
          primary: '#DC2626',
          secondary: '#B91C1C',
          tertiary: '#991B1B',
          light: '#FCA5A5',
        },
        semantic: {
          success: '#10B981',
          successHover: '#059669',
          successBg: '#064E3B',
          warning: '#F59E0B',
          warningHover: '#D97706',
          warningBg: '#78350F',
          error: '#EF4444',
          errorHover: '#DC2626',
          errorBg: '#7F1D1D',
          info: '#3B82F6',
          infoHover: '#2563EB',
          infoBg: '#1E3A8A',
        },
        tier: {
          s: '#FFD700',
          a: '#C084FC',
          b: '#60A5FA',
          c: '#9CA3AF',
        },
        border: {
          primary: '#26262B',
          secondary: '#3A3A40',
          accent: '#DC2626',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
