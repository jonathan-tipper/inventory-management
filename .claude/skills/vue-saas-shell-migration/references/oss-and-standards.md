# OSS and standards references

Vue has no single dominant equivalent to shadcn/ui or Radix for nav shells specifically, so the hand-rolled `AppShell.vue` + `SidebarNav.vue` pattern in `sidebar-shell-template.md` is the default this skill teaches. The options below are for when the host app already has a heavier component-library dependency, or the user explicitly wants pre-built primitives rather than a hand-rolled shell.

## Core references

- Vue Router — `active-class` / `exact-active-class` on `router-link`: https://router.vuejs.org/api/interfaces/RouterLinkProps.html
- VueUse — `useBreakpoints()` and `useElementSize()`, useful for driving the sidebar's responsive collapse state without hand-rolling a resize listener: https://vueuse.org/core/useBreakpoints/

## Optional pre-built nav/sidebar primitives

- **reka-ui** (formerly radix-vue) — unstyled, accessible primitives; a reasonable fit if the team wants Radix-style headless components in Vue. Check current license and maintenance activity before adopting, per `web-library-selection`'s general adoption discipline — don't assume parity with the React Radix ecosystem's maturity.
- **PrimeVue** — full component library including sidebar/menu components; heavier dependency, comes with its own theming system that may compete with the token layer this skill introduces. Only reach for this if the app already depends on it or the user wants a full admin-template look rather than a bespoke one.

Prefer the hand-rolled template unless one of these is already a dependency or the user asks for a specific library by name.
