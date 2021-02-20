// Note: @peduarte advised me against using InternalCSS, but yolo
import { IConfig, InternalCSS } from "@stitches/react";

import {
  FLEX_DIRECTION,
  FLEX_WRAP,
  setFlexBase,
  setFlexGap,
  setFlexReset,
  setFlexDirection,
  setFlexWrap,
  TFlexDirection,
  TFlexWrap,
} from "@raam/core";

const firstChild = "& > *:first-child";
const nthChild = "& > * + *";

export const createFlexbox = (config) => {
  /**
   * Generate `gap` prop values from theme
   */
  const { space } = config.theme;
  type TSpaceKey = keyof typeof space;

  const gap = Object.keys(space).reduce(
    (acc, cv) => ({
      ...acc,
      [cv]: {
        ...setFlexGap({ element: "parent", value: cv }),
        [firstChild]: setFlexGap({ element: "firstChild" }),
        [nthChild]: setFlexGap({ element: "nthChild" }),
      },
    }),
    {}
  ) as { [key in TSpaceKey]: InternalCSS };

  const direction = FLEX_DIRECTION.reduce(
    (acc, cv) => ({
      ...acc,
      [cv]: setFlexDirection(cv),
    }),
    {}
  ) as { [key in TFlexDirection]: InternalCSS };

  const wrap = FLEX_WRAP.reduce(
    (acc, cv) => ({
      ...acc,
      [cv]: setFlexWrap,
    }),
    {}
  ) as { [key in TFlexWrap]: InternalCSS };

  return {
    ...({
      ...setFlexReset("parent"),
      ...setFlexBase("parent"),
      [firstChild]: {
        ...setFlexReset("firstChild"),
        ...setFlexBase("firstChild"),
      },
      [nthChild]: {
        ...setFlexReset("nthChild"),
        ...setFlexBase("nthChild"),
      },
    } as InternalCSS),
    variants: {
      direction,
      gap,
      wrap,
    },
  };
};
