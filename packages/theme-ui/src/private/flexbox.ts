import { system } from "@styled-system/core";
import { FlexboxProps as DefaultFlexboxProps } from "styled-system";

export type FlexboxProps = Omit<
  DefaultFlexboxProps,
  "alignSelf" | "justifySelf" | "order"
>;

type FlexboxSystem = {
  [FlexboxProperty in keyof FlexboxProps]: boolean;
};

const config: FlexboxSystem = {
  alignItems: true,
  alignContent: true,
  justifyItems: true,
  justifyContent: true,
  flexWrap: true,
  flexDirection: true,
  // Flex Item
  flex: true,
  flexBasis: true,
  flexGrow: true,
  flexShrink: true,
};

const flexbox = system(config);

export default flexbox;
