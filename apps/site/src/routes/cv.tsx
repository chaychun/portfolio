import { createFileRoute, notFound } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"
import { useState } from "react"

const DEV_LABEL_ACTIVE = !!(import.meta.env.DEV && import.meta.env.VITE_DEV_LABEL)

export const Route = createFileRoute("/cv")({
  beforeLoad: () => {
    if (!import.meta.env.DEV) throw notFound()
  },
  head: () => ({
    meta: DEV_LABEL_ACTIVE ? [] : [{ title: "Chayut Chunsamphran — CV" }],
  }),
  component: CV,
})

const css = `
  .cv-root {
    background: #292524;
    color: #1c1917;
    font-family: "PP Neue Montreal", "Neue Montreal", ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-feature-settings: "ss01", "cv11";
    font-weight: 400;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    min-height: 100vh;
    padding: 24px 0 48px;
  }

  .cv-root .sheet {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    margin: 12px auto 0;
    padding: 18mm 16mm 16mm 16mm;
    box-sizing: border-box;
    border: 1px solid rgba(28, 25, 23, 0.06);
    box-shadow:
      0 1px 2px rgba(28, 25, 23, 0.04),
      0 8px 24px rgba(28, 25, 23, 0.06),
      0 32px 64px -16px rgba(28, 25, 23, 0.08);
    position: relative;
  }

  .cv-root .display {
    font-weight: 400;
    font-size: 60pt;
    line-height: 0.92;
    letter-spacing: -0.035em;
    text-wrap: balance;
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
  }
  .cv-root .display em { font-style: italic; font-weight: 400; }

  .cv-root .colophon {
    font-weight: 400;
    font-style: italic;
    font-size: 9pt;
    letter-spacing: -0.005em;
    color: #57534e;
  }

  .cv-root .section-label {
    font-weight: 500;
    font-size: 11pt;
    line-height: 1.55;
    letter-spacing: -0.01em;
    color: #1c1917;
  }

  .cv-root .body {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 1.55;
    letter-spacing: -0.005em;
    color: #57534e;
  }
  .cv-root .body em { font-style: italic; color: #44403c; }

  .cv-root .meta {
    font-weight: 400;
    font-size: 9pt;
    line-height: 1.55;
    font-style: italic;
    letter-spacing: -0.005em;
    color: #a8a29e;
  }

  .cv-root .role-line {
    font-weight: 500;
    font-size: 11pt;
    letter-spacing: -0.005em;
    color: #1c1917;
  }
  .cv-root .role-line em { font-weight: 400; font-style: italic; color: #78716c; }

  .cv-root .lede {
    font-weight: 400;
    font-size: 13pt;
    line-height: 1.45;
    letter-spacing: -0.01em;
    color: #78716c;
    text-wrap: pretty;
  }
  .cv-root .lede .lead { color: #1c1917; }

  .cv-root .photo-slot {
    width: 35mm;
    height: 45mm;
    overflow: hidden;
  }
  .cv-root.with-photo .photo-slot { background: #f5f5f4; }
  .cv-root .photo-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
    transform: scale(2.1);
    transform-origin: center 45%;
    display: block;
    filter: grayscale(0.15) contrast(1.02);
    /* iPhone JPEG carries an HDR gain map — clamp to SDR so it doesn't glow. */
    dynamic-range-limit: standard;
  }
  .cv-root:not(.with-photo) .photo-slot img { display: none; }

  .cv-root ul.dots { list-style: none; padding: 0; margin: 0; }
  .cv-root ul.dots li { padding-left: 1.05em; text-indent: -1.05em; }
  .cv-root ul.dots li::before { content: "—\\00a0\\00a0"; }

  .cv-root a {
    color: inherit;
    text-decoration: none;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .cv-root a:hover {
    color: #f36208;
  }
  .cv-root .inline-link,
  .cv-root .inline-link em { color: #78716c; }
  .cv-root .inline-link:hover,
  .cv-root .inline-link:hover em { color: #f36208; }
  .cv-root .mail-link,
  .cv-root .web-link,
  .cv-root .gh-link { color: #a8a29e; }

  .cv-root .gh-link,
  .cv-root .web-link,
  .cv-root .mail-link,
  .cv-root .tel-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .cv-root .tel-link { color: #a8a29e; }
  .cv-root .gh-icon,
  .cv-root .web-icon,
  .cv-root .mail-icon,
  .cv-root .tel-icon {
    width: 11px;
    height: 11px;
    display: block;
  }

  .cv-root .grid12 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 8mm;
  }

  .cv-root .controls {
    width: 210mm;
    max-width: calc(100% - 32px);
    margin: 0 auto;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    align-items: center;
  }
  .cv-root .controls .photo-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #1c1917;
    user-select: none;
    cursor: pointer;
  }

  /* Vertical margins come from @page (they repeat on every printed page).
     Horizontal margins come from .sheet padding instead of @page: Safari drops
     the right @page margin, bleeding content to the edge. Block padding is
     honored on every page fragment, so left/right stay symmetric. */
  @page { size: A4; margin: 16mm 0 14mm 0; }
  @media print {
    .cv-root { background: #fff; padding: 0; }
    .cv-root .controls,
    .cv-root .no-print { display: none !important; }
    .cv-root .sheet {
      margin: 0;
      border: 0;
      box-shadow: none;
      width: auto;
      min-height: 0;
      padding: 0 14mm;
    }
    .cv-root .avoid-break {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
`

