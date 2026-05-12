#!/usr/bin/env bun
import { spawn } from "node:child_process"

const APPS = new Set(["site", "playground"])

const args = process.argv.slice(2)
let label: string | undefined
let app = "site"

for (const arg of args) {
  if (APPS.has(arg)) app = arg
  else if (!label) label = arg
}

if (!label || !label.trim()) {
  console.error(
    'agent-dev: missing label. Usage: bun run agent-dev "<short-label>" [site|playground]',
  )
  process.exit(1)
}

console.log(`[agent-dev] label="${label}" app="${app}"`)

const child = spawn("bun", ["run", app], {
  stdio: "inherit",
  env: { ...process.env, VITE_DEV_LABEL: label },
})

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  else process.exit(code ?? 0)
})
