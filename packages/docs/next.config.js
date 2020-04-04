const remarkSlug = require("remark-slug");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkSlug],
  },
});

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
});
