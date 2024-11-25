/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007dc5',
      },

      boxShadow: {
        sm: '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px -1px rgba(0, 0, 0, .1)',
        lg: '0px 4px 6px -2px rgba(16, 24, 40, .03), 0px 12px 16px -4px rgba(16, 24, 40, .08)',
      },

      spacing: {
        34: '8.5rem',
      },
    },
  },
  plugins: [],
}
