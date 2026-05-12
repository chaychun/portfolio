import tailwindcss from "@tailwindcss/vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import viteTsConfigPaths from "vite-tsconfig-paths"

const config = defineConfig({
  server: {
    port: Number(process.env.PORT) || 3001,
    strictPort: false,
  },
  define: {
    "import.meta.env.VITE_DEV_LABEL": JSON.stringify(process.env.VITE_DEV_LABEL ?? ""),
  },
  plugins: [
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),
    tanstackStart({
      spa: { enabled: true },
    }),
    viteReact(),
  ],
})

export default config
