import manifest from "../public/manifest.json";

const domain = "raam.joebell.co.uk";

const social = {
  github: "joe-bell",
  twitter: "joebell_",
};

const config = {
  navigation: [
    {
      title: "Components",
      url: "#components",
    },
    {
      title: "Getting Started",
      url: "#getting-started",
    },
    {
      title: "GitHub",
      url: `https://github.com/${social.github}/raam`,
      external: true,
    },
    {
      title: "Twitter",
      url: `https://twitter.com/${social.twitter}`,
      external: true,
    },
  ],
  meta: {
    title: manifest.name,
    description: manifest.description,
    author: "Joe Bell",
    domain,
    url: `https://${domain}`,
    social,
  },
};

export default config;
