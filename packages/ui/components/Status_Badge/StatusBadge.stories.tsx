import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Foundations/StatusBadge",
  component: StatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["successful", "failed", "pending", "live"],
      description: "The structural state of the badge process",
    },
    children: {
      control: "text",
      description: "Custom label text override",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

// 1. Default Lifecycle States
export const Successful: Story = {
  args: {
    status: "successful",
    children: "Successful",
  },
};

export const Failed: Story = {
  args: {
    status: "failed",
    children: "Failed",
  },
};

export const Pending: Story = {
  args: {
    status: "pending",
    children: "Pending",
  },
};

// 2. Continuous System State
export const Live: Story = {
  args: {
    status: "live",
    children: "Live Connection",
  },
};

// 3. Complete Design System Matrix (The Grid View)
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-6 bg-slate-50 rounded-xl border border-slate-200 min-w-[300px]">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Lifecycle States
      </h3>
      <div className="flex flex-wrap gap-3">
        <StatusBadge status="successful">Successful</StatusBadge>
        <StatusBadge status="pending">Pending</StatusBadge>
        <StatusBadge status="failed">Failed</StatusBadge>
      </div>

      <hr className="border-slate-200 my-1" />

      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        System States
      </h3>
      <div className="flex flex-wrap gap-3">
        <StatusBadge status="live">Live Stream</StatusBadge>
      </div>
    </div>
  ),
};
