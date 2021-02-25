import { FLEX_VARS, TFlexDirection, TFlexWrap } from "./types/constants";
import { IRaamCSS } from "./types/css";

type TFlexboxParent = "parent";
type TFlexboxFirstChild = "firstChild";
type TFlexboxNthChild = "nthChild";
type TFlexboxElement = TFlexboxParent | TFlexboxFirstChild | TFlexboxNthChild;

export type TSetFlexResetProp = TFlexboxElement;
export const setFlexReset = (element: TSetFlexResetProp): IRaamCSS => ({
  boxSizing: "border-box",
  minWidth: 0,
  ...({
    parent: {
      /**
       * `ul`
       * Override browser defaults
       */
      paddingLeft: 0,
      listStyleType: "none",
    },
  }[element] || {}),
});

export type TSetFlexBaseProp = TFlexboxElement;
export const setFlexBase = (element: TSetFlexBaseProp): IRaamCSS =>
  ({ parent: { display: "flex" } }[element] || {});

export type TSetFlexDirectionProp = TFlexDirection;
export const setFlexDirection = (value: TSetFlexDirectionProp): IRaamCSS =>
  value
    ? {
        ...({
          // column
          column: {
            [FLEX_VARS.FLEX_GAP_LEFT]: "initial",
          },
          "column-reverse": {
            [FLEX_VARS.FLEX_GAP_LEFT]: "initial",
          },
          // row (and other)
        }[value] || {
          [FLEX_VARS.FLEX_GAP_TOP]: "initial",
        }),
        flexDirection: value,
      }
    : {};

export type TSetFlexWrapProp = TFlexWrap;
export const setFlexWrap = (value: TFlexWrap): IRaamCSS =>
  value
    ? {
        ...({
          // nowrap
          nowrap: {
            [FLEX_VARS.FLEX_GAP_OFFSET]: "initial",
            [FLEX_VARS.FLEX_GAP]: "initial",
          },
          // wrap (and other)
        }[value] || {
          [FLEX_VARS.FLEX_GAP_TOP]: "initial",
          [FLEX_VARS.FLEX_GAP_LEFT]: "initial",
        }),
        flexWrap: value,
      }
    : {};

type TSetFlexGapProps =
  | { element: TFlexboxParent; value: IRaamCSS["gap"] }
  | { element: TFlexboxFirstChild }
  | { element: TFlexboxNthChild };

export const setFlexGap = (props: TSetFlexGapProps) => {
  const value = props.element === "parent" && props.value;
  return (
    {
      parent: {
        /**
         * Replace `gap` with custom properties.
         * These are toggled off (via `initial`) by the appropriate flex property
         * in the latter step.
         */
        [FLEX_VARS.FLEX_GAP_TOP]: value,
        [FLEX_VARS.FLEX_GAP_LEFT]: value,
        [FLEX_VARS.FLEX_GAP_OFFSET]: `calc(${value} * -0.5)`,
        [FLEX_VARS.FLEX_GAP]: `calc(${value} * 0.5)`,
        margin: `var(${FLEX_VARS.FLEX_GAP_OFFSET}, initial)`,
      },
      firstChild: {
        marginTop: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginRight: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginBottom: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginLeft: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
      },
      nthChild: {
        marginTop: `var(${FLEX_VARS.FLEX_GAP}, var(${FLEX_VARS.FLEX_GAP_TOP}, initial))`,
        marginRight: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginBottom: `var(${FLEX_VARS.FLEX_GAP}, initial)`,
        marginLeft: `var(${FLEX_VARS.FLEX_GAP}, var(${FLEX_VARS.FLEX_GAP_LEFT}, initial))`,
      },
    }[props.element] || {}
  );
};
