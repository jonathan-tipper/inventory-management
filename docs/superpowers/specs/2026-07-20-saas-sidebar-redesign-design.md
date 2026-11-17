# SaaS Sidebar Redesign — Design Spec

Date: 2026-07-20

## Context

The app currently uses a horizontal top nav bar (`client/src/App.vue`) with six hand-written `<router-link>`s, a global unscoped `<style>` block with hardcoded hex colors, and zero responsive handling. The goal is to redesign the shell into a modern SaaS-style interface: a vertical left sidebar in place of the top nav, clean modern card layouts, and an overall professional aesthetic — using the `vue-saas-shell-migration` skill built earlier in this project for exactly this purpose.

**Verified baseline** (via `playwright-cli` against the running dev server at `localhost:3000`):
- Desktop screenshot: `output/playwright/before-desktop.png`. Top nav reads "Catalyst Components / Inventory Management System", tabs are Overview/Inventory/Orders/Finance/Demand Forecast/Reports, with a language switcher and profile menu (avatar "JD" / "John Doe") on the right. Below it, a `FilterBar` with Time Period / Location / Category / Order Status dropdowns spans full width.
- Narrow-viewport screenshot (375×800): `output/playwright/before-narrow.png`. Confirms the nav breaks completely below desktop width — only the "Overview" tab remains visible, the rest of the tabs and the profile/language controls are pushed off-screen, and the filter bar clips. This is real evidence for why responsive collapse is needed, not a hypothetical.
- Console output during load surfaced two pre-existing issues unrelated to this redesign: a `PurchaseOrderModal` component fails to resolve on the Dashboard, and `GET /api/tasks` 404s. **Out of scope** — noted here so they aren't mistaken for regressions introduced by this work.
- Router (`client/src/main.js`) has exactly 6 routes matching the 6 nav links. `Backlog.vue` exists as a view file but is not registered in the router — already unreachable today, independent of this redesign, and out of scope to wire up.

## Decisions (confirmed with user)

1. **Skill**: Use the `vue-saas-shell-migration` project skill (`.claude/skills/vue-saas-shell-migration/`) for the nav/shell conversion.
2. **Color tokens**: Keep the existing palette (slate/gray `#0f172a`/`#64748b`/`#e2e8f0`, blue accent `#2563eb`, existing status colors). Extract into semantic CSS custom properties — no new brand colors introduced.
3. **Non-nav header elements** (`FilterBar`, `ProfileMenu`, `LanguageSwitcher`, `ProfileDetailsModal`, `TasksModal`): keep a slim top bar alongside the sidebar rather than folding everything into the sidebar.
4. **Responsive behavior**: Icon-only rail below a `768px` breakpoint (labels hidden, tooltip on hover/focus). No off-canvas drawer, no hamburger toggle needed.
5. **Rollout scope**: Build the shell + token layer once, then migrate all 7 view files' card/spacing styling in the same pass (not one-view-at-a-time), since they already share global classes.
6. **Card visual direction**: Refine existing cards, don't rebuild — radius 10px→12px, slightly softer borders/shadows, consistent padding rhythm (1.25rem→1.5rem), no new visual language.
7. **i18n gap**: Fix it. Add a `nav.reports` key alongside the existing 5 `nav.*` keys; wire the new sidebar to use it like every other item.

## Architecture

`App.vue` becomes a thin root: mounts `AppShell.vue`, keeps only app-level state (auth, tasks list and CRUD, modal visibility flags) and passes it down. `AppShell.vue` owns the shell layout: `SidebarNav.vue` on the left, `ShellTopBar.vue` on the right containing `FilterBar` + `LanguageSwitcher` + `ProfileMenu`, and a content region rendering `<router-view>`. `ProfileDetailsModal` and `TasksModal` stay mounted at the `AppShell` level (triggered from `ProfileMenu` in the top bar via the same emits `App.vue` currently handles).

### New components

