import { createCss, IAtom } from "@stitches/core";
import { config } from "./stitches.config";
import { CSS_VARS } from "@raam/core";

const findById = (property: string, atoms: IAtom[]) =>
  atoms.filter((item) => item.id === property)[0];

describe("flexbox", () => {
  test("should return with themed gap", () => {
    const css = createCss(config, null);

    const atoms = (css({
      flexbox: {
        gap: "$3",
      },
    }) as any).atoms as IAtom[];

    // @TODO

    expect(
      findById("marginright% > *:not(:first-child)initial", atoms).value
    ).toBe(`var(${CSS_VARS.FLEX_GAP}, initial)`);
  });
});
