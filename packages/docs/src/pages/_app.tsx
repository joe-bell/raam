import * as React from "react";
import { AppProps } from "next/app";
import { GoogleFontsProvider } from "next-google-fonts";
import { ThemeProvider } from "theme-ui";
import Code from "../components/code";
import Layout from "../components/layout";
import headings from "../components/headings";
import theme from "../theme";

const RaamApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider
    theme={theme}
    // @ts-ignore
    components={{ wrapper: Layout, code: Code, ...headings }}
  >
    <GoogleFontsProvider href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">
      <Component {...pageProps} />
    </GoogleFontsProvider>
  </ThemeProvider>
);

export default RaamApp;