| Component | Responsibility |
|---|---|
| `AppShell.vue` | Layout skeleton: sidebar + top bar + content region. No business logic. |
| `SidebarNav.vue` | Renders nav items from `nav.config.js`, active-state via Vue Router's `active-class` (replacing the current manual `:class="{ active: $route.path === ... }"` per-link comparisons), collapses to icon-only rail below `768px`. |
| `ShellTopBar.vue` | Hosts `FilterBar`, `LanguageSwitcher`, `ProfileMenu` in a slim horizontal bar above the content area. |
| `nav.config.js` | Single source of truth for the 6 nav items (i18n label key, route, icon), replacing the 6 hand-written `router-link`s in the current `App.vue`. |

Existing components (`FilterBar`, `ProfileMenu`, `LanguageSwitcher`, `ProfileDetailsModal`, `TasksModal`) relocate but keep their existing props/emits contracts unchanged. `main.js`'s 6 routes are unchanged.

### Data flow

Presentation-layer restructuring only — no new data flow. `App.vue`'s existing task-loading/mutation logic (`loadTasks`, `addTask`, `deleteTask`, `toggleTask`) and its `useAuth`/`useI18n` composable usage move down into `AppShell.vue` (or stay in `App.vue` and get passed as props — implementer's call at execution time, functionally equivalent) unchanged in behavior.

## Visual system

New `:root` custom properties in a new stylesheet, `client/src/assets/theme.css`, imported once in `main.js`:

```css
:root {
  --sidebar-bg: #0f172a;
  --sidebar-fg-muted: #94a3b8;
  --sidebar-active-bg: rgba(37, 99, 235, 0.16);
  --sidebar-active-fg: #60a5fa;
  --accent: #2563eb;
  --surface: #ffffff;
  --border-subtle: #e2e8f0;
  --text-heading: #0f172a;
  --text-body: #1e293b;
  --text-muted: #64748b;
  --shell-content-bg: #f8fafc;
  --sidebar-width: 240px;
  --sidebar-width-collapsed: 68px;
}
```

Existing shared classes (`.page-header`, `.stats-grid`, `.stat-card`, `.card`, `.card-header`, `.card-title`, `.badge` variants, table styles — currently defined in `App.vue`'s global `<style>` block, see baseline screenshot) move into `theme.css` with the same structure, re-pointed to these tokens instead of literal hex values, plus the refinement pass from decision #6 (radius, border, shadow, padding).

Follow `references/sidebar-shell-template.md` and `references/token-migration.md` in the `vue-saas-shell-migration` skill for the concrete component code and the hex-to-token extraction procedure, respectively.

## Responsive behavior

Single breakpoint at `768px`. Below it, `SidebarNav` forces icon-only mode automatically (no toggle button needed) — labels hidden, icon-only links, tooltip on hover/focus for accessibility. Above it, a manual pin/expand toggle may optionally be offered. No off-canvas drawer per the confirmed decision.

## Testing / Verification plan

1. Both dev servers running (`uv run python main.py` in `server/`, `npm run dev` in `client/`).
2. Via `playwright-cli` (Playwright MCP is not connected in this environment; the CLI wrapper at `~/.claude/skills/playwright` is the fallback, per that skill):
   - Screenshot desktop width (1280px) and narrow width (375px) for Dashboard, Inventory, and Orders (representative simple/complex/table-heavy views) after migration, and diff against `output/playwright/before-desktop.png` / `before-narrow.png`.
   - Confirm all 6 routes still resolve via sidebar clicks.
   - Confirm keyboard tab order reaches every sidebar link before the content area.
   - Confirm the icon-rail collapse actually triggers at `<768px` and all 6 destinations remain reachable in that state.
3. Confirm no new console errors are introduced (the two pre-existing ones — `PurchaseOrderModal`, `/api/tasks` 404 — are expected and out of scope).
4. Confirm the `nav.reports` i18n key resolves correctly (no missing-key warning, matches the language switcher's other locale(s) if more than one is configured — check `composables/useI18n.js` for how many locales exist).

## Out of scope

- Regrouping or relabeling nav items (would go through `information-architecture-and-flows` if requested separately).
- Fixing the pre-existing `PurchaseOrderModal` resolution warning or `/api/tasks` 404.
- Wiring up the orphaned `Backlog.vue` view.
- Any change to backend (`server/`) code — this is frontend-only.
