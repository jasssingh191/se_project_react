import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // deployed at the domain root, not a GitHub Pages subpath
  plugins: [react()],
  server: {
    port: 3000,
  },
});
