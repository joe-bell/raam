> **raam** (estonian) ˈrɑːm _**n**._ frame.

**Beautifully boring cosmetic-free [React.js][reactjs] components for structure and layout.**

Use **raam**'s layout primitives to build resilient theme-driven designs fast.

---

## Hooks

### useFlex

## Recipes

### Wrap

- `useFlex()`
  - `parent`
  - `child`

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "your-components";

() => {
  const flex = useFlex();

  return (
    <Box sx={flex.parent()}>
      {Array.from({ length: 5 }).map((item, index) => (
        <Box
          key={index}
          sx={{
            ...flex.child({ index }),
            width: "2rem",
            height: "2rem",
            backgroundColor: "primary",
            filter: index > 0 && `hue-rotate(${index * 2}deg)`,
          }}
        />
      ))}
    </Box>
  );
};
```

## Components

> Prior to `v1`, `raam` exported Theme-UI components. These have now moved to `@raam/emotion`.

1. [Wrap](#wrap)
2. [Inline](#inline)
3. [Stack](#stack)
4. [Feature Candidates](#feature-candidates)

### Wrap

A [Flex](#flex)-based layout that renders and 'wraps' children inline spaced
by the defined [`gap`](#configuration).

Here [`gap`](#configuration) is accessing the value from `theme.space[3]`.

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "your-components";

() => {
  const wrap = useFlex({ variant: "wrap" });

  const parentAs = "ul";
  const childAs = "li";

  return (
    <Box as={parentAs} sx={wrap.parent({ as: parentAs })}>
      {Array.from({ length: 32 }).map((item, index) => (
        <Box
          as={childAs}
          key={index}
          sx={{
            ...wrap.child({ as: childAs, index }),
            width: "2rem",
            height: "2rem",
            backgroundColor: "primary",
            filter: index > 0 && `hue-rotate(${index * 2}deg)`,
          }}
        />
      ))}
    </Box>
  );
};
```

#### Responsive

