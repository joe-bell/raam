import { TConfig, TUtility } from "@stitches/core";
import { useFlex, UseFlexProps } from "raam";

interface WithFlexProps extends Omit<UseFlexProps, "gap"> {
  gap?: keyof TConfig["tokens"]["space"] | ({} & string);
}

// @ts-ignore
export const withFlex: TUtility<WithFlexProps, TConfig> = (value, config) => {
  const { gap, ...options } = value;

  const flex = useFlex({
    // @ts-ignore
    gap: config.tokens.space[gap] || value,
    ...options,
    theme: config.tokens,
  });

  return {
    // Supports all elements and lists
    ...flex.parent(),
    "& > *": {
      "&:first-child": {
        ...flex.child({ index: 0 }),
      },
      // @ts-ignore
      "&:not(:first-child)": {
        ...flex.child(),
      },
    },
  };
};
