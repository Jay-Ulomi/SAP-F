import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sap-blue': '#0070f3',
        'sap-dark-blue': '#0056b3',
        'sap-light-blue': '#e6f3ff',
        'sap-gray': '#f5f5f5',
        'sap-dark-gray': '#333333',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.65rem', { lineHeight: '1rem' }],
        sm: ['0.75rem', { lineHeight: '1.25rem' }],
        base: ['0.8rem', { lineHeight: '1.375rem' }],
        lg: ['0.9rem', { lineHeight: '1.5rem' }],
        xl: ['1rem', { lineHeight: '1.625rem' }],
        '2xl': ['1.125rem', { lineHeight: '1.75rem' }],
        '3xl': ['1.25rem', { lineHeight: '2rem' }],
      },
    },
  },
  plugins: [forms, typography],
}
