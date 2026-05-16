import React from "react";
import { VariantProps } from "class-variance-authority";
import * as Toast from "@radix-ui/react-toast";
import { ToastVariants } from "./Toast";

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
