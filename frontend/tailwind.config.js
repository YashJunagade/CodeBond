import { colors } from '@mui/material'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primaryBg: '#202020',
        secondBg: 'red',
        primaryBtn: '#E83F25',
      },
      keyframes: {
        navbar: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(-10px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        navbar: 'navbar 0.6s ease-out',
        'fade-slide': 'fadeSlide 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
