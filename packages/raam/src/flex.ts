import { RaamCSS, RaamStyleProps, RaamTheme } from "./types";

enum CSS_VARS {
  FLEX_GAP_OFFSET = "--raam-fg-offset",
  FLEX_GAP = "--raam-fg",
  FLEX_GAP_TOP = "--raam-fg-t",
  FLEX_GAP_LEFT = "--raam-fg-l",
}

interface WithRaamTheme {
  theme?: RaamTheme;
}

// Utils
// ==============================================

// Polyfill for `.flat()`
const flat = (arr: any[]) =>
  arr.reduce(
    (accumulator, currentValue) =>
      accumulator.concat(
        Array.isArray(currentValue) ? flat(currentValue) : currentValue
      ),
    []
  );

const reset: RaamCSS = {
  // @ts-ignore
  boxSizing: "border-box",
  margin: 0,
  // @ts-ignore
  minWidth: 0,
};

interface StylePropsToCSS extends RaamStyleProps {
  flexGap?: RaamStyleProps["gap"];
}

const hasThemeKey = (theme: unknown, key: keyof RaamTheme) =>
  theme && typeof theme !== "undefined" && theme.hasOwnProperty(key);

const styleOptionGetValue = (
  // @TODO This probably shouldn't be a string type
  property: keyof StylePropsToCSS | ({} & string),
  originalValue,
  theme: RaamTheme
) => {
  if (typeof originalValue === "undefined" || originalValue === null) {
    return undefined;
  }

  const getValue =
    (originalValue.constructor.name === "Object" &&
      Object.values(originalValue)[0]) ||
    originalValue;

  if (property === "flexGap") {
    const themedValue =
      hasThemeKey(theme, "space") && theme.space[getValue]
        ? theme.space[getValue]
        : getValue;

    return typeof themedValue === "number" ? `${themedValue}px` : themedValue;
  }

  return getValue;
};

const getBreakpoint = ({ originalValue, arrayIndex, theme }) => {
  if (originalValue === null || typeof originalValue === "undefined") {
    return false;
  }

  const hasOriginalValueKey = originalValue.constructor.name === "Object";
  const originalValueKey = hasOriginalValueKey && Object.keys(originalValue)[0];

  if (originalValueKey === null || typeof originalValueKey === "undefined") {
    return false;
  }

  if (arrayIndex === 0 && hasOriginalValueKey === false) {
    return false;
  }

  if (!theme) {
    return originalValueKey;
  }

  if (theme) {
    const themedBreakpointKey = arrayIndex || originalValueKey;
    return hasThemeKey(theme, "breakpoints") &&
      theme.breakpoints[themedBreakpointKey]
      ? `@media screen and (min-width: ${
          theme.breakpoints[
            typeof themedBreakpointKey === "number"
              ? themedBreakpointKey - 1
              : themedBreakpointKey
          ]
        })`
      : originalValueKey;
  }

  return false;
};

const stylePropToCSS = ({
  property,
  originalValue,
  arrayIndex,
  theme,
}: {
  property: keyof StylePropsToCSS | ({} & string);
  originalValue;
  arrayIndex?: number;
  theme: RaamTheme;
}): RaamCSS => {
  const breakpoint = getBreakpoint({ originalValue, arrayIndex, theme });

  const value = styleOptionGetValue(property, originalValue, theme);

  const polyfill = {
    /**
     * Replace `flexGap` with custom properties.
     * These are toggled off (via `initial`) by the appropriate flex property
     * in the latter step.
     */
    flexGap: {
      [CSS_VARS.FLEX_GAP_TOP]: value,
      [CSS_VARS.FLEX_GAP_LEFT]: value,
      [CSS_VARS.FLEX_GAP_OFFSET]: `calc(${value} * -0.5)`,
      [CSS_VARS.FLEX_GAP]: `calc(${value} * 0.5)`,
    },
  }[property] || { [property]: value };

  const extend =
    {
      flexDirection: {
        // column
        column: {
          [CSS_VARS.FLEX_GAP_LEFT]: "initial",
        },
        "column-reverse": {
          [CSS_VARS.FLEX_GAP_LEFT]: "initial",
        },
        // row
      }[value] || {
        [CSS_VARS.FLEX_GAP_TOP]: "initial",
      },
      flexWrap: {
        // nowrap
        nowrap: {
          [CSS_VARS.FLEX_GAP_OFFSET]: "initial",
          [CSS_VARS.FLEX_GAP]: "initial",
        },
        // wrap
      }[value] || {
        [CSS_VARS.FLEX_GAP_TOP]: "initial",
        [CSS_VARS.FLEX_GAP_LEFT]: "initial",
      },
    }[property] || {};

  const style = { ...polyfill, ...extend };

  return breakpoint ? { [breakpoint]: style } : style;
};

interface StylePropsToCSSWithTheme extends StylePropsToCSS, WithRaamTheme {}

