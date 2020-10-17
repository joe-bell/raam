import {
  RaamCSS,
  RaamStyleProps,
  WithIndex,
  WithRaamTheme,
  FLEX_GAP_CSS_VARS as CSS_VARS,
  stylePropsToCSS,
  reset,
} from "@raam/core";

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
