> ⚠️ **Please note: This RFC is heavily WIP**

# Problem

- Tied to React.js (specifically Theme UI)
  - Types
  - Bundlesize
- Lack of extensibility
  - e.g. controlling last item's `flexGrow`/`flexShrink`
- Implementation isn't immediately clear
  - At the end of the day, it's essentially just a collection of `flex`-based layouts

# Solution

- Hooks
  - Not necessarily React.js hooks but functional mixins that can be re-used for (theoretically) any styling library, with or without React.js
- Migration
  - `raam` => `@raam/theme-ui`

# Caveats

- Why not `:first-child`
- Combining `child` and `parent`

## Alternatives

## Future

- `rowGap` and `columnGap`

# Todo

- [x] Initial project architecture
- [x] Migrate flex-gap system to bespoke CSS custom property setup
- [x] Responsive style props
- [ ] Responsive variants
- [ ] Extend and re-implement types
  - [ ] External `gap` prop (should support number)
  - [ ] Internal `flexGap` prop
  - [ ] CSS output (**help needed** and appreciated) should support major libraries/React.js style attribute
- [ ] Extend and update docs
  - [ ] Add hooks with props table
  - [ ] Add recipes (for users to build their own layout primitives)
- [ ] Extend and update tests
- [x] Migrate components to `@raam/theme-ui`
  - [ ] Support Theme UI responsive props (perhaps a theme transform function in `raam`)
