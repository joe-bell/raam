import * as React from "react";
import { Box, BoxProps } from "../box";
import { determineElement } from "../utils";
import { GapProp } from "../types";
import { ResponsiveValue } from "styled-system";
import * as CSS from "csstype";

type LayoutMargin = string | number | null;

const layoutMargin = ({
  gap,
  negative = false,
}: {
  gap: LayoutMargin;
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

const responsiveLayoutMargin = ({
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
      layoutMargin({ gap: gapValue, negative })(theme)
    );
  }

  if (typeof gap === "number" || typeof gap === "string") {
    return [layoutMargin({ gap: gap, negative })(theme)];
  }

  return null;
};

export type LayoutProps = BoxProps &
  GapProp & {
    alignContent?: ResponsiveValue<CSS.AlignContentProperty>;
    alignItems?: ResponsiveValue<CSS.AlignItemsProperty>;
    flexDirection?: ResponsiveValue<CSS.FlexDirectionProperty>;
    flexWrap?: ResponsiveValue<CSS.FlexWrapProperty>;
    justifyContent?: ResponsiveValue<CSS.JustifyContentProperty>;
  };

export const Layout: React.FC<LayoutProps> = ({
  as = "div",
  gap = 3,
  children,
  flexDirection = "row",
  flexWrap = "nowrap",
  justifyContent = "flex-start",
  alignContent = "stretch",
  alignItems = "stretch",
  ...props
}) => {
  const noWrap = flexWrap === "nowrap";

  return (
    <Box
      data-raam="layout"
      as={as}
      __css={{
        display: "flex",
        alignContent,
        alignItems,
        flexDirection,
        flexWrap,
        overflow: !noWrap && "hidden",
        overflowX: noWrap && flexDirection === "row" && "auto",
        justifyContent,
        margin:
          !noWrap &&
          (theme => responsiveLayoutMargin({ gap, negative: true })(theme)),
      }}
      {...props}
    >
      {React.Children.map(children, (child, i) => (
        <Box
          data-raam="layout__child"
          as={determineElement(as)}
          __css={{
            position: "relative",
            ...(!noWrap
              ? { margin: theme => responsiveLayoutMargin({ gap })(theme) }
              : i > 0 && {
                  [flexDirection === "column"
                    ? "marginTop"
                    : "marginLeft"]: gap,
                }),
            flex: flexDirection === "row" && gap && "0 0 auto",
          }}
        >
          {child}
        </Box>
      ))}
    </Box>
  );
};
