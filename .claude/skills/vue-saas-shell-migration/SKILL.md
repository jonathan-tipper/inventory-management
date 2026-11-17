---
name: vue-saas-shell-migration
description: "Use when redesigning, modernizing, or restructuring a Vue 3 application's navigation and page shell — replacing a top nav bar, tab strip, or hand-rolled router-link menu with a SaaS-style vertical sidebar, or when a Vue app's layout looks generic, inconsistent, or dated and needs a professional app-shell treatment."
license: MIT-0
compatibility: "Portable Agent Skills format for OpenAI Codex and Claude Code. Instruction-only; no network access or credentials required."
metadata:
  author: jonathan-tipper
  version: "1.0.0"
  category: design
---

# Vue SaaS Shell Migration

## Purpose

Convert a Vue 3 application's existing navigation (top bar, tab strip, or hand-rolled `router-link` list) into a persistent left sidebar app shell, extracting a small semantic design-token layer and applying consistent spacing — while preserving every existing route, active-state, permission, and i18n string.

## Use this skill when

- The user asks to turn the app into a "SaaS-style" layout, move navigation to a sidebar, or modernize a dated/generic-looking shell.
- The current nav is a horizontal top bar or tab strip and needs to become a vertical rail.
- The app has accumulated hardcoded colors or inconsistent spacing alongside the nav change.

Out of scope — hand off instead of re-deriving:
- Pure navigation regrouping/relabeling with no visual shell change → `information-architecture-and-flows`.
- General component polish with no nav/shell change → `polished-ui-implementation`.

## Boundaries

- Don't invent new information architecture — take the nav item list as given, or route regrouping decisions through `information-architecture-and-flows`.
- Don't unilaterally pick a collapse breakpoint or pattern — defer to `responsive-layout-and-typography`.
- Don't drop i18n calls, route guards, or permission-gated visibility during migration — functional parity comes before visual change.
- Don't reach for a heavy admin-template or UI-kit dependency when a hand-rolled SFC is proportionate (see `references/oss-and-standards.md`).

## Operating principles

- Detect the current nav implementation and CSS approach before rebuilding anything.
- Preserve functional parity: every route, active-state check, permission, and locale string gets a 1:1 counterpart in the new shell.
- Tokens before pixels: extract hardcoded colors/spacing into CSS custom properties before or alongside building the new shell.
- Build an isolated, swappable shell component first; migrate views into it one at a time, not all at once.
- Responsive collapse behavior is mandatory, not optional, even if the source app has none today.
- Verify visually, not just structurally.

## Workflow

1. **Audit the current shell.** Locate the root layout file. Classify the nav as real `vue-router` `<router-link>`s vs. manually-computed active state (e.g. `$route.path === '/x'`) vs. non-router tab state. Note whether nav items are hand-written per-link or loop-generated from a config array. Find hardcoded color/spacing literals and any shared "shell" CSS classes reused across views. Note i18n coverage gaps (e.g. one label not run through the translation function while the rest are). Also inventory any non-nav persistent elements living in the current header/top bar — search boxes, profile menus, language switchers, global filter bars, notification triggers, modals mounted at the shell level — since these need an explicit new home once the top bar is gone, not just the nav links themselves.
2. **Inventory nav items; defer regrouping.** List every destination, route, icon, and visibility condition. If the user also wants items relabeled or regrouped (not just repositioned), route that decision through `information-architecture-and-flows` before proceeding.
3. **Establish or extend the token layer.** Check for existing CSS custom properties or a Tailwind theme. If none exist, extract a small semantic set scoped to the shell — see `references/token-migration.md` for the extraction procedure and `references/sidebar-shell-template.md` for example token names. Point to `design-system-architecture` if the user wants fuller, app-wide token governance.
4. **Build the sidebar shell.** Follow `references/sidebar-shell-template.md` for a concrete `AppShell.vue` + `SidebarNav.vue` pairing: a sticky vertical rail with a nav list looped from a config array, and a `<main>` region hosting the existing router views. Replace manual `:class="{ active: $route.path === ... }"` comparisons with Vue Router's built-in `active-class` mechanism. Decide where the non-nav persistent elements found in step 1 land — typically either a slim top bar retained alongside the sidebar, or the bottom of the sidebar itself — rather than dropping them.
5. **Define responsive collapse behavior** (icon rail vs. off-canvas drawer) per `responsive-layout-and-typography`. If the source app has zero existing `@media` queries, call that out explicitly — this is new ground, not a migration.
6. **Migrate views incrementally**, verifying each one still renders correctly before moving to the next.
7. **Hand off to the finishing pass.** Use `polished-ui-implementation` for spacing rhythm and state coverage across the migrated views.
8. **Verify.** Screenshot before/after at desktop width and the chosen narrow breakpoint (see `browser-and-visual-qa`). Confirm every original route still resolves and that keyboard focus order through the sidebar is correct.

## Implementation and review rules

- Loop nav items from one config array instead of hand-writing each link.
- Use Vue Router's active-class mechanism, not manual path string comparison.
- Name tokens semantically (`--sidebar-bg`, not `--blue-900`).
- Define sidebar width once as a token so expand/collapse state and content-area margin stay in sync.
- Match the codebase's existing convention (`<script setup>` vs. Options API) rather than introducing a second style.
- Preserve every i18n key call; flag — don't silently "fix" — any nav item that was never wired to i18n.

## Output contract

- The new/updated shell component(s).
- Confirmation that every original route and nav item still resolves correctly.
- The token set introduced and what hardcoded values it replaced.
- The responsive behavior implemented and its breakpoint.
- Which views were migrated this pass vs. which remain.
- Verification actually performed (screenshots, route checks), not merely claimed.

## Definition of done

- Every original destination is reachable with correct active-state highlighting.
- No stray hardcoded hex colors remain in the new shell code.
- A defined, working narrow-viewport collapse behavior exists.
- Visual verification was actually performed.
- No regression in routing, permission-gated visibility, or i18n coverage.

## Supporting references

- `references/sidebar-shell-template.md` — concrete Vue 3 `AppShell.vue` + `SidebarNav.vue` code template.
- `references/token-migration.md` — procedure for extracting hardcoded colors into CSS custom properties.
- `references/oss-and-standards.md` — curated links and optional OSS component options for Vue nav shells.

For nav taxonomy and grouping decisions, consult `information-architecture-and-flows`. For breakpoint/collapse behavior, consult `responsive-layout-and-typography`. For the spacing/state finishing pass, consult `polished-ui-implementation`. For token governance beyond the shell, consult `design-system-architecture`. For visual verification, consult `browser-and-visual-qa`.
