import {
  RaamCSS,
  RaamStyleProps,
  RaamTheme,
  FLEX_GAP_CSS_VARS as CSS_VARS,
  ValueOf,
} from "./types";

export interface WithRaamTheme {
  theme?: RaamTheme;
}
export interface WithIndex {
  index?: number;
}
export interface RaamStylePropsPrivate extends RaamStyleProps {
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

export const reset: RaamCSS = {
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

export const getCustomProperty = (
  property: keyof RaamStylePropsPrivate | ({} & string),
  value
) =>
  ({
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
  }[property] || {});

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

  const style = { ...polyfill, ...getCustomProperty(property, value) };

  return breakpoint ? { [breakpoint]: style } : style;
};

interface StylePropsToDeclarations extends WithRaamTheme, WithIndex {
  props: RaamStylePropsPrivate;
  depth?: number;
}

const stylePropsToDeclarations = ({
  props,
  theme,
  index = 0,
  depth = 0,
}: StylePropsToDeclarations) => {
  const stylesProps = Object.keys(props).map((property) => {
    const value = props[property];

    if (value == null || depth >= 2) {
      return null;
    }

    if (typeof value === "object" && Object.keys(value).length > 1) {
      return Array.isArray(value)
        ? value.map((arrayItem, index) =>
            stylePropsToDeclarations({
              depth: depth + 1,
              index,
              props: { [property]: arrayItem },
              theme,
            })
          )
        : Object.keys(value).map((mediaQuery) =>
            stylePropsToDeclarations({
              depth: depth + 1,
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

export const stylePropsToCSS = ({
  theme,
  ...props
}: StylePropsToCSS): RaamCSS => {
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
