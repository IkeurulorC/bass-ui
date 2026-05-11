import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";

const tooltipVariants = cva(
  "rounded-md shadow-md transition-opacity duration-300 bg-[var(--tooltip-bg)] text-[var(--tooltip-text)] border-[var(--tooltip-border)]",
  {
    variants: {
      intent: {
        neutral: [
          "filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]",
          "shadow-[0_-1px_0_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)]",
          "[--tooltip-bg:theme(colors.surface-card)]",
          "[--tooltip-text:theme(colors.text-primary)]",
          "[--tooltip-border:transparent]",
        ],
        error: [
          "[--tooltip-bg:theme(colors.red.50)]",
          "[--tooltip-text:theme(colors.red.900)]",
          "[--tooltip-border:theme(colors.red.200)]",
          "border",
          "[filter:drop-shadow(1px_0_0_theme(colors.red.200))_drop-shadow(-1px_0_0_theme(colors.red.200))_drop-shadow(0_1px_0_theme(colors.red.200))_drop-shadow(0_-1px_0_theme(colors.red.200))]",
        ],
      },
      size: {
        sm: "px-4 py-2 text-xs max-w-[180px]",
        md: "px-8 py-4 text-sm max-w-[280px]",
        lg: "px-8 py-4 text-base max-w-[320px]",
      },
    },
    defaultVariants: {
      intent: "neutral",
      size: "lg",
    },
  }
);

function ToolTipTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function ToolTipChildren({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface ToolTipProps extends VariantProps<typeof tooltipVariants> {
  header?: React.ReactNode;
  trigger?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const ToolTip = ({
  header,
  trigger,
  children,
  className,
  intent,
  size,
  ...props // Capture Radix-specific props like 'side' or 'align'
}: ToolTipProps & Tooltip.TooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root {...props}>
        <ToolTipTrigger>
          <Tooltip.Trigger asChild>
            {React.isValidElement(trigger) ? trigger : <span>{trigger}</span>}
          </Tooltip.Trigger>
        </ToolTipTrigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={8}
            className={cn(tooltipVariants({ intent, size }), className)}
          >
            {header && (
              <header className="font-bold border-b border-[var(--tooltip-border)] mb-1.5 pb-1">
                {header}
              </header>
            )}
            {children && (
              <ToolTipChildren>
                <main className="text-pretty">{children}</main>
              </ToolTipChildren>
            )}
            <Tooltip.Arrow className="fill-[var(--tooltip-bg)] h-3 w-5 " />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

ToolTip.Trigger = ToolTipTrigger;
ToolTip.Children = ToolTipChildren;
