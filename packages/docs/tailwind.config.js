module.exports = {
  corePlugins: false,
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  plugins: [require("@raam/tailwind")],
};
