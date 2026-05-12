import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@workspace/ui/components/button"
import { Switch } from "@workspace/ui/components/switch"
import { useState } from "react"

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [{ title: "Chayut Chunsamphran — Resume" }],
  }),
  component: Portfolio,
})

const css = `
  .resume-root {
    background: #fafaf9;
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

  .resume-root .sheet {
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

  .resume-root .display {
    font-weight: 400;
    font-size: 56pt;
    line-height: 0.92;
    letter-spacing: -0.035em;
    text-wrap: balance;
    text-box-trim: trim-both;
    text-box-edge: cap alphabetic;
  }
  .resume-root .display em { font-style: italic; font-weight: 400; }

  .resume-root .colophon {
    font-weight: 400;
    font-style: italic;
    font-size: 9pt;
    letter-spacing: -0.005em;
    color: #57534e;
  }

  .resume-root .section-label {
    font-weight: 500;
    font-size: 11pt;
    line-height: 1;
    letter-spacing: -0.01em;
    color: #1c1917;
  }

  .resume-root .body {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 1.55;
    letter-spacing: -0.005em;
    color: #57534e;
  }
  .resume-root .body em { font-style: italic; color: #44403c; }

  .resume-root .meta {
    font-weight: 400;
    font-size: 9pt;
    font-style: italic;
    letter-spacing: -0.005em;
    color: #a8a29e;
  }

  .resume-root .role-line {
    font-weight: 500;
    font-size: 11pt;
    letter-spacing: -0.005em;
    color: #1c1917;
  }
  .resume-root .role-line em { font-weight: 400; font-style: italic; color: #78716c; }

  .resume-root .lede {
    font-weight: 400;
    font-size: 13pt;
    line-height: 1.45;
    letter-spacing: -0.01em;
    color: #78716c;
    text-wrap: pretty;
  }
  .resume-root .lede .lead { color: #1c1917; }

  .resume-root .photo-slot {
    width: 34mm;
    height: 44mm;
    overflow: hidden;
  }
  .resume-root.with-photo .photo-slot { background: #f5f5f4; }
  .resume-root .photo-slot img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 35%;
    transform: scale(2.1);
    transform-origin: center 45%;
    display: block;
    filter: grayscale(0.15) contrast(1.02);
  }
  .resume-root:not(.with-photo) .photo-slot img { display: none; }

  .resume-root ul.dots { list-style: none; padding: 0; margin: 0; }
  .resume-root ul.dots li { padding-left: 1.05em; text-indent: -1.05em; }
  .resume-root ul.dots li::before { content: "—\\00a0\\00a0"; }

  .resume-root a {
    color: inherit;
    text-decoration: none;
    transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .resume-root a:hover {
    color: #f36208;
  }
  .resume-root .inline-link,
  .resume-root .inline-link em { color: #78716c; }
  .resume-root .inline-link:hover,
  .resume-root .inline-link:hover em { color: #f36208; }
  .resume-root .mail-link,
  .resume-root .web-link,
  .resume-root .gh-link { color: #a8a29e; }

  .resume-root .gh-link,
  .resume-root .web-link,
  .resume-root .mail-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .resume-root .gh-icon,
  .resume-root .web-icon,
  .resume-root .mail-icon {
    width: 11px;
    height: 11px;
    display: block;
  }

  .resume-root .grid12 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    column-gap: 8mm;
  }

  .resume-root .controls {
    width: 210mm;
    max-width: calc(100% - 32px);
    margin: 0 auto;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    align-items: center;
  }
  .resume-root .controls .photo-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #1c1917;
    user-select: none;
    cursor: pointer;
  }

  @page { size: A4; margin: 16mm 14mm 14mm 14mm; }
  @media print {
    .resume-root { background: #fff; padding: 0; }
    .resume-root .sheet { border: 0; }
    .resume-root .controls,
    .resume-root .no-print { display: none !important; }
    .resume-root .sheet {
      margin: 0;
      box-shadow: none;
      width: auto;
      min-height: 0;
      padding: 0;
    }
    .resume-root .avoid-break {
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

function Portfolio() {
  const [withPhoto, setWithPhoto] = useState(true)

  function print() {
    if (typeof window !== "undefined") window.print()
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className={`resume-root${withPhoto ? " with-photo" : ""}`}>
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
            <div className="col-span-9">
              <h1 className="display">
                Chayut
                <br />
                Chunsamphran
              </h1>
            </div>
            <div className="col-span-3 flex justify-end">
              <div className="photo-slot">
                <img src="/resume/IMG_6810.jpeg" alt="Chayut Chunsamphran" />
              </div>
            </div>
          </header>

          <section className="grid12 avoid-break mt-12">
            <div className="col-span-3"></div>
            <div className="col-span-9">
              <div
                className="colophon flex flex-wrap items-center gap-5"
                style={{ fontStyle: "normal" }}
              >
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
              <p className="lede mt-1">
                <span className="lead">
                  Software engineer with focus on user experience and interaction designs.
                </span>{" "}
                Works in TypeScript and React. Experience with AI-assisted development workflows
                since early 2025: design exploration, coding agents, AI-powered products. Based in
                Bangkok, open to remote.
              </p>
            </div>
          </section>

          <section className="grid12 mt-14 items-baseline">
            <div className="col-span-3">
              <div className="section-label">Selected work</div>
            </div>
            <div className="body col-span-9 space-y-5">
              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="role-line">Generated Wiki</span>
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
                  Wikipedia, but generated by LLMs. Explanation adapts to the reader's persona and
                  reading level. Streaming generation, content caching, persona controls.
                </div>
              </div>

              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="role-line">Coding Tutor</span>
                  <span className="meta flex items-center gap-4">
                    <a href="https://github.com/chaychun/coding-tutor" className="gh-link">
                      <GhIcon />
                      <span>chaychun/coding-tutor</span>
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  AI-powered desktop app for learning to code. Agent generates exercises, reviews
                  submissions, and adapts the next lesson to the learner's progress. Built to
                  replace passive tutorial-watching with active, tailored practice.
                </div>
              </div>

              <div className="avoid-break">
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="role-line">Personal Website</span>
                  <span className="meta flex items-center gap-4">
                    <a href="https://github.com/chaychun/portfolio" className="gh-link">
                      <GhIcon />
                      <span>chaychun/portfolio</span>
                    </a>
                    <a href="https://chayut.me" className="web-link">
                      <WebIcon />
                      <span>chayut.me</span>
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  Showcase of more works beyond this resume, alongside a personal collection of web
                  interaction, motion, and micro-UX experiments. Live at{" "}
                  <a href="https://chayut.me" className="inline-link">
                    <em>chayut.me</em>
                  </a>
                  .
                </div>
              </div>

              <div className="avoid-break">
                <div>
                  <span className="role-line">Neural Network Quantum State Solver</span>
                  <span className="meta"> supervised by Dr. Piti Ongmongkolkul</span>
                </div>
                <div className="mt-1">
                  Unsupervised neural network that finds the ground state of an arbitrary potential
                  well using a physics-informed loss. No training data required; loss extends
                  naturally to richer initial conditions such as external fields. Ground state
                  energy prediction accurate within 0.5%.
                </div>
              </div>
            </div>
          </section>

          <section className="grid12 avoid-break mt-12 items-baseline">
            <div className="col-span-3">
              <div className="section-label">Education</div>
            </div>
            <div className="body col-span-9">
              <div className="meta">2025.</div>
              <div className="role-line mt-1">
                BSc Physics, <em>First Class Honours, Mahidol University.</em>
              </div>
            </div>
          </section>

          <section className="grid12 avoid-break mt-12 items-baseline">
            <div className="col-span-3">
              <div className="section-label">Certifications</div>
            </div>
            <div className="body col-span-9">
              <div className="meta">2025.</div>
              <div className="role-line mt-1">
                Animations on the Web, <em>by Emil Kowalski.</em>
              </div>
            </div>
          </section>

          <section className="grid12 avoid-break mt-12 items-baseline">
            <div className="col-span-3">
              <div className="section-label">Skills</div>
            </div>
            <div className="body col-span-9">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                <div>
                  <div className="meta">Languages</div>
                  <div>TypeScript, JavaScript, HTML, CSS, Swift, Python.</div>
                </div>
                <div>
                  <div className="meta">Web</div>
                  <div>React, Next.js, Tanstack, Astro, Tailwind CSS, shadcn/ui.</div>
                </div>
                <div>
                  <div className="meta">Desktop & mobile</div>
                  <div>Tauri, Electrobun, React Native, SwiftUI.</div>
                </div>
                <div>
                  <div className="meta">Tooling</div>
                  <div>Git, Figma, Claude Code,</div>
                </div>
                <div>
                  <div className="meta">Spoken</div>
                  <div>
                    Thai <em>native</em>, English <em>fluent</em>.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
