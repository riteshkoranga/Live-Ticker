/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#2C2C2C",
        slate: "#2F4F4F",
        gunmetal: "#2A3439",
        darkOlive: "#3C3D33",
        deepSpace: "#1B1F2A",
        richBlack: "#101820",
        midnight: "#191970",
        onyx: "#353839",
        raven: "#5B5C56",
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};
