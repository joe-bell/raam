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
    const { child, parent } = useFlexbox();

    const childConfig = {
      withoutBaseStyles: true,
      withoutElementStyles: true,
      withoutFlexStyles: true,
    };

    const firstChild = child.style({ index: 0, ...childConfig });
    const nthChild = child.style({ index: 1, ...childConfig });

    return (
      <Box
        ref={ref}
        as={parent.as}
        sx={{
          ...parent.style(),
          /**
           * There's a reason why this looks so awful, but let's not get
           * `emotion`al about it
           * https://github.com/emotion-js/emotion/issues/898
           */
          "& > *:not(style)": nthChild,
          /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */
          "& > style:first-child + *:not(style), & > *:first-child:not(style)": firstChild,
          ...(sx && sx),
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

export interface FlexboxItemProps
  extends DefaultFlexboxChildProps,
    FlexboxElement {}

export const FlexboxItem = React.forwardRef<HTMLDivElement, FlexboxItemProps>(
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
          ...child.style({
            index,
            flex,
            flexBasis,
            flexGrow,
            flexShrink,
            withoutMarginStyles: true,
          }),
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
        <FlexboxParent ref={ref}>{children}</FlexboxParent>
      </FlexProvider>
    );
  }
);
