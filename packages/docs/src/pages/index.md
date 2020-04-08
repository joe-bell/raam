> **raam** (estonian) ˈrɑːm _**n**._ frame.

**Beautifully boring cosmetic-free [React.js][reactjs] components for structure and layout.**

Use **raam**'s layout primitives to build resilient theme-driven designs fast.

---

## Components

1. [Wrap](#wrap)
2. [Inline](#inline)
3. [Stack](#stack)
4. [Feature Candidates](#feature-candidates)

### Wrap

A [Flex](#flex)-based layout that renders and 'wraps' children inline spaced
by the defined [`gap`](#configuration).

Here [`gap`](#configuration) is accessing the value from `theme.space[3]`.

```jsx live=true
// import { Wrap } from "raam";
// import { Box } from "your-components";

<Wrap gap={3}>
  {Array.from({ length: 32 }).map((item, i) => (
    <Box
      key={i}
      sx={{
        width: "2rem",
        height: "2rem",
        backgroundColor: "primary",
        filter: i > 0 && `hue-rotate(${i * 2}deg)`,
      }}
    />
  ))}
</Wrap>
```

#### Responsive

As the [`gap`](#configuration) prop is powered by [Styled System][styled-system], you have the ability to create responsive styles.

Here [`gap`](#configuration) is accessing the value from `theme.space[3]`, then
`theme.space[4]` at `breakpoint[1]` etc.

```jsx live=true
// import { Wrap } from "raam";
// import { Box } from "your-components";

<Wrap gap={[3, 4, 5]}>
  {Array.from({ length: 32 }).map((item, i) => (
    <Box
      key={i}
      sx={{
        width: "2rem",
        height: "2rem",
        backgroundColor: "primary",
        filter: i > 0 && `hue-rotate(${i * 2}deg)`,
      }}
    />
  ))}
</Wrap>
```

#### Example

Let's take a look at a more real-world example; a "tag"-list at the bottom of an article:

- Padding is added to the [`Stack`](#stack), [not the `Wrap` directly](#caveats).
- [`Wrap`](#wrap) uses the [shared configuration](#configuration) to render our `ul` with `li` children:

```jsx live=true
// import { Stack, Wrap } from "raam";
// import { Box, Heading, Link } from "your-components";

<Stack padding={3}>
  <Heading as="h2">Tags</Heading>

  <Wrap as="ul">
    {Array.from({ length: 8 }, (v, k) => k + 1).map(item => (
      <Link key={item} href={`#list-item-${item}`}>
        Tag {item}
      </Link>
    ))}
  </Wrap>
</Stack>
```

### Inline

If you'd rather let items flow elegantly in a single line, make use of `Inline`.

Scroll behaviour can be removed with an `overflow: 'hidden'`.

```jsx live=true
// import { Inline } from "raam";
// import { Box } from "your-components";

<Inline gap={3}>
  {Array.from({ length: 32 }).map((item, i) => (
    <Box
      key={i}
      sx={{
        width: "2rem",
        height: "2rem",
        backgroundColor: "primary",
        filter: i > 0 && `hue-rotate(${i * 2}deg)`,
      }}
    />
  ))}
</Inline>
```

or with some more chaotic values…

```jsx live=true
// import { Inline } from "raam";
// import { Box } from "your-components";

() => {
  const size = () => `${Math.floor(Math.random() * 4) + 1}rem`;

  return (
    <Inline gap={3} flexWrap="nowrap">
      {Array.from({ length: 32 }).map((item, i) => (
        <Box
          key={i}
          sx={{
            width: size(),
            height: size(),
            backgroundColor: "primary",
            filter: i > 0 && `hue-rotate(${i * 2}deg)`,
          }}
        />
      ))}
    </Inline>
  );
};
```

### Stack

Popularised by [Seek's "Braid"](https://github.com/seek-oss/braid-design-system), a [Flex](#flex)-based layout that renders children on top of each other, spaced by the defined [`gap`](#configuration).

```jsx live=true
// import { Stack } from "raam";
// import { Box } from "your-components";

<Stack gap={3}>
  {Array.from({ length: 4 }).map((item, i) => (
    <Box key={i} sx={{ height: "2rem", backgroundColor: "primary" }} />
  ))}
</Stack>
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

## Getting Started

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

- [Color](https://styled-system.com/table#color), [Space](https://styled-system.com/table#space) and [Flexbox](https://styled-system.com/table#flexbox) prop from [Styled System][styled-system].
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
