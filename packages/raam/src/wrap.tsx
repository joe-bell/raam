import * as React from "react";
import { FlexProps, Flex } from "./flex";

export type WrapProps = FlexProps;

export const Wrap = React.forwardRef<any, WrapProps>(
  (
    {
      alignItems = "center",
      flexDirection = "row",
      flexWrap = "wrap",
      gap = 3,
      justifyContent = "flex-start",
      ...props
    },
    ref
  ) => (
    <Flex
      ref={ref}
      alignItems={alignItems}
      flexDirection={flexDirection}
      flexWrap={flexWrap}
      gap={gap}
      justifyContent={justifyContent}
      {...props}
    />
  )
);
