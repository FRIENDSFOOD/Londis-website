/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        // Londis green — used ONLY for the "Londis" wordmark
        londis: "#3BAA3F",
        // Neutral site palette (charcoal & greys)
        brand: {
          DEFAULT: "#1F2328",
          dark: "#000000",
          light: "#F1F2F4",
          bright: "#D9DCE1", // light grey for icons on dark backgrounds
        },
        // warm orange accent
        sun: {
          DEFAULT: "#F9A21B",
          light: "#FFF4E0",
        },
        ink: "#1F2328",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px -12px rgba(31,35,40,0.18)",
      },
    },
  },
  plugins: [],
};
