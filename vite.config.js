import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/flight": {
        target: "https://travelimpactmodel.googleapis.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/flight/, ""),
      },
      "/weather": {
        target: "https://api.openweathermap.org",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/weather/, ""),
      },
    },
  },
});
