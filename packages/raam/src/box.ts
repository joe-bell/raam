// Extended from `@theme-ui/components` Box
// Excludes `variant`, adds an opinionated `reset`.
import styled from "@emotion/styled";
import { css } from "@theme-ui/css";
import { createShouldForwardProp } from "@styled-system/should-forward-prop";
import space from "@styled-system/space";
import color from "@styled-system/color";
import {
  Assign,
  ColorProps,
  SpaceProps,
  InterpolationWithTheme,
  SxStyleProp,
} from "./types";

export type BoxOwnProps = {
  as?: React.ElementType;
  sx?: SxStyleProp;
  css?: InterpolationWithTheme<any>;
} & ColorProps &
  SpaceProps;

export type BoxProps = Assign<
  React.ComponentPropsWithoutRef<"div">,
  BoxOwnProps
>;

const shouldForwardProp = createShouldForwardProp([
  ...space.propNames,
  ...color.propNames,
]);

const sx = props => css(props.sx)(props.theme);
const base = props => css(props.__css)(props.theme);
const reset = props =>
  (typeof props.as === "string" &&
    {
      /**
       * Ensure any list-items are rendered without bullets.
       * Adding a zero-width space in the content to prevent VoiceOver disable.
       */
      li: {
        listStyleType: "none",
        "&:before": {
          position: "absolute",
          content: '"\\200B"',
        },
      },
    }[props.as]) ||
  {};

export const Box = styled("div", {
  shouldForwardProp,
})(
  {
    boxSizing: "border-box",
    margin: 0,
    minWidth: 0,
  },
  base,
  reset,
  space,
  color,
  sx,
  props => props.css
);
