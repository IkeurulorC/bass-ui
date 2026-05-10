import { colors } from "./colors";
import { spacing } from "./spacing";
// Inclusive Sans (Variable: Weights 300-700 + Italics)
import "@fontsource-variable/inclusive-sans/index.css";
import "@fontsource-variable/inclusive-sans/standard-italic.css";

// Open Sans (Variable: Weights 300-800 + Italics)
import "@fontsource-variable/open-sans/index.css";
import "@fontsource-variable/open-sans/standard-italic.css";

// Lato (Static: You must import specific weights to match your URL)
import "@fontsource/lato/100.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";

export const tokens = {
  colors,
  spacing,
} as const;

// Helper type for your component props
export type DesignTokens = typeof tokens;

// Example export for easier access
export * from "./colors";
export * from "./spacing";
