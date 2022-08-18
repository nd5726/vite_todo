/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-bg": "#FFD370",
        "font-main": "#333333",
      },
    },
  },
  plugins: [],
};
