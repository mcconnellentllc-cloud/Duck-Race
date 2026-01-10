import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Wrangler Blue - primary
        wrangler: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c2d6ff',
          300: '#94b8ff',
          400: '#5c8fff',
          500: '#3366cc',  // Main Wrangler blue
          600: '#2952a3',
          700: '#1e3d7a',
          800: '#142952',
          900: '#0a1429',
        },
        // Carhartt Tan - accent
        carhartt: {
          50: '#faf8f5',
          100: '#f5f0e6',
          200: '#ebe1cc',
          300: '#ddd0b0',
          400: '#c9b88f',
          500: '#b8a070',  // Main Carhartt tan
          600: '#a08855',
          700: '#7d6a43',
          800: '#5a4c31',
          900: '#382f1f',
        },
        // Haynes White - backgrounds
        haynes: {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fafafa',
          300: '#f5f5f5',
          400: '#ebebeb',
          500: '#e0e0e0',
        },
      },
    },
  },
  plugins: [],
};
export default config;
