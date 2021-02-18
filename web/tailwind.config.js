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
      gray: colors.gray,
      teal: colors.teal,
      red: colors.red,
    },
    fontFamily: {
      sans: ['Karla', 'sans-serif'],
    },
    maxHeight: {
      0: '0',
      '9/10': '90%',
      full: '100%',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled', 'checked'],
      borderColor: ['checked'],
      cursor: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
