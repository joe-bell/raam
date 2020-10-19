import "../styles/index.css";
import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "theme-ui";
import Code from "../components/code";
import Layout from "../components/layout";
import headings from "../components/headings";
import table from "../components/table";
import theme from "../theme";
import hr from "../components/hr";

const RaamApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider
    theme={theme}
    // @ts-ignore
    components={{ wrapper: Layout, code: Code, ...headings, ...table, ...hr }}
  >
    <Component {...pageProps} />
  </ThemeProvider>
);

export default RaamApp;
