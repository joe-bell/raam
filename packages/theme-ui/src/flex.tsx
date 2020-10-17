import * as React from "react";
import { Box, useThemeUI } from "theme-ui";
import {
  useFlex,
  FlexProvider,
  DefaultFlexProps,
  DefaultFlexElementProps,
  DefaultFlexChildProps,
  DefaultFlexParentProps,
} from "@raam/react";

interface FlexElement extends DefaultFlexElementProps {
  sx?: any;
}

interface FlexParentProps extends DefaultFlexParentProps, FlexElement {}

const FlexParent = React.forwardRef<HTMLDivElement, FlexParentProps>(
  ({ children, sx, ...props }, ref) => {
    const { parent } = useFlex();

    return (
      <Box
        ref={ref}
        as={parent.as}
        sx={{
          ...parent.style(),
          ...(sx && sx),
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

interface FlexChildProps extends DefaultFlexChildProps, FlexElement {}

const FlexChild = React.forwardRef<HTMLDivElement, FlexChildProps>(
  (
    { children, index, flex, flexBasis, flexGrow, flexShrink, sx, ...props },
    ref
  ) => {
    const { child } = useFlex();

    return (
      <Box
        ref={ref}
        as={child.as}
        sx={{
          ...child.style({ index, flex, flexBasis, flexGrow, flexShrink }),
          ...(sx && sx),
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

export interface FlexProps extends DefaultFlexProps, FlexElement {}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ children, sx, ...props }, ref) => {
    const { theme } = useThemeUI();
    return (
      <FlexProvider withoutBaseStyles={true} theme={theme} {...props}>
        <FlexParent ref={ref}>
          {React.Children.toArray(children).map((child, index) => (
            <FlexChild key={index} index={index}>
              {child}
            </FlexChild>
          ))}
        </FlexParent>
      </FlexProvider>
    );
  }
);
