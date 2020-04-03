import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, Styled } from "theme-ui";
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
    <Styled.root>
      <Component {...pageProps} />
    </Styled.root>
  </ThemeProvider>
);

export default RaamApp;
