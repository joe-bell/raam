import { FLEX_VARS } from "@raam/core";
import { flexbox } from "../src";

// Utils
// ==============================================

const flexBase = {
  display: "flex",
};

// Tests
// ==============================================

describe("flexbox", () => {
  test("renders with defaults", () => {
    const example = () => {
      const { parent, child } = flexbox({
        flexDirection: "row",
        flexWrap: "nowrap",
      });

      return {
        parent: parent(),
        firstChild: child({ index: 0 }),
        child: child({ index: 1 }),
      };
    };

    expect(example().parent).toEqual(
      expect.objectContaining({
        ...flexBase,
      })
    );

    expect(example().firstChild).toEqual(
      expect.objectContaining({
        marginTop: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginRight: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginBottom: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginLeft: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        flex: "0 0 auto",
      })
    );

    expect(example().child).toEqual(
      expect.objectContaining({
        marginTop: `var(${FLEX_VARS.FLEX_GAP}, var(${FLEX_VARS.FLEX_GAP_TOP}, initial))`,
        marginRight: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginBottom: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginLeft: `var(${FLEX_VARS.FLEX_GAP}, var(${FLEX_VARS.FLEX_GAP_LEFT}, initial))`,
        flex: "0 0 auto",
      })
    );
  });
});
