import plugin from "tailwindcss/plugin";
import {
  setFlexBase,
  setFlexReset,
  setFlexGap,
  setFlexDirection,
  setFlexWrap,
} from "@raam/core";

type TRaamConfigKeys = "flexbox";

const enabledCorePlugins = (config: (string) => string[], plugins: string[]) =>
  plugins.length === 0
    ? false
    : plugins
        .map((plugin) => config("corePlugins").includes(plugin))
        .includes(true);

const enabledRaamPlugins = (
  theme: (string) => { [key in TRaamConfigKeys]: boolean } | undefined,
  key: TRaamConfigKeys
) => {
  const config = theme("raam");

  if (typeof config === "undefined") {
    return true;
  }

  return config[key] && config[key] !== false;
};

/**
 * Targets any element that contains a specific class
 */
const hasClassAttribute = (prefix: (string) => string, className: string) => {
  const prefixedClass = prefix(className).substring(1);

  return [
    `[class='${prefixedClass}']`,
    `[class$=':${prefixedClass}']`,
    `[class*='${prefixedClass} ']`,
    `[class*=':${prefixedClass} ']`,
  ].join(", ");
};

/**
 * `@raam/tailwind` Plugin
 */
export default plugin(
  ({ addUtilities, addBase, prefix, config, variants, theme }) => {
    if (enabledRaamPlugins(theme, "flexbox")) {
      if (enabledCorePlugins(config, ["flexDirection", "flexWrap"])) {
        console.error(
          "Please disable the `corePlugins` for `flexDirection` and `flexWrap` for @raam/tailwind to work as expected."
        );
      }

      const spacing = theme("spacing", {});

      addBase({
        [hasClassAttribute(prefix, ".flex")]: {
          ...setFlexReset("parent"),
          ...setFlexBase("parent"),
        },
      });

      addUtilities(
        Object.keys(spacing).map(
          (sp) =>
            !["0", 0].includes(spacing[sp]) && {
              [`.flex-gap-${sp}`]: {
                ...setFlexGap({ element: "parent", value: spacing[sp] }),
                "& > *:first-child": {
                  ...setFlexReset("firstChild"),
                  ...setFlexBase("firstChild"),
                  ...setFlexGap({ element: "firstChild" }),
                },
                "& > *:not(:first-child)": {
                  ...setFlexReset("nthChild"),
                  ...setFlexBase("nthChild"),
                  ...setFlexGap({ element: "nthChild" }),
                },
              },
            }
        ),
        variants("flexGap")
      );

      addUtilities(
        {
          ".flex-row": setFlexDirection("row"),
          ".flex-row-reverse": setFlexDirection("row-reverse"),
          ".flex-col": setFlexDirection("column"),
          ".flex-col-reverse": setFlexDirection("column-reverse"),
        },
        variants("flexDirection")
      );

      addUtilities(
        {
          ".flex-wrap": setFlexWrap("wrap"),
          ".flex-wrap-reverse": setFlexWrap("wrap-reverse"),
          ".flex-no-wrap": setFlexWrap("nowrap"),
        },
        variants("flexWrap")
      );
    }
  }
);
