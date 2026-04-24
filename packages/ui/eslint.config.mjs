// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { config } from "@repo/eslint-config/react-internal";
import eslintConfigPrettier from "eslint-config-prettier/flat";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  someConfig,
  eslintConfigPrettier,
  ...storybook.configs["flat/recommended"],
];
