import { ResponsiveValue } from "styled-system";

// Sourced from: @types/theme-ui
export type Assign<T, U> = {
  [P in keyof (T & U)]: P extends keyof T
    ? T[P]
    : P extends keyof U
    ? U[P]
    : never;
};

export type GapValue = ResponsiveValue<string | number | null>;

export type GapProp = {
  /**
   * The gutter between items.
   */
  gap?: GapValue;
};

/**
 * Because these dependencies aren't being directly used, and just for typings,
 * I'm exporting them from here.
 */
export {
  ColorProps,
  FlexboxProps as DefaultFlexboxProps,
  SpaceProps,
  Theme,
  ThemeValue,
} from "styled-system";
export { SxStyleProp, SxProps } from "theme-ui";
