# portfolio

Monorepo. Apps under `apps/*`, shared packages under `packages/*`. Bun + Turbo + oxc toolchain.

## Working in worktrees with agents

When you finish a task in a worktree and want the user to verify in a browser, start the dev server via:

```sh
bun run agent-dev "<short-label>" [site|playground]
```

- `<short-label>`: a short identifier describing what was done (e.g. `mux-poster-fix`, `dark-mode-strip`). The agent generates this — keep it concise, kebab-case, no spaces.
- App arg is optional; defaults to `site`. Pass `playground` for the playground app.
- Vite picks a free port automatically (`strictPort: false`), so parallel worktrees don't collide.

The wrapper sets `VITE_DEV_LABEL`, which is read by a dev-only `<DevTitle>` in each app's `__root.tsx`. The browser tab title becomes `<label> — <pathname>` so you can tell parallel dev windows apart without remembering ports.

### Production safety

- `<DevTitle>` is guarded by `if (!import.meta.env.DEV) return` — Vite tree-shakes the entire branch in `build`, so the label can never leak into prod bundles.
- `VITE_DEV_LABEL` is only ever set inline by `agent-dev`; no `.env` file is created. `.env*` is already gitignored.
- Static `<title>` meta in `__root.tsx` is the prod title. The dev hook only overrides `document.title` client-side at runtime.
