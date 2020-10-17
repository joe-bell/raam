import * as React from "react";
import { DetermineChildProp, determineChild, RaamCSS } from "@raam/core";
import {
  useFlex as useFlexStyles,
  UseFlexProps,
  UseFlexChildProps,
} from "raam";

type FlexContextElement<T = void> = {
  as: DetermineChildProp;
  style: (props: T) => RaamCSS;
};

export interface FlexContextProps extends UseFlexProps {
  parent: FlexContextElement;
  child: FlexContextElement<UseFlexChildProps>;
}

export const FlexContext = React.createContext<FlexContextProps>(null);

export const useFlex = () => React.useContext(FlexContext);

export interface DefaultFlexElementProps {
  children?: React.ReactNode;
}

export interface DefaultFlexChildProps
  extends UseFlexChildProps,
    DefaultFlexElementProps {}

export interface DefaultFlexParentProps extends DefaultFlexElementProps {}

export interface FlexProviderProps
  extends UseFlexProps,
    Omit<DefaultFlexChildProps, "index">,
    DefaultFlexElementProps {
  as?: DetermineChildProp;
}

export interface DefaultFlexProps
  extends Omit<
    FlexProviderProps,
    "theme" | "withoutBaseStyles" | "withoutElementStyles"
  > {}

export const FlexProvider: React.FC<FlexProviderProps> = ({
  children,
  ...props
}) => {
  const flex = useFlexStyles(props);

  return (
    <FlexContext.Provider
      value={{
        parent: { as: props.as, style: flex.parent },
        child: {
          as: determineChild(props.as),
          style: (props) => flex.child(props),
        },
      }}
    >
      {children}
    </FlexContext.Provider>
  );
};
