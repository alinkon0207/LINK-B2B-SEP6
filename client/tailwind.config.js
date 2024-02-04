module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: '#30AE4D',
        primary: '#1565D8',
        primaryAlt: '#4E44CE',
        secondaryAlt: '#007DFB',
        tertiaryAlt: '#EE7A3F',
        blackAlt: '#141414',
        disabledAlt: '#A6D7B1',
      },
      fontFamily: {
        circular: ['Circular Std', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
