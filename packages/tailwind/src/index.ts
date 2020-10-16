// tailwind.config.js
import plugin from "tailwindcss/plugin";
import { stylePropsToCSS, useFlex } from "raam";

const raam = plugin(function ({
  addUtilities,
  addComponents,
  e,
  prefix,
  config,
  variants,
  theme,
}) {
  const spacing = theme("spacing", {});
  const flex = useFlex();

  addUtilities(
    Object.keys(spacing).map(
      (sp) =>
        !["0", 0].includes(spacing[sp]) && {
          [`.flex-gap-${sp}`]: {
            ...stylePropsToCSS({ flexGap: spacing[sp] }),
            margin: flex.parent().margin,
            "& > *:first-child": flex.child({ index: 0 }),
            "& > *:not(:first-child)": flex.child({ index: 1 }),
          },
        }
    ),
    variants("flexGap")
  );

  // Flex settings override the gap
  addUtilities(
    {
      ".flex-row": stylePropsToCSS({
        flexDirection: "row",
      }),
      ".flex-row-reverse": stylePropsToCSS({
        flexDirection: "row-reverse",
      }),
      ".flex-col": stylePropsToCSS({
        flexDirection: "column",
      }),
      ".flex-col-reverse": stylePropsToCSS({
        flexDirection: "column-reverse",
      }),
    },
    variants("flexDirection")
  );
  addUtilities(
    {
      ".flex-wrap": stylePropsToCSS({
        flexWrap: "wrap",
      }),
      ".flex-wrap-reverse": stylePropsToCSS({
        flexWrap: "wrap-reverse",
      }),
      ".flex-no-wrap": stylePropsToCSS({
        flexWrap: "nowrap",
      }),
    },
    variants("flexWrap")
  );
});

export default raam;
