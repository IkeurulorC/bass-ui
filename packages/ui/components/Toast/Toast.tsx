import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";
import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ToastVariants = cva(
  "relative overflow-hidden rounded-xl shadow-lg grid grid-cols-[auto_1fr_auto] gap-x-4 p-4 items-start border",
  {
    variants: {
      intent: {
        error: [
          "bg-toast-error-bg",
          "border-toast-error-border",
          "text-toast-error-text",
        ],
        warning: [
          "bg-toast-warning-bg",
          "border-toast-warning-border",
          "text-toast-warning-text",
        ],
        success: [
          "bg-toast-success-bg",
          "border-toast-success-border",
          "text-toast-success-text",
        ],
        info: [
          "bg-toast-info-bg",
          "border-toast-info-border",
          "text-toast-info-text",
        ],
      },
      size: {
        sm: "max-w-[320px] p-3 text-sm",
        md: "max-w-[380px] p-4 text-base",
        lg: "max-w-[440px] p-5 text-base",
      },
    },
    defaultVariants: {
      intent: "info",
      size: "lg",
    },
  }
);

export interface ToastProps
  extends VariantProps<typeof ToastVariants>, Toast.ToastProps {
  title?: string;
  description: string;
  icon?: React.ReactNode | string;
  className?: string;
  viewPort?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  closeButton?: React.ReactNode;
  duration?: number;
}

const ProgressBar = ({
  duration,
  open,
}: {
  duration: number;
  open: boolean;
}) => {
  return (
    <div className="absolute bottom-0 left-0 h-1 w-full bg-black/10 overflow-hidden">
      <motion.div
        // 1. Start at 100% width
        initial={{ width: "100%" }}
        // 2. Animate to 0% width when 'open' is true
        animate={open ? { width: "0%" } : { width: "100%" }}
        transition={{
          duration: duration / 1000,
          ease: "linear",
        }}
        className="h-full bg-current"
      />
    </div>
  );
};

const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

const WarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const intentIcons = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
};

function ToastNotificationTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <Toast.Title className={className}>{children}</Toast.Title>;
}

function ToastNotificationDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Toast.Description className={className}>{children}</Toast.Description>
  );
}

function ToastNotificationAction({
  children,
  className,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}) {
  return (
    <Toast.Action
      altText={action ? action.label : ""}
      className={className}
      onClick={action ? action.onClick : () => {}}
    >
            {children}   
    </Toast.Action>
  );
}

export const ToastNotification = ({
  intent,
  size,
  title,
  description,
  className,
  icon,
  action,
  duration = 5000,
  ...props
}: ToastProps) => {
  const [active, setActive] = useState(false);

  const renderedIcon = icon || intentIcons[intent || "info"];

  useEffect(() => {
    setActive(true);
  }, []);

  return (
    <Toast.Root
      // Ensure onOpenChange updates our local active state
      onOpenChange={(open) => {
        if (!open) setActive(false);
        props.onOpenChange?.(open);
      }}
      className={cn(ToastVariants({ intent, size }), className)}
      duration={duration}
      {...props}
    >
      <div className="flex-shrink-0 pt-0.5">{renderedIcon}</div>
      <div className="flex flex-col gap-1 pr-8">
        <ToastNotificationTitle className="font-semibold">
          {title}
        </ToastNotificationTitle>
        <ToastNotificationDescription className="opacity-90">
          {description}
        </ToastNotificationDescription>
      </div>
      <Toast.Close className="p-0.5 shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <svg
          width="16"
          height="16"
          viewBox="0 0 14 14"
          fill="none"
          className="w-[12px] h-[12px] block dark:text-white"
        >
          <path
            d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z"
            fill="currentColor"
          />
        </svg>
      </Toast.Close>
      <ProgressBar
        data-testid="toast-progress-bar"
        duration={duration}
        open={active}
      />
      {action && (
        <ToastNotificationAction action={action}>
          {action.label}
        </ToastNotificationAction>
      )}
    </Toast.Root>
  );
};

ToastNotification.Title = ToastNotificationTitle;
ToastNotification.Action = ToastNotificationAction;
ToastNotification.Description = ToastNotificationDescription;
