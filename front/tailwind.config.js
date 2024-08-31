/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customTeal: 'rgb(152, 221, 227)',
      },
      width: {
        'custom-w': 'calc(91.666667% + 210px)',
      },
      height: {
        'custom-h': 'calc(83.333333% + 50px)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        nanumPenScript: ['Nanum Pen Script', 'cursive'],
        dongle: ['Dongle', 'sans-serif'],
        gothicA1: ['Gothic A1', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
