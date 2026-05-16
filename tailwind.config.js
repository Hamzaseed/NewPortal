/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'background-light': '#ffffff',
        'background-dark': '#201212',
      },
      fontFamily: {
        display: ['Newsreader', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        layout: '1280px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
      boxShadow: {
        editorial: '0 20px 45px -30px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
}
