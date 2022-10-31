/** @type {import('tailwindcss').Config} */
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
        accent: "#47DDC2",
        "text-white": "#E5F0F4",
        "text-light": "#9CB3BF",
        "text-medium": "#62737F",
        "text-dark": "#38444F",
      },
      boxShadow: {
        all: "0px 0px 10px",
      },
    },
  },
  plugins: [],
};
