import { createContext, useContext, useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../src/utils";
import { ToastInstance, ToastProps, ToastProviderProps } from "./ToastQueue";
import * as Toast from "@radix-ui/react-toast";
import { ToastNotification } from "./Toast";

export const ToastContext = createContext<ToastContext | undefined>(undefined);

const ViewPortVariants = cva(
  "fixed  z-[100] m-0 flex flex-col p-6 list-none outline-none overflow-hidden",
  {
    variants: {
      size: {
        sm: "top-1/4 right-0 w-full max-w-[320px] gap-2",
        md: "top-0 right-0 w-full  max-w-[380px] gap-3",
        lg: "bottom-0 right-0 w-full max-w-[440px] gap-4",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

export const ToastProvider = ({
  children,
  size,
  className,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  const addToast = (toast: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, ...toast }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}

      {/* Radix high-level Provider wraps the loop */}
      <Toast.Provider>
        {toasts.map(({ id, ...toastProps }) => (
          <ToastNotification
            key={id}
            {...toastProps}
            onOpenChange={(open) => {
              toastProps.onOpenChange?.(open);
              if (!open) {
                // A small delay matching your CSS exit transition duration (e.g., 200ms)
                setTimeout(() => removeToast(id), 200);
              }
            }}
          />
        ))}
        <Toast.Viewport className={cn(ViewPortVariants({ size }), className)} />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

// 3. Create a Custom Hook (The "Shortcut")
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
};

export interface ToastContext {
  toasts: ToastInstance[];
  addToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
}
