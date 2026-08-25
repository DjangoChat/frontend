import react from "@vitejs/plugin-react"
import * as path from "node:path"
import { intlayerPlugin } from "vite-intlayer" // Add the plugin to the Vite plugin list
import { defineConfig } from "vitest/config"
import packageJson from "./package.json" with { type: "json" }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), intlayerPlugin()],

  server: {
    host: "0.0.0.0",
    port: 5173,
  },

  test: {
    root: import.meta.dirname,
    name: packageJson.name,
    environment: "jsdom",

    typecheck: {
      enabled: true,
      tsconfig: path.join(import.meta.dirname, "tsconfig.json"),
    },

    globals: true,
    watch: false,
    setupFiles: ["./src/setupTests.ts"],
  },

  resolve: {
    alias: {
      "@": path.join(import.meta.dirname, "./src"),
      "@/components": path.join(import.meta.dirname, "./src/components"),
      "@/constants": path.join(import.meta.dirname, "./src/constants"),
      "@/containers": path.join(import.meta.dirname, "./src/containers"),
      "@/context": path.join(import.meta.dirname, "./src/context"),
      "@/dictionary": path.join(import.meta.dirname, "./src/dictionary"),
      "@/features": path.join(import.meta.dirname, "./src/features"),
      "@/hooks": path.join(import.meta.dirname, "./src/hooks"),
      "@/layouts": path.join(import.meta.dirname, "./src/layouts"),
      "@/redux": path.join(import.meta.dirname, "./src/redux"),
      "@/routers": path.join(import.meta.dirname, "./src/routers"),
      "@/types": path.join(import.meta.dirname, "./src/types"),
      "@/utils": path.join(import.meta.dirname, "./src/utils"),
    },
  },
})
