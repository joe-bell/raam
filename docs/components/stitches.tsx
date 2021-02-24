import { createFlexbox } from "@raam/stitches";
import { styled, config } from "../styles/stitches.config";

export const Box = styled("div", {});

export const Flexbox = styled("div", {
  ...createFlexbox(config),
  defaultVariants: {
    gap: "4",
    direction: "row",
    wrap: "nowrap",
  },
});
