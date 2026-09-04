# Button

Status: alpha
Source of truth: React package + Storybook
Figma handoff: after playground validation

## Strategy

The Button starts as a native HTML `button` for the best accessibility baseline. Use `asChild` only when the action must render another semantic element, such as an anchor for navigation.

This gives us a scalable path:

- React owns behavior, accessibility, API and states.
- Storybook owns visual validation, usage examples and a11y checks.
- Figma receives the validated anatomy, variants, tokens and examples.
- The portfolio styleguide mirrors decisions, but does not drive the component.

## API

| Prop | Values | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `primary`, `secondary`, `ghost`, `outline`, `destructive`, `link` | `primary` | No editorial or inverse variants in v1. |
| `size` | `xs`, `sm`, `md`, `lg`, `icon`, `icon-sm`, `icon-lg` | `md` | Icon sizes keep fixed aspect ratio. |
| `loading` | `boolean` | `false` | Sets `aria-busy` and disables the button. |
| `disabled` | `boolean` | `false` | Uses native disabled when rendered as `button`. |
| `iconStart` | `ReactNode` | - | Decorative icons should use `aria-hidden`. |
| `iconEnd` | `ReactNode` | - | Decorative icons should use `aria-hidden`. |
| `asChild` | `boolean` | `false` | Uses Radix Slot for semantic composition. |

## States

- Default
- Hover
- Active / pressed
- Focus visible
- Disabled
- Loading

## Accessibility

- Use native `button` for actions.
- Use anchor via `asChild` only for navigation.
- Icon-only buttons must have an accessible label.
- Focus visible must be visually clear against light and dark themes.
- Loading buttons should keep their accessible name and set `aria-busy`.
- Do not use disabled buttons for unavailable navigation links unless `aria-disabled` handling is intentional.

## Token Contract

```
button
  base
    height
    radius
    border
  typography
    font-family
    font-size
    font-weight
  spacing
    padding-x
    gap
  colors
    background
    foreground
    border
  states
    hover
    active
    focus-visible
    disabled
    loading
```

## Figma Handoff Checklist

- Create `Button` component set with variants for `variant`, `size`, `state`, and `icon`.
- Bind surfaces, text, border, radius and spacing to DS variables.
- Document anatomy: root, content, iconStart, label, iconEnd, loading spinner.
- Add examples for destructive actions, links, icon-only actions and loading states.
- Mirror Storybook examples in the component documentation page.
