const domain = "raam.joebell.co.uk";
const url = `https://${domain}`;
const repository = "https://github.com/joe-bell/raam";

const title = "raam";
const description =
  "Beautifully boring cosmetic-free React.js components for structure and layout";
const author = "Joe Bell";
const twitter = "joebell_";

const year = new Date().getFullYear();

// theme.config.js
export default {
  repository,
  docsRepository: repository,
  branch: "rfc/v1", // branch of docs
  path: "/", // path of docs
  titleSuffix: ` – ${title}`,
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${year} © ${author}`,
  footerEditOnGitHubLink: true, // will link to the docs repo
  logo: (
    <>
      <h1 className="m-0">{title}</h1>
    </>
  ),
  head: (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      {process.env.NODE_ENV === "production" && (
        <script
          async
          defer
          data-domain={domain}
          src="https://plausible.io/js/plausible.js"
        />
      )}

      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:card" content="summary" />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}/img/logo-og.png`} />

      <link rel="shortcut icon" href="/img/favicon@192.png" />
      <link rel="apple-touch-icon" href="/img/icon@192.png" />
      <meta name="apple-mobile-web-app-title" content={title} />

      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      <link rel="manifest" href="/manifest.json" />
    </>
  ),
};
