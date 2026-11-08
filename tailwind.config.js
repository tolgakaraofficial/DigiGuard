/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#e0fffe', 100: '#b3fffd', 200: '#80fffc', 300: '#4dfffb',
          400: '#26fefa', 500: '#00e5ff', 600: '#00b8cc', 700: '#008a99',
          800: '#005c66', 900: '#002e33',
        },
        matrix: {
          50: '#e8ffe8', 100: '#c2ffc2', 200: '#8fff8f', 300: '#5cff5c',
          400: '#39ff14', 500: '#2ecc10', 600: '#22990c', 700: '#166608',
          800: '#0a3304', 900: '#041a02',
        },
        ghost: {
          50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
          400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
          800: '#5b21b6', 900: '#4c1d95',
        },
        dag: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'flow': 'flow 2s linear infinite',
        'glitch': 'glitch 0.5s steps(2, end) infinite',
        'scan': 'scan 2s linear infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'matrix-rain': 'matrixRain 4s linear infinite',
      },
      keyframes: {
        flow: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '100% 50%' } },
        glitch: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-2px) skewX(-1deg)' },
          '75%': { transform: 'translateX(2px) skewX(1deg)' },
          '100%': { transform: 'translateX(0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        matrixRain: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(200%)', opacity: '0' },
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
