/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B9D",
        secondary: "#4ECDC4",
        accent: "#FFE66D",
        success: "#26DE81",
        warning: "#FFA502",
        error: "#EE5A6F",
        info: "#4A90E2",
        surface: "#FFFFFF",
        background: "#F7F9FC"
      },
      fontFamily: {
        display: ["Fredoka", "sans-serif"],
        body: ["Inter", "sans-serif"]
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.12)"
      },
      animation: {
        "bounce-scale": "bounceScale 0.4s ease-in-out",
        "pulse-badge": "pulseBadge 0.3s ease-out"
      },
      keyframes: {
        bounceScale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" }
        },
        pulseBadge: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" }
        }
      }
    }
  },
  plugins: []
};