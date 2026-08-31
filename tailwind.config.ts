import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcfb',
          100: '#faf6ef',
          200: '#f5f1ea',
          DEFAULT: '#f5f1ea',
        },
        terracotta: {
          400: '#e8956b',
          500: '#e07c4f',
          600: '#d16a3b',
        },
        espresso: {
          800: '#3d2817',
          900: '#2b1a0f',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
      }
    },
  },
  plugins: [],
};

export default config;
