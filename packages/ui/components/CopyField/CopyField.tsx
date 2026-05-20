import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, Copy } from "lucide-react";
import { cn } from "../../src/utils";
import { ToolTip } from "../Tooltip/Tooltip";

const copyFieldVariants = cva(
  "flex w-full px-2 py-4 overflow-hidden items-center transition-all duration-200 rounded-full bg-blue-50 border-blue-100 shadow-lg group focus-within:border-blue-500/50",
  {
    variants: {
      size: {
        sm: "h-14",
        md: "h-14",
        lg: "h-16",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const inputVariants = cva(
  "flex-1 border border-white bg-transparent px-3 py-2 rounded-md text-sm text-slate-600 outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const buttonContainerVariants = cva(
  "px-3 py-2 bg-slate-600 border-2 border-white hover:bg-slate-900 active:bg-slate-900/80 text-zinc-100 rounded-md m-2 flex items-center justify-center transition-colors",
  {
    variants: {
      size: {
        sm: "w-12",
        md: "w-12",
        lg: "w-14",
      },
      layout: {
        fixed: "flex-none",
        flex: "flex-1",
      },
    },
    defaultVariants: {
      size: "lg",
      layout: "fixed",
    },
  }
);

const buttonVariants = cva(
  "flex items-center justify-center transition-colors active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "w-9 px-2",
        md: "w-11 px-3",
        lg: "w-14 px-4",
      },
    },
    defaultVariants: {
      intent: "secondary",
      size: "lg",
    },
  }
);

function CopyFieldInput({
  className,
  value,
  size,
}: {
  className?: string;
  value: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <input
      type="text"
      value={value}
      readOnly
      className={cn(inputVariants({ size }), className)}
    />
  );
}

function CopyFieldButton({
  className,
  handleClick,
  copied,
  intent,
  size,
}: {
  className?: string;
  handleClick: () => Promise<void>;
  copied: boolean;
  intent?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <ToolTip
      trigger={
        <button
          onClick={handleClick}
          className={cn(buttonVariants({ intent, size }), className)}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-6 h-6 text-green-500 animate-in zoom-in" />
          ) : (
            <Copy className="w-4 h-6" />
          )}
        </button>
      }
    >
      {copied ? "Copied!!!" : "Copy"}
    </ToolTip>
  );
}

export interface CopyFieldProps extends VariantProps<typeof copyFieldVariants> {
  value: string;
  className?: string;
  intent?: VariantProps<typeof buttonVariants>["intent"];
}

export const CopyField = ({ value, size, className }: CopyFieldProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className={cn(copyFieldVariants({ size }), className)}>
      <CopyFieldInput value={value} />
      <div className={cn(buttonContainerVariants({ size }))}>
        <CopyFieldButton handleClick={handleCopy} copied={copied} />
      </div>
    </div>
  );
};

CopyField.Input = CopyFieldInput;
CopyField.Button = CopyFieldButton;
