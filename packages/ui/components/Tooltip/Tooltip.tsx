import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { cn } from "../../src/utils";

interface ToolTipProps {
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
  ...props
}: ToolTipProps & Tooltip.TooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root {...props}>
        <Tooltip.Trigger asChild>
          {React.isValidElement(trigger) ? trigger : <span>{trigger}</span>}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            sideOffset={5}
            className={cn(
              "z-50 overflow-hidden rounded-md border border-zinc-200 bg-white px-2 py-1 text-[10px] md:px-3 md:py-1.5 md:text-xs lg:px-4 lg:py-2 lg:text-sm text-zinc-950 shadow-md animate-in fade-in-0 zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
              className
            )}
          >
            {header && (
              <div className="mb-1 font-semibold border-b border-zinc-100 dark:border-zinc-800 pb-1">
                {header}
              </div>
            )}
            {children}
            {/* The arrow is pulled up by 2px (-mt-[2px]) and given a width 
              to ensure it overlaps the border area cleanly. 
              The fill matches the background, and we omit any border on the arrow itself.
            */}
            <Tooltip.Arrow
              className="fill-white dark:fill-zinc-950 -mt-[2px]"
              width={12}
              height={6}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
