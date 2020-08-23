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

type FlexProps = {
  as?: string;
} & RaamStyleProps<"flexDirection" | "gap" | "overflowX">;

const flex = (props: FlexProps): RaamCSS => ({
  ...reset(props.as),
  gap: 0,
  "@media": {
    gap: "30",
  },
});

type Test = CSS.AtRules;

type StackProps = FlexProps;

export const stack = ({
  gap = "1rem",
  flexDirection = "column",
  ...props
}: StackProps) =>
  flex({
    gap,
    flexDirection,
    ...props,
  });

export const stackChild = {};

// const CustomStack = styled.div({
//     ...stack({
//         gap: [
//             30,
//             {
//             '@media (min-width: 40em)': '1.5rem',
//             }
//         ]
//     }),
//     color: 'red',
// })
