import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/se_project_react/", // Update this to match your repo name
  plugins: [react()],
  server: {
    port: 3000,
  },
});
