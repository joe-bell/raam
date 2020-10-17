// @TODO Tests should run from `src`
import { RaamTheme, useFlex } from "../src";
import { FLEX_GAP_CSS_VARS as CSS_VARS } from "../src/types";

// Config
// ==============================================

const themeArr: RaamTheme = {
  space: [0, 4, 8, 16, 32, 64],
  breakpoints: ["20em", "40em", "60em", "80em"],
};

const themeNamed: RaamTheme = {
  space: { small: 4, medium: 8, large: 16, xlarge: 32 },
  breakpoints: { small: "20em", medium: "40em", large: "60em", xlarge: "80em" },
};

// Utils
// ==============================================

const mq = (bp: string | number) => `@media screen and (min-width: ${bp})`;

const flexBase = {
  display: "flex",
};

const hStack = (gap: number | string) => ({
  [CSS_VARS.FLEX_GAP_TOP]: "initial",
  [CSS_VARS.FLEX_GAP_LEFT]: typeof gap === "number" ? `${gap}px` : gap,
  [CSS_VARS.FLEX_GAP_OFFSET]: "initial",
  [CSS_VARS.FLEX_GAP]: "initial",
});

// Tests
// ==============================================

describe("useFlex", () => {
  test("renders with defaults", () => {
    const example = () => {
      const flex = useFlex();

      return {
        parent: flex.parent(),
        firstChild: flex.child({ index: 0 }),
        child: flex.child(),
      };
    };

    expect(example().parent).toEqual(
      expect.objectContaining({
        ...flexBase,
        ...hStack("1rem"),
      })
    );

    expect(example().firstChild).toEqual(
      expect.objectContaining({
        marginTop: `var(${CSS_VARS.FLEX_GAP}, initial)`,
        marginRight: `var(${CSS_VARS.FLEX_GAP}, initial)`,
        marginBottom: `var(${CSS_VARS.FLEX_GAP}, initial)`,
        marginLeft: `var(${CSS_VARS.FLEX_GAP}, initial)`,
        flex: "0 0 auto",
      })
    );

    expect(example().child).toEqual(
      expect.objectContaining({
        marginTop: `var(${CSS_VARS.FLEX_GAP}, var(${CSS_VARS.FLEX_GAP_TOP}, initial))`,
        marginRight: `var(${CSS_VARS.FLEX_GAP}, initial)`,
        marginBottom: `var(${CSS_VARS.FLEX_GAP}, initial)`,
        marginLeft: `var(${CSS_VARS.FLEX_GAP}, var(${CSS_VARS.FLEX_GAP_LEFT}, initial))`,
        flex: "0 0 auto",
      })
    );
  });

  describe("with responsive props", () => {
    test("with single media query", () => {
      const bp = "25em";
      const example = () => {
        const flex = useFlex({
          justifyContent: { [mq(bp)]: "space-between" },
        });

        return {
          parent: flex.parent(),
          child: flex.child(),
        };
      };

      expect(example().parent).toHaveProperty(
        mq(bp),
        expect.objectContaining({
          justifyContent: "space-between",
        })
      );
    });

    test("with themed values (array) and null to skip", () => {
      const bp = "25em";
      const theme = themeArr;
      const example = () => {
        const flex = useFlex({
          gap: [3, null, 4, "4rem"],
          alignItems: [null, "flex-end", "flex-start"],
          justifyContent: ["center", { [mq(bp)]: "space-between" }],
          theme,
        });

        return {
          parent: flex.parent(),
          child: flex.child(),
        };
      };

      expect(example().parent).toEqual(
        expect.objectContaining({
          ...flexBase,
          ...hStack(theme.space[3]),
          justifyContent: "center",
        })
      );
      expect(example().parent).toHaveProperty(
        mq(theme.breakpoints[0]),
        expect.objectContaining({
          alignItems: "flex-end",
        })
      );
      expect(example().parent).toHaveProperty(
        mq(bp),
        expect.objectContaining({
          justifyContent: "space-between",
        })
      );
      expect(example().parent).toHaveProperty(
        mq(theme.breakpoints[1]),
        expect.objectContaining({
          [CSS_VARS.FLEX_GAP_TOP]: `${theme.space[4]}px`,
          [CSS_VARS.FLEX_GAP_LEFT]: `${theme.space[4]}px`,
          alignItems: "flex-start",
        })
      );
      expect(example().parent).toHaveProperty(
        mq(theme.breakpoints[2]),
        expect.objectContaining({
          [CSS_VARS.FLEX_GAP_TOP]: "4rem",
          [CSS_VARS.FLEX_GAP_LEFT]: "4rem",
        })
      );
    });

    test("with themed values (named) and null to skip", () => {
      const bp = "25em";
      const theme = themeNamed;
      const example = () => {
        const flex = useFlex({
          gap: { initial: "medium", medium: "large", large: "small" },
          alignItems: { medium: "flex-end", large: "flex-start" },
          justifyContent: { _: "center", [mq(bp)]: "space-between" },
          theme,
        });

        return {
          parent: flex.parent(),
          child: flex.child(),
        };
      };

      // console.log(example());

      expect(example().parent).toEqual(
        expect.objectContaining({
          ...flexBase,
          ...hStack(theme.space["medium"]),
          justifyContent: "center",
        })
      );
      expect(example().parent).toHaveProperty(
        mq(bp),
        expect.objectContaining({
          justifyContent: "space-between",
        })
      );
      expect(example().parent).toHaveProperty(
        mq(theme.breakpoints["medium"]),
        expect.objectContaining({
          [CSS_VARS.FLEX_GAP_TOP]: `${theme.space["large"]}px`,
          [CSS_VARS.FLEX_GAP_LEFT]: `${theme.space["large"]}px`,
          alignItems: "flex-end",
        })
      );
      expect(example().parent).toHaveProperty(
        mq(theme.breakpoints["large"]),
        expect.objectContaining({
          [CSS_VARS.FLEX_GAP_TOP]: `${theme.space["small"]}px`,
          [CSS_VARS.FLEX_GAP_LEFT]: `${theme.space["small"]}px`,
          alignItems: "flex-start",
        })
      );
    });

    test("without theme should fallback to last value in array", () => {
      const bp = "25em";
      const example = () => {
        const flex = useFlex({
          gap: [3, null, "4rem"],
          alignItems: [null, "flex-end", "center", "flex-start"],
          alignContent: [null, { [mq(bp)]: "space-evenly" }],
        });

        return {
          parent: flex.parent(),
          child: flex.child(),
        };
      };

      expect(example().parent).toEqual(
        expect.objectContaining({
          ...flexBase,
          ...hStack("4rem"),
          alignItems: "flex-start",
        })
      );

      expect(example().parent).toHaveProperty(
        mq(bp),
        expect.objectContaining({
          alignContent: "space-evenly",
        })
      );
    });
  });
});