As the [`gap`](#configuration) prop is powered by [Styled System][styled-system], you have the ability to create responsive styles.

Here [`gap`](#configuration) is accessing the value from `theme.space[3]`, then
`theme.space[4]` at `breakpoint[1]` etc.

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "your-components";

() => {
  // TODO
  // <Wrap gap={[2, 3, 4]}>
  const wrap = useFlex({
    variant: "wrap",
    gap: [
      "1rem",
      {
        "@media (min-width: 500px)": "2rem",
      },
      {
        "@media (min-width: 900px)": "3rem",
      },
    ],
  });

  const parentAs = "ul";
  const childAs = "li";

  return (
    <Box as={parentAs} sx={wrap.parent({ as: parentAs })}>
      {Array.from({ length: 32 }).map((item, index) => (
        <Box
          as={childAs}
          key={index}
          sx={{
            ...wrap.child({ as: childAs, index }),
            width: "2rem",
            height: "2rem",
            backgroundColor: "primary",
            filter: index > 0 && `hue-rotate(${index * 2}deg)`,
          }}
        />
      ))}
    </Box>
  );
};
```

#### Example

Let's take a look at a more real-world example; a "tag"-list at the bottom of an article:

- Padding is added to the [`Stack`](#stack), [not the `Wrap` directly](#caveats).
- [`Wrap`](#wrap) uses the [shared configuration](#configuration) to render our `ul` with `li` children:

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "your-components";

() => {
  const stack = useFlex({ variant: "vStack", gap: "1rem" });
  const wrap = useFlex({ variant: "wrap", gap: "1rem" });

  const tagsParentAs = "ul";
  const tagsChildAs = "li";

  return (
    <Box sx={{ padding: 3, ...stack.parent({}) }}>
      <Heading as="h2" sx={stack.child({ index: 0 })}>
        Tags
      </Heading>

      <Box sx={stack.child({ index: 1 })}>
        <Box as={tagsParentAs} sx={wrap.parent({ as: tagsParentAs })}>
          {Array.from({ length: 8 }, (v, k) => k + 1).map((item, index) => (
            <Box
              key={index}
              as={tagsChildAs}
              sx={wrap.child({ as: tagsChildAs, index })}
            >
              <Link key={item} href={`#list-item-${item}`}>
                Tag {item}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
```

### Inline

If you'd rather let items flow elegantly in a single line, make use of `Inline`.

Scroll behaviour can be removed with an `overflow: 'hidden'`.

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "your-components";

() => {
  const inline = useFlex({ variant: "inline", gap: "1rem" });

  return (
    <Box sx={{ ...inline.parent(), overflowX: "auto" }}>
      {Array.from({ length: 32 }).map((item, index) => (
        <Box
          key={index}
          sx={{
            ...inline.child({ index }),
            width: "2rem",
            height: "2rem",
            backgroundColor: "primary",
            filter: index > 0 && `hue-rotate(${index * 2}deg)`,
          }}
        />
      ))}
    </Box>
  );
};
```

or with some more chaotic values…

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "your-components";

() => {
  const size = () => `${Math.floor(Math.random() * 4) + 1}rem`;
  const inline = useFlex({ variant: "inline", gap: "1rem" });

  return (
    <Box sx={{ ...inline.parent(), overflowX: "auto" }}>
      {Array.from({ length: 32 }).map((item, index) => (
        <Box
          key={index}
          sx={{
            ...inline.child({ index }),
            width: size(),
            height: size(),
            backgroundColor: "primary",
            filter: index > 0 && `hue-rotate(${index * 2}deg)`,
          }}
        />
      ))}
    </Box>
  );
};
```

### Stack

Popularised by [Seek's "Braid"](https://github.com/seek-oss/braid-design-system), a [Flex](#flex)-based layout that renders children on top of each other, spaced by the defined [`gap`](#configuration).

#### VStack

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "your-components";

() => {
  const vStack = useFlex({ variant: "vStack", gap: "1rem" });

  return (
    <Box sx={vStack.parent()}>
      {Array.from({ length: 4 }).map((item, index) => (
        <Box
          key={index}
          sx={{
            ...vStack.child({ index }),
            height: "2rem",
            backgroundColor: "primary",
          }}
        />
      ))}
    </Box>
  );
};
```

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "your-components";

() => {
  const hStack = useFlex({ variant: "hStack", gap: "1rem" });

  return (
    <Box sx={hStack.parent()}>
      {Array.from({ length: 8 }).map((item, index) => (
        <Box
          key={index}
          sx={{
            ...hStack.child({ index }),
            width: "2rem",
            height: "2rem",
            backgroundColor: "primary",
          }}
        />
      ))}
    </Box>
  );
};
```

> "Hold up, why don't you just…"
>
> - _"…use `display: grid;`"_  
>   Grid is fantastic for page layouts, but has its caveats for a 'simple' `Stack`:
>   - It doesn't behave reliably for all elements (e.g. [`fieldset`](https://bugs.chromium.org/p/chromium/issues/detail?id=854565))
>   - Can lead to ['blow out'](https://css-tricks.com/preventing-a-grid-blowout/).
> - _"…make `Inline` and `Stack` one component"?_  
>   [↓](#flex)

### Flex

A `display: flex;`-based layout primitive that aims to address the `gap`.

`Stack`, `Wrap` and `Inline` are all effectively "presets" of Flex. Don't like that? It's OK, you can use `Flex` directly without opinionated defaults.

#### Caveats

> **TL;DR:** Mind the Gap

At the time of **raam**'s release, usage of `gap` in flex-based layouts is only supported by Firefox. To address this shortcoming, fallbacks are used:

1. In `nowrap` based layouts, margins are used in a single direction excluding the first-child.
2. In `wrap` based layouts, negative margins are used on the outer component to counteract margins inside.  
   It will **not** affect adjacent margins, **but** you will experience issues if you try to adjust it directly - instead consider wrapping the element.

### Feature Candidates

#### Article

A layout primitive to control vertical rhythm and flow for typographic content.

---

## Setup

### Installation

> **⚠ <abbr title="Work in Progress">WIP</abbr>**
>
> This project is in development and comes with caveats:
>
> 1. Only supports React.js apps with [Emotion][emotion] **or** [Theme UI][theme-ui] pre-installed (for the time being).
> 2. Prone to regular unannounced changes.

`npm i raam --save`  
or  
`yarn add raam`

[reactjs]: https://reactjs.org
[theme-ui]: https://theme-ui.com/

### Configuration

All components use a shared set of `props`:

- `gap`: a dynamic prop that aims to resolve the lack of `gap` support for `display: flex;` in most browsers.

  It accepts a key from `theme.space` (as a string or number), but if that's not found it'll render the provided string (e.g. `em` or `rem`) or number as a `px` value.

- [Color](https://styled-system.com/table#color), [Space](https://styled-system.com/table#space) and [Flexbox](https://styled-system.com/table#flexbox) (excluding `order`, `alignSelf` and `justifySelf`) props from [Styled System][styled-system].
- `as`: change the HTML element rendered ([via Emotion](https://emotion.sh/docs/styled#as-prop)).

  **raam** makes an **opinionated** choice on how to render a
  component's children based on the element provided:

  | `as`            | `children` rendered `as`            |
  | :-------------- | :---------------------------------- |
  | `div` (default) | `div`                               |
  | `ol`            | `li` (with `list-style-type` reset) |
  | `ul`            | `li` (with `list-style-type` reset) |
  | `span`          | `span`                              |
  | `p`             | `span`                              |
  | `h1`-`h6`       | `span`                              |

- `css`: apply styles to the component ([via Emotion](https://emotion.sh/docs/css-prop)).

  **Note**: Use with caution, modifying the margin/padding may not behave as expected.

- `sx`: apply **themed** styles to the component ([via Theme UI](https://theme-ui.com/sx-prop/)).

  **Note**: Heavily recommended to install [Theme UI][theme-ui] before using. As with `css`, use with caution.

### Acknowledgements

Without these projects/people, this project wouldn't exist…

- [**OOCSS** - Nicole Sullivan](https://github.com/stubbornella/oocss/wiki)
- [**Braid** - Seek](https://github.com/seek-oss/braid-design-system)

[emotion]: https://emotion.sh/
[reactjs]: https://reactjs.org
[styled-system]: https://styled-system.com/
[theme-ui]: https://theme-ui.com/
