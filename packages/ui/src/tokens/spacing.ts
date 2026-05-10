// packages/ui/src/tokens/spacing.ts

export const spacing = {
  modal: {
    spacingXS: "var(--spacing-modal-xs)",
    spacingSM: "var(--spacing-modal-sm)",
    spacingMD: "var(--spacing-modal-md)",
    spacingLG: "var(--spacing-modal-lg)",
    spacingXL: "var(--spacing-modal-xl)",

    radiusSM: "var(--radius-modal-sm)",
    radiusMD: "var(--radius-modal-md)",
    radiusLG: "var(--radius-modal-lg)",
    radiusXL: "var(--radius-modal-xl)",
  },

  // Semantic Spacing
  cardPadding: "var(--spacing-md)",
  containerGap: "var(--spacing-lg)",
} as const;
