import * as React from "react";
import { Box, BoxProps } from "./box";
import { determineElement } from "./utils";
import { GapProp } from "./types";

const wrapMargin = ({
  gap,
  negative = false,
}: {
  negative?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & GapProp) => (theme: any) => {
  if (typeof gap === "undefined" || gap === null) {
    return null;
  }

  // @ts-ignore
  const themedGap = theme.space[gap] || gap;
  const sign = negative ? -1 : 1;

  return typeof themedGap === "number"
    ? `${(themedGap / 2) * sign}px`
    : `calc(${themedGap} / 2 * ${sign})`;
};

const responsiveWrapMargin = ({
  gap,
  negative = false,
}: {
  /* I can't be bothered to fix this right now */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  negative?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & GapProp) => (theme: any) => {
  if (Array.isArray(gap)) {
    return gap.map(gapValue => wrapMargin({ gap: gapValue, negative })(theme));
  }

  if (typeof gap === "number" || typeof gap === "string") {
    return [wrapMargin({ gap: gap, negative })(theme)];
  }

  return null;
};

export type FlexProps = BoxProps & GapProp;

export const Flex = React.forwardRef<any, FlexProps>(
  (
    { as = "div", gap, children, flex, flexDirection, flexWrap, ...props },
    ref
  ) => {
    const wrap = flexWrap === "wrap" || flexWrap === "wrap-reverse";
    const column =
      flexDirection === "column" || flexDirection === "column-reverse";

    return (
      <Box
        ref={ref}
        as={as}
        __css={{
          display: "flex",
          flexDirection,
          flexWrap,
          ...(gap && {
            overflow: wrap && "hidden",
            overflowX: !wrap && !column && "auto",
            margin:
              wrap &&
              (theme => responsiveWrapMargin({ gap, negative: true })(theme)),
          }),
        }}
        {...props}
      >
        {React.Children.map(children, (child, i) => (
          <Box
            as={determineElement(as)}
            __css={{
              position: "relative",
              ...(gap && wrap
                ? { margin: theme => responsiveWrapMargin({ gap })(theme) }
                : i > 0 && {
                    [column ? "marginTop" : "marginLeft"]: gap,
                  }),
            }}
            flex={flex || (gap && !column && "0 0 auto")}
          >
            {child}
          </Box>
        ))}
      </Box>
    );
  }
);
