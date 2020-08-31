import { StackProps } from "raam";
/** @jsx jsx */
import * as React from "react";
import { jsx, Box, SxStyleProp } from "theme-ui";
import { stack, stackChild } from "@raam/mixins";

const stackBox: SxStyleProp = {
  backgroundColor: "primary",
};

export const Stack: React.FC<StackProps> = ({
  as = "ul",
  children,
  ...props
}) => (
  // @ts-ignore
  <Box as={as} sx={stack({ as, ...props })}>
    {React.Children.map(children, (child, i) => (
      // @ts-ignore
      <Box
        as="li"
        sx={{
          // @ts-ignore
          ...(stackChild({ as: "li", i, ...props }) as SxStyleProp),
          ...stackBox,
        }}
      >
        {child}
      </Box>
    ))}
  </Box>
);

export const VStack: React.FC<StackProps> = props => (
  <React.Fragment>
    <Box bg="muted">
      VStack
      <Stack {...props} />
    </Box>
  </React.Fragment>
);

export const HStack: React.FC<StackProps> = ({
  flexDirection = "row",
  ...props
}) => (
  <React.Fragment>
    <Box bg="muted">
      HStack
      <Stack flexDirection={flexDirection} {...props} />
    </Box>
  </React.Fragment>
);
