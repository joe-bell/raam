import {
  RaamCSS,
  RaamStyleProps,
  WithIndex,
  WithRaamTheme,
  CSS_VARS,
  stylePropsToCSS,
  reset,
} from "@raam/core";

const propsWithoutUndefined = <T>(obj: T) =>
  Object.keys(obj).reduce((acc, key) => {
    if (obj[key] !== undefined) acc[key] = obj[key];
    return acc;
  }, {});

// Flexbox Variants
// ==============================================

type FlexboxVariants = "hStack" | "vStack" | "wrap";
const flexboxVariants: Record<FlexboxVariants, ParentProps> = {
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

// parent
// ==============================================

type ParentStyleProps =
  | "alignItems"
  | "alignContent"
  | "flexDirection"
  | "flexWrap"
  | "gap"
  | "justifyContent"
  | "justifyItems";

// @TODO Gap types should support numbers
// @TODO Support Row/Column Gap
interface ParentProps
  extends WithRaamTheme,
    Pick<RaamStyleProps, ParentStyleProps> {
  withoutBaseStyles?: boolean;
  withoutElementStyles?: boolean;
}

const parent = ({
  gap: flexGap,
  withoutBaseStyles,
  withoutElementStyles,
  ...props
}: ParentProps): RaamCSS => ({
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

// child
// ==============================================

type ChildStyleProps = "flex" | "flexGrow" | "flexBasis" | "flexShrink";

interface ChildProps
  extends WithIndex,
    ParentProps,
    Pick<RaamStyleProps, ChildStyleProps> {
  withoutMarginStyles?: boolean;
  withoutFlexStyles?: boolean;
}

const child = ({
  flex = "0 0 auto",
  flexBasis,
  flexGrow,
  flexShrink,
  index = 1,
  withoutBaseStyles,
  withoutElementStyles,
  withoutMarginStyles,
  withoutFlexStyles,
  theme,
}: ChildProps): RaamCSS => ({
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
  ...(!withoutMarginStyles && {
    // inlineStyle
    // pseudo elements
    marginTop: `var(${CSS_VARS.FLEX_GAP}, ${
      index > 0 ? `var(${CSS_VARS.FLEX_GAP_TOP}, initial)` : "initial"
    })`,
    marginRight: `var(${CSS_VARS.FLEX_GAP}, initial)`,
    marginBottom: `var(${CSS_VARS.FLEX_GAP}, initial)`,
    marginLeft: `var(${CSS_VARS.FLEX_GAP}, ${
      index > 0 ? `var(${CSS_VARS.FLEX_GAP_LEFT}, initial)` : "initial"
    })`,
  }),
  ...(!withoutFlexStyles &&
    stylePropsToCSS({ flex, flexBasis, flexGrow, flexShrink, theme })),
});

// flexbox
// ==============================================

export interface FlexboxProps extends ParentProps, WithRaamTheme {
  variant?: FlexboxVariants;
}

export interface FlexboxChildProps
  extends Pick<ChildProps, "index" | ChildStyleProps> {}
export interface FlexboxChildOwnProps extends Omit<ChildProps, "theme"> {}

export type FlexboxStylePropsKeys = ChildStyleProps | ParentStyleProps;
export interface FlexboxStyleProps
  extends Pick<RaamStyleProps, FlexboxStylePropsKeys> {}

export const flexbox = (props?: FlexboxProps) => {
  const variant = props?.variant || "hStack";

  // @TODO Support Responsive Variants
  const propsWithVariant = variant
    ? {
        ...flexboxVariants[variant],
        ...(props && propsWithoutUndefined(props)),
      }
    : propsWithoutUndefined(props);

  return {
    parent: () => parent({ ...propsWithVariant }),
    child: (childProps?: FlexboxChildOwnProps) =>
      child(
        childProps ? { ...childProps, ...propsWithVariant } : propsWithVariant
      ),
  };
};
