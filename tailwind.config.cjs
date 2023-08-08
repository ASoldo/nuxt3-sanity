/** @type {import('tailwindcss').Config} */
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
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
      colors: {
        "kaufland-red": "#F60101",
        "kaufland-dark-red": "#820001",
        "kaufland-blue": "#2266AF",
        "kaufland-yellow": "#FEB127",
        "kaufland-teal": "#01A2C4",
      },
    },
  },
  plugins: [],
  safelist: [
    "bg-yellow-500",
    "bg-lime-500",
    "bg-cyan-500",
    "bg-red-500",
    "bg-emerald-500",
    "bg-green-500",
    "kaufland-red",
  ],
};
