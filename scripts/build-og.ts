import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

import { Resvg } from "@resvg/resvg-js"

const root = join(import.meta.dir, "..")
const siteDir = join(root, "apps/site")
const publicDir = join(siteDir, "public")
const fontPath = join(publicDir, "fonts/PPNeueMontreal-Regular.otf")
const fontBuffer = readFileSync(fontPath)

function render(svgInput: string, outPath: string, width: number) {
  const vb = svgInput.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/)
  if (!vb) throw new Error("missing viewBox")
  const [, vbW, vbH] = vb
  const height = Math.round((width * Number(vbH)) / Number(vbW))
  const svg = svgInput.replace(/<svg([^>]*)>/, (_, attrs) => {
    const cleaned = attrs.replace(/\s(width|height)="[^"]*"/g, "")
    return `<svg${cleaned} width="${width}" height="${height}">`
  })
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontBuffers: [fontBuffer],
      defaultFontFamily: "PP Neue Montreal",
      loadSystemFonts: false,
    },
    background: "#fafaf9",
  })
  const rendered = resvg.render()
  const png = rendered.asPng()
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, png)
  console.log(`wrote ${outPath} dims=${rendered.width}x${rendered.height} (${png.length} bytes)`)
}

const faviconSvg = readFileSync(join(publicDir, "favicon.svg"), "utf8")
render(faviconSvg, join(publicDir, "favicon-32.png"), 32)
render(faviconSvg, join(publicDir, "favicon-192.png"), 192)
render(faviconSvg, join(publicDir, "apple-touch-icon.png"), 180)

const ogSvg = readFileSync(join(publicDir, "og.svg"), "utf8")
render(ogSvg, join(publicDir, "og.png"), 1200)
