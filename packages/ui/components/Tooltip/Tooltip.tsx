import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";

const tooltipVariants = cva(
  "rounded-md transition-opacity duration-300 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)] shadow-[0_-1px_0_rgba(0,0,0,0.05),0_4px_12px_rgba(0,0,0,0.1)] bg-surface-card text-text-primary text-center",
  {
    variants: {
      size: {
        sm: "px-1.5 py-1.5 text-xs max-w-[180px]",
        md: "px-3 py-3 text-sm max-w-[280px]",
        lg: "px-3 py-3 text-base max-w-[320px]",
      },
    },
    defaultVariants: {
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
            className={cn(tooltipVariants({ size }), className)}
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
            <Tooltip.Arrow className="fill-surface-card h-3 w-5 " />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

ToolTip.Trigger = ToolTipTrigger;
ToolTip.Children = ToolTipChildren;
