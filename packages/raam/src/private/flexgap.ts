import { system } from "@styled-system/core";
import { GapValue, FlexboxProps } from "../types";

export type FlexGapProps = {
  index?: number;
  flexParent?: FlexboxProps;
  flexChild?: any;
  gapOffset?: GapValue;
  gapTop?: GapValue;
  gapRight?: GapValue;
  gapBottom?: GapValue;
  gapLeft?: GapValue;
  overflow?: GapValue;
  overflowX?: GapValue;
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

type Config = {
  [key in keyof FlexGapProps]: {
    property: string;
    scale?: string;
    transform: (value: unknown, scale: unknown, props: any) => void;
  };
};

const config: Config = {
  gapOffset: {
    property: "margin",
    scale: "space",
    transform: transformGapOffset,
  },
  gapTop: {
    property: "marginTop",
    scale: "space",
    transform: (value, scale, props) =>
      transformGap(value, scale, props, "marginTop"),
  },
  gapRight: {
    property: "marginRight",
    scale: "space",
    transform: (value, scale, props) =>
      transformGap(value, scale, props, "marginRight"),
  },
  gapBottom: {
    property: "marginBottom",
    scale: "space",
    transform: (value, scale, props) =>
      transformGap(value, scale, props, "marginBottom"),
  },
  gapLeft: {
    property: "marginLeft",
    scale: "space",
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

export const flexgap = system(config);

export default flexgap;
