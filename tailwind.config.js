module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    typography: {
      DEFAULT: {
        css: {
          h1: { fontSize: '2.5rem', fontWeight: '700' },
          h2: { fontSize: '2rem', fontWeight: '600' },
          h3: { fontSize: '1.75rem', fontWeight: '600' },
          // …continue for h4-h6
        },
      },
    },
  },
},
};
