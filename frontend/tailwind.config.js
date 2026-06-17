/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2874f0',
        'primary-dark': '#1f4a8a',
        secondary: '#ff9f00',
        success: '#31a24c',
        danger: '#e74c3c'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: []
}
