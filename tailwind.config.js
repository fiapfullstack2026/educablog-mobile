/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Identidade visual EducaBlog (mesmos tokens do web)
        primary: {
          DEFAULT: '#1A5C38', // verde principal
          light: '#E8F5ED',
          dark: '#0E3D24',
        },
        secondary: {
          DEFAULT: '#1B3F7A', // azul
          light: '#EAF0FB',
        },
        danger: '#C0392B',

        // Badges por disciplina
        biologia: {
          bg: '#E8F5ED',
          border: '#A8D5B5',
          text: '#1A5C38',
        },
        fisica: {
          bg: '#EAF0FB',
          border: '#A0BEE8',
          text: '#1B3F7A',
        },
        matematica: {
          bg: '#FFF5E6',
          border: '#FFD08A',
          text: '#7A4100',
        },
        quimica: {
          bg: '#F3EAFD',
          border: '#C9A8F0',
          text: '#4A1A7A',
        },
        historia: {
          bg: '#FEF0E6',
          border: '#F5B98A',
          text: '#7A3010',
        },
        portugues: {
          bg: '#FDE8F0',
          border: '#F0A0C0',
          text: '#7A1840',
        },
        artes: {
          bg: '#FFF8E6',
          border: '#FFD966',
          text: '#6B4C00',
        },
        filosofia: {
          bg: '#F0EEF8',
          border: '#B0A8E0',
          text: '#2A1A6A',
        },
        edfisica: {
          bg: '#EAFAF0',
          border: '#80DBA8',
          text: '#0E5C30',
        },
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
