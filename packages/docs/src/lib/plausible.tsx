// File sourced from https://github.com/4lejandrito/next-plausible
// (with modifications)

import * as React from "react";
import config from "../config";

export const PlausibleSnippet: React.FC = () => (
  <script
    async
    defer
    data-domain={config.meta.domain}
    src="https://plausible.io/js/plausible.js"
  />
);
