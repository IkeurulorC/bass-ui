import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";
import { ToolTip } from "../Tooltip/Tooltip";

const buttonVariants = cva(
  "flex w-9 px-2 md:w-11 md:px-3 lg:w-14 lg:px-4 items-center justify-center transition-colors active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      intent: "secondary",
    },
  }
);

export function CopyFieldInput({
  className,
  value,
}: {
  className?: string;
  value: string;
}) {
  return (
    <input
      type="text"
      aria-label="CopyField Text"
      value={value}
      tabIndex={-1}
      readOnly
      className={cn(
        "flex-1 border-2 border-copy-border bg-transparent ml-3 px-3 py-2 rounded-lg text-xs md:text-sm lg:text-base text-copy-text outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  );
}

export function CopyFieldButton({
  className,
  handleClick,
  copied,
  intent,
}: {
  className?: string;
  handleClick: () => Promise<void>;
  copied: boolean;
  intent?: "primary" | "secondary" | "ghost";
}) {
  return (
    <ToolTip
      trigger={
        <button
          onClick={handleClick}
          className={cn(buttonVariants({ intent }), className)}
          aria-label="Copy to clipboard"
        >
          {copied ? (
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
              className="w-6 h-6 text-green-500 animate-in zoom-in lucide lucide-check-icon lucide-check"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
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
              className="w-4 h-6 text-copy-btn-icon lucide lucide-copy-icon lucide-copy"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      }
    >
      {copied ? "Copied!!!" : "Copy"}
    </ToolTip>
  );
}

export interface CopyFieldProps {
  value: string;
  className?: string;
  intent?: VariantProps<typeof buttonVariants>["intent"];
}

export const CopyField = ({ value, className, intent }: CopyFieldProps) => {
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
    <div
      className={cn(
        "flex w-full px-2 py-4 h-14 lg:h-16 overflow-hidden items-center transition-all duration-200 rounded-full bg-copy-bg border-copy-border shadow-lg group",
        className
      )}
    >
      <CopyFieldInput value={value} />
      <div
        className={cn(
          "px-3 py-2 w-12 lg:w-14 bg-copy-btn-bg border-2 border-copy-btn-icon hover:bg-copy-btn-hover active:bg-slate-900/80 text-zinc-100 rounded-lg m-2 flex items-center justify-center transition-colors shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]"
        )}
      >
        <CopyFieldButton
          intent={intent ? intent : "secondary"}
          handleClick={handleCopy}
          copied={copied}
        />
      </div>
    </div>
  );
};

CopyField.Input = CopyFieldInput;
CopyField.Button = CopyFieldButton;
