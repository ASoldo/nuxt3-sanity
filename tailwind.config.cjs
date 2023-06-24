/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      "kaufland-regular": "Kaufland-Regular",
      "kaufland-bold": "Kaufland-Bold",
      "kaufland-heavy": "Kaufland-Heavy",
    },
  },
  plugins: [],
  purge: {
    options: {
      safelist: [
        "bg-yellow-500",
        "bg-lime-500",
        "bg-cyan-500",
        "bg-red-500",
        "bg-emerald-500",
      ],
    },
  },
};
