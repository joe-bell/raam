import { TConfig, TUtility } from "@stitches/core";
import {
  flexbox as flexboxStyles,
  FlexboxProps as DefaultFlexboxProps,
} from "raam";

interface FlexboxProps extends Omit<DefaultFlexboxProps, "gap"> {
  gap?: keyof TConfig["tokens"]["space"] | ({} & string);
}

export const flexbox: TUtility<FlexboxProps, TConfig> = (value, config) => {
  const { gap, ...options } = value;

  const { child, parent } = flexboxStyles({
    gap: config.tokens.space[gap] || value.gap,
    ...options,
    theme: config.tokens,
  });

  return {
    ...parent(),
    "& > *": {
      "&:first-child": {
        ...child({ index: 0 }),
      },
      "&:not(:first-child)": {
        ...child(),
      },
    },
  } as any;
};
