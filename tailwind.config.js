/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#39FF14",
        secondary: "#D1FFBD",
        "background-light": "#FFFFFF",
        "background-dark": "#000000",
        "surface-dark": "#0A0A0A",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "ink-black": "#1a1a1a",
        "paper-gray": "#d3d3d3",
        "dark-paper": "#a8a8a8",
        "highlighter-blue": "#0000ff",
        "sharpie-blue": "#0022cc",
        "tape-clear": "rgba(255, 255, 255, 0.25)",
      },
      fontFamily: {
        ransom: ["Rubik Glitch", "cursive"],
        display: ["Anton", "sans-serif"],
        marker: ["Permanent Marker", "cursive"],
        mono: ["Courier Prime", "monospace"],
        body: ["Courier Prime", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        brutalist: "6px 6px 0px 0px #39FF14",
        cutout: "3px 3px 0px 0px rgba(0,0,0,1)",
        "cutout-hover": "6px 6px 0px 0px rgba(0,0,0,1)",
        staple: "1px 1px 1px rgba(0,0,0,0.5)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
        "paper-texture": "url('https://www.transparenttextures.com/patterns/concrete-wall.png')",
        halftone: "radial-gradient(circle, #000 2px, transparent 2.5px)",
      },
    },
  },
  plugins: [],
}; 