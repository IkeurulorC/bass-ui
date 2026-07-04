import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  injectStyle: false,
  minify: true,
  // This tells tsup to treat ALL these packages as external boundaries
  external: [
    "react",
    "react-dom",
    "framer-motion",
    /^@radix-ui\/.*/,
    /^@tanstack\/.*/,
    /^@fontsource\/.*/,
    /^@fontsource-variable\/.*/,
  ],
});
