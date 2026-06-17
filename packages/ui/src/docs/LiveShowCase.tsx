// LiveShowcase.tsx
import React from "react";
import { StatusBadge } from "../../components/Status_Badge/StatusBadge";
import { ActionButton } from "../../components/ActionButton/ActionButton";
import { useToast } from "../../components/Toast/ToastContext";
import { ToastProvider } from "../../components/Toast/ToastContext"; // Adjust to your provider path!

// 1. The inner content that hooks into the toast state engine
const LiveShowcaseContent = () => {
  const { addToast } = useToast();

  // 1. Define lists of possible options to shuffle through
  const intents = ["info", "success", "warning", "error"] as const;

  const sampleMessages = [
    {
      title: "Connection Restored",
      description: "Your workspace is back online synced to main.",
    },
    {
      title: "Upload Failed",
      description: "The server rejected the payload format. Please retry.",
    },
    {
      title: "Changes Pending",
      description:
        "You have unsaved form states that will be wiped if you exit.",
    },
    {
      title: "Action Completed",
      description: "Transaction executed perfectly on the ledger block.",
    },
    {
      title: "Low Battery Warning",
      description: "System power dropped past 15%. Plugging in recommended.",
    },
  ];

  const handleTrigger = () => {
    // 2. Pick a random item from each list
    const randomIntent = intents[Math.floor(Math.random() * intents.length)];
    const randomMessage =
      sampleMessages[Math.floor(Math.random() * sampleMessages.length)];

    // 3. Dispatch the completely randomized toast
    addToast({
      intent: randomIntent,
      title: randomMessage?.title,
      description: randomMessage ? randomMessage.description : " ",
      duration: 5000,
    });
  };

  return (
    <div className="p-6 my-6 border border-neutral-800 rounded-xl bg-slate-950 flex flex-col gap-6">
      {/* Row 1: Asset States */}
      <div className="flex gap-4 items-center">
        <span className="text-sm font-medium text-neutral-400 w-32">
          Network Status:
        </span>
        <div className="flex gap-2">
          <StatusBadge status="successful">Completed</StatusBadge>
          <StatusBadge status="pending">Processing</StatusBadge>
          <StatusBadge status="failed">Failed</StatusBadge>
          <StatusBadge status="live">Live Connection</StatusBadge>
        </div>
      </div>

      {/* Row 2: Imperative Toast Notification Trigger */}
      <div className="flex gap-4 items-center">
        <span className="text-sm font-medium text-neutral-400 w-32">
          Execute Action:
        </span>
        <div>
          <ActionButton onClick={handleTrigger}>
            Trigger Random Toast
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

// 2. Wrap the layout with the provider to guarantee safe context resolution
export const LiveShowcase = () => {
  return (
    <ToastProvider>
      <LiveShowcaseContent />
    </ToastProvider>
  );
};
