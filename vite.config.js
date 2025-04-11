import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        journalActivity: resolve(__dirname, "src/journal/index.html"),
        activities: resolve(__dirname, "src/activities/index.html"),
        breathing: resolve(__dirname, "src/breathing/index.html"),
        listing: resolve(__dirname, "src/listing/index.html"),
        profile: resolve(__dirname, "src/profile/index.html"),
        reflection: resolve(__dirname, "src/reflection/index.html"),
      },
    },
  },

  server: {
    port: process.env.PORT || 5173, // Use the Render-provided port or fallback
    host: true, // Expose the server to the network
  },
});
