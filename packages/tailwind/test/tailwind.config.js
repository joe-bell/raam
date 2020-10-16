module.exports = {
  corePlugins: false,
  future: {},
  purge: [],
  theme: {
    extend: {
      flex: {},
    },
  },
  variants: {},
  plugins: [require("../dist")],
};
