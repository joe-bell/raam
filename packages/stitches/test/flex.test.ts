import { createCss, IAtom } from "@stitches/core";
import { config } from "./stitches.config";
import { FLEX_GAP_CSS_VARS as CSS_VARS } from "@raam/core";

const findById = (property: string, atoms: IAtom[]) =>
  atoms.filter((item) => item.id === property)[0];

describe("useFlex", () => {
  test("should return with themed gap", () => {
    const css = createCss(config, null);

    const atoms = (css({
      useFlex: {
        gap: "$3",
      },
    }) as any).atoms as IAtom[];

    // @TODO

    expect(
      findById("marginright% > *:not(:first-child)initial", atoms).value
    ).toBe(`var(${CSS_VARS.FLEX_GAP}, initial)`);
  });
});
