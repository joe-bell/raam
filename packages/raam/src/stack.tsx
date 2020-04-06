import * as React from "react";
import { FlexProps, Flex } from "./flex";

export type StackProps = FlexProps;

export const Stack = React.forwardRef<any, StackProps>(
  ({ gap = 3, flexDirection = "column", ...props }, ref) => (
    <Flex ref={ref} gap={gap} flexDirection={flexDirection} {...props} />
  )
);
