const withNextra = require("nextra")("nextra-theme-docs", "./theme.config.js");

module.exports = withNextra({
  async rewrites() {
    return [
      {
        source: "/manifest.webmanifest",
        destination: "/api/manifest",
      },
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
});
