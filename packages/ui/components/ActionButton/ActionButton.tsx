import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";

function ActionButtonLoader({ spinnerIntent, className }: SpinnerProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={cn(spinnerVariants({ spinnerIntent }), className)} />
    </div>
  );
}

export const buttonVariants = cva(
  [
    "font-semibold",
    "flex",
    "justify-around",
    "items-center",
    "shadow-lg",
    "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
    "gap-2",
    "rounded-md",
    "py-2",
    "px-5",
    "md:min-w-35",
    "md:w-auto",
    "md:gap-2.5",
    "md:rounded-lg",
    "md:py-2.5",
    "md:px-6",
    "lg:min-w-40",
    "lg:w-auto",
    "lg:gap-3",
    "lg:rounded-lg",
    "lg:py-3",
    "lg:px-8",
    "active:scale-95",
  ],
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
          "dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]",
          "bg-btn-secondary-bg",
          "!text-btn-secondary-text",
          "hover:bg-btn-secondary-bg-hover",
          "active:bg-btn-secondary-bg-active",
        ],
        danger: [
          "border",
          "bg-btn-danger-bg",
          "border-btn-danger-border",
          "!text-btn-danger-text",
          "hover:bg-btn-danger-bg-hover",
          "active:bg-btn-danger-bg-active",
        ],
        ghost: [
          "border",
          "bg-btn-ghost-bg",
          "border-btn-ghost-border",
          "!text-slate-500",
          "hover:bg-btn-ghost-bg-hover",
          "active:bg-btn-ghost-bg-active",
        ],
      },
      size: {
        full: ["w-full", "md:w-full", "lg:w-full"],
        cut: [""],
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
      size: "cut",
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

const spinnerVariants = cva(
  [
    "border-2",
    "rounded-full",
    "animate-spin",
    "h-3",
    "w-3",
    "md:h-4",
    "md:w-4",
    "lg:h-5",
    "lg:w-5",
  ],
  {
    variants: {
      spinnerIntent: {
        primary: ["border-btn-primary-border", "border-t-white"],
        secondary: ["border-btn-secondary-border", "border-t-white"],
        danger: ["border-btn-danger-border", "border-t-white"],
        ghost: ["border-btn-ghost-border", "border-t-white"],
      },
    },
    defaultVariants: {
      spinnerIntent: "primary",
    },
  }
);

export type ButtonIntent = VariantProps<typeof buttonVariants>["intent"];
export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

interface SpinnerProps
  extends
    VariantProps<typeof spinnerVariants>,
    React.AreaHTMLAttributes<HTMLDivElement> {}

type ClassVariant = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends ClassVariant, React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: ButtonIntent;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function ActionButton({
  intent = "primary",
  size = "cut",
  isDisabled = false,
  isLoading = false, // Controlled from the outside
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const handleclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoading || isDisabled) return;
    onClick?.(e); // Let the parent's async handler run
  };

  return (
    <button
      disabled={isDisabled || isLoading || props.disabled}
      className={cn(
        buttonVariants({ intent, size, isDisabled, isLoading }),
        className
      )}
      onClick={handleclick}
      {...props}
    >
      {isLoading && <ActionButtonLoader spinnerIntent={intent} />}
      {children}
    </button>
  );
}

ActionButton.Loader = ActionButtonLoader;
