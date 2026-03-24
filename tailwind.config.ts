import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#FF5A1F",
          foreground: "#ffffff",
          50: "#fff4f0",
          100: "#ffe4d6",
          200: "#ffc5a8",
          300: "#ff9e71",
          400: "#ff7640",
          500: "#FF5A1F",
          600: "#e8430a",
          700: "#c2320a",
          800: "#9b2810",
          900: "#7d2412",
        },
        brand: {
          primary: "#FF5A1F",
          secondary: "#1A1A2E",
          accent: "#FFB800",
          success: "#16A34A",
          danger: "#DC2626",
          warning: "#F59E0B",
        },
        surface: {
          card: "#FFFFFF",
          page: "#F8F8F9",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        elevated: "0 8px 24px rgba(0,0,0,0.12)",
        modal: "0 20px 60px rgba(0,0,0,0.20)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
