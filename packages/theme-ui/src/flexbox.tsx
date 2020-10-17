import * as React from "react";
import { Box, useThemeUI } from "theme-ui";
import {
  useFlexbox,
  FlexProvider,
  DefaultFlexboxProps,
  DefaultFlexboxElementProps,
  DefaultFlexboxChildProps,
  DefaultFlexboxParentProps,
} from "@raam/react";

interface FlexboxElement extends DefaultFlexboxElementProps {
  sx?: any;
}

interface FlexboxParentProps
  extends DefaultFlexboxParentProps,
    FlexboxElement {}

const FlexboxParent = React.forwardRef<HTMLDivElement, FlexboxParentProps>(
  ({ children, sx, ...props }, ref) => {
    const { parent } = useFlexbox();

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

interface FlexboxChildProps extends DefaultFlexboxChildProps, FlexboxElement {}

const FlexboxChild = React.forwardRef<HTMLDivElement, FlexboxChildProps>(
  (
    { children, index, flex, flexBasis, flexGrow, flexShrink, sx, ...props },
    ref
  ) => {
    const { child } = useFlexbox();

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

export interface FlexboxProps extends DefaultFlexboxProps, FlexboxElement {}

export const Flexbox = React.forwardRef<HTMLDivElement, FlexboxProps>(
  ({ children, sx, ...props }, ref) => {
    const { theme } = useThemeUI();
    return (
      <FlexProvider withoutBaseStyles={true} theme={theme} {...props}>
        <FlexboxParent ref={ref}>
          {React.Children.toArray(children).map((child, index) => (
            <FlexboxChild key={index} index={index}>
              {child}
            </FlexboxChild>
          ))}
        </FlexboxParent>
      </FlexProvider>
    );
  }
);
