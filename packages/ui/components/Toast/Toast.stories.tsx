import { ToastProvider, useToast } from "./ToastContext";
import { ToastProps, ToastProviderProps } from "./ToastQueue";
import ActionButton from "../ActionButton/ActionButton";

// A small wrapper to trigger the toast in Storybook
const ToastTrigger = (args: ToastProps) => {
  const { addToast } = useToast();
  return (
    <ActionButton
      intent={
        args.intent === "success"
          ? "primary"
          : args.intent === "error"
            ? "danger"
            : args.intent === "info"
              ? "ghost"
              : "secondary"
      }
      onClick={() => addToast(args)}
    >
      Fire Toast
    </ActionButton>
  );
};

const ToastScenario = ({
  providerProps,
  toastProps,
}: {
  toastProps: ToastProps;
  providerProps: ToastProviderProps;
}) => (
  <ToastProvider {...providerProps}>
    <ToastTrigger {...toastProps} />
  </ToastProvider>
);

export default {
  title: "Components/Toast",
  component: ToastScenario,
  tags: ["autodocs"],
};

export const Success = {
  args: {
    providerProps: {
      size: "sm",
    },
    toastProps: {
      intent: "success",
      title: "Success",
      description: "Your changes have been saved.",
      duration: 5000,
      size: "sm",
    },
  },
};

export const Info = {
  args: {
    providerProps: {
      size: "sm",
    },
    toastProps: {
      intent: "info",
      title: "Info",
      description: "Your changes have been saved.",
      duration: 5000,
      size: "sm",
    },
  },
};

export const Warning = {
  args: {
    providerProps: {
      size: "sm",
    },
    toastProps: {
      intent: "warning",
      title: "Warning",
      description: "Your changes may not have been saved.",
      duration: 5000,
      size: "sm",
    },
  },
};

export const Error = {
  args: {
    providerProps: {
      size: "sm",
    },
    toastProps: {
      intent: "error",
      title: "Error",
      description: "Something went wrong with the upload.",
      duration: 5000,
      size: "sm",
    },
  },
};
