import * as stitches from "./stitches.config";

describe("flexbox", () => {
  test("should return any gap value", () => {
    const component = stitches.css({
      flexbox: {
        gap: "40px",
      },
    });

    component.toString();
    expect(stitches.toString()).toMatchSnapshot();
  });

  test("should return with themed gap", () => {
    const component = stitches.css({
      flexbox: {
        gap: "$4",
      },
    });

    component.toString();
    expect(stitches.toString()).toMatchSnapshot();
  });

  test("should return responsive themed gap", () => {
    const component = stitches.css({
      flexbox: {
        gap: "$4",
      },
      when: {
        bp1: {
          flexbox: {
            gap: "$6",
          },
        },
      },
    });

    component.toString();
    expect(stitches.toString()).toMatchSnapshot();
  });
});
