/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50: "#fbf2f3", 100: "#f6e2e5", 300: "#da9aa4", 400: "#c46c7b", 500: "#a84a5b", 600: "#8c3547", 700: "#72293a", 800: "#5a2130" },
        accent: { 50: "#fdf8e9", 400: "#d4a72c", 500: "#b4891b", 800: "#554011", 900: "#33270a" },
        ink: "#19151a",
        paper: "#faf8f5",
        surface: "#ffffff",
        line: "#e5deda",
        muted: "#6b6168",
      },
      fontFamily: {
        display: ["Newsreader", "Georgia", "ui-serif", "serif"],
        body: ["Libre Franklin", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "0.375rem" },
    },
  },
  plugins: [],
};