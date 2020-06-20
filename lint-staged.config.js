const eslint = filenames =>
  `eslint --cache --fix --ignore-path .gitignore --fix --ext .js,.jsx,.ts,.tsx ${
    !filenames || filenames.length > 10 ? "." : filenames.join(" ")
  }`;

module.exports = {
  "**/*.{json,html,css,md,mdx,yml}": filenames =>
    filenames.map(filename => `prettier --write '${filename}'`),
  "**/*.js?(x)": filenames => eslint(filenames),
  "**/*.ts?(x)": () => [`yarn lint:ts`, eslint()],
};
