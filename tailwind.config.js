/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/*.{js,jsx,ts,tsx}', // This will include all files in src that use these extensions
    './src/app.js',
    './src/components/*.{js,jsx,ts,tsx}', // This will include all files in components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

