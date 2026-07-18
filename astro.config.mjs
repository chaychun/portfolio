import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://chayut.me",
  output: "static",
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
})
