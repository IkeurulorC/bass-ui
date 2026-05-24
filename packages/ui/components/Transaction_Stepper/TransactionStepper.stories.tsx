import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TransactionStepper, TransactionStep } from "./TransactionStepper";

// 1. Meta Configuration
const meta: Meta<typeof TransactionStepper> = {
  title: "Components/TransactionStepper",
  component: TransactionStepper,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description:
        "Optional additional Tailwind or CSS classes for the container.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TransactionStepper>;

// --- MOCK DATA SETS ---

const mockPendingSteps: TransactionStep[] = [
  {
    id: "1",
    label: "Validate Cart",
    status: "PENDING",
    description: "Checking stock",
  },
  {
    id: "2",
    label: "Payment",
    status: "PENDING",
    description: "Stripe gateway",
  },
  {
    id: "3",
    label: "Fulfillment",
    status: "PENDING",
    description: "Generating label",
  },
];

const mockInProgressSteps: TransactionStep[] = [
  {
    id: "1",
    label: "Validate Cart",
    status: "SUCCESS",
    description: "Stock verified",
  },
  {
    id: "2",
    label: "Payment",
    status: "PROCESSING",
    description: "Authorizing charge...",
  },
  {
    id: "3",
    label: "Fulfillment",
    status: "PENDING",
    description: "Generating label",
  },
];

const mockSuccessSteps: TransactionStep[] = [
  {
    id: "1",
    label: "Validate Cart",
    status: "SUCCESS",
    description: "Stock verified",
  },
  { id: "2", label: "Payment", status: "SUCCESS", description: "Paid $42.00" },
  {
    id: "3",
    label: "Fulfillment",
    status: "SUCCESS",
    description: "Shipped via UPS",
  },
];

const mockFailedSteps: TransactionStep[] = [
  {
    id: "1",
    label: "Validate Cart",
    status: "SUCCESS",
    description: "Stock verified",
  },
  {
    id: "2",
    label: "Payment",
    status: "FAILED",
    description: "Card declined (402)",
  },
  {
    id: "3",
    label: "Fulfillment",
    status: "PENDING",
    description: "Generating label",
  },
];

// --- STORIES ---

// 2. Default/Initial State
export const Initial: Story = {
  args: {
    steps: mockPendingSteps,
  },
};

// 3. In Progress State
export const InProgress: Story = {
  args: {
    steps: mockInProgressSteps,
  },
};

// 4. All Steps Completed successfully
export const FullyCompleted: Story = {
  args: {
    steps: mockSuccessSteps,
  },
};

// 5. System Error/Failure State
export const FailedStep: Story = {
  args: {
    steps: mockFailedSteps,
  },
};

// 6. Interactive Live Simulation Story
// This renders custom interactive controls directly inside the Storybook canvas
export const LiveSimulation = {
  render: () => {
    const [currentTimeline, setCurrentTimeline] = useState<number>(0);

    const timelineStates = [
      mockPendingSteps,
      [
        { ...mockPendingSteps[0], status: "PROCESSING" as const },
        mockPendingSteps[1],
        mockPendingSteps[2],
      ],
      [
        { ...mockPendingSteps[0], status: "SUCCESS" as const },
        { ...mockPendingSteps[1], status: "PROCESSING" as const },
        mockPendingSteps[2],
      ],
      mockSuccessSteps,
    ];

    return (
      <div className="p-4 border border-dashed border-gray-200 rounded-lg bg-gray-50 max-w-5xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-md shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-gray-700">
              Backend Response Simulator
            </h4>
            <p className="text-xs text-gray-500">
              Cycle through states to see data-driven layout changes.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setCurrentTimeline((prev) => Math.max(0, prev - 1))
              }
              disabled={currentTimeline === 0}
              className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 rounded transition"
            >
              ← Prev Stage
            </button>
            <button
              onClick={() =>
                setCurrentTimeline((prev) =>
                  Math.min(timelineStates.length - 1, prev + 1)
                )
              }
              disabled={currentTimeline === timelineStates.length - 1}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 rounded transition"
            >
              Next Stage →
            </button>
            <button
              onClick={() => setCurrentTimeline(0)}
              className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm">
          <TransactionStepper steps={timelineStates[currentTimeline]} />
        </div>
      </div>
    );
  },
};
