import * as React from "react";
import renderer from "react-test-renderer";
import { matchers } from "jest-emotion";
import { Flexbox, FlexboxItem } from "../src";
import { RaamTheme } from "@raam/core";
import { ThemeProvider as ThemeUIProvider } from "theme-ui";

expect.extend(matchers);

const theme: RaamTheme = {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
};
const renderJSON = (el: React.ReactNode) => renderer.create(el).toJSON();

const themeUIProvider = (el: React.ReactNode) => (
  <ThemeUIProvider theme={theme}>{el}</ThemeUIProvider>
);

describe("Flexbox", () => {
  test("renders", () => {
    const json = renderJSON(
      <Flexbox>
        <FlexboxItem>
          <p>Item 1</p>
        </FlexboxItem>
        <FlexboxItem>
          <p>Item 2</p>
        </FlexboxItem>
        <FlexboxItem>
          <p>Item 3</p>
        </FlexboxItem>
      </Flexbox>
    );
    expect(json).toMatchSnapshot();
  });

  test("renders an array of children", () => {
    const json = renderJSON(
      <Flexbox>
        {" "}
        {[
          <FlexboxItem>Item 1</FlexboxItem>,
          <FlexboxItem>Item 2</FlexboxItem>,
          <FlexboxItem>Item 3</FlexboxItem>,
        ]}
      </Flexbox>
    );
    expect(json).toMatchSnapshot();
  });

  test("renders children as list-items", () => {
    const elements = ["ul", "ol"] as const;
    const lists = renderJSON(
      <>
        {elements.map((element: typeof elements[number]) => (
          <Flexbox key={element} as={element}>
            <FlexboxItem>
              <a href="#1">Item 1</a>
            </FlexboxItem>
            <FlexboxItem>
              <a href="#2">Item 2</a>
            </FlexboxItem>
            <FlexboxItem>
              <a href="#3">Item 3</a>
            </FlexboxItem>
          </Flexbox>
        ))}
      </>
    );

    expect(lists).toMatchSnapshot();
  });

  test("renders children with span elements", () => {
    const elements = ["span", "p", "h1", "h2", "h3", "h4", "h5", "h6"] as const;
    const span = renderJSON(
      <>
        {elements.map((element: typeof elements[number]) => (
          <Flexbox key={element} as={element}>
            <FlexboxItem>
              <a href="#1">Item 1</a>
            </FlexboxItem>
            <FlexboxItem>
              <a href="#2">Item 2</a>
            </FlexboxItem>
            <FlexboxItem>
              <a href="#3">Item 3</a>
            </FlexboxItem>
          </Flexbox>
        ))}
      </>
    );

    expect(span).toMatchSnapshot();
  });

  describe("style props", () => {
    test("renders with customised flexbox props", () => {
      const flex = renderJSON(
        <Flexbox
          gap={5}
          alignContent="flex-end"
          alignItems="center"
          justifyContent="center"
          justifyItems="stretch"
          flex="1 1 auto"
          flexGrow={2}
          flexShrink={1}
          flexBasis="100px"
          flexDirection="column"
          flexWrap="wrap"
        >
          <FlexboxItem>
            <p>Item 1</p>
          </FlexboxItem>
          <FlexboxItem>
            <p>Item 2</p>
          </FlexboxItem>
          <FlexboxItem>
            <p>Item 3</p>
          </FlexboxItem>
        </Flexbox>
      );

      expect(flex).toMatchSnapshot();
    });

    test("renders with defined gap", () => {
      const flex = renderJSON(
        <Flexbox gap="1rem">
          <FlexboxItem>
            <p>Item 1</p>
          </FlexboxItem>
          <FlexboxItem>
            <p>Item 2</p>
          </FlexboxItem>
          <FlexboxItem>
            <p>Item 3</p>
          </FlexboxItem>
        </Flexbox>
      );

      expect(flex).toMatchSnapshot();
    });

    test("renders with defined theme gap", () => {
      const flex = renderJSON(
        themeUIProvider(
          <Flexbox gap={5}>
            <FlexboxItem>
              <p>Item 1</p>
            </FlexboxItem>
            <FlexboxItem>
              <p>Item 2</p>
            </FlexboxItem>
            <FlexboxItem>
              <p>Item 3</p>
            </FlexboxItem>
          </Flexbox>
        )
      );

      expect(flex).toMatchSnapshot();
    });

    test("renders with responsive props", () => {
      const flex = renderJSON(
        themeUIProvider(
          <Flexbox
            gap={[3, null, 5]}
            // @TODO Debug why first item gets ignored
            alignContent={["flex-end", "normal", "flex-start"]}
            alignItems={[null, "revert", "center"]}
            flexWrap={["nowrap", "wrap-reverse"]}
          >
            <FlexboxItem>
              <p>Item 1</p>
            </FlexboxItem>
            <FlexboxItem>
              <p>Item 2</p>
            </FlexboxItem>
            <FlexboxItem>
              <p>Item 3</p>
            </FlexboxItem>
          </Flexbox>
        )
      );

      expect(flex).toMatchSnapshot();
    });
  });

  describe("Variants", () => {
    describe("hStack", () => {
      test("renders", () => {
        const json = renderJSON(
          <Flexbox variant="hStack" gap={4}>
            {[
              <FlexboxItem>Item 1</FlexboxItem>,
              <FlexboxItem>Item 2</FlexboxItem>,
              <FlexboxItem>Item 3</FlexboxItem>,
            ]}
          </Flexbox>
        );
        expect(json).toMatchSnapshot();
      });

      test("renders with defined theme gap", () => {
        const json = renderJSON(
          themeUIProvider(
            <Flexbox variant="hStack" gap={4}>
              {[
                <FlexboxItem>Item 1</FlexboxItem>,
                <FlexboxItem>Item 2</FlexboxItem>,
                <FlexboxItem>Item 3</FlexboxItem>,
              ]}
            </Flexbox>
          )
        );
        expect(json).toMatchSnapshot();
      });
    });

    describe("vStack", () => {
      test("renders", () => {
        const json = renderJSON(
          <Flexbox variant="vStack" gap={4}>
            {[
              <FlexboxItem>Item 1</FlexboxItem>,
              <FlexboxItem>Item 2</FlexboxItem>,
              <FlexboxItem>Item 3</FlexboxItem>,
            ]}
          </Flexbox>
        );
        expect(json).toMatchSnapshot();
      });

      test("renders with defined theme gap", () => {
        const json = renderJSON(
          themeUIProvider(
            <Flexbox variant="vStack" gap={4}>
              {[
                <FlexboxItem>Item 1</FlexboxItem>,
                <FlexboxItem>Item 2</FlexboxItem>,
                <FlexboxItem>Item 3</FlexboxItem>,
              ]}
            </Flexbox>
          )
        );

        expect(json).toMatchSnapshot();
      });
    });

    describe("Wrap", () => {
      test("renders", () => {
        const json = renderJSON(
          <Flexbox variant="vStack">
            {[
              <FlexboxItem>Item 1</FlexboxItem>,
              <FlexboxItem>Item 2</FlexboxItem>,
              <FlexboxItem>Item 3</FlexboxItem>,
            ]}
          </Flexbox>
        );
        expect(json).toMatchSnapshot();
      });

      test("renders with defined theme gap", () => {
        const json = renderJSON(
          themeUIProvider(
            <Flexbox variant="vStack">
              {[
                <FlexboxItem>Item 1</FlexboxItem>,
                <FlexboxItem>Item 2</FlexboxItem>,
                <FlexboxItem>Item 3</FlexboxItem>,
              ]}
            </Flexbox>
          )
        );

        expect(json).toMatchSnapshot();
      });
    });
  });
});