/** @jsx jsx */
import { forwardRef } from "react";
import { jsx, Box, BoxProps, GridProps } from "theme-ui";
import { li } from "./reset";

export type StackProps = BoxProps & Pick<GridProps, "gap">;

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35834#issuecomment-497445051
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Stack = forwardRef<any, StackProps>(
  ({ gap = 3, sx, children, ...props }, ref) =>
    jsx(
      Box,
      {
        ...props,
        ref,
        sx: {
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
          /* Ensure direct child list-items render without bullets */
          "& > li": li.listStyleTypeNone,
          ...(sx && sx),
        },
      },
      children
    )
);
