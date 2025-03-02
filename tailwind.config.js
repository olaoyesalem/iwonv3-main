const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-bg-gradient": "url('/gradient-3.jpeg')",
        "spend-dark": "url('/spend-dark.png')",
      },

      colors: {
        tron: "#ED0A28",
        dark: "#121212",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
