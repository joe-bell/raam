import {
  IRaamCSS,
  setFlexDirection,
  setFlexWrap,
  setFlexGap,
  setFlexBase,
  setFlexReset,
} from "@raam/core";

interface IWithIndex {
  index?: number;
}

// Flexbox Variants
// ==============================================

type TFlexboxRecipes = "hStack" | "vStack" | "wrap";
export const flexboxRecipes: Record<TFlexboxRecipes, ParentProps> = {
  vStack: { flexDirection: "column", flexWrap: "nowrap" },
  hStack: { flexDirection: "row", flexWrap: "nowrap" },
  wrap: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
};

// parent
// ==============================================

type TParentStyleProps =
  | "alignItems"
  | "alignContent"
  | "flexDirection"
  | "flexWrap"
  | "gap"
  | "justifyContent"
  | "justifyItems";

interface ParentProps extends Pick<IRaamCSS, TParentStyleProps> {}

const parent = ({
  gap,
  flexDirection,
  flexWrap,
  ...props
}: ParentProps): IRaamCSS => ({
  ...setFlexGap({ element: "parent", value: gap }),
  ...setFlexReset("parent"),
  ...setFlexBase("parent"),
  // @ts-ignore
  ...setFlexDirection(flexDirection),
  // @ts-ignore
  ...setFlexWrap(flexWrap),
  ...props,
});

// child
// ==============================================

type TChildStyleProps = "flex" | "flexGrow" | "flexBasis" | "flexShrink";

interface IChildProps
  extends IWithIndex,
    ParentProps,
    Pick<IRaamCSS, TChildStyleProps> {}

const child = ({
  flex = "0 0 auto",
  flexBasis,
  flexGrow,
  flexShrink,
  index = 1,
}: IChildProps): IRaamCSS => {
  const element = index > 0 ? "nthChild" : "firstChild";

  return {
    ...setFlexReset(element),
    ...setFlexBase(element),
    ...setFlexGap({ element }),
    flex,
    flexBasis,
    flexGrow,
    flexShrink,
  };
};

// flexbox
// ==============================================

export interface IFlexboxProps extends ParentProps {}

export interface IFlexboxChildProps
  extends Pick<IChildProps, "index" | TChildStyleProps> {}
export interface IFlexboxChildOwnProps extends IChildProps {}

export type TFlexboxStylePropsKeys = TChildStyleProps | TParentStyleProps;
export interface IFlexboxStyleProps
  extends Pick<IRaamCSS, TFlexboxStylePropsKeys> {}

export const flexbox = (props?: IFlexboxProps) => ({
  parent: () => parent({ ...props }),
  child: (childProps: IFlexboxChildOwnProps = {}) =>
    child({ ...childProps, ...props }),
});
