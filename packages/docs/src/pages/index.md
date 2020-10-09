> **⚠ <abbr title="Work in Progress">WIP</abbr>**
>
> This page documents changes proposed in the [RFC for V1][rfc], and therefore prone to bugs/sudden API changes. Please use with caution.

> **raam** (estonian) ˈrɑːm _**n**._ frame.

**Beautifully boring cosmetic-free primitives for structure and layout.**

---

## Getting Started

Choose your own boring adventure:

1. [Hooks](#hooks) - complimented by [Recipes](#recipes) <small>(recommended)</small>
2. [Components](#components)

## Hooks

JavaScript style functions to quickly roll-your-own resilient layout components (not just for React.js).

> **Note:** Live demos on this page are written in React.js, but that doesn't mean your restricted to this setup. These hooks should (hopefully) work with the setup of your choice.

### Installation

`npm i --save raam`  
or  
`yarn add raam`

### useFlex

At the time of writing, "flex-`gap`" is only supported by newer versions of [Edge, Chrome and Firefox](https://caniuse.com/flexbox-gap).

It's often the case to approach new CSS features with a `@supports` query, but unfortunately, this is [**not** an option we can take advantage of](https://github.com/w3c/csswg-drafts/issues/3559).

`useFlex()` aims to address this "`gap`" in support, with a plain CSS polyfill powered by [custom properties](#how-it-works).

At the root of your component, `useFlex({ ...options })` is called with your specified options.  
This returns functional styles for:

- `.parent()`
- `.child()`

```jsx live=true
// import { useFlex } from "raam";

() => {
  const flex = useFlex({
    gap: "1rem",
  });

  return (
    <div style={flex.parent()}>
      {Array.from({ length: 3 }).map((item, index) => (
        <div
          key={index}
          style={{
            ...flex.child({ index }),
            backgroundColor: "var(--color-primary)",
            color: "var(--color-white)",
            padding: "0.5rem 1rem",
          }}
        >
          Item {index + 1}
        </div>
      ))}
    </div>
  );
};
```

#### How It Works

Under-the-hood, raam replaces gap with a set of custom properties to control parent and child margins. These are toggled off (back to `initial`) depending on the requirements of specific flex properties; a technique heavily inspired by [David Khourshid's "prop-and-lock"][prop-and-lock] technique.

> For example, when `flexWrap` is `nowrap` (i.e. 'stack'-based layouts) the negative offset margin on the flex parent is toggled **off**.

In `nowrap` based layouts, margins are used in a single direction excluding the first-child.

In `wrap` based layouts, negative margins are used on the outer component to counteract margins inside.  
 It will **not** affect adjacent margins, **but** you will experience issues if you try to adjust it directly - instead consider wrapping the element.

#### Options

| Name             | Type                           | Default  |
| :--------------- | :----------------------------- | :------- |
| `gap`            | `ResponsiveStyleValue`         | `1rem`   |
| `variant`        | `wrap` \| `hStack` \| `vStack` | `hStack` |
| `alignContent`   | `ResponsiveStyleValue`         |          |
| `alignItems`     | `ResponsiveStyleValue`         |          |
| `flexDirection`  | `ResponsiveStyleValue`         | `row`    |
| `flexWrap`       | `ResponsiveStyleValue`         | `nowrap` |
| `justifyContent` | `ResponsiveStyleValue`         |          |
| `justifyItems`   | `ResponsiveStyleValue`         |          |

##### `.parent()`

\*Required

| Name      | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `as`      | `string` | Determines element reset styles              |
| `index`\* | `number` | Used in place of `:*-child` pseudo selectors |

##### `.child()`

| Name         | Type                   | Default    | Description                     |
| :----------- | :--------------------- | :--------- | :------------------------------ |
| `as`         | `ResponsiveStyleValue` |            | Determines element reset styles |
| `flex`       | `ResponsiveStyleValue` | `0 0 auto` |                                 |
| `flexBasis`  | `ResponsiveStyleValue` |            |                                 |
| `flexGrow`   | `ResponsiveStyleValue` |            |                                 |
| `flexShrink` | `ResponsiveStyleValue` |            |                                 |

#### Types

- `ResponsiveStyleValue`

  Accepts either a single `value` for the style property's value, or an array of `value` or `{ "@media query": value }`.

  For example, the following options are acceptable for `gap`:

  - `gap: "2rem"`
  - `gap: [ "2rem", { "@media (min-width: 40em)": "1rem" } ]`

## Components

If rolling-your-own components hasn't got you [_hooked_](#hooks), you may be interested in a pre-built option.

Currently offering solutions for:

- [Theme UI][theme-ui] - `@raam/theme-ui`

> **Migrating from an earlier version of raam?**
>
> Prior to version 1, **raam** exported a set of individual Theme-UI components. These have now moved to into a single `<Flex />` component with variants:
>
> - `<Stack {...options} />` => `<Flex variant="vStack" {...options} />`
> - `<Inline {...options} />` => `<Flex variant="hStack" sx={{ overflowX: "auto" }} {...options} />`
> - `<Wrap {...options} />` => `<Flex variant="wrap" {...options} />`

### Installation

`npm i --save theme-ui @raam/theme-ui`  
or  
`yarn add theme-ui @raam/theme-ui`

### Flex

A [`flex`](#use-flex)-based layout primitive that aims to address the `gap`.

**Note**: using `theme` values is still a [work in progress][rfc].

```jsx live=true
// import { Flex } from "@raam/theme-ui";
// import { Box } from "theme-ui";

<Flex variant="hStack" gap="2rem">
  {Array.from({ length: 6 }).map((item, index) => (
    <Box
      key={index}
      sx={{
        width: "2rem",
        height: "2rem",
        backgroundColor: "primary",
        filter: index > 0 && `brightness(${100 - index * 10}%)`,
      }}
    />
  ))}
</Flex>
```

#### Props

- Props for [each `useFlex()` option](#options).
  - `gap` also accepts a key from `theme.space` (as a string or number), but if that's not found it'll render the provided string (e.g. `em` or `rem`) or number as a `px` value.
- `as`: change the HTML element rendered ([via Theme UI][theme-ui])

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

- `sx`: apply **themed** styles to the component ([via Theme UI](https://theme-ui.com/sx-prop/)).

## Recipes

1. [Box](#box)
1. [Wrap](#wrap)
1. [VStack](#stack)
1. [HStack](#stack)
1. [Inline](#inline)
1. [Combo](#combo)

### Box

Each recipe assumes you have a [`Box` component](https://styled-system.com/guides/build-a-box/) defined for base styles. In this case, an `sx` prop is used to pass themed style values ([like Theme UI](https://theme-ui.com/sx-prop/)).

You don't necessarily **need** to follow this approach, feel free to make it your own.

### Wrap

A [flex](#useflex)-based layout that renders and 'wraps' children inline, spaced
by the defined [`gap`](#options).

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "./box";

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
            filter: index > 0 && `brightness(${100 - index * 2}%)`,
          }}
        />
      ))}
    </Box>
  );
};
```

#### Customisation

Let's make it more interesting, let's say we want the last item to fill the
remaining available space.

When the `index` indicates the "last child" (the array's length - 1),
we'll pass the additional `flexGrow` parameter to the `.child` and set it to `2`.

With the [`gap`](#options) prop, we also have the ability to create responsive
styles. In this example, we'll reduce the gap size on larger screens.

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "./box";

() => {
  const wrap = useFlex({
    variant: "wrap",
    gap: [
      "2rem",
      {
        "@media (min-width: 40em)": "1rem",
      },
    ],
  });

  const parentAs = "ul";
  const childAs = "li";

  return (
    <Box as={parentAs} sx={wrap.parent({ as: parentAs })}>
      {Array.from({ length: 32 }).map((item, index, arr) => (
        <Box
          as={childAs}
          key={index}
          sx={{
            ...wrap.child({
              as: childAs,
              index,
              flexGrow: arr.length - 1 === index && 2,
            }),
            width: "2rem",
            height: "2rem",
            backgroundColor: "primary",
            filter: index > 0 && `brightness(${100 - index * 2}%)`,
          }}
        />
      ))}
    </Box>
  );
};
```

### Stack

Popularised by [Seek's "Braid"](https://github.com/seek-oss/braid-design-system), the "Stack" is a [flex](#use-flex)-based layout that renders children in a single column or row, spaced by the defined [`gap`](#configuration).

#### VStack

Renders items in a single column.

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "./box";

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

> "Hold up, why don't you just…"
>
> - _"…use `display: grid;`"_  
>   Grid is fantastic for page layouts, but has its caveats for a 'simple' `Stack`:
>   - It doesn't behave reliably for all elements (e.g. [`fieldset`](https://bugs.chromium.org/p/chromium/issues/detail?id=854565))
>   - Can lead to ['blow out'](https://css-tricks.com/preventing-a-grid-blowout/).

#### HStack

The default setting of `useFlex`; the `HStack` renders items in a single row and makes no assumptions on your `overflow`.

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "./box";

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

### Inline

If you'd rather let `hStack` items scroll elegantly in a single line, add an `overflowX` declaration alongside your `.child()` styles.

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "./box";

() => {
  const inline = useFlex({ variant: "hStack", gap: "1rem" });

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
            filter: index > 0 && `brightness(${100 - index * 2}%)`,
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
// import { Box } from "./box";

() => {
  const size = () => `${Math.floor(Math.random() * 4) + 1}rem`;
  const inline = useFlex({
    variant: "hStack",
    gap: "1rem",
    alignItems: "center",
  });

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
            filter: index > 0 && `brightness(${100 - index * 2}%)`,
          }}
        />
      ))}
    </Box>
  );
};
```

### Combo

When combining [`useFlex()`](#useflex) styles, split them across **different** elements to avoid conflicts.

Let's take a look at a more real-world example; a "tag"-list at the bottom of an article:

- Padding is added to the [`Stack`](#stack), [not the `Wrap` directly](#how-it-works).
- [`Wrap`](#wrap) uses the `as` option to render our `ul` with `li` children:

```jsx live=true
// import { useFlex } from "raam";
// import { Box } from "./box";

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

---

### Acknowledgements

Without these projects/people, this project wouldn't exist…

- [**OOCSS** - Nicole Sullivan](https://github.com/stubbornella/oocss/wiki)
- [**Braid** - Seek](https://github.com/seek-oss/braid-design-system)
- [**"Prop-and-Lock"** - David Khourshid][prop-and-lock]

[prop-and-lock]: https://twitter.com/davidkpiano/status/1284155737720205313?lang=en
[reactjs]: https://reactjs.org
[theme-ui]: https://theme-ui.com/
[rfc]: https://github.com/joe-bell/raam/pull/89
