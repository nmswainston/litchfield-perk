import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#00a070',
          'primary-dark': '#008060',
          'primary-light': '#00d294',
          secondary: '#ffffff',
          accent: '#fbbf24',
          text: '#000000',
          'text-muted': '#666666',
          'text-light': '#333333',
          background: '#ffffff',
          'background-light': '#f8f9fa',
          'background-dark': '#f3f4f6',
          border: '#e0e0e0',
          'border-light': '#f0f0f0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif']
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        'brand': '0 6px 12px rgba(0, 160, 112, 0.3)',
        'brand-lg': '0 8px 20px rgba(0, 160, 112, 0.3)',
        'soft': '0 12px 32px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 20px 40px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}