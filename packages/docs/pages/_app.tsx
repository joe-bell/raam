import "../styles/custom-base.css";
import "nextra-theme-docs/style.css";
import "../styles/raam-tailwind.css";

import * as React from "react";
import { AppProps } from "next/app";

export default function Nextra({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
