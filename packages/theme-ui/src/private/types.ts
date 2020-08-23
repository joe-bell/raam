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
