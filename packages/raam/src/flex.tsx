import * as React from "react";
import { Box, BoxProps } from "./private/box";
import { determineElement } from "./private/utils";
import { GapProp } from "./types";

export type FlexProps = BoxProps & GapProp;

export const Flex = React.forwardRef<any, FlexProps>(
  (
    {
      as = "div",
      gap,
      children,
      flex,
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
      {React.Children.map(children, (child, i) => (
        <Box
          as={determineElement(as)}
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
        >
          {child}
        </Box>
      ))}
    </Box>
  )
);
