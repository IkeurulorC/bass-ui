import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import * as Toast from "@radix-ui/react-toast";

const ToastVariants = cva("border", {
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
      sm: "max-w-[320px] p-3 text-xs",
      md: "max-w-[380px] p-4 text-sm",
      lg: "max-w-[440px] p-5 text-base",
    },
  },
  defaultVariants: {
    intent: "info",
    size: "lg",
  },
});

export interface ToastProviderProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export type ToastDetails = {
  title: string;
  description: string;
  intent: "success" | "error" | "warning" | "info";
  size: "lg" | "md" | "sm";
  duration?: number;
  icon?: React.ReactNode | string;
  className?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export interface ToastInstance extends ToastProps {
  id: string;
}

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
}
