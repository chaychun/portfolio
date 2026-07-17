# portfolio

Single app at the repo root — personal site + resume. TanStack Start + Router
(file-based routes) + Nitro, Vite, Tailwind v4, shadcn/ui. Bun + oxc toolchain
(oxlint, oxfmt). Bun-only (npm/npx blocked by a hook).

Prerender enabled (`failOnError: true`) — SSR-incompatible code at module scope
breaks the build.

## Mux Player

Pkg: `@mux/mux-player-react`. Two import paths, both SSR-safe:

- `@mux/mux-player-react` — eager
- `@mux/mux-player-react/lazy` — viewport-deferred (default `loading="viewport"`). Prefer for below-fold or any non-LCP video to avoid shipping `hls.js` (~1.1MB) and `media-chrome` (~450KB) on initial load.

**All videos must use `@/components/video` (`Video` component), not raw `MuxPlayer`.**

Caller controls **sizing only** via wrapper element (e.g. `<div className="aspect-video w-full">`). Player fills container. Don't override `autoPlay`/`muted`/`loop`/controls/tracking — types omit them. If a future feature needs controls/audio/analytics, add it as separate component, don't loosen `Video`.

No env key is needed for anything. Video playback only need playback token per manually uploaded asset.

### Notes for non-standard video config:

- Override default cover with `poster="img url here"` or `thumbnailTime` to choose frame from video itself.
- Always use `autoPlay` prop with `"muted"` as value.
- `ref` exposes `MuxPlayerElement` (HTMLMediaElement superset).
- Events: `on<Event>` (e.g. `onLoadedMetadata`, `onPlay`, `onError`).
