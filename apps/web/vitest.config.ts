/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [viteReact()],
  test: {
    environment: "jsdom",
    globals: true,
  },
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "./src"),
    },
  },
});
