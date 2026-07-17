import { useToast, ActionButton } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

// 1. ToastNotification Props
export const toastNotificationProps: PropRow[] = [
  {
    name: "intent",
    type: '"success" | "info" | "error" | "warning"',
    description:
      "Communicates the semantic nature and visual treatment of the notification's message.",
    required: false,
    defaultValue: '"info"',
  },
  {
    name: "title",
    type: "string",
    description:
      "The prominent primary header text rendered at the top of the toast's message block.",
    required: true,
  },
  {
    name: "icon",
    type: "React.ReactNode | string",
    description:
      "An optional graphical element or asset path to replace or supplement the intent's default status icon.",
    required: false,
  },
  {
    name: "action",
    type: "() => void",
    description:
      "An interactive callback function to perform a simple, quick contextual action within the message bubble. It should always be paired with an explicit string label.",
    required: false,
  },
  {
    name: "duration",
    type: "number",
    description:
      "A numeric value representing how many milliseconds the toast notification remains active in the viewport before auto-dismissing.",
    required: false,
    defaultValue: "5000",
  },
];

// 2. ToastProvider Props
export const toastProviderProps: PropRow[] = [
  {
    name: "className",
    type: "string",
    description:
      "Optional Tailwind utility classes to override the global notification stack viewport layer layout or positioning layout.",
    required: false,
  },
  {
    name: "size",
    type: '"sm" | "md" | "lg"',
    description:
      "Dictates the spatial layout footprint, responsive screen positioning guidelines, and explicit stack container width profiles.",
    required: false,
    defaultValue: '"lg"',
  },
];

export const ToastShowcase = () => {
  const { addToast } = useToast();

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
    const randomIntent = intents[Math.floor(Math.random() * intents.length)];
    const randomMessage =
      sampleMessages[Math.floor(Math.random() * sampleMessages.length)]!;

    addToast({
      intent: randomIntent,
      title: randomMessage.title,
      description: randomMessage.description,
      duration: 5000,
    });
  };
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
            Toast Notification Showcase
          </h2>
          <span
            className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
            title="Live stream simulation active"
          />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          A functional service API designed to provide non-blocking, imperative
          feedback.
        </p>
      </div>
      <div className="flex w-full m-2.5 justify-center">
        <ActionButton onClick={handleTrigger}>
          Trigger Random Toast
        </ActionButton>
      </div>
    </div>
  );
};

export const ToastAPI = () => {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
        Component API Reference
      </h2>
      <ApiReference
        componentName="ToastNotification"
        propsList={toastNotificationProps}
      />
      <ApiReference
        componentName="ToastProvider"
        propsList={toastProviderProps}
      />
    </div>
  );
};

export const ToastCodeSring = `
{/* Remember to surround the entire application root in <ToastProvider></ToastProvider> */}
import { useToast } from "@bass-ui-kit/core";
import { ActionButton } from "@bass-ui-kit/core";

export const ToastRender = () => {
  const { addToast } = useToast();

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
    const randomIntent = intents[Math.floor(Math.random() * intents.length)];
    const randomMessage =
      sampleMessages[Math.floor(Math.random() * sampleMessages.length)]!;

    addToast({
      intent: randomIntent,
      title: randomMessage.title,
      description: randomMessage.description,
      duration: 5000,
    });
  };
  return (
  <ActionButton onClick={handleTrigger}>
    Trigger Random Toast
  </ActionButton>
  )
}

`;
