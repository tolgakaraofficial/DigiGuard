/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#e6f7ff',
          100: '#b3e5ff',
          200: '#80d4ff',
          300: '#4dc2ff',
          400: '#1ab0ff',
          500: '#0099e6',
          600: '#0077b3',
          700: '#005580',
          800: '#00334d',
          900: '#00121a',
        },
        matrix: {
          50: '#e6fff2',
          100: '#b3ffd9',
          200: '#80ffc0',
          300: '#4dffa7',
          400: '#1aff8e',
          500: '#00e676',
          600: '#00b35c',
          700: '#008042',
          800: '#004d28',
          900: '#001a0e',
        },
        secure: {
          50: '#e6f9ff',
          100: '#b3ecff',
          200: '#80dfff',
          300: '#4dd2ff',
          400: '#1ac5ff',
          500: '#00b8e6',
          600: '#008fb3',
          700: '#006680',
          800: '#003d4d',
          900: '#00141a',
        },
      },
    },
  },
  plugins: [],
};
