import { Meta } from "@storybook/react-vite";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Forms/Toggle",
  component: Toggle,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    "aria-label": "Toggle Story",
    error: "False Spook!!! Hahaha",
  },
};

export const Disabled = {
  args: {
    "aria-label": "Toggle Story",
    disabled: true,
    error: "False Spook!!! Hahaha",
  },
};
