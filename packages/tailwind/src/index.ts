import plugin from "tailwindcss/plugin";
import { RaamStyleProps, stylePropsToCSS, ValueOf } from "@raam/core";
import { flexbox } from "raam";

type RaamConfigKeys = "flexbox";

const createUtilities = (
  property: keyof RaamStyleProps,
  values: {
    [className: string]: ValueOf<RaamStyleProps>;
  }
) =>
  Object.keys(values).reduce(
    (acc, cv) => ({
      ...acc,
      [cv]: stylePropsToCSS({ [property]: values[cv] }),
    }),
    {}
  );

const enabledCorePlugins = (config: (string) => string[], plugins: string[]) =>
  plugins.length === 0
    ? false
    : plugins
        .map((plugin) => config("corePlugins").includes(plugin))
        .includes(true);

const enabledRaamPlugins = (
  theme: (string) => { [key in RaamConfigKeys]: boolean } | undefined,
  key: RaamConfigKeys
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

      const { child, parent } = flexbox();
      const spacing = theme("spacing", {});

      addBase({
        [hasClassAttribute(prefix, ".flex")]: { margin: parent().margin },
      });

      addUtilities(
        Object.keys(spacing).map(
          (sp) =>
            !["0", 0].includes(spacing[sp]) && {
              [`.flex-gap-${sp}`]: {
                ...stylePropsToCSS({ flexGap: spacing[sp] }),
                "& > *:first-child": child({ index: 0 }),
                "& > *:not(:first-child)": child({ index: 1 }),
              },
            }
        ),
        variants("flexGap")
      );

      addUtilities(
        createUtilities("flexDirection", {
          ".flex-row": "row",
          ".flex-row-reverse": "row-reverse",
          ".flex-col": "column",
          ".flex-col-reverse": "column-reverse",
        }),
        variants("flexDirection")
      );

      addUtilities(
        createUtilities("flexWrap", {
          ".flex-wrap": "wrap",
          ".flex-wrap-reverse": "wrap-reverse",
          ".flex-no-wrap": "nowrap",
        }),
        variants("flexWrap")
      );
    }
  }
);
