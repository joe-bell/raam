import "../styles/custom-base.css";
import "nextra-theme-docs/style.css";
import "../styles/custom-components.css";
import "../styles/raam-tailwind.css";

import * as React from "react";
import { AppProps } from "next/app";
import { Head } from "../components/head";

export default function Nextra({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head />
      <Component {...pageProps} />
    </>
  );
}
