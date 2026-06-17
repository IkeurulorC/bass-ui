import { Meta } from "@storybook/react-vite";
import { CopyField } from "./CopyField";

const meta: Meta<typeof CopyField> = {
  title: "Foundations/CopyField",
  component: CopyField,
  tags: ["autodocs"],
};

export default meta;

export const Default = {
  args: {
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis facere quam ad quod dolorem doloribus esse quidem aliquid repellat, beatae, animi eligendi cum quisquam laudantium reiciendis consectetur neque dolores corporis!",
  },
};
