import { cva, VariantProps } from "class-variance-authority";
import { useState } from "react";
import { cn } from "../../src/utils.ts";

const buttonVariants = cva(
  ["font-semibold", "flex", "justify-around", "items-center"],
  {
    variants: {
      intent: {
        primary: [
          "border",
          "bg-btn-primary-bg",
          "border-btn-primary-border",
          "!text-btn-primary-text",
          "hover:bg-btn-primary-bg-hover",
          "active:bg-btn-primary-bg-active",
        ],
        secondary: [
          "border",
          "bg-btn-secondary-bg",
          "border-btn-secondary-border",
          "!text-btn-secondary-text",
          "hover:bg-btn-secondary-bg-hover",
          "active:bg-btn-secondary-bg-active",
        ],
        danger: [
          "border",
          "bg-btn-danger-bg",
          "border-btn-danger-border",
          "!text-[--btn-danger-text]",
          "hover:bg-btn-danger-bg-hover",
          "active:bg-btn-danger-bg-active",
        ],
        ghost: [
          "border",
          "bg-btn-ghost-bg",
          "border-btn-ghost-border",
          "!text-text-primary",
          "hover:bg-btn-ghost-bg-hover",
          "active:bg-btn-ghost-bg-active",
        ],
      },
      size: {
        sm: ["w-full", "gap-2", "rounded-md", "py-2", "px-5"],
        md: ["min-w-35", "w-auto", "gap-2.5", "rounded-lg", "py-2.5", "px-6"],
        lg: ["min-w-40", "w-auto", "gap-3", "rounded-lg", "py-3", "px-8"],
      },
      isDisabled: {
        true: [
          "bg-btn-disabled-bg",
          "text-btn-disabled-text",
          "border-0",
          "pointer-events-none",
        ],
        false: [""],
      },
      isLoading: {
        true: [
          "!text-transparent",
          "relative",
          "bg-white",
          "border-2",
          "pointer-events-none",
        ],
        false: "",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
      isDisabled: false,
    },
    compoundVariants: [
      {
        intent: "primary",
        isLoading: true,
        className: "",
      },
    ],
  }
);

const spinnerVariants = cva(["border-2", "rounded-full", "animate-spin"], {
  variants: {
    intent: {
      primary: ["border-btn-primary-border", "border-t-white"],
      secondary: ["border-btn-secondary-border", "border-t-white"],
      danger: ["border-btn-danger-border", "border-t-white"],
      ghost: ["border-btn-ghost-border", "border-t-white"],
    },
    size: {
      sm: ["h-3", "w-3"],
      md: ["h-4", "w-4"],
      lg: ["h-5", "w-5"],
    },
  },
  defaultVariants: {
    size: "lg",
    intent: "primary",
  },
});

type ClassVariant = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends ClassVariant, React.ButtonHTMLAttributes<HTMLButtonElement> {}

function ActionButton({
  intent,
  size,
  isDisabled,
  className,
  ...props
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleclick = () => {
    if (!isLoading) {
      setIsLoading(true);
    }
  };
  return (
    <button
      disabled={isDisabled || props.disabled}
      className={cn(
        buttonVariants({ intent, size, isDisabled, isLoading }),
        className
      )}
      onClick={handleclick}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(spinnerVariants({ intent, size }))} />
        </div>
      )}
      {props.children}
    </button>
  );
}

export default ActionButton;
