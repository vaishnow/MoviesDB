/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mdb-dark': {
          100: '#191919',
          DEFAULT: '#161616 ',
        },
        'mdb-sec': {
          300: '#323232',
          200: '#303030',
          100: '#252525',
          DEFAULT: '#222222 ',
        },
        'mdb-light': {
          DEFAULT: '#e2e2e2',
          100: '#e2e2e2'
        },
        'mdb-red': {
          DEFAULT: '#B8002C'
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}

