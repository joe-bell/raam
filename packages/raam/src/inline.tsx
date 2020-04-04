import * as React from "react";
import { Box, BoxProps } from "./box";
import { determineElement } from "./utils";
import { GapProp } from "./types";

type InlineMargin = string | number | null;

const inlineMargin = ({
  gap,
  negative = false,
}: {
  gap: InlineMargin;
  negative?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => (theme: any) => {
  if (typeof gap === "undefined" || gap === null) {
    return null;
  }

  const themedGap = theme.space[gap] || gap;
  const sign = negative ? -1 : 1;

  return typeof themedGap === "number"
    ? `${(themedGap / 2) * sign}px`
    : `calc(${themedGap} / 2 * ${sign})`;
};

const responsiveInlineMargin = ({
  gap,
  negative = false,
}: {
  /* I can't be bothered to fix this right now */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gap: any;
  negative?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}) => (theme: any) => {
  if (Array.isArray(gap)) {
    return gap.map(gapValue =>
      inlineMargin({ gap: gapValue, negative })(theme)
    );
  }

  if (typeof gap === "number" || typeof gap === "string") {
    return [inlineMargin({ gap: gap, negative })(theme)];
  }

  return null;
};

export type InlineProps = BoxProps & GapProp;

export const Inline: React.FC<InlineProps> = ({
  as = "div",
  gap = 3,
  sx,
  children,
  ...props
}) => (
  <Box
    data-raam="inline"
    as={as}
    __css={{
      display: "flex",
      flexWrap: "wrap",
      overflow: "hidden",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingLeft: 0,
      margin: theme => responsiveInlineMargin({ gap, negative: true })(theme),
    }}
    {...props}
  >
    {React.Children.map(children, child => (
      <Box
        data-raam="inline__child"
        as={determineElement(as)}
        __css={{
          position: "relative",
          margin: theme => responsiveInlineMargin({ gap })(theme),
        }}
      >
        {child}
      </Box>
    ))}
  </Box>
);