const stylePropsToCSS = ({
  theme,
  ...props
}: StylePropsToCSSWithTheme): RaamCSS => {
  const transformedStyleOptions = Object.keys(props).map((key) =>
    Array.isArray(props[key])
      ? props[key].map((originalValue, arrayIndex) =>
          stylePropToCSS({ property: key, originalValue, arrayIndex, theme })
        )
      : stylePropToCSS({ property: key, originalValue: props[key], theme })
  );

  const flattenStyleOptions = flat(transformedStyleOptions);

  const mergeMediaQueries = flattenStyleOptions.reduce((acc, cv) => {
    const mqKey = Object.keys(cv)[0];
    const mqValue = Object.values(cv)[0];
    const isMq =
      cv.constructor.name === "Object" &&
      mqKey.substring(0, 6) === "@media" &&
      typeof mqValue !== "undefined" &&
      mqValue.constructor.name === "Object";

    if (isMq) {
      const existing = acc.find((item) => Object.keys(item)[0] === mqKey);
      const withoutExisting = acc.filter(
        (item) => Object.keys(item)[0] !== mqKey
      );

      return existing
        ? [
            ...withoutExisting,
            { [mqKey]: Object.assign(Object.values(existing)[0], mqValue) },
          ]
        : [...acc, ...cv];
    }

    return [...acc, ...cv];
  }, []);

  /**
   * Transform to Style Object
   */
  return mergeMediaQueries.reduce((acc, cv) => Object.assign(acc, cv), {});
};

const propsWithoutUndefined = <T>(obj: T) =>
  Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== undefined) acc[key] = obj[key];
    return acc;
  }, {});

// Flex Variants
// ==============================================

type FlexVariants = "hStack" | "vStack" | "wrap";
const flexVariants: Record<FlexVariants, FlexParentProps> = {
  vStack: { gap: "1rem", flexDirection: "column", flexWrap: "nowrap" },
  hStack: { gap: "1rem", flexDirection: "row", flexWrap: "nowrap" },
  wrap: {
    gap: "1rem",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
};

// flex
// ==============================================

type FlexParentStyleProps =
  | "alignItems"
  | "alignContent"
  | "flexDirection"
  | "flexWrap"
  | "gap"
  | "justifyContent"
  | "justifyItems";

// @TODO Gap types should support numbers
// @TODO Support Row/Column Gap
interface FlexParentProps
  extends WithRaamTheme,
    Pick<RaamStyleProps, FlexParentStyleProps> {
  withoutBaseStyles?: boolean;
  withoutElementStyles?: boolean;
}

const flexParent = ({
  gap: flexGap,
  withoutBaseStyles,
  withoutElementStyles,
  ...props
}: FlexParentProps): RaamCSS => ({
  ...(withoutBaseStyles && reset),
  ...(!withoutElementStyles && {
    /**
     * `ul`
     * Override browser defaults
     */
    paddingLeft: 0,
  }),
  display: "flex",
  margin: `var(${CSS_VARS.FLEX_GAP_OFFSET}, initial)`,
  ...stylePropsToCSS({ flexGap, ...props }),
});

// flexChild
// ==============================================

type FlexChildStyleProps = "flex" | "flexGrow" | "flexBasis" | "flexShrink";

interface FlexChildProps
  extends FlexParentProps,
    Pick<RaamStyleProps, FlexChildStyleProps> {
  index?: number;
}

const flexChild = ({
  flex = "0 0 auto",
  flexBasis,
  flexGrow,
  flexShrink,
  index = 1,
  withoutBaseStyles,
  withoutElementStyles,
  theme,
}: FlexChildProps): RaamCSS => ({
  ...(!withoutBaseStyles && reset),
  ...(!withoutElementStyles && {
    /**
     * `li`
     * Ensure any list-items are rendered without bullets.
     * Adding a zero-width space in the content to prevent VoiceOver disable.
     */
    listStyleType: "none",
    "&:before": {
      position: "absolute",
      content: '"\\200B"',
    },
  }),
  marginTop: `var(${CSS_VARS.FLEX_GAP}, ${
    index > 0 ? `var(${CSS_VARS.FLEX_GAP_TOP}, initial)` : "initial"
  })`,
  marginRight: `var(${CSS_VARS.FLEX_GAP}, initial)`,
  marginBottom: `var(${CSS_VARS.FLEX_GAP}, initial)`,
  marginLeft: `var(${CSS_VARS.FLEX_GAP}, ${
    index > 0 ? `var(${CSS_VARS.FLEX_GAP_LEFT}, initial)` : "initial"
  })`,
  ...stylePropsToCSS({ flex, flexBasis, flexGrow, flexShrink, theme }),
});

// useFlex
// ==============================================

export interface UseFlexProps extends FlexParentProps, WithRaamTheme {
  variant?: FlexVariants;
}

export interface UseFlexChildProps
  extends Pick<FlexChildProps, "index" | FlexChildStyleProps> {}

export type UseFlexStylePropsKeys = FlexChildStyleProps | FlexParentStyleProps;
export interface UseFlexStyleProps
  extends Pick<RaamStyleProps, UseFlexStylePropsKeys> {}

export const useFlex = (props?: UseFlexProps) => {
  const variant = props.variant || "hStack";

  // @TODO Support Responsive Variants
  const propsWithVariant = variant
    ? {
        ...flexVariants[variant],
        ...propsWithoutUndefined(props),
      }
    : propsWithoutUndefined(props);

  return {
    parent: () => flexParent({ ...propsWithVariant }),
    child: (childProps?: UseFlexChildProps) =>
      flexChild(
        childProps ? { ...childProps, ...propsWithVariant } : propsWithVariant
      ),
  };
};
