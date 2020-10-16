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
        flexWrap: "wrap",
      }),
      ".flex-no-wrap": stylePropsToCSS({
        flexWrap: "no-wrap",
      }),
    },
    variants("flexWrap")
  );
  addUtilities(
    Object.keys(spacing).map(
      (sp) =>
        !["0", 0].includes(spacing[sp]) && {
          [`.flex-gap-${sp}`]: {
            ...stylePropsToCSS({ flexGap: spacing[sp] }),
            "& > *:first-child": flex.child({ index: 0 }),
            "& > *:not(:first-child)": flex.child({ index: 1 }),
          },
        }
    ),
    variants("flexGap")
  );
});

export default raam;
