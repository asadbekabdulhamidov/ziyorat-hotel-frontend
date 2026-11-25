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
          50: '#F0F6F2',
          100: '#DCECE1',
          200: '#BADABF',
          300: '#92C29B',
          400: '#4D965E',
          500: '#153D2A', // Main brand Forest Green (#153D2A)
          600: '#123423',
          700: '#0F2F20', // Deep Green (#0F2F20)
          800: '#0C2519',
          900: '#091C13',
          950: '#05120C',
        },
        ivory: {
          50: '#FDFCFA',
          100: '#F9F7F2',
          200: '#F5F1E8', // Main Warm Ivory (#F5F1E8)
          300: '#ECE4D4',
          400: '#DFD2BC',
          500: '#CEBC9F',
        },
        gold: {
          300: '#D6C097',
          400: '#C7AD7D',
          500: '#B99A65', // Soft Gold (#B99A65)
          600: '#A4844F',
          700: '#8A6E3F',
        },
        charcoal: {
          50: '#F4F5F4',
          100: '#E4E6E3',
          200: '#C3C7C2',
          400: '#7E867C',
          600: '#444C42',
          800: '#2A3029',
          900: '#20251F', // Charcoal (#20251F)
          950: '#141813',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.18em',
        widest3: '0.25em',
      }
    },
  },
  plugins: [],
}
