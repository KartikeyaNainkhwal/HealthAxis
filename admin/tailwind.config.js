/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Primary — Classy Indigo
        'primary': '#4F46E5',
        'primary-dark': '#4338CA',
        'primary-light': '#818CF8',
        'primary-bg': '#EEF2FF',
        // Text & Neutrals
        'secondary': '#0F172A',
        'background': '#FAFAFA',
        'surface': '#FFFFFF',
        'text-main': '#334155',
        'text-muted': '#64748B',
        'border': '#E2E8F0',
        'border-light': '#F1F5F9',
        // Status
        'success': '#16A34A',
        'success-bg': '#DCFCE7',
        'warning': '#D97706',
        'warning-bg': '#FEF3C7',
        'error': '#DC2626',
        'error-bg': '#FEE2E2',
        'info': '#0284C7',
        'info-bg': '#E0F2FE',
        'accent': '#6366F1',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0,0,0,0.04)',
        'card': '0 0 0 1px rgba(15,29,46,0.04), 0 2px 8px rgba(15,29,46,0.06)',
        'premium': '0 4px 24px -4px rgba(79,70,229,0.12)',
        'premium-hover': '0 12px 40px -8px rgba(79,70,229,0.18)',
        'dialog': '0 24px 64px -12px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'shimmer': 'shimmer 1.8s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}