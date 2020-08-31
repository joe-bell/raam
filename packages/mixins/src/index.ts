import * as CSS from "csstype";

type RaamCSSProperties = CSS.PropertiesFallback;
type RaamCSS =
  | RaamCSSProperties
  | { [P in CSS.SimplePseudos | string]: RaamCSSProperties };

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

type RaamStyleProp<K extends keyof RaamCSS, T = void> =
  | RaamCSS[K]
  | T
  | { [mediaQuery: string]: RaamCSS[K] | T };

type RaamStyleProps<K extends keyof RaamCSS, T = void> = {
  [P in K]?: RaamStyleProp<K, T> | RaamStyleProp<K, T>[];
};

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

// Flex

type FlexProps = {
  as?: string;
} & RaamStyleProps<"flexDirection" | "flexWrap" | "gap" | "overflowX">;

const flex = ({ as, ...props }: FlexProps): RaamCSS => ({
  ...reset(as),
  display: "flex",
  ...stylePropsToCSS(props),
});

type FlexChildProps = {
  i?: number;
} & FlexProps;

// @TODO Set gap responsively
// @TODO row/column gap
const flexChild = (props: FlexChildProps): RaamCSS => {
  const gap = (): RaamCSS => {
    if (props.flexWrap !== "nowrap") {
      const halfGap = `calc(${props.gap} / 2)`;
      return {
        marginTop: halfGap,
        marginRight: halfGap,
        marginBottom: halfGap,
        marginLeft: halfGap,
      };
    }

    return props.i !== 0
      ? {
          [props.flexDirection === "column" ||
          props.flexDirection === "column-reverse"
            ? "marginTop"
            : "marginLeft"]: props.gap,
        }
      : {};
  };

  return {
    ...reset(props.as),
    ...gap(),
  };
};

// Stack
type StackProps = FlexProps;
const stackDefaults = {
  gap: "1rem",
  flexDirection: "column",
  flexWrap: "nowrap",
};

export const stack = ({
  gap = stackDefaults.gap,
  flexDirection = stackDefaults.flexDirection,
  flexWrap = stackDefaults.flexWrap,
  ...props
}: StackProps) =>
  flex({
    gap,
    flexDirection,
    flexWrap,
    ...props,
  });

type StackChildProps = FlexChildProps;

export const stackChild = ({
  gap = stackDefaults.gap,
  flexDirection = stackDefaults.flexDirection,
  flexWrap = stackDefaults.flexWrap,
  ...props
}: StackChildProps) => flexChild({ gap, flexDirection, flexWrap, ...props });
