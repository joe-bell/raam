/** @jsx jsx */
import * as React from "react";
import NextHead from "next/head";
import GoogleFonts from "next-google-fonts";
import { jsx, useThemeUI } from "theme-ui";
import config from "../config";

const Head: React.FC = () => {
  const { theme } = useThemeUI();

  return (
    <React.Fragment>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" />
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{config.meta.title}</title>
        <link rel="preconnect" href="https://www.google-analytics.com" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.googleAnalyticsID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />

        <meta name="twitter:site" content={config.meta.social.twitter} />
        <meta name="twitter:creator" content={config.meta.social.twitter} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:url" content={config.meta.url} />
        <meta property="og:title" content={config.meta.title} />
        <meta property="og:description" content={config.meta.description} />
        <meta
          property="og:image"
          content={`${config.meta.url}/img/logo-og.png`}
        />

        <link rel="shortcut icon" href="/img/favicon@192.png" />
        <link rel="apple-touch-icon" href="/img/icon@192.png" />
        <meta name="apple-mobile-web-app-title" content={config.meta.title} />

        <meta name="description" content={config.meta.description} />

        <link rel="canonical" href={config.meta.url} />

        <meta name="theme-color" content={theme.colors.background} />
        <link rel="manifest" href="/manifest.json" />
      </NextHead>
    </React.Fragment>
  );
};

export default Head;
