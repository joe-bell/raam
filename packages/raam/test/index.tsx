import * as React from "react";
import renderer from "react-test-renderer";
import { matchers } from "jest-emotion";
import { Inline, Flex, Stack, Wrap } from "../src";
import { ThemeProvider as EmotionProvider } from "emotion-theming";
import { ThemeProvider as ThemeUIProvider } from "theme-ui";

expect.extend(matchers);

const theme = { space: [0, 4, 8, 16, 32, 64, 128, 256, 512] };
const renderJSON = (el: React.ReactNode) => renderer.create(el).toJSON();

const emotionProvider = (el: React.ReactNode) => (
  <EmotionProvider theme={theme}>{el}</EmotionProvider>
);

const themeUIProvider = (el: React.ReactNode) => (
  <ThemeUIProvider theme={theme}>{el}</ThemeUIProvider>
);

describe("Flex", () => {
  test("renders", () => {
    const json = renderJSON(
      <Flex>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      </Flex>
    );
    expect(json).toMatchSnapshot();
  });

  test("renders an array of children", () => {
    const json = renderJSON(<Flex>{["Item 1", "Item 2", "Item 3"]}</Flex>);
    expect(json).toMatchSnapshot();
  });

  test("renders children as list-items", () => {
    const elements = ["ul", "ol"] as const;
    const lists = renderJSON(
      <>
        {elements.map((element: typeof elements[number]) => (
          <Flex key={element} as={element}>
            <a href="#1">Item 1</a>
            <a href="#2">Item 2</a>
            <a href="#3">Item 3</a>
          </Flex>
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
          <Flex key={element} as={element}>
            <a href="#1">Item 1</a>
            <a href="#2">Item 2</a>
            <a href="#3">Item 3</a>
          </Flex>
        ))}
      </>
    );

    expect(span).toMatchSnapshot();
  });

  describe("style props", () => {
    test("renders with customised flexbox props", () => {
      const flex = renderJSON(
        <Flex
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
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </Flex>
      );

      expect(flex).toMatchSnapshot();
    });

    test("renders with defined gap", () => {
      const flex = renderJSON(
        <Flex gap={5}>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </Flex>
      );

      expect(flex).toMatchSnapshot();
    });

    test("renders with defined theme gap (emotion)", () => {
      const flex = renderJSON(
        emotionProvider(
          <Flex gap={5}>
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </Flex>
        )
      );
      expect(flex).toMatchSnapshot();
    });

    test("renders with defined theme gap (theme-ui)", () => {
      const flex = renderJSON(
        themeUIProvider(
          <Flex gap={5}>
            <p>Item 1</p>
            <p>Item 2</p>
            <p>Item 3</p>
          </Flex>
        )
      );

      expect(flex).toMatchSnapshot();
    });
  });
});

describe("Inline", () => {
  test("renders", () => {
    const json = renderJSON(
      <Inline gap={4}>{["Item 1", "Item 2", "Item 3"]}</Inline>
    );
    expect(json).toMatchSnapshot();
  });

  test("renders with defined theme gap (emotion)", () => {
    const json = renderJSON(
      emotionProvider(<Inline gap={4}>{["Item 1", "Item 2", "Item 3"]}</Inline>)
    );
    expect(json).toMatchSnapshot();
  });

  test("renders with defined theme gap (theme-ui)", () => {
    const json = renderJSON(
      themeUIProvider(<Inline gap={4}>{["Item 1", "Item 2", "Item 3"]}</Inline>)
    );

    expect(json).toMatchSnapshot();
  });
});

describe("Stack", () => {
  test("renders", () => {
    const json = renderJSON(
      <Stack gap={4}>{["Item 1", "Item 2", "Item 3"]}</Stack>
    );
    expect(json).toMatchSnapshot();
  });

  test("renders with defined theme gap (emotion)", () => {
    const json = renderJSON(
      emotionProvider(<Stack gap={4}>{["Item 1", "Item 2", "Item 3"]}</Stack>)
    );
    expect(json).toMatchSnapshot();
  });

  test("renders with defined theme gap (theme-ui)", () => {
    const json = renderJSON(
      themeUIProvider(<Stack gap={4}>{["Item 1", "Item 2", "Item 3"]}</Stack>)
    );

    expect(json).toMatchSnapshot();
  });
});

describe("Wrap", () => {
  test("renders", () => {
    const json = renderJSON(
      <Wrap gap={4}>{["Item 1", "Item 2", "Item 3"]}</Wrap>
    );
    expect(json).toMatchSnapshot();
  });

  test("renders with defined theme gap (emotion)", () => {
    const json = renderJSON(
      emotionProvider(<Wrap gap={4}>{["Item 1", "Item 2", "Item 3"]}</Wrap>)
    );
    expect(json).toMatchSnapshot();
  });

  test("renders with defined theme gap (theme-ui)", () => {
    const json = renderJSON(
      themeUIProvider(<Wrap gap={4}>{["Item 1", "Item 2", "Item 3"]}</Wrap>)
    );

    expect(json).toMatchSnapshot();
  });
});
