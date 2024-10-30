/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'green-bg': "url('../assets/img/myea/green-bg1.png')",
      },
      boxShadow: {
        input: 'inset 1px 1px 6px 1px #00000014',
        cardShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      },
      colors: {
        'main-colour': '#fbbf24',
        'nav-colour': '#fbbf24',
        'alt-colour': '#fbbf24',
        'secondary-colour': '#f9f9f9',
        'footer-colour': '#1F2937',
        'colour-pale': '#99DF8A',
        'colour-light': '#6DC85A',
        'colour-med': '#32931D',
        'colour-dark': '#1A7408',
        'transparent-black': 'rgba(0, 0, 0, 0.65)',
        'transparent-white': 'rgba(255, 255, 255, 0.65)',
        'main-text': '#000000',
        'error-red': '#',
        warning: '#e4000f',
        'success-green': '#',
        hyperlink: '#2563EB',
        colour1: '#f7f7f7', // Snow
        colour2: '#fbbf24', // Honolulu Blue
        colour3: '#98cd8d', // Prussian Blue
      },
      width: {
        eighty: '80%',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      gridTemplateRows: {
        reg: 'auto 1fr',
        rev: '1fr auto',
        even: '1fr 1fr 1fr',
        one: '1fr',
        special: 'auto 1fr 0.5fr',
        ls: '1fr 0.4fr',
        a1a: 'auto 1fr auto',
        '1a1': '1fr auto 1fr',
        aa: 'auto auto',
        '3x': '3fr 1fr',
        '4x': '4fr 1fr',
        item: '50px 1fr',
        'ten-one': '10fr 1fr',
      },
      gridTemplateColumns: {
        reg: 'auto 1fr',
        rev: '1fr auto',
        even: '1fr 1fr 1fr',
        one: '1fr',
        xo: '1fr 0.6fr',
        a1a: 'auto 1fr auto',
        '1a1': '1fr 0.4fr 1fr',
        aa: 'auto auto',
        '3x': '3fr 1fr',
        x3: '0.8fr 3fr',
        '2x': '2fr 1fr',
      },
    },
  },
  plugins: [],
};
