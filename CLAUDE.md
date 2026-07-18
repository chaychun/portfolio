# portfolio

Static Astro site at the repo root with a sibling local-only Astro interaction
lab. Astro, React island, Motion, Tailwind v4. Bun + oxc toolchain (oxlint,
oxfmt). Bun-only (npm/npx blocked by a hook).

The site builds to `dist/` for Vercel. `lab/` is excluded from deployment and
runs with `bun run dev:lab`.

## Mux Player

Pkg: `@mux/mux-player`.

All videos must use `src/components/Video.astro`, not raw `<mux-player>`.

Caller controls sizing only via wrapper element. Player fills its container.
Don't override autoplay, muted, loop, controls, or tracking. If a future feature
needs controls, audio, or analytics, add it as a separate component.

No env key is needed for anything. Video playback only need playback token per manually uploaded asset.

### Notes for non-standard video config:

- Override default cover with `poster="img url here"` or `thumbnailTime` to choose frame from video itself.
- `MuxPlayerElement` is an `HTMLMediaElement` superset.
