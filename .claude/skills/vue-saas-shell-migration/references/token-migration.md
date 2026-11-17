# Token migration procedure

How to extract hardcoded color/spacing literals into a semantic CSS custom property layer, scoped to the shell migration rather than attempting a full app-wide token system in one pass.

## 1. Find the literals

```bash
grep -rEon '#[0-9a-fA-F]{3,6}\b' client/src --include='*.vue' --include='*.css'
```

Also check for repeated `rgba(...)` values and any repeated pixel/rem spacing values used across more than one component — these are candidates too, not just hex colors.

## 2. Cluster into semantic buckets

Group the raw values by *role*, not by value. A typical cluster for a shell migration:

| Bucket | Example raw values seen | Token name |
|---|---|---|
| Nav/shell background | `#0f172a` | `--sidebar-bg` |
| Nav/shell foreground | `#f8fafc`, `#94a3b8` | `--sidebar-fg`, `--sidebar-fg-muted` |
| Active/accent state | `#2563eb` | `--sidebar-active-fg` |
| Page background | `#f8fafc` | `--shell-content-bg` |
| Body text | `#1e293b` | `--text-body` |
| Borders/dividers | `#e2e8f0` | `--border-subtle` |

Don't invent more buckets than the app actually uses distinct values for — if two colors are only used once each and aren't part of the nav/shell, leave them as-is rather than over-tokenizing unrelated parts of the app (that's `design-system-architecture`'s job if the user wants it).

## 3. Define the custom properties

Add a `:root { ... }` block (new, or extend an existing one) in the app's global stylesheet — see `sidebar-shell-template.md` for a starting set of names.

## 4. Replace call sites

Replace each literal with `var(--token-name)` at its original location. Do this file-by-file, not with a blind find-and-replace across the whole codebase in one shot — some visually-identical hex values may serve different semantic roles in different components (e.g. the same gray used as both a border and a disabled-text color), and collapsing them into one token would be a real behavior change disguised as a rename.

## 5. Verify no visual diff

After replacing, diff a rendered screenshot of each touched view before/after the token swap (see `browser-and-visual-qa`) — the token migration step should be visually a no-op; any difference means a value was misbucketed in step 2.
