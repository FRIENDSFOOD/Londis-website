/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.25rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        // Londis green (sampled from the Bath Lane shop fascia)
        brand: {
          DEFAULT: "#1F8A3B", // accessible green for buttons & text
          dark: "#166A2C",
          light: "#E7F6EA",
          bright: "#4EC54D", // fascia green, used for the logo & accents
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
