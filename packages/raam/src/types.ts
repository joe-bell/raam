import { ResponsiveValue } from "styled-system";

// Sourced from: @types/theme-ui
export type Assign<T, U> = {
  [P in keyof (T & U)]: P extends keyof T
    ? T[P]
    : P extends keyof U
    ? U[P]
    : never;
};

export type GapProp = {
  /**
   * The gutter between items.
   */
  gap?: ResponsiveValue<string | number>;
};

export { ColorProps, FlexboxProps, SpaceProps } from "styled-system";
export { SxStyleProp } from "theme-ui";
export { InterpolationWithTheme } from "@emotion/core";
