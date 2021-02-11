const remarkSlug = require("remark-slug");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkSlug],
  },
});

module.exports = withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  async rewrites() {
    return [
      {
        source: "/assets/scripts/plausible.js",
        destination: "https://plausible.io/js/plausible.js",
      },
    ];
  },
});
