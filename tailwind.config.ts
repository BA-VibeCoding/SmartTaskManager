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
        background: {
          light: "#F8FAFC", // Slate 50
          dark: "#0F172A",  // Slate 900
        },
        surface: {
          light: "#FFFFFF",
          dark: "#1E293B",  // Slate 800
        },
        primaryAction: {
          DEFAULT: "#1A1C1E",
          dark: "#F8FAFC",
        },
        slate: {
          50: "#F8FAFC",
          200: "#E2E8F0",
          800: "#1E293B",
          900: "#0F172A",
        },
        priorityLow: "#22C55E",
        priorityMedium: "#F59E0B",
        priorityHigh: "#EF4444",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "sans-serif"],
      },
      fontSize: {
        'xxs': '0.75rem',
        'metadata': '0.75rem',
        'body': ['0.875rem', { lineHeight: '1.25rem' }],
        'heading': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'display': ['2rem', { lineHeight: '2.5rem', fontWeight: '800' }],
      },
      letterSpacing: {
        tightest: '-0.05em',
      }
    },
  },
  plugins: [],
};
export default config;
