import { system } from "@styled-system/core";
import { DefaultFlexboxProps, GapValue } from "./types";

export type RaamSystemPropsPublic = Omit<
  DefaultFlexboxProps,
  "alignSelf" | "justifySelf" | "order"
>;

export type RaamSystemPropsPrivate = {
  index?: number;
  flexParent?: RaamSystemPropsPublic;
  flexChild?: any;
  gapOffset?: GapValue;
  gapTop?: GapValue;
  gapRight?: GapValue;
  gapBottom?: GapValue;
  gapLeft?: GapValue;
  overflow?: GapValue;
  overflowX?: GapValue;
};

export type RaamSystemProps = RaamSystemPropsPrivate & RaamSystemPropsPublic;

export type RaamSystemConfig = {
  [key in keyof RaamSystemProps]:
    | {
        property: string;
        scale?: string;
        defaultScale?: number[];
        transform: (value: unknown, scale: unknown, props: any) => void;
      }
    | boolean;
};

const isNumber = n => typeof n === "number" && !isNaN(n);

const isWrapped = (flexWrap: string) => (flexWrap === "nowrap" ? false : true);
const isColumn = (flexDirection: string) =>
  ["column", "column-reverse"].includes(flexDirection);
const isRow = (flexDirection: string) =>
  ["row", "row-reverse"].includes(flexDirection);

const transformGapOffset = (value, scale, props) => {
  const themeValue = (scale && scale[value]) || value;

  const offsetValue = isNumber(themeValue)
    ? -themeValue / 2
    : `calc(-${themeValue} / 2)`;

  return props.flexWrap && isWrapped(props.flexWrap) ? offsetValue : undefined;
};

const transformGap = (value, scale, props, property) => {
  const themeValue = (scale && scale[value]) || value;

  if (props.flexParent && isWrapped(props.flexParent.flexWrap)) {
    return isNumber(themeValue) ? themeValue / 2 : `calc(${themeValue} / 2)`;
  }

  /* This is disgusting but it works for now,I'll try to come back to it */
  if (
    props.flexParent &&
    props.index > 0 &&
    ((property === "marginTop" && isColumn(props.flexParent.flexDirection)) ||
      (property === "marginLeft" && isRow(props.flexParent.flexDirection)))
  ) {
    return themeValue;
  }

  return undefined;
};

const space = {
  scale: "space",
  // from @styled-system/space
  defaultScale: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};

export const raamSystemConfig: RaamSystemConfig = {
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
  // Flex Gap
  gapOffset: {
    property: "margin",
    ...space,
    transform: transformGapOffset,
  },
  gapTop: {
    property: "marginTop",
    ...space,
    transform: (value, scale, props) =>
      transformGap(value, scale, props, "marginTop"),
  },
  gapRight: {
    property: "marginRight",
    ...space,
    transform: (value, scale, props) =>
      transformGap(value, scale, props, "marginRight"),
  },
  gapBottom: {
    property: "marginBottom",
    ...space,
    transform: (value, scale, props) =>
      transformGap(value, scale, props, "marginBottom"),
  },
  gapLeft: {
    property: "marginLeft",
    ...space,
    transform: (value, scale, props) =>
      transformGap(value, scale, props, "marginLeft"),
  },
  flexChild: {
    property: "flex",
    transform: (value, scale, props) => {
      if (props.flexParent && isRow(props.flexParent.flexDirection)) {
        return value || "0 0 auto";
      }

      return value;
    },
  },
  overflow: {
    property: "overflow",
    transform: (value, scale, props) =>
      value && value !== null && isWrapped(props.flexWrap)
        ? "hidden"
        : undefined,
  },
  overflowX: {
    property: "overflowX",
    transform: (value, scale, props) =>
      value &&
      value !== null &&
      !isWrapped(props.flexWrap) &&
      isRow(props.flexDirection)
        ? "auto"
        : undefined,
  },
};

const raamSystem = system(raamSystemConfig);

export default raamSystem;
