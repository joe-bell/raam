import * as CSSType from "csstype";

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

const transformResponsiveStyleProp = (
  property: string,
  // string | number | { string: string | number }
  value: unknown
): RaamCSS =>
  typeof value === "object"
    ? {
        [Object.keys(value)[0]]: {
          [property]: Object.values(value)[0],
        },
      }
    : { [property]: value };

// @TODO Update props types to reflect StyleProps, not Styles
const stylePropsToCSS = (props: unknown): RaamCSS =>
  Object.keys(props)
    .map(key =>
      Array.isArray(props[key])
        ? props[key].map(arrayValue =>
            transformResponsiveStyleProp(key, arrayValue)
          )
        : transformResponsiveStyleProp(key, props[key])
    )
    .flat()
    .reduce((acc, cv) => Object.assign(acc, cv), {});

const objectWithoutUndefined = <T>(obj: T) =>
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

// Flex
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
type FlexParentProps = {
  as?: unknown;
} & RaamStyleProps<FlexParentStyleProps>;

const flex = ({ as, ...props }: FlexParentProps): RaamCSS => ({
  ...reset(as),
  display: "flex",
  ...stylePropsToCSS(props),
});

// FlexChild
// ==============================================

type FlexChildStyleProps = "flex" | "flexGrow" | "flexBasis" | "flexShrink";
type FlexChildProps = {
  index?: number;
} & FlexParentProps &
  RaamStyleProps<FlexChildStyleProps>;

// @TODO Support Row/Column Gap
// @TODO Pick flex child props
const flexChild = ({
  as,
  index,
  flex = "0 0 auto",
  flexBasis,
  flexGrow,
  flexShrink,
  ...props
}: FlexChildProps): RaamCSS => {
  // @TODO Set gap based on responsive values
  // @TODO Migrate gap polyfil
  const gap = (): RaamCSS => {
    if (props.flexWrap !== "nowrap") {
      // @TODO Fix usage with Theme-ui (may require passing theme via props)
      const halfGap = `calc(${props.gap} / 2)`;
      return {
        marginTop: halfGap,
        marginRight: halfGap,
        marginBottom: halfGap,
        marginLeft: halfGap,
      };
    }

    return index !== 0
      ? {
          [props.flexDirection === "column" ||
          props.flexDirection === "column-reverse"
            ? "marginTop"
            : "marginLeft"]: props.gap,
        }
      : {};
  };

  return {
    ...reset(as),
    ...gap(),
    ...stylePropsToCSS({ flex, flexBasis, flexGrow, flexShrink }),
  };
};

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
  // @TODO Responsive Variants
  const propsWithVariant = variant
    ? {
        ...flexVariants[variant],
        ...objectWithoutUndefined(props),
      }
    : props;

  return {
    parent: (parentProps: UseFlexParentProps) =>
      flex({ ...parentProps, ...propsWithVariant }),
    child: (childProps: UseFlexChildProps) =>
      flexChild({ ...childProps, ...propsWithVariant }),
  };
};
