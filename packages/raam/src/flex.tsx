import * as React from "react";
import { Box, BoxProps } from "./private/box";
import { GapProp } from "./private/types";

const determineChild = (parent: FlexProps["as"]) =>
  typeof parent === "string"
    ? {
        ul: "li",
        ol: "li",
        span: "span",
        p: "span",
        h1: "span",
        h2: "span",
        h3: "span",
        h4: "span",
        h5: "span",
        h6: "span",
      }[parent] || "div"
    : parent;

export type FlexProps = BoxProps &
  GapProp & {
    cloneElement?: boolean;
  };

export const Flex = React.forwardRef<any, FlexProps>(
  (
    {
      as = "div",
      gap,
      children,
      flex,
      flexBasis,
      flexGrow,
      flexShrink,
      flexDirection = "row",
      flexWrap = "nowrap",
      ...props
    },
    ref
  ) => (
    <Box
      ref={ref}
      as={as}
      __css={{
        display: "flex",
      }}
      overflow={gap}
      overflowX={gap}
      gapOffset={gap}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      {...props}
    >
      {React.Children.map(children, (child, i) => {
        return (
          <Box
            as={determineChild(as)}
            __css={{
              position: "relative",
            }}
            index={i}
            flexParent={{ flexWrap, flexDirection }}
            gapTop={gap}
            gapRight={gap}
            gapBottom={gap}
            gapLeft={gap}
            flexChild={flex}
            flexBasis={flexBasis}
            flexGrow={flexGrow}
            flexShrink={flexShrink}
          >
            {child}
          </Box>
        );
      })}
    </Box>
  )
);
