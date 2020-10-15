import {
  RaamCSS,
  RaamStyleProps,
  RaamTheme,
  FLEX_GAP_CSS_VARS as CSS_VARS,
} from "./types";

type ValueOf<T> = T[keyof T];

interface WithRaamTheme {
  theme?: RaamTheme;
}
interface WithIndex {
  index?: number;
}
interface RaamStylePropsPrivate extends RaamStyleProps {
  flexGap?: RaamStyleProps["gap"];
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

const hasThemeKey = (theme: RaamTheme | unknown, key: keyof RaamTheme) =>
  !(theme == null) && theme.hasOwnProperty(key);

interface GetStyleValue extends WithRaamTheme {
  property: keyof RaamStylePropsPrivate | ({} & string);
  srcValue: unknown;
}

const getStyleValue = ({
  // @TODO This probably shouldn't be a string type
  property,
  srcValue,
  theme,
}: GetStyleValue) => {
  if (srcValue == null) {
    return undefined;
  }

  const getValue =
    (srcValue.constructor.name === "Object" && Object.values(srcValue)[0]) ||
    srcValue;

  if (property === "flexGap") {
    const themedValue =
      hasThemeKey(theme, "space") && theme.space[getValue]
        ? theme.space[getValue]
        : getValue;

    return typeof themedValue === "number" ? `${themedValue}px` : themedValue;
  }

  return getValue;
};

interface GetBreakpoint extends WithIndex, WithRaamTheme {
  srcValue: unknown;
}

const getBreakpoint = ({ srcValue, index, theme }: GetBreakpoint) => {
  if (srcValue == null) {
    return false;
  }

  const hasSrcValueKey = srcValue.constructor.name === "Object";
  const srcValueKey = hasSrcValueKey && Object.keys(srcValue)[0];

  if (["initial", "_"].includes(srcValueKey) || srcValueKey == null) {
    return false;
  }

  if (index === 0 && hasSrcValueKey === false) {
    return false;
  }

  if (!theme) {
    return srcValueKey;
  }

  if (theme) {
    const themedBreakpointKey = srcValueKey || index;
    // console.log(themedBreakpointKey);
    return hasThemeKey(theme, "breakpoints") &&
      theme.breakpoints[themedBreakpointKey]
      ? `@media screen and (min-width: ${
          theme.breakpoints[
            typeof themedBreakpointKey === "number"
              ? themedBreakpointKey - 1
              : themedBreakpointKey
          ]
        })`
      : srcValueKey;
  }

  return false;
};

interface GetStyleDeclaration extends WithIndex, WithRaamTheme {
  property: keyof RaamStylePropsPrivate | ({} & string);
  srcValue: ValueOf<RaamStylePropsPrivate>;
}

const getStyleDeclaration = ({
  property,
  srcValue,
  index,
  theme,
}: GetStyleDeclaration): RaamCSS => {
  const breakpoint = getBreakpoint({
    srcValue,
    index,
    theme,
  });
  const value = getStyleValue({ property, srcValue, theme });

  if (!breakpoint && srcValue == null) {
    return null;
  }

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

interface StylePropsToDeclarations extends WithRaamTheme, WithIndex {
  props: RaamStylePropsPrivate;
}

const stylePropsToDeclarations = ({
  props,
  theme,
  index = 0,
}: StylePropsToDeclarations) => {
  const stylesProps = Object.keys(props).map((property) => {
    const value = props[property];

    if (value == null) {
      return null;
    }

    if (typeof value === "object" && Object.keys(value).length > 1) {
      return Array.isArray(value)
        ? value.map((arrayItem, index) =>
            stylePropsToDeclarations({
              index,
              props: { [property]: arrayItem },
              theme,
            })
          )
        : Object.keys(value).map((mediaQuery) =>
            stylePropsToDeclarations({
              props: { [property]: { [mediaQuery]: value[mediaQuery] } },
              theme,
            })
          );
    }

    return getStyleDeclaration({
      index,
      property,
      srcValue: value,
      theme,
    });
  });

  // @TODO Sort by:
  // 1. --var
  // 2. Block
  // 3. Media Queries
  return flat(stylesProps).filter((item) => item);
};

interface StylePropsToCSS extends RaamStylePropsPrivate, WithRaamTheme {}

const stylePropsToCSS = ({ theme, ...props }: StylePropsToCSS): RaamCSS => {
  const styleDeclarations = stylePropsToDeclarations({
    props,
    theme,
  });

  const mergeMediaQueries = styleDeclarations.reduce((acc, cv) => {
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
  const styleObject = mergeMediaQueries.reduce(
    (acc, cv) => Object.assign(acc, cv),
    {}
  );

  return styleObject;
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
  extends WithIndex,
    FlexParentProps,
    Pick<RaamStyleProps, FlexChildStyleProps> {}

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
  const variant = props?.variant || "hStack";

  // @TODO Support Responsive Variants
  const propsWithVariant = variant
    ? {
        ...flexVariants[variant],
        ...(props && propsWithoutUndefined(props)),
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
