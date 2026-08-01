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
          50: "#faf7f1",
          100: "#f6f3ed",
          200: "#e8e2d8",
          300: "#dcd3c5",
          400: "#c8bdad",
          900: "#211e18",
          950: "#15130f",
        },
        accent: "#e64900",
        crimson: "#b91f4b",
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
