// packages/ui/vitest.unit.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  test: {
    name: "unit",
    globals: true,
    environment: "jsdom",
    css: true,
    include: ["**/*.test.{ts,tsx}"],
    // This ensures it doesn't even look at your stories
    exclude: ["**/node_modules/**", "**/dist/**", "**/*.stories.{ts,tsx}"],
  },
});
