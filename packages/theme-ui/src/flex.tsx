import * as React from "react";
import { Box, useThemeUI } from "theme-ui";
import {
  useFlex,
  UseFlexParentProps,
  UseFlexStyleProps,
  UseFlexProps,
  RaamStyleProps,
  RaamCSS,
} from "raam";

type FlexStyleProps = {
  [K in UseFlexStyleProps]?:
    | RaamCSS[K]
    | RaamCSS[K][]
    | { [breakpointKey: string]: RaamCSS[K] };
};

type FlexProps = Pick<UseFlexProps, "variant"> &
  Pick<UseFlexParentProps, "as"> &
  FlexStyleProps & {
    sx?: any;
  };

type FlexVariants = FlexProps["variant"];

type Theme = any;

const determineChild = (parent: FlexProps["as"]) =>
  typeof parent === "string"
    ? {
        ul: "li",
        ol: "li",
        span: "span",
        p: "span",
        h1: "span",
        h2: "span",
        h3: "span",
        h4: "span",
        h5: "span",
        h6: "span",
      }[parent] || "div"
    : parent;

type RaamStylePropsValue = RaamStyleProps[keyof RaamStyleProps];

const styledSystemPropertyToRaam = <Properties, Theme>({
  property,
  value,
  theme,
}: {
  property: keyof RaamCSS;
  value: Properties[keyof Properties];
  theme: Theme;
}): RaamStylePropsValue => {
  // Default Values
  // https://github.com/system-ui/theme-ui/blob/483b4e8c65ed1a22e5f284d4ac658eda46e41b93/packages/css/src/index.ts

  const getBreakpoint = (bp: string | number) =>
    `@media screen and (min-width: ${
      (theme.hasOwnProperty("breakpoints") && theme["breakpoints"][bp]) || bp
    })`;

  const propertyThemeKeys = { gap: "space" };
  const themeKey =
    propertyThemeKeys.hasOwnProperty(property) && propertyThemeKeys[property];

  if (Array.isArray(value)) {
    // See https://github.com/microsoft/TypeScript/issues/15300
    // @ts-ignore
    return value.map((v, i) => {
      const ssV = styledSystemPropertyToRaam<Properties, Theme>({
        property,
        value: v,
        theme,
      });

      if (ssV && ssV.constructor.name === "Object") {
        return ssV;
      } else {
        return i === 0 ? ssV : { [getBreakpoint(i - 1)]: ssV };
      }
    });
  } else {
    const breakpoint =
      value && value.constructor.name === "Object" && Object.keys(value)[0];

    const themedValue = themeKey
      ? (theme.hasOwnProperty(themeKey) && theme[themeKey][value]) || value
      : value;

    return value && value.constructor.name === "Object"
      ? { [getBreakpoint(breakpoint)]: themedValue }
      : themedValue;
  }
};

const styledSystemToRaam = <Properties, Theme = any>(
  properties: Properties,
  theme: Theme
): RaamStyleProps =>
  Object.keys(properties).reduce(
    (acc, cv) =>
      Object.assign(acc, {
        [cv]: styledSystemPropertyToRaam<Properties, Theme>({
          // @ts-ignore as we know the property keys are valid
          property: cv,
          value: properties[cv],
          theme,
        }),
      }),
    {}
  );

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as = "div",
      children,
      // flex parent
      alignItems,
      alignContent,
      flexDirection,
      flexWrap,
      gap,
      justifyContent,
      justifyItems,
      variant,
      // flex child
      flex,
      flexBasis,
      flexGrow,
      flexShrink,
      // custom styles
      sx,
      ...props
    },
    ref
  ) => {
    const { theme } = useThemeUI();

    // @TODO Pre-transform Theme-UI's responsive props to `raam`'s style props
    const flexStyles = useFlex(
      styledSystemToRaam<FlexProps, Theme>(
        {
          alignItems,
          alignContent,
          flexDirection,
          flexWrap,
          gap,
          justifyContent,
          justifyItems,
          variant,
        },
        theme
      )
    );
    const childAs = determineChild(as);

    return (
      <Box
        ref={ref}
        as={as}
        sx={{
          ...flexStyles.parent({ as }),
          ...(sx && sx),
        }}
        {...props}
      >
        {React.Children.toArray(children).map((child, index) => (
          <Box
            key={index}
            as={childAs}
            sx={flexStyles.child({
              as: childAs,
              index,
              ...styledSystemToRaam<FlexProps, Theme>(
                { flex, flexBasis, flexGrow, flexShrink },
                theme
              ),
            })}
          >
            {child}
          </Box>
        ))}
      </Box>
    );
  }
);

const Test = () => <Flex alignItems={"initial"} />;
