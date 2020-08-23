import * as CSSType from "csstype";

// @TODO Ensure RaamCSS is valid with other CSS libraries. Right now it throws
// incompatibility errors
type RaamCSSProperties = CSSType.PropertiesFallback;
type RaamCSS =
  | RaamCSSProperties
  | { [P in CSSType.SimplePseudos | string]: RaamCSSProperties };

type RaamStyleProp<K extends keyof RaamCSS, T = void> =
  | RaamCSS[K]
  | T
  | { [mediaQuery: string]: RaamCSS[K] | T };

type RaamStyleProps<K extends keyof RaamCSS, T = void> = {
  [P in K]?: RaamStyleProp<K, T> | RaamStyleProp<K, T>[];
};

enum CSS_VARS {
  FLEX_GAP_OFFSET = "--raam-fg-offset",
  FLEX_GAP = "--raam-fg",
  FLEX_GAP_TOP = "--raam-fg-t",
  FLEX_GAP_LEFT = "--raam-fg-l",
}

// Utils
// ==============================================

const reset = (as: unknown): RaamCSS => ({
  boxSizing: "border-box",
  margin: 0,
  minWidth: 0,
  ...((as &&
    typeof as === "string" &&
    {
      /**
       * Override browser defaults.
       */
      ul: { paddingLeft: 0 },
      /**
       * Ensure any list-items are rendered without bullets.
       * Adding a zero-width space in the content to prevent VoiceOver disable.
       */
      li: {
        listStyleType: "none",
        "&:before": {
          position: "absolute",
          content: '"\\200B"',
        },
      },
    }[as]) ||
    {}),
});

type RaamFlexGap = {
  flexGap?: RaamStyleProp<"gap">;
};
type StylePropsToCSS = RaamStyleProps<keyof RaamCSS> & RaamFlexGap;

const stylePropToCSS = (
  // @TODO This probably shouldn't be a string type
  property: keyof StylePropsToCSS | string,
  originalValue
): RaamCSS => {
  const breakpoint =
    typeof originalValue === "object" && Object.keys(originalValue)[0];

  const getValue =
    (typeof originalValue === "object" && Object.values(originalValue)[0]) ||
    originalValue;
  // @TODO Support Themed Values
  const value = typeof getValue === "number" ? `${getValue}px` : getValue;

  const polyfill = {
    /**
     * Replace `flexGap` with custom properties.
     * These are toggled off (via `initial`) by the appropriate flex property
     * in the latter step.
     */
    flexGap: {
      [CSS_VARS.FLEX_GAP_TOP]: value,
      [CSS_VARS.FLEX_GAP_LEFT]: value,
      [CSS_VARS.FLEX_GAP_OFFSET]: `calc(-${value} / 2)`,
      [CSS_VARS.FLEX_GAP]: `calc(${value} / 2)`,
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

const stylePropsToCSS = (props: StylePropsToCSS): RaamCSS => {
  return Object.keys(props)
    .map((key) =>
      Array.isArray(props[key])
        ? props[key].map((arrayValue) => stylePropToCSS(key, arrayValue))
        : stylePropToCSS(key, props[key])
    )
    .flat()
    .reduce((acc, cv) => Object.assign(acc, cv), {});
};

const propsWithoutUndefined = <T>(obj: T) =>
  Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== undefined) acc[key] = obj[key];
    return acc;
  }, {});

// Flex Variants
// ==============================================

type FlexVariants = "hStack" | "vStack" | "wrap" | "inline";
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
  inline: { gap: "1rem", alignItems: "center", flexDirection: "row" },
};

// flex
// ==============================================

type FlexParentStyleProps =
  | "alignItems"
  | "alignContent"
  | "flexDirection"
  | "flexWrap"
  | "gap"
  | "overflowX"
  | "justifyContent"
  | "justifyItems";

// @TODO Gap types should support numbers
// @TODO Support Row/Column Gap
type FlexParentProps = {
  as?: unknown;
} & RaamStyleProps<FlexParentStyleProps>;

const flex = ({ as, gap: flexGap, ...props }: FlexParentProps): RaamCSS => ({
  ...reset(as),
  display: "flex",
  margin: `var(${CSS_VARS.FLEX_GAP_OFFSET}, initial)`,
  // @TODO Repair gap/flexGap types
  // @ts-ignore
  ...stylePropsToCSS({ flexGap, ...props }),
});

// flexChild
// ==============================================

type FlexChildStyleProps = "flex" | "flexGrow" | "flexBasis" | "flexShrink";
type FlexChildProps = {
  index?: number;
} & FlexParentProps &
  RaamStyleProps<FlexChildStyleProps>;

const flexChild = ({
  as,
  flex = "0 0 auto",
  flexBasis,
  flexGrow,
  flexShrink,
  index,
}: FlexChildProps): RaamCSS => ({
  ...reset(as),
  marginTop: `var(${CSS_VARS.FLEX_GAP}, ${
    index > 0 ? `var(${CSS_VARS.FLEX_GAP_TOP}, initial)` : "initial"
  })`,
  marginRight: `var(${CSS_VARS.FLEX_GAP}, initial)`,
  marginBottom: `var(${CSS_VARS.FLEX_GAP}, initial)`,
  marginLeft: `var(${CSS_VARS.FLEX_GAP}, ${
    index > 0 ? `var(${CSS_VARS.FLEX_GAP_LEFT}, initial)` : "initial"
  })`,
  ...stylePropsToCSS({ flex, flexBasis, flexGrow, flexShrink }),
});

// useFlex
// ==============================================

export type UseFlexProps =
  | (Omit<FlexParentProps, "as"> & { variant?: FlexVariants })
  | undefined;
export type UseFlexParentProps = Pick<FlexParentProps, "as"> | undefined;
export type UseFlexChildProps = Pick<
  FlexChildProps,
  "as" | "index" | FlexChildStyleProps
>;

export const useFlex = ({
  variant = "hStack",
  ...props
}: UseFlexProps = {}) => {
  // @TODO Support Responsive Variants
  const propsWithVariant = variant
    ? {
        ...flexVariants[variant],
        ...propsWithoutUndefined(props),
      }
    : props;

  return {
    parent: (parentProps: UseFlexParentProps) =>
      flex({ ...parentProps, ...propsWithVariant }),
    child: (childProps: UseFlexChildProps) =>
      flexChild({ ...childProps, ...propsWithVariant }),
  };
};
