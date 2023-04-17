/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "box": "#a7ccff",
        "box-group": "#b3f9ca",
        "box-whole": "#d7ffea"
      },
      screens: {
        "small": "870px"
      }
    },
  },
  plugins: [require("daisyui")],
}