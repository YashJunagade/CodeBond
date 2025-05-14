import { colors } from '@mui/material'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primaryBg: '#202020',
        secondBg: 'red',
        primaryBtn: 'E83F25',
      },
    },
  },
  plugins: [],
}
