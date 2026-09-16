/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#071610',
          900: '#0B1E16',
          800: '#122E22',
          700: '#1A4031',
          600: '#255844',
          500: '#2D6A4F',
          400: '#40916C',
        },
        botanical: {
          lime: '#82E16B',
          bright: '#82E16B',
          accent: '#74C69D',
          light: '#BAD8C7',
        },
        linen: {
          50: '#FAFBF8',
          100: '#F4F6F1',
          200: '#E9EDE3',
          300: '#D5DDCB',
          border: '#E1E6D8',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans Arabic"', '"29LT Kaff"', 'Cairo', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', '"29LT Kaff"', 'Cairo', 'sans-serif'],
        display: ['"A Nefel Sereke"', '"29LT Kaff"', 'sans-serif'],
        brand: ['Netron', 'sans-serif'],
        editorial: ['"Noto Sans Arabic"', '"TS Safaa"', '"29LT Kaff"', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
