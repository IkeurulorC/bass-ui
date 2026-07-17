// .storybook/preview.ts
import type { Preview } from "@storybook/react"; // Adjusted standard type import
import { withThemeByClassName } from "@storybook/addon-themes";
import { themes } from "storybook/theming"; // <-- Forces the Docs page UI to go dark

//@ts-expect-error: Storybook Context typing mismatch
import "@fontsource-variable/inclusive-sans";
//@ts-expect-error: Storybook Context typing mismatch
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    // 1. Force the Docs tab to be the default view
    viewMode: "docs",

    // 2. Center your beautiful components
    layout: "centered",

    // 3. FORCE the Storybook Docs engine wrapper to use its dark theme
    docs: {
      theme: themes.dark,
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
      config: {
        rules: [
          {
            id: "aria-hidden-focus",
            selector: "body:not(.sb-show-main) *:not([data-radix-focus-guard])",
          },
        ],
      },
    },

    backgrounds: {
      default: "tremor-dark",
      values: [
        {
          name: "tremor-dark",
          value: "#0f172a", // Matches our main workspace Slate-900 background
        },
      ],
    },
  },

  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      // 4. Change defaultTheme to 'dark' so Tailwind injects the "dark" class automatically!
      defaultTheme: "dark",
    }),
  ],
};

export default preview;
