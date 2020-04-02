import { SxStyleProp } from "theme-ui";

type ResetLi = {
  listStyleTypeNone: SxStyleProp;
};

export const li: ResetLi = {
  listStyleTypeNone: {
    listStyleType: "none",
    "&:before": {
      position: "absolute",
      content:
        '"\\200B"' /* Add zero-width space to prevent VoiceOver disable */,
    },
  },
};
