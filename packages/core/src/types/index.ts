import { CSSProperties } from "./csstype";
import { StringNumber, StringNumberArr } from "./utils";

export * from "./utils";

export enum FLEX_GAP_CSS_VARS {
  FLEX_GAP_OFFSET = "--raam-fg-offset",
  FLEX_GAP = "--raam-fg",
  FLEX_GAP_TOP = "--raam-fg-t",
  FLEX_GAP_LEFT = "--raam-fg-l",
}

/**
 * CSS Style Object
 */
export type RaamCSS =
  | CSSProperties
  | {
      [
        /**
         * **CSS Selector**
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
         */
        selector: string
      ]: RaamCSS;
    };

type RaamStyleProp<K extends keyof CSSProperties, T = void> =
  | CSSProperties[K]
  | T
  | {
      [
        /**
         * A **`@media`** CSS at-rule can be used to apply the property based on
         * the result of one or more media queries. With it, you specify a media
         * query and a style value to apply to the document if and only if the
         * media query matches the device on which the content is being used.
         *
         * **Syntax**: `{ <media-query>: <value> }`
         *
         * **Example**: `{ "@media (min-width: 520px)": "1rem" }`
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media
         */
        mediaQuery: string
      ]: CSSProperties[K] | T;
    };

type RaamStylePropsAll<T = void> = {
  [K in keyof CSSProperties]: RaamStyleProp<K, T> | RaamStyleProp<K, T>[];
};

/**
 * Responsive Style Props
 */
export interface RaamStyleProps extends RaamStylePropsAll {}

/**
 * Default RaamTheme
 */
type ResponsiveThemeValue = StringNumberArr | { [key: string]: StringNumber };

export interface RaamTheme {
  breakpoints?: ResponsiveThemeValue;
  space?: ResponsiveThemeValue;
}
