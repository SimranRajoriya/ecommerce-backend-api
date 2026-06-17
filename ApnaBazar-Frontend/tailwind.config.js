/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f7ec7",
        secondary: "#f0ad4e",
        danger: "#d32f2f",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
}
