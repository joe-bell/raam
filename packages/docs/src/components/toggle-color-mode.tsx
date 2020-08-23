/** @jsx jsx */
import * as React from "react";
import {
  jsx,
  useColorMode,
  useThemeUI,
  IconButton,
  IconButtonProps,
} from "theme-ui";

const ToggleColorMode: React.FC<IconButtonProps> = ({ sx, ...props }) => {
  const [mode, setMode] = useColorMode();
  const { theme } = useThemeUI();
  const circleStroke = theme.borderWidths["thick"];
  const circleSize = 20;
  const circlePosition = circleSize / 2;

  return (
    <IconButton
      aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
      // @ts-ignore
      onClick={(e) => {
        e.preventDefault();
        setMode(mode === "dark" ? "default" : "dark");
      }}
      sx={{ cursor: "pointer", ...sx }}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${circleSize} ${circleSize}`}
        width={circleSize}
        height={circleSize}
        fill="currentcolor"
      >
        <circle
          r={circleSize / 2 - circleStroke / 2}
          cx={circlePosition}
          cy={circlePosition}
          fill="none"
          stroke="currentcolor"
          strokeWidth={theme.borderWidths["thick"]}
        />
        <path
          d={`M0,${circlePosition} a1,1 0 0,0 ${circleSize},0`}
          fill="currentColor"
          transform={`rotate(90 ${circlePosition} ${circlePosition})`}
        />
      </svg>
    </IconButton>
  );
};

export default ToggleColorMode;
