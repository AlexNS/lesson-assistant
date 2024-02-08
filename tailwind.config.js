/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ejs,html}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

