import * as React from "react";
import { Box, BoxProps } from "theme-ui";
import {
  useFlex,
  UseFlexChildProps,
  UseFlexParentProps,
  UseFlexProps,
} from "raam";

export type FlexProps = Omit<BoxProps, "variant"> &
  Omit<UseFlexProps, "gap"> & {
    gap?: UseFlexProps["gap"];
  } & UseFlexParentProps &
  UseFlexChildProps;

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

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as = "div",
      children,
      // flex parent
      alignItems,
      alignContent,
      flexDirection,
      flexWrap,
      gap,
      justifyContent,
      justifyItems,
      variant,
      // flex child
      flex,
      flexBasis,
      flexGrow,
      flexShrink,
      // custom styles
      sx,
      ...props
    },
    ref
  ) => {
    // @TODO Pre-transform Theme-UI's responsive props to `raam`'s style props
    const flexStyles = useFlex({
      alignItems,
      alignContent,
      flexDirection,
      flexWrap,
      gap,
      justifyContent,
      justifyItems,
      variant,
    });
    const childAs = determineChild(as);

    return (
      <Box
        ref={ref}
        as={as}
        // @ts-ignore
        sx={{
          ...flexStyles.parent({ as }),
          ...(sx && sx),
        }}
        {...props}
      >
        {React.Children.toArray(children).map((child, index) => (
          <Box
            key={index}
            as={childAs}
            // @ts-ignore
            sx={flexStyles.child({
              as: childAs,
              index,
              flex,
              flexBasis,
              flexGrow,
              flexShrink,
            })}
          >
            {child}
          </Box>
        ))}
      </Box>
    );
  }
);
