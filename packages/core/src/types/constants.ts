export enum FLEX_VARS {
  FLEX_GAP_OFFSET = "--raam-fg-offset",
  FLEX_GAP = "--raam-fg",
  FLEX_GAP_TOP = "--raam-fg-t",
  FLEX_GAP_LEFT = "--raam-fg-l",
}

const CSS_GLOBALS = [
  "-moz-initial",
  "inherit",
  "initial",
  "revert",
  "unset",
] as const;
export type TCSSGlobals = typeof CSS_GLOBALS[number];

const CSS_SELF_POSITION = [
  "center",
  "end",
  "flex-end",
  "flex-start",
  "self-end",
  "self-start",
  "start",
] as const;
export type TCSSSelfPosition = typeof CSS_SELF_POSITION[number];

export const FLEX_DIRECTION = [
  ...CSS_GLOBALS,
  "column",
  "column-reverse",
  "row",
  "row-reverse",
] as const;
export type TFlexDirection = typeof FLEX_DIRECTION[number];

export const FLEX_WRAP = [
  ...CSS_GLOBALS,
  "nowrap",
  "wrap",
  "wrap-reverse",
] as const;
export type TFlexWrap = typeof FLEX_WRAP[number];

export const FLEX_ALIGN_ITEMS = [
  ...CSS_GLOBALS,
  ...CSS_SELF_POSITION,
  "baseline",
  "normal",
  "stretch",
] as const;
export type TFlexAlignItems = typeof FLEX_ALIGN_ITEMS[number];
