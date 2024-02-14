/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ejs,html,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

