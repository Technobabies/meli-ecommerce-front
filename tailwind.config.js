/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4ADE80", 
        secondary: "#1E293B",
        surface: "#0F172A",
      },
    },
  },
  plugins: [],
};
