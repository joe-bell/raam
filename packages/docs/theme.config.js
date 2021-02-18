// @ts-check
const domain = "raam.joebell.co.uk";
const year = new Date().getFullYear();

export const config = {
  title: "raam",
  description:
    "Beautifully boring cosmetic-free React.js components for structure and layout",
  author: "Joe Bell",
  twitter: "joebell_",
  domain,
  url: `https://${domain}`,
  repo: "https://github.com/joe-bell/raam",
};

// Nextra-specific Config
export default {
  repository: config.repo,
  docsRepository: config.repo,
  branch: "rfc/v1", // branch of docs
  path: "/", // path of docs
  titleSuffix: ` – ${config.title}`,
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${year} © ${config.author}`,
  footerEditOnGitHubLink: true, // will link to the docs repo
  logo: (
    <>
      <h1 className="m-0">{config.title}</h1>
    </>
  ),
};
