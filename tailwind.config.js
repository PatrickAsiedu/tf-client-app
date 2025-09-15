/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      colors: {
        body: "#0a0a09",
        studiobody: "#141414",
        bodyvar1: "#141414",
        bodyvar2: "#1a1a1a",
        bodyvar3: "#262626",
        "border-light": "#737373",
        primary: "#111827",
        "primary-light": "#1f2937",
        "body-light": "#404040",
        "text-dark": "#A3A3A3",
        "input-dark": "#0a0a09",
        "button-dark": "#0a0a09",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        bebas: ["Bebas Neue"],
      },
    },
  },
  plugins: [
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
