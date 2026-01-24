import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Safari compatibility: Ensure build target supports Safari 14+ and iOS Safari 14+
  build: {
    target: ['safari14', 'ios14'],
    // Ensure modern JS features (optional chaining, nullish coalescing) are transpiled
    minify: 'esbuild',
  },
  server: {
    host: true,
    port: 5173,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  },
});
