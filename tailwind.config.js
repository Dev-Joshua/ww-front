/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    colors: {
      nav: "#008080",
      star: "#f8b816",
      red: "#ff2121",
      gray: "#969696",
      text: "#595959",
      div: "#e0e0e0",
      white: "#ffffff",
      indigo: "#003488",
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
