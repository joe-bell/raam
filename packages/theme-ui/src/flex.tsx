import * as React from "react";
import { Box, useThemeUI } from "theme-ui";
import { useFlex, UseFlexProps, UseFlexChildProps } from "raam";

export interface FlexProps
  extends UseFlexProps,
    Omit<UseFlexChildProps, "index"> {
  children?: React.ReactNode;
  as?: unknown;
  sx?: any;
}

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
    const { theme } = useThemeUI();

    const flexStyles = useFlex({
      alignItems,
      alignContent,
      flexDirection,
      flexWrap,
      gap,
      justifyContent,
      justifyItems,
      variant,
      theme,
      withoutBaseStyles: true,
    });

    return (
      <Box
        ref={ref}
        as={as}
        sx={{
          ...flexStyles.parent(),
          ...(sx && sx),
        }}
        {...props}
      >
        {React.Children.toArray(children).map((child, index) => (
          <Box
            key={index}
            as={determineChild(as)}
            sx={flexStyles.child({
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
