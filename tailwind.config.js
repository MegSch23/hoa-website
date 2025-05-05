import PrimeUI from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */


const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: colors.cyan['700'],          // #1D4ED8
        'primary-hover': colors.cyan['800'],  // #1E40AF
        secondary: colors.teal['700'],        // #0F766E
        accent: colors.emerald['600'],       // #10B981
        background: colors.gray['50'],       // #F9FAFB
        surface: colors.white,               // #FFFFFF
        text: colors.gray['900'],            // #111827
        'text-muted': colors.gray['600'],    // #4B5563
        border: colors.gray['200'],          // #E5E7EB
      },
    },
  },
  plugins: [],
};
