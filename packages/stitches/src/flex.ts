import { TConfig, TUtility } from "@stitches/core";
import { useFlex as raamUseFlex, UseFlexProps as RaamUseFlexProps } from "raam";

interface UseFlexProps extends Omit<RaamUseFlexProps, "gap"> {
  gap?: keyof TConfig["tokens"]["space"] | ({} & string);
}

export const useFlex: TUtility<UseFlexProps, TConfig> = (value, config) => {
  const { gap, ...options } = value;

  const flex = raamUseFlex({
    gap: config.tokens.space[gap] || value.gap,
    ...options,
    theme: config.tokens,
  });

  return {
    ...flex.parent(),
    "& > *": {
      "&:first-child": {
        ...flex.child({ index: 0 }),
      },
      "&:not(:first-child)": {
        ...flex.child(),
      },
    },
  } as any;
};
