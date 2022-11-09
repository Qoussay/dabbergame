/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
    "./src/components/*.jsx",
    "./src/pages/*.jsx",
  ],
  theme: {
    screens: {
      tablet: "640px",
      // => @media (min-width: 640px) { ... }

      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      desktop: "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        "bg-light": "#3E436D",
        "bg-medium": "#27283E",
        "bg-dark": "#171826",
        accent: "#40c7af",
        "text-white": "#E5F0F4",
        "text-light": "#9CB3BF",
        "text-medium": "#62737F",
        "text-dark": "#38444F",
        "dark-bg": "rgba(0,0,0,0.5)",
      },
      backgroundSize: {
        16: "24rem",
      },
      boxShadow: {
        all: "0px 0px 10px",
        accent: "0 0 10px #47DDC2",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      });
    }),
  ],
};
