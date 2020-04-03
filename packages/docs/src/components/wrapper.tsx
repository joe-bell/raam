/** @jsx jsx */
import * as React from "react";
import Head from "next/head";
import { jsx, Box, Container, Heading, NavLink } from "theme-ui";
import { Inline } from "raam";
import config from "../config";

const border = {
  border: "primary",
};

export const Wrapper: React.FC = ({ children }) => (
  <>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <title>{config.meta.title}</title>
      <link rel="preconnect" href="https://www.googletagmanager.com" />

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
      {/* @TODO Add Manifest */}
      {/* <link rel="manifest" href="/manifest.webmanifest" /> */}
    </Head>
    <Box
      as="header"
      sx={{
        paddingY: 3,
        position: "sticky",
        top: 0,
        backgroundColor: "background",
        ...border,
        zIndex: 2,
      }}
    >
      <Container
        sx={{
          display: ["block", "flex"],
          alignItems: [null, "center"],
          justifyContent: [null, "space-between"],
        }}
      >
        <Heading as="h1">raam</Heading>
        <Box
          as="nav"
          sx={{
            marginTop: [3, 0],
          }}
        >
          <Inline as="ul">
            {config.navigation.map(item => (
              <NavLink key={item.url} href={item.url}>
                {item.title}
              </NavLink>
            ))}
          </Inline>
        </Box>
      </Container>
    </Box>

    <Box sx={{ ...border, borderTop: 0, paddingY: 3 }}>
      <Container as="main">{children}</Container>
    </Box>

    <Box sx={{ ...border, borderTop: 0, paddingY: 3 }}>
      <Container as="footer">© 2020 Joe Bell</Container>
    </Box>
  </>
);
