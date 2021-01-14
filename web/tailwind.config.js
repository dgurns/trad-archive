const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      teal: colors.teal,
    },
    fontFamily: {
      sans: ['Karla', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
