module.exports = {
  env: {
    test: {
      presets: ["@babel/env", "@babel/react", "@babel/preset-typescript"],
      plugins: [
        [
          "@babel/plugin-transform-spread",
          {
            loose: true,
          },
        ],
      ],
    },
  },
};
