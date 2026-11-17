# Sidebar shell template

A concrete, adapt-don't-copy starting point for the `AppShell.vue` + `SidebarNav.vue` pairing described in the main skill workflow. Written with `<script setup>` — flip to Options API if that's the host codebase's convention.

## Token layer (`:root`, typically added to the app's global stylesheet)

```css
:root {
  --sidebar-width: 260px;
  --sidebar-width-collapsed: 72px;
  --sidebar-bg: #0f172a;
  --sidebar-fg: #f8fafc;
  --sidebar-fg-muted: #94a3b8;
  --sidebar-active-bg: rgba(37, 99, 235, 0.16);
  --sidebar-active-fg: #60a5fa;
  --shell-content-bg: #f8fafc;
  --shell-content-max-width: 1600px;
  --shell-gap: 1.5rem;
}
```

Adapt the actual color values to the host app's existing palette (see `token-migration.md`) — these are placeholders, not a fixed brand.

## Nav config (one array, not hand-written links)

```js
// nav.config.js
export const navItems = [
  { label: 'nav.overview', to: '/', icon: 'LayoutDashboard' },
  { label: 'nav.inventory', to: '/inventory', icon: 'Boxes' },
  { label: 'nav.orders', to: '/orders', icon: 'ClipboardList' },
  // ...one entry per existing route — carry over icon choice, permission
  // conditions, and the exact i18n key already used for each label.
]
```

Preserve any `v-if`/permission-gated items as a `visibleWhen` predicate on the item, evaluated in `SidebarNav.vue` — don't drop the gating logic while migrating.

## `SidebarNav.vue`

```vue
<script setup>
import { ref } from 'vue'
import { navItems } from './nav.config'

const collapsed = ref(false)
</script>

<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-brand">
      <span class="brand-mark">●</span>
      <span v-if="!collapsed" class="brand-name">{{ $t('app.name') }}</span>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="sidebar-link"
        active-class="sidebar-link-active"
      >
        <component :is="item.icon" class="sidebar-icon" />
        <span v-if="!collapsed" class="sidebar-label">{{ $t(item.label) }}</span>
      </router-link>
    </nav>

    <button class="sidebar-toggle" @click="collapsed = !collapsed" :aria-label="$t('nav.toggleSidebar')">
      {{ collapsed ? '»' : '«' }}
    </button>
  </aside>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: var(--sidebar-bg);
  color: var(--sidebar-fg);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  transition: width 0.15s ease;
}
.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
}
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 1rem;
  color: var(--sidebar-fg-muted);
  text-decoration: none;
  border-radius: 8px;
  margin: 0.125rem 0.5rem;
}
.sidebar-link-active {
  background: var(--sidebar-active-bg);
  color: var(--sidebar-active-fg);
}
</style>
```

`active-class="sidebar-link-active"` replaces any manual `:class="{ active: $route.path === '/x' }"` comparisons — Vue Router already computes this per-link, including partial matches via `router-link`'s `exact`/`exact-active-class` props if the original logic needs non-exact matching.

## `AppShell.vue`

```vue
<script setup>
import SidebarNav from './SidebarNav.vue'
</script>

<template>
  <div class="app-shell">
    <SidebarNav />
    <main class="shell-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}
.shell-content {
  flex: 1;
  background: var(--shell-content-bg);
  padding: var(--shell-gap);
  max-width: var(--shell-content-max-width);
  margin: 0 auto;
}
</style>
```

`App.vue` (or the router's top-level layout) renders `<AppShell>` in place of the old top-nav markup; everything that was previously inside `<main>`/`<router-view>` stays exactly where it is.

## Responsive collapse (see `responsive-layout-and-typography` for the breakpoint decision itself)

Two common patterns to choose between, not both:
- **Icon rail below breakpoint**: keep the sidebar visible but force `collapsed = true` under a max-width media query or a `useBreakpoints()` composable (VueUse) watcher.
- **Off-canvas drawer below breakpoint**: hide the sidebar entirely, add a hamburger toggle in a slim top bar that overlays it as a drawer.

Whichever is chosen, the toggle state and breakpoint watcher should live in one place (a small composable, e.g. `useSidebarState()`) rather than duplicated across components.