function GhIcon() {
  return (
    <svg
      className="gh-icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
      />
    </svg>
  )
}

function WebIcon() {
  return (
    <svg
      className="web-icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2c2.5 2.7 4 6.4 4 10s-1.5 7.3-4 10c-2.5-2.7-4-6.4-4-10s1.5-7.3 4-10z" />
    </svg>
  )
}

function TelIcon() {
  return (
    <svg
      className="tel-icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg
      className="mail-icon"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function CV() {
  const [withPhoto, setWithPhoto] = useState(true)

  function print() {
    if (typeof window !== "undefined") window.print()
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={`cv-root${withPhoto ? " with-photo" : ""}`}>
        <div className="controls no-print">
          <label className="photo-label">
            <Switch size="sm" checked={withPhoto} onCheckedChange={(v) => setWithPhoto(v)} />
            <span>Photo</span>
          </label>
          <Button
            size="sm"
            onClick={print}
            className="bg-brand text-brand-foreground hover:bg-brand/85"
          >
            Print / PDF
          </Button>
        </div>

        <main className="sheet">
          <header className="grid12 items-end">
            <div className="col-span-3">
              <div className="photo-slot">
                <img src="/resume/IMG_6810.jpeg" alt="Chayut Chunsamphran" />
              </div>
            </div>
            <div className="col-span-9">
              <h1 className="display" style={{ marginLeft: "-0.4rem" }}>
                Chayut
                <br />
                Chunsamphran
              </h1>
            </div>
          </header>

          <section className="grid12 mt-6">
            <div className="col-span-3"></div>
            <div
              className="colophon col-span-9 flex flex-wrap items-center gap-x-3 gap-y-1"
              style={{ fontStyle: "normal" }}
            >
              <a href="tel:+66959583990" className="tel-link">
                <TelIcon />
                <span>+66 95 958 3990</span>
              </a>
              <a href="mailto:chun.chayut@gmail.com" className="mail-link">
                <MailIcon />
                <span>chun.chayut@gmail.com</span>
              </a>
              <a href="https://chayut.me" className="web-link">
                <WebIcon />
                <span>chayut.me</span>
              </a>
              <a href="https://github.com/chaychun" className="gh-link">
                <GhIcon />
                <span>github.com/chaychun</span>
              </a>
            </div>
          </section>

          <section className="grid12 avoid-break mt-6">
            <div className="col-span-3"></div>
            <div className="col-span-9">
              <p className="lede">
                <span className="lead">Interaction-focused designer and developer.</span> Designs
                and builds digital interfaces end-to-end. Using motion, interaction, and interface
                craft as tools for clearer, more intuitive software. Based in Bangkok.
              </p>
            </div>
          </section>

          <section className="grid12 avoid-break mt-14 items-baseline">
            <div className="col-span-3">
              <div className="meta" aria-hidden="true">
                &nbsp;
              </div>
              <div className="section-label mt-1">Education</div>
            </div>
            <div className="body col-span-9">
              <div className="meta">2025.</div>
              <div className="role-line mt-1">
                BSc Physics, <em>First Class Honours, Mahidol University International College.</em>
              </div>
            </div>
          </section>

          <section className="grid12 mt-12 items-baseline">
            <div className="col-span-3">
              <div className="meta" aria-hidden="true">
                &nbsp;
              </div>
              <div className="section-label mt-1">Experience</div>
            </div>
            <div className="body col-span-9 space-y-5">
              <div className="avoid-break">
                <div className="meta">2025-present</div>
                <div className="role-line mt-1">Independent Designer &amp; Developer</div>
                <div className="mt-1">
                  Client and self-directed software products across web and desktop, focusing on
                  motion and interaction.
                </div>
              </div>
            </div>
          </section>

          <section className="grid12 mt-12 items-baseline">
            <div className="col-span-3">
              <div className="section-label">Selected work</div>
            </div>
            <div className="body col-span-9 space-y-5">
              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="role-line">Thai Bus Food Tour</span>
                  <span className="meta flex items-center gap-4">
                    <a href="https://www.thaibusfoodtour.co.th" className="web-link">
                      <WebIcon />
                      <span>thaibusfoodtour.co.th</span>
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  Designed and built the tour company's trilingual marketing site with a CMS-driven
                  blog, embedded booking, and premium-feeling interactions to match the brand's
                  identity. Astro, React, Tailwind.
                </div>
              </div>
              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="role-line">Interaction &amp; Motion Experiments</span>
                  <span className="meta flex items-center gap-4">
                    <a href="https://chayut.me" className="web-link">
                      <WebIcon />
                      <span>chayut.me</span>
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  An ongoing collection of micro-UX and motion studies exploring interface
                  paradigms: gesture-driven animation, adaptive navigation, playful UI, and more.
                </div>
              </div>

              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="role-line">Generated.Wiki</span>
                  <span className="meta flex items-center gap-4">
                    <a href="https://github.com/chaychun/generated-wiki" className="gh-link">
                      <GhIcon />
                      <span>chaychun/generated-wiki</span>
                    </a>
                    <a href="https://generated.wiki" className="web-link">
                      <WebIcon />
                      <span>generated.wiki</span>
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  An encyclopedia that writes itself: every article is generated on demand and
                  rewrites itself per reader, surfacing different depth and detail by reading level
                  or persona.
                </div>
              </div>

              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="role-line">Mula</span>
                  <span className="meta flex items-center gap-4">
                    <a href="https://github.com/chaychun/mula" className="gh-link">
                      <GhIcon />
                      <span>chaychun/mula</span>
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  AI coding tutor whose agent reviews each submission and writes the next lesson
                  around exactly where the learner struggled. Packaged as a native desktop app that
                  runs entirely on-device.
                </div>
              </div>

              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="role-line">InternShips</span>
                  <span className="meta flex items-center gap-4">
                    <a href="https://github.com/chaychun/rotten-apple" className="gh-link">
                      <GhIcon />
                      <span>chaychun/rotten-apple</span>
                    </a>
                    <a href="https://rukoilla.itch.io/intern-ships" className="web-link">
                      <WebIcon />
                      <span>rukoilla.itch.io/intern-ships</span>
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  A cozy 3D creature-catching game for Comfy Jam Summer 2026, built with two
                  collaborators. Designed and built core systems end to end: quests, logbook,
                  spawning and zones, and a day/time cycle. Built in Godot.
                </div>
              </div>
            </div>
          </section>

          <section className="grid12 mt-12 items-baseline">
            <div className="col-span-3">
              <div className="section-label">Research</div>
            </div>
            <div className="body col-span-9 space-y-5">
              <div className="avoid-break">
                <div>
                  <span className="role-line">
                    Unsupervised PINN for solving Schrödinger Equation in 1D Potential Wells
                  </span>
                </div>
                <div className="mt-1">
                  Unsupervised neural network that finds a quantum system's ground state with no
                  training data, using a physics-informed loss derived from the Schrödinger
                  equation. Ground-state energy accurate within 0.5% of exact.
                </div>
              </div>

              <div className="avoid-break">
                <div>
                  <span className="role-line">
                    Mechanism of Restrained Horizontal Surface Frosting with Acoustic Wave
                  </span>
                </div>
                <div className="mt-1">
                  Application of sound wave for restraining frost formation on horizontal surfaces.
                  Presented at the International Conference of Young Scientists and national science
                  fairs.
                </div>
              </div>
            </div>
          </section>

          <section className="grid12 avoid-break mt-12 items-baseline">
            <div className="col-span-3">
              <div className="meta" aria-hidden="true">
                &nbsp;
              </div>
              <div className="section-label">Skills</div>
            </div>
            <div className="body col-span-9">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div>
                  <div className="meta">Design</div>
                  <div>Interaction &amp; motion design, prototyping, interface systems, Figma.</div>
                </div>
                <div>
                  <div className="meta">Engineering</div>
                  <div>
                    TypeScript, React, Next.js, TanStack, Tailwind CSS; Tauri, Electrobun; Godot,
                    Python.
                  </div>
                </div>
                <div>
                  <div className="meta">AI &amp; agents</div>
                  <div>Claude Agent SDK, MCP, LLM tool use, Claude Code.</div>
                </div>
                <div>
                  <div className="meta">Spoken</div>
                  <div>
                    Thai — <em>native</em>
                    <br /> English — <em>fluent</em>.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="grid12 avoid-break mt-12 items-baseline">
            <div className="col-span-3">
              <div className="meta" aria-hidden="true">
                &nbsp;
              </div>
              <div className="section-label mt-1">Certifications</div>
            </div>
            <div className="body col-span-9">
              <div className="meta">2025.</div>
              <div className="role-line mt-1">
                Animations on the Web, <em>by Emil Kowalski.</em>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
