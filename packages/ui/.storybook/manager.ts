// .storybook/manager.ts
import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const tremorTheme = create({
  base: "dark",

  // UI Backgrounds (Deep slate shades)
  appBg: "#090d16", // Midnight slate (Sidebar background)
  appContentBg: "#0f172a", // Slate-900 (Main workspace background)
  appBorderColor: "#1e293b", // Slate-800 (Thin borders)
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", system-ui, -apple-system, sans-serif',
  fontCode: "monospace",

  // Text Colors
  textColor: "#f8fafc", // Slate-50 (High contrast text)
  textInverseColor: "#090d16",
  textMutedColor: "#94a3b8", // Slate-400 (Secondary text)

  // Accent Colors
  colorPrimary: "#3b82f6", // Tremor Blue (Primary actions)
  colorSecondary: "#3b82f6", // Active state indicators

  // Branding (Replace with your own logo or keep it minimal text)
  brandTitle: "BASS UI KIT",
  brandUrl: "https://bass-ui.com",
  brandImage: undefined, // Set to undefined to use the clean brandTitle typography
});

addons.setConfig({
  theme: tremorTheme,
  panelPosition: "bottom", // Keeps test panel neatly tucked below the canvas
});
