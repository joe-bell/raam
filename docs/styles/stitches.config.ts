import tailwindDefaultTheme from "tailwindcss/defaultTheme";
import { createCss } from "@stitches/react";
import { flexbox } from "@raam/stitches";

const extractColorPalette = (colors: unknown) =>
  Object.keys(colors).reduce(
    (acc, cv) => ({
      ...acc,
      [`purple${cv}`]: colors[cv],
    }),
    {}
  );

export const { styled, config, theme, global } = createCss({
  theme: {
    colors: {
      ...extractColorPalette(tailwindDefaultTheme.colors.purple),
      primary: "$purple500",
    },
    space: tailwindDefaultTheme.spacing,
    radii: tailwindDefaultTheme.borderRadius,
  },
  utils: {
    flexbox,
  },
});
