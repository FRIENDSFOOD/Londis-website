/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        // Londis brand palette (from the Bath Lane shop fascia)
        londis: "#37A23B", // logo green
        brand: {
          DEFAULT: "#1E7B34", // buttons, icons, links (AA contrast with white)
          dark: "#155E27",
          light: "#EDF7EE", // soft green backgrounds
          bright: "#A7DBAF", // light green for icons/links on dark green
        },
        forest: "#0F3B22", // deep green: menu bar, footer, dark sections
        // Londis orange accent (thin lines, highlights, badges)
        sun: {
          DEFAULT: "#F39200",
          light: "#FFF3E0",
        },
        ink: "#1F2328",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(31,35,40,0.18)",
      },
    },
  },
  plugins: [],
};
