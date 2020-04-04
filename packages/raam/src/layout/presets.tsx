import * as React from "react";
import { LayoutProps, Layout } from "./layout";

export type InlineProps = LayoutProps;

export const Inline: React.FC<InlineProps> = ({
  flexDirection = "row",
  flexWrap = "wrap",
  justifyContent = "flex-start",
  alignItems = "center",
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
  flexWrap = "no-wrap",
  flexDirection = "column",
  alignItems = "flex-start",
  ...props
}) => (
  <Layout
    alignItems={alignItems}
    flexDirection={flexDirection}
    flexWrap={flexWrap}
    {...props}
  />
);
