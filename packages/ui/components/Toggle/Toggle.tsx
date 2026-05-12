import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { motion, AnimatePresence } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";

const SwitchRootVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-color bg-toggle-primary-bg/20 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      size: {
        sm: "w-9 h-5 px-1",
        md: "w-11 h-6 px-1",
        lg: "w-14 h-8 px-1.5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const ThumbVariants = cva(
  // The Thumb: This is where the color lives now
  "pointer-events-none block rounded-full shadow-md transition-transform bg-slate-50 data-[state=checked]:bg-toggle-primary-bg/90 data-[state=checked]:shadow-[var(--toggle-shadow)]",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=checked]:translate-x-4",
        md: "h-[18px] w-[18px] data-[state=checked]:translate-x-5",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ToggleProps
  extends
    React.ComponentPropsWithoutRef<typeof Switch.Root>,
    VariantProps<typeof SwitchRootVariants>,
    VariantProps<typeof ThumbVariants> {
  label?: string;
  error?: string;
}

export const Toggle = React.forwardRef<
  React.ComponentRef<typeof Switch.Root>,
  ToggleProps
>(({ className, size = "md", label, error, ...props }, ref) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3">
      <Switch.Root
        ref={ref}
        className={cn(SwitchRootVariants({ size }), className)}
        {...props}
      >
        <Switch.Thumb asChild>
          <motion.span
            layout
            transition={{
              type: "spring",
              stiffness: 500, // Very snappy
              damping: 30,
            }}
            className={cn(ThumbVariants({ size }))}
          />
        </Switch.Thumb>
      </Switch.Root>

      {label && (
        <label className="text-sm font-medium leading-none text-slate-700 dark:text-slate-200 cursor-pointer">
          {label}
        </label>
      )}
    </div>

    <AnimatePresence>
      {error && (
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="text-xs text-red-500 font-medium pl-1"
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
));

Toggle.displayName = "Toggle";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

const checkboxRootVariants = cva(
  "peer h-5 w-5 shrink-0 rounded-sm border-none bg-[#d4d9de] shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// This is the inner "mark" that appears when checked
const checkboxIndicatorVariants = cva(
  "flex items-center justify-center text-current",
  {
    variants: {
      size: {
        sm: "[&_svg]:h-3 [&_svg]:w-3",
        md: "[&_svg]:h-3.5 [&_svg]:w-3.5",
        lg: "[&_svg]:h-4 [&_svg]:w-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const CheckBox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> &
    VariantProps<typeof checkboxRootVariants>
>(({ className, size = "md", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxRootVariants({ size }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(checkboxIndicatorVariants({ size }))}
      asChild
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <Check strokeWidth={3} className="text-[#606770]" />
      </motion.div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

CheckBox.displayName = "CheckBox";
