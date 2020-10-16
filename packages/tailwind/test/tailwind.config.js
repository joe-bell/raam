module.exports = {
  corePlugins: false,
  future: {},
  purge: [],
  theme: {
    extend: {
      flex: {},
    },
  },
  plugins: [require("../dist")],
};
