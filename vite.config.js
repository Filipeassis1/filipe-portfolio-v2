import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        lana: "project.html",
        elevVisual: "projects/elev-visual.html",
        hubtime: "projects/hubtime.html",
        nauraCouto: "projects/naura-couto.html"
      }
    }
  }
});
