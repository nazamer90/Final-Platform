import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    middlewareMode: false,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
    // Proxy لتوجيه طلبات API إلى سيرفر SecureHash
    proxy: {
      '/api/moamalat': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 2048,
  },
});
