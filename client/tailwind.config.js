/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html, js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgb(165, 228, 251)',
    },
    },
  },
  plugins: [],
}

