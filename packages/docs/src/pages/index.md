> **raam** (estonian) ˈrɑːm _**n**._ frame.

**Beautifully boring cosmetic-free [React.js][reactjs] components for structure and layout.**

---

## Introduction

---

### Layout

A flex-based layout primitive.

### Inline

```jsx live=true
// import { Box } from "your-components";
// import { Inline } from "raam";

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

#### No Wrap

If you'd rather let items flow elegantly in a single line, make use of `flex-wrap: nowrap;` to override the default behaviour:

```jsx live=true
// import { Box } from "your-components";
// import { Inline } from "raam";

<Inline gap={3} flexWrap="nowrap">
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
// import { Box } from "your-components";
// import { Inline } from "raam";

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

#### Example

Let's take a look at a more real-world example; a "tag"-list at the bottom of an article:

- Padding is added to the `Stack`, rather than the `Inline` directly.
- Inline uses the [shared configuration](#configuration) to render our `ul` with `li` children:

```jsx live=true
// import { Box, Heading, Link } from "your-components";
// import { Inline, Stack } from "raam";
<Stack padding={3}>
  <Heading as="h2">Tags</Heading>

  <Inline as="ul">
    {Array.from({ length: 8 }, (v, k) => k + 1).map(item => (
      <Link key={item} href={`#list-item-${item}`}>
        Tag {item}
      </Link>
    ))}
  </Inline>
</Stack>
```

> **Caveats**
>
> As of April 2020, flex `gap` is only supported by Firefox. As a fallback,
> negative margins are used on the outer component to counteract margins inside.
> If you place an `Inline` component it will **not** affect the margin flow, but
> you will experience issues if you try to adjust it.
>
> If you want to adjust the margin, you should wrap `Inline` with another
> element.

### Stack

```jsx live=true
// import { Box } from "your-components";
// import { Stack } from "raam";

<Stack gap={3}>
  {Array.from({ length: 4 }).map((item, i) => (
    <Box key={i} sx={{ height: "2rem", backgroundColor: "primary" }} />
  ))}
</Stack>
```

or with some more chaotic values…

```jsx live=true
// import { Box } from "your-components";
// import { Inline } from "raam";

() => {
  const width = () => `${Math.floor(Math.random() * 100) + 1}%`;
  const height = () => `${Math.floor(Math.random() * 4) + 1}rem`;

  return (
    <Stack gap={3}>
      {Array.from({ length: 4 }).map((item, i) => (
        <Box
          key={i}
          sx={{
            width: width(),
            height: height(),
            backgroundColor: "primary",
            filter: i > 0 && `hue-rotate(${i * 2}deg)`,
          }}
        />
      ))}
    </Stack>
  );
};
```

> "Hold up, why don't you just…"
>
> - _"…use `display: grid;`"_  
>   Grid it fantastic for page layouts, but has its caveats for a 'simple' `Stack`:
>   - It doesn't behave reliably for all elements (e.g. [`fieldset`](https://bugs.chromium.org/p/chromium/issues/detail?id=854565))
>   - Can lead to ['blow out'](https://css-tricks.com/preventing-a-grid-blowout/).
> - _"…make `Inline` and `Stack` one component"?_  
>   [Jump back up to the introduction for your answer](#introduction).

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

`npm i raam --save` (or Yarn)

[reactjs]: https://reactjs.org
[theme-ui]: https://theme-ui.com/

### Configuration

All components use a shared set of `props`:

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

[emotion]: https://emotion.sh/
[reactjs]: https://reactjs.org
[theme-ui]: https://theme-ui.com/
