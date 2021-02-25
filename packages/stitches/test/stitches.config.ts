import { createCss } from "@stitches/react";
import { flexbox } from "../src";

export const config = {
  theme: {
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "35px",
    },
    fonts: {
      system: "system-ui",
    },
  },
  utils: {
    flexbox,
  },
  conditions: {
    bp1: `@media (min-width: 520px)`,
    bp2: `@media (min-width: 900px)`,
  },
};

export const { styled, css, toString, getCssString } = createCss(config);
