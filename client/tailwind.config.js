/**** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Syne"', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        client: {
          bg: '#0A0A0F',
          primary: '#6C63FF',
          secondary: '#00D4C8',
        },
        admin: {
          bg: '#06070F',
          accent: '#00E5FF',
        },
        instructor: {
          bg: '#08080F',
          accent: '#FF7A2F',
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(108, 99, 255, 0.35)',
      },
    },
  },
  plugins: [],
};
