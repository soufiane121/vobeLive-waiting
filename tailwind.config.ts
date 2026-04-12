import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
      },
      colors: {
        brand: {
          bg: "var(--bg-primary)",
          surface: "var(--surface)",
          "surface-accent": "var(--surface-accent)",
          text: "var(--text-primary)",
          "text-secondary": "var(--text-secondary)",
          "text-tertiary": "var(--text-tertiary)",
          "text-micro": "var(--text-micro)",
          border: "var(--border-default)",
          "border-subtle": "var(--border-subtle)",
          accent: "var(--accent-primary)",
          "accent-secondary": "var(--accent-secondary)",
          "accent-hover": "var(--accent-hover)",
          "accent-surface": "var(--accent-surface)",
          "accent-border": "var(--accent-border)",
          "accent-border-strong": "var(--accent-border-strong)",
          "accent-bg": "var(--accent-bg)",
          success: "var(--success-primary)",
          "success-surface": "var(--success-surface)",
          separator: "var(--separator)",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "scale-check": "scaleCheck 0.15s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleCheck: {
          "0%": { transform: "scale(0)" },
          "60%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
