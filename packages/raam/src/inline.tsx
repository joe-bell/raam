import * as React from "react";
import { FlexProps, Flex } from "./flex";

export type InlineProps = FlexProps;

export const Inline = React.forwardRef<any, InlineProps>(
  (
    { gap = 3, alignItems = "center", flexDirection = "row", ...props },
    ref
  ) => (
    <Flex
      ref={ref}
      alignItems={alignItems}
      gap={gap}
      flexDirection={flexDirection}
      {...props}
    />
  )
);
