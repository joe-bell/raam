import manifest from "../public/manifest.json";

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
  googleAnalyticsID: "UA-111105740-2",
  meta: {
    title: manifest.name,
    description: manifest.description,
    author: "Joe Bell",
    url: "https://raam.joebell.co.uk",
    social,
  },
};

export default config;
