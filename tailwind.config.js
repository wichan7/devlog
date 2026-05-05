/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#f7f7f4",
          100: "#f2f1ed",
          200: "#ebeae5",
          300: "#e6e5e0",
          400: "#e1e0db",
          900: "#26251e",
          950: "#1a1914",
        },
        accent: "#f54e00",
        crimson: "#cf2d56",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
