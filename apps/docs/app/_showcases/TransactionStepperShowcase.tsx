"use client";

import React, { useState } from "react";
import { TransactionStepper, TransactionStep } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const transactionStepperProps: PropRow[] = [
  {
    name: "steps",
    type: "TransactionStep[]",
    description:
      "An array of configuration objects defining the progressive labels, step execution statuses, and micro descriptions for each workflow node.",
    required: true,
    defaultValue: "[]",
  },
  {
    name: "className",
    type: "string",
    description:
      "Optional Tailwind utility classes to override the root structural flexbox container's layout or connector alignment rules.",
    required: false,
  },
];

// --- MOCK STAGE DATASETS ---
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

export function TransactionStepperShowcase() {
  const [currentTimeline, setCurrentTimeline] = useState<number>(0);

  // Array of timelines representing progressive system states
  const timelineStates: TransactionStep[][] = [
    mockPendingSteps,
    [
      {
        ...(mockPendingSteps[0] as TransactionStep),
        status: "PROCESSING" as const,
      },
      mockPendingSteps[1] as TransactionStep,
      mockPendingSteps[2] as TransactionStep,
    ],
    [
      {
        ...(mockPendingSteps[0] as TransactionStep),
        status: "SUCCESS" as const,
      },
      {
        ...(mockPendingSteps[1] as TransactionStep),
        status: "PROCESSING" as const,
      },
      mockPendingSteps[2] as TransactionStep,
    ],
    mockSuccessSteps,
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
            Backend Response Simulator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Cycle through linear system stages to verify layout state-mutations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={() => setCurrentTimeline((prev) => Math.max(0, prev - 1))}
            disabled={currentTimeline === 0}
            className="px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-50 dark:disabled:hover:bg-slate-900/50 rounded-lg transition-colors cursor-pointer"
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
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
          >
            Next Stage →
          </button>

          <button
            onClick={() => setCurrentTimeline(0)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Dynamic Stepper Display Sandbox Canvas */}
      <div className="p-8 sm:p-12 bg-slate-50/20 dark:bg-[#0f172a]/10">
        <div className="w-full max-w-3xl mx-auto rounded-xl bg-slate-950 p-6 sm:p-8 border border-slate-900 shadow-xl">
          <TransactionStepper steps={timelineStates[currentTimeline] ?? []} />
        </div>
      </div>
    </div>
  );
}

export const TransactionStepperAPI = () => {
  return (
    <ApiReference
      componentName="TransactionStepper"
      propsList={transactionStepperProps}
    />
  );
};

export const TransactionStepperCodeString = `
"use client";

import React, { useState } from "react";
// Adjust this import path to match your actual workspace setup
import { TransactionStepper, TransactionStep } from "@bass-ui-kit/core";

// --- MOCK STAGE DATASETS ---
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

export function TransactionStepperShowcase() {
  const [currentTimeline, setCurrentTimeline] = useState<number>(0);

  // Array of timelines representing progressive system states
  const timelineStates: TransactionStep[][] = [
    mockPendingSteps,
    [
      {
        ...(mockPendingSteps[0] as TransactionStep),
        status: "PROCESSING" as const,
      },
      mockPendingSteps[1] as TransactionStep,
      mockPendingSteps[2] as TransactionStep,
    ],
    [
      {
        ...(mockPendingSteps[0] as TransactionStep),
        status: "SUCCESS" as const,
      },
      {
        ...(mockPendingSteps[1] as TransactionStep),
        status: "PROCESSING" as const,
      },
      mockPendingSteps[2] as TransactionStep,
    ],
    mockSuccessSteps,
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
            Backend Response Simulator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Cycle through linear system stages to verify layout state-mutations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex gap-2 self-start sm:self-auto">
          <button
            onClick={() => setCurrentTimeline((prev) => Math.max(0, prev - 1))}
            disabled={currentTimeline === 0}
            className="px-3 py-1.5 text-xs font-semibold border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:hover:bg-slate-50 dark:disabled:hover:bg-slate-900/50 rounded-lg transition-colors cursor-pointer"
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
            className="px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 rounded-lg transition-colors cursor-pointer"
          >
            Next Stage →
          </button>

          <button
            onClick={() => setCurrentTimeline(0)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

        <div className="w-full max-w-3xl mx-auto rounded-xl bg-slate-950 p-6 sm:p-8 border border-slate-900 shadow-xl">
          <TransactionStepper steps={timelineStates[currentTimeline] ?? []} />
        </div>
    </div>
  );
}

`;
