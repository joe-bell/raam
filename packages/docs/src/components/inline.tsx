/** @jsx jsx */
import * as React from "react";
import { jsx, Flex, FlexProps, GridProps, Box } from "theme-ui";

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

export type InlineProps = FlexProps & Pick<GridProps, "gap">;

export const Inline = ({
  as,
  gap = 3,
  sx,
  children,
  ...props
}: InlineProps) => {
  const isList = as === "ul" || as === "ol";

  return (
    <Flex
      as={as}
      sx={{
        flexWrap: "wrap",
        overflow: "hidden",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 0,
        ...(sx && sx),
        margin: theme => responsiveInlineMargin({ gap, negative: true })(theme),
      }}
      {...props}
    >
      {React.Children.map(children, child => (
        <Box
          as={isList ? "li" : "div"}
          sx={{
            position: "relative",
            margin: theme => responsiveInlineMargin({ gap })(theme),
            ...(isList && {
              listStyleType: "none",
              "&:before": {
                position: "absolute",
                content:
                  '"\\200B"' /* Add zero-width space to prevent VoiceOver disable */,
              },
            }),
          }}
        >
          {child}
        </Box>
      ))}
    </Flex>
  );
};
