/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { heading: ['Fraunces', 'serif'], body: ['DM Sans', 'sans-serif'] },
      colors: { ivory: '#F3ECE2', ink: '#1A1410', clay: '#B4492C', sand: '#E4D5BF', deep: '#24150E' },
      borderRadius: { DEFAULT: '9999px' },
    },
  },
  plugins: [],
};
