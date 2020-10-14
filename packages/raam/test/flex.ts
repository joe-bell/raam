import { RaamTheme, useFlex } from "../dist";

const theme: RaamTheme = {
  space: [0, 4, 8, 16, 32, 64],
  breakpoints: ["20em", "40em", "60em", "80em"],
};
const themeAlternative: RaamTheme = {
  space: theme.space,
  breakpoints: { small: "20em", medium: "40em", large: "60em", xlarge: "80em" },
};

describe("useFlex", () => {
  test("with themed responsive props", () => {
    const example = () => {
      const flex = useFlex({
        gap: [3, null, 4, "4rem"],
        alignItems: [null, "flex-end", "flex-start"],
        theme,
      });

      return {
        parent: flex.parent(),
        child: flex.child(),
      };
    };

    expect(example().parent).toEqual(
      expect.objectContaining({
        display: "flex",
        // due to hStack being default variant
        "--raam-fg-t": `initial`,
        "--raam-fg-l": `${theme.space[3]}px`,
      })
    );
    expect(example().parent).toHaveProperty(
      `@media screen and (min-width: ${theme.breakpoints[0]})`,
      expect.objectContaining({
        alignItems: "flex-end",
      })
    );
    expect(example().parent).toHaveProperty(
      `@media screen and (min-width: ${theme.breakpoints[1]})`,
      expect.objectContaining({
        "--raam-fg-t": `${theme.space[4]}px`,
        "--raam-fg-l": `${theme.space[4]}px`,
        alignItems: "flex-start",
      })
    );
    expect(example().parent).toHaveProperty(
      `@media screen and (min-width: ${theme.breakpoints[2]})`,
      expect.objectContaining({
        "--raam-fg-t": "4rem",
        "--raam-fg-l": "4rem",
      })
    );
  });
});
