import { colors } from "./colors";
import { spacing } from "./spacing";

export const tokens = {
  colors,
  spacing,
} as const;

// Helper type for your component props
export type DesignTokens = typeof tokens;

// Example export for easier access
export * from "./colors";
export * from "./spacing";
