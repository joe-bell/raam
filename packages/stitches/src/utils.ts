// @ts-nocheck
import { IConfig, InternalCSS } from "@stitches/react";
import {
  setFlexGap,
  setFlexReset,
  setFlexBase,
  setFlexDirection,
  setFlexWrap,
  IRaamCSS,
} from "@raam/core";

interface IFlexboxUtilProps
  extends Pick<IRaamCSS, "flexDirection" | "flexWrap"> {
  gap?: keyof IConfig["theme"]["space"] | ({} & string);
}

export const flexbox = (config) => (value: IFlexboxUtilProps) => {
  const gap = config.theme.space[value.gap] || value.gap;

  return {
    ...setFlexGap({ element: "parent", value: gap }),
    ...setFlexReset("parent"),
    ...setFlexBase("parent"),
    // @ts-ignore
    ...setFlexDirection(value.flexDirection),
    // @ts-ignore
    ...setFlexWrap(value.flexWrap),
    "& > *": {
      "&:first-child": {
        ...setFlexReset("firstChild"),
        ...setFlexBase("firstChild"),
        ...setFlexGap({ element: "firstChild" }),
      },
      "&:not(:first-child)": {
        ...setFlexReset("nthChild"),
        ...setFlexBase("nthChild"),
        ...setFlexGap({ element: "nthChild" }),
      },
    },
  } as InternalCSS;
};
