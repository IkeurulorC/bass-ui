import { Meta } from "@storybook/react-vite";
import { CheckBox } from "./Toggle";

const meta: Meta<typeof CheckBox> = {
  title: "Forms/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    "aria-label": "check",
  },
};

export const Large = {
  args: {
    "aria-label": "check",
    size: "lg",
  },
};

export const Small = {
  args: {
    "aria-label": "check",
    size: "sm",
  },
};
