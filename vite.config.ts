import { defineConfig } from "vite";
base: "/YOUR_REPOSITORY_NAME";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/algorithm-visualizer",
});
