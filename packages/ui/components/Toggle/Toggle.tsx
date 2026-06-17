import React from "react";
import * as Switch from "@radix-ui/react-switch";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "../../src/utils";

// ==========================================
// 1. RESPONSIVE TOGGLE (SWITCH)
// ==========================================

const SwitchRootVariants = cva([
  "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors bg-toggle-primary-bg/20 disabled:cursor-not-allowed disabled:opacity-40",
  // Mobile: 'sm' layout
  "w-9 h-5 px-1",
  // Tablet (md): Scaled to 'md' layout
  "md:w-11 md:h-6 md:px-1",
  // Desktop (lg): Scaled to 'lg' layout
  "lg:w-14 lg:h-8 lg:px-1.5",
]);

const ThumbVariants = cva([
  "pointer-events-none block rounded-full shadow-md transition-transform bg-slate-50 data-[state=checked]:bg-toggle-primary-bg/90 data-[state=checked]:shadow-[var(--toggle-shadow)]",
  // Mobile: 'sm' dimensions & translations
  "h-3 w-3 data-[state=checked]:translate-x-4",
  // Tablet (md): 'md' dimensions & translations
  "md:h-[18px] md:w-[18px] md:data-[state=checked]:translate-x-5",
  // Desktop (lg): 'lg' dimensions & translations
  "lg:h-6 lg:w-6 lg:data-[state=checked]:translate-x-6",
]);

export interface ToggleProps extends React.ComponentPropsWithoutRef<
  typeof Switch.Root
> {
  label?: string;
  error?: string;
  "aria-label"?: string;
}

export const Toggle = React.forwardRef<
  React.ComponentRef<typeof Switch.Root>,
  ToggleProps
>(({ className, label, "aria-label": ariaLabel, error, ...props }, ref) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3">
      <Switch.Root
        ref={ref}
        aria-label={ariaLabel}
        className={cn(SwitchRootVariants(), className)}
        {...props}
      >
        <Switch.Thumb asChild>
          <motion.span
            layout
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            className={cn(ThumbVariants())}
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
          className="text-xs text-slate-600 font-medium pl-1"
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
  </div>
));

Toggle.displayName = "Toggle";

// ==========================================
// 2. RESPONSIVE CHECKBOX
// ==========================================

const checkboxRootVariants = cva([
  "peer shrink-0 rounded-sm border-none bg-[#d4d9de] shadow-[inset_2px_2px_4px_#bebebe,inset_-2px_-2px_4px_#ffffff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  // Mobile: 'sm' sizing
  "h-4 w-4",
  // Tablet (md): 'md' sizing
  "md:h-5 md:w-5",
  // Desktop (lg): 'lg' sizing
  "lg:h-6 lg:w-6",
]);

const checkboxIndicatorVariants = cva([
  "flex items-center justify-center text-current",
  // Mobile: 'sm' icon sizing
  "[&_svg]:h-3 [&_svg]:w-3",
  // Tablet (md): 'md' icon sizing
  "md:[&_svg]:h-3.5 md:[&_svg]:w-3.5",
  // Desktop (lg): 'lg' icon sizing
  "lg:[&_svg]:h-4 lg:[&_svg]:w-4",
]);

export interface CheckBoxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  // Add an explicit aria-label prop for better DX
  "aria-label"?: string;
}

export const CheckBox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckBoxProps
>(({ className, "aria-label": ariaLabel, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    aria-label={ariaLabel}
    className={cn(checkboxRootVariants(), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(checkboxIndicatorVariants())}
      asChild
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#606770"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-check-icon lucide-check"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </motion.div>
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

CheckBox.displayName = "CheckBox";
