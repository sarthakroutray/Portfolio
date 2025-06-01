/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-purple-blue': 'linear-gradient(to right, #F5F0FF, #F0FFFF)', // Even more lighter (almost white), neon purple to blue gradient
      },
    },
  },
  plugins: [],
}; 