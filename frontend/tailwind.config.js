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
        // Primary — Mayo Clinic Deep Blue
        'primary': '#005EB8',
        'primary-dark': '#004A94',
        'primary-light': '#2680D9',
        'primary-bg': '#EEF4FC',
        // Text & Neutrals
        'secondary': '#1A1A2E',
        'background': '#F5F5F5',
        'surface': '#FFFFFF',
        'text-main': '#1a1a1a',
        'text-muted': '#5a6a7a',
        'border': '#E0E0E0',
        'border-light': '#F0F0F0',
        // Status Colors
        'success': '#16A34A',
        'success-bg': '#DCFCE7',
        'warning': '#D97706',
        'warning-bg': '#FEF3C7',
        'error': '#DC2626',
        'error-bg': '#FEE2E2',
        'info': '#0284C7',
        'info-bg': '#E0F2FE',
        // Accent
        'accent': '#2680D9',
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))',
        'auto-sm': 'repeat(auto-fill, minmax(160px, 1fr))',
      },
      boxShadow: {
        'xs': '0 1px 2px rgba(0,0,0,0.04)',
        'sm': '0 1px 4px rgba(0,0,0,0.06)',
        'card': '0 0 0 1px rgba(15,29,46,0.04), 0 2px 8px rgba(15,29,46,0.06)',
        'premium': '0 4px 24px -4px rgba(0,94,184,0.10)',
        'premium-hover': '0 12px 40px -8px rgba(0,94,184,0.18)',
        'glow': '0 0 24px rgba(0,94,184,0.20)',
        'dialog': '0 24px 64px -12px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 1.8s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
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
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      transitionTimingFunction: {
        'bounce-sm': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}