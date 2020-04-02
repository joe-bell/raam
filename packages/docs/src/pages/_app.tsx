import * as React from "react";
import { AppProps } from "next/app";
import { ThemeProvider, Styled } from "theme-ui";
import Code from "../components/code";
import { Wrapper } from "../components/wrapper";
import headings from "../components/headings";
import theme from "../theme";

const RaamApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider
    theme={theme}
    // @ts-ignore
    components={{ wrapper: Wrapper, code: Code, ...headings }}
  >
    <Styled.root>
      <Component {...pageProps} />
    </Styled.root>
  </ThemeProvider>
);

export default RaamApp;
