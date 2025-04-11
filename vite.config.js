import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },

  server: {
    port:process.env.PORT || 5173, // Use the Render-provided port or fallback
    host: true, // Expose the server to the network
  },
});


