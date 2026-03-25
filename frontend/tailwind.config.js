/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f1',
          100: '#ffe4e4',
          500: '#FF385C',
          600: '#e31c5f',
          700: '#c0162f',
        }
      },
    },
  },
  plugins: [],
}
