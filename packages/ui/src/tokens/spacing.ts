// packages/ui/src/tokens/spacing.ts

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px (Standard Card Padding)
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px

  // Semantic Spacing
  cardPadding: "var(--spacing-md)",
  containerGap: "var(--spacing-lg)",
} as const;
