import * as React from "react";
import { LayoutProps, Layout } from "./layout";

export type InlineProps = LayoutProps;

export const Inline: React.FC<InlineProps> = ({
  alignItems = "center",
  flexDirection = "row",
  flexWrap = "wrap",
  justifyContent = "flex-start",
  ...props
}) => (
  <Layout
    alignItems={alignItems}
    flexDirection={flexDirection}
    flexWrap={flexWrap}
    justifyContent={justifyContent}
    {...props}
  />
);

export type StackProps = LayoutProps;

export const Stack: React.FC<StackProps> = ({
  alignItems = "stretch",
  flexDirection = "column",
  flexWrap = "nowrap",
  ...props
}) => (
  <Layout
    alignItems={alignItems}
    flexDirection={flexDirection}
    flexWrap={flexWrap}
    {...props}
  />
);
