import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
//@ts-expect-error: Storybook Context typing mismatch
import "@fontsource-variable/inclusive-sans";
//@ts-expect-error: Storybook Context typing mismatch
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
      config: {
        rules: [
          {
            // This disables the "aria-hidden-focus" rule only for Radix guards
            id: "aria-hidden-focus",
            selector: "body:not(.sb-show-main) *:not([data-radix-focus-guard])",
          },
        ],
      },
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
