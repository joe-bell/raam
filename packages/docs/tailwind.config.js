module.exports = {
  corePlugins: {
    flexDirection: false,
    flexWrap: false,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./src/{components,pages}/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        line: "var(--color-line)",
        copy: "var(--color-copy)",
        primary: "var(--color-primary)",
        "accent-1": "#333",
      },
      fontFamily: {
        inter: ['"Inter", sans-serif'],
        mono: ["Menlo", "monospace"],
      },
    },
  },
  variants: {},
  plugins: [require("@raam/tailwind")],
};
