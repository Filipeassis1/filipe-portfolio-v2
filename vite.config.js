import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        lana: "project.html",
        lanaV2: "projects/lana-v2.html",
        elevVisual: "projects/elev-visual.html",
        hubtime: "projects/hubtime.html",
        hubtimeV2: "projects/hubtime-v2.html",
        nauraCouto: "projects/naura-couto.html"
      }
    }
  }
});
