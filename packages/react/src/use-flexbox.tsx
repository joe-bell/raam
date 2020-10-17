import * as React from "react";
import { DetermineChildProp, determineChild, RaamCSS } from "@raam/core";
import { flexbox, FlexboxProps, FlexboxChildProps } from "raam";

type FlexboxContextElement<T = void> = {
  as: DetermineChildProp;
  style: (props?: T) => RaamCSS;
};

export interface FlexboxContextProps extends FlexboxProps {
  parent: FlexboxContextElement;
  child: FlexboxContextElement<FlexboxChildProps>;
}

export const FlexboxContext = React.createContext<FlexboxContextProps>(null);

export const useFlexbox = () => React.useContext(FlexboxContext);

export interface DefaultFlexboxElementProps {
  children?: React.ReactNode;
}

export interface DefaultFlexboxChildProps
  extends FlexboxChildProps,
    DefaultFlexboxElementProps {}

export interface DefaultFlexboxParentProps extends DefaultFlexboxElementProps {}

export interface FlexProviderProps
  extends FlexboxProps,
    Omit<DefaultFlexboxChildProps, "index">,
    DefaultFlexboxElementProps {
  as?: DetermineChildProp;
}

export interface DefaultFlexboxProps
  extends Omit<
    FlexProviderProps,
    "theme" | "withoutBaseStyles" | "withoutElementStyles"
  > {}

export const FlexProvider: React.FC<FlexProviderProps> = ({
  children,
  ...props
}) => {
  const { parent, child } = flexbox(props);

  return (
    <FlexboxContext.Provider
      value={{
        parent: { as: props.as, style: parent },
        child: {
          as: determineChild(props.as),
          style: (props) => child(props),
        },
      }}
    >
      {children}
    </FlexboxContext.Provider>
  );
};
