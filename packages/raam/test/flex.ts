import { useFlex } from "../dist";

describe("useFlex", () => {
  test("renders as hStack by default", () => {
    const sample = () => {
      const flex = useFlex({
        gap: ["1rem", null, "3rem"],
        theme: { breakpoints: ["20em", "40em", "60em", "80em"] },
      });

      return {
        parent: flex.parent(),
        child: flex.child(),
      };
    };

    console.log(sample());

    // Should expect 1rem
    // 3rem at 40em

    expect(sample().parent).toEqual(
      expect.objectContaining({
        display: "flex",
        "--raam-fg-t": expect.any(String),
        "--raam-fg-l": expect.any(String),
        "--raam-fg-offset": expect.any(String),
        "--raam-fg": expect.any(String),
      })
    );
  });
});
