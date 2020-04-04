import * as React from "react";
import { Box, BoxProps } from "./box";
import { GapProp } from "./types";

export type StackProps = BoxProps & GapProp;

export const Stack: React.FC<StackProps> = ({
  as = "div",
  gap = 3,
  children,
  ...props
}) => (
  <Box
    as={as}
    {...props}
    __css={{
      /**
       * If a browser supports the `grid-gap` property, let's use it.
       * Otherwise, fallback to the lobotomized owl selector to style children.
       */
      "@supports (grid-gap: 0)": {
        /* Theme UI's types don't seem to like me doing this */
        // @ts-ignore
        display: "grid",
        // @ts-ignore
        gridGap: gap,
      },
      "@supports not (grid-gap: 0)": {
        "& > * + *": {
          marginTop: gap,
        },
      },
      // /* Ensure direct child list-items render without bullets */
      // "& > li": li.listStyleTypeNone,
    }}
  >
    {children}
  </Box>
);
