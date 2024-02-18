/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
      base: ["Cormorant Upright", "serif"]
    },
    extend: {
      fontSize: {
        27: "27px",
      },
      colors: {
        "golden": "#DCCA87",
        "black": "#0C0C0C",
        "gray": "#545454",
        "crimson": "#F5EFDB",
        "grey": "#AAAAAA",
        "white": "#FFFFFF",
      },
      width: {
        110: "110px",
        210: "210px",
      }
    },
  },
  plugins: [],
}

