#!/usr/bin/env bash
# PreToolUse hook: blocks Bash commands invoking npm/npx/yarn/pnpm/pnpx as
# standalone tokens. Exit 2 = block + feed stderr back to Claude.
set -euo pipefail

input=$(cat)

if command -v jq >/dev/null 2>&1; then
  cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""')
else
  cmd=$(printf '%s' "$input" | python3 -c 'import json,sys; print(json.load(sys.stdin)["tool_input"].get("command",""))')
fi

if printf '%s' "$cmd" | grep -E '(^|[[:space:]&;|`(])(npm|npx|yarn|pnpm|pnpx)([[:space:]]|$)' >/dev/null; then
  echo "Blocked: this repo is bun-only. Use 'bun' / 'bunx' instead." >&2
  echo "Command: $cmd" >&2
  exit 2
fi

exit 0
