// packages/ui/src/tokens/colors.ts

export const colors = {
  // 1. The Pointers to Tailwind/CSS Variables
  action: {
    primary: "var(--color-action-primary)",
    primaryHover: "var(--color-action-primary-hover)",
    ghostHover: "var(--color-action-ghost-hover)",
    actionDisabled: "var(--color-action-disabled)",
    focusRing: "var(--color-focus-ring)",
  },
  sentiment: {
    positive: "var(--color-sentiment-positive-bg)",
    negative: "var(--color-sentiment-negative-bg)",
    warning: "var(--color-sentiment-warning-bg)",
    info: "var(--color-sentiment-info-bg)",
  },
  surface: {
    canvas: "var(--color-surface-canvas)",
    card: "var(--color-surface-card)",
    overlay: "var(--color-surface-overlay)",
  },
  border: {
    subtle: "var(--color-border-subtle)",
    strong: "var(--color-border-strong)",
  },
  text: {
    primary: "var(--color-text-primary)",
    secondary: "var(--color-text-secondary)",
    tertiary: "var(--color-text-tertiary)",
    onInteractive: "var(--color-text-on-interactive)",
  },
  // 2. Component Pointers
  button: {
    primaryBg: "var(--color-btn-primary-bg)",
    primaryBorder: "var(--color-btn-primary-border)",
    primaryText: "var(--color-btn-primary-text)",
    primaryHover: "var(--color-btn-primary-bg-hover)",
    primaryActive: "var(--color-btn-primary-bg-active)",

    secondaryBg: "var(--color-btn-secondary-bg)",
    secondaryBorder: "var(--color-btn-secondary-border)",
    secondaryText: "var(--color-btn-secondary-text)",
    secondaryHover: "var(--color-btn-secondary-bg-hover)",
    secondaryActive: "var(--color-btn-secondary-bg-active)",

    dangerBg: "var(--color-btn-danger-bg)",
    dangerBorder: "var(--color-btn-danger-border)",
    dangerText: "var(--color-btn-danger-text)",
    dangerHover: "var(--color-btn-danger-bg-hover)",
    dangerActive: "var(--color-btn-danger-bg-active)",

    ghostBg: "var(--color-btn-ghost-bg)",
    ghostBorder: "var(--color-btn-ghost-border)",
    ghostText: "var(--color-text-primary)",
    ghostHover: "var(--color-btn-ghost-bg-hover)",
    ghostActive: "var(--color-btn-ghost-bg-active)",

    disabledBg: "var(--color-btn-disabled-bg)",
    disabledText: "var(--color-btn-disabled-text)",
  },
} as const;
