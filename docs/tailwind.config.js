module.exports = {
  corePlugins: {
    backgroundColor: true,
    flexDirection: false,
    flexWrap: false,
  },
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./theme.config.js",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [require("@raam/tailwind")],
};
