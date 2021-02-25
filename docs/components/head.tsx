import NextHead from "next/head";
import { useRouter } from "next/router";
import { config } from "../theme.config";

export const Head: React.FC = () => {
  const router = useRouter();
  const canonical =
    router.asPath === "/" ? config.url : [config.url, router.asPath].join("");

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      {process.env.NODE_ENV === "production" && (
        <script
          async
          defer
          data-domain={config.domain}
          src="https://plausible.io/js/plausible.js"
        />
      )}

      <meta name="twitter:site" content={config.twitter} />
      <meta name="twitter:creator" content={config.twitter} />
      <meta name="twitter:card" content="summary" />

      <meta property="og:url" content={config.url} />
      <meta property="og:title" content={config.title} />
      <meta property="og:description" content={config.description()} />
      <meta property="og:image" content={`${config.url}/img/logo-og.png`} />

      <link rel="shortcut icon" href="/img/favicon@192.png" />
      <link rel="apple-touch-icon" href="/img/icon@192.png" />
      <meta name="apple-mobile-web-app-title" content={config.title} />

      <meta name="description" content={config.description()} />

      <link rel="canonical" href={canonical} />

      <link rel="manifest" href="/manifest.webmanifest" />
    </NextHead>
  );
};
