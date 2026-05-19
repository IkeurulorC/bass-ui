import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";
import { Command } from "cmdk";

const CommandBarContainerVariants = cva(
  "flex flex-col overflow-hidden rounded-xl bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 shadow-lg gap-4",
  {
    variants: {
      size: {
        sm: "w-md",
        md: "w-xl",
        lg: "w-3xl",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const CommandInputVariants = cva(
  "flex bg-transparent py-3 outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 text-xs px-2 w-md",
        md: "h-11 text-sm px-3 w-xl",
        lg: "h-14 text-base px-4 w-3xl",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const CommandListVariants = cva(
  "absolute top-20 z-50 w-full max-h-[300px] overflow-y-auto overflow-x-hidden rounded-xl border border-zinc-200 bg-white p-2 text-zinc-950 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
  {
    variants: {
      size: {
        sm: "text-xs px-2 w-md",
        md: "text-sm px-3 w-xl",
        lg: "text-base px-4 w-3xl",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

// "flex w-full cursor-pointer items-center justify-between select-none px-2 py-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"

const CommandGroupVariants = cva(
  "flex w-full cursor-pointer items-center justify-between select-none font-medium overflow-hidden p-1 text-sm text-zinc-950 dark:text-zinc-50 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-zinc-500 dark:[&_[cmdk-group-heading]]:text-zinc-400",
  {
    variants: {
      size: {
        sm: "[&_[cmdk-group-heading]]:px-2",
        md: "[&_[cmdk-group-heading]]:px-3",
        lg: "  [&_[cmdk-group-heading]]:px-4",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

export interface CommandBarContainerProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "value" | "defaultValue">,
    VariantProps<typeof CommandBarContainerVariants> {}

// Wrapped in forwardRef so the underlying engine can do its measurements safely
export const CommandBarContainer = React.forwardRef<
  React.ComponentRef<typeof Command>,
  CommandBarContainerProps
>(({ className, size, children, ...props }, ref) => {
  return (
    <Command
      ref={ref}
      className={cn(CommandBarContainerVariants({ size }), className)}
      {...props}
    >
      {children}
    </Command>
  );
});

export interface CommandInputProps
  extends
    Omit<React.ComponentPropsWithoutRef<typeof Command.Input>, "size">,
    VariantProps<typeof CommandInputVariants> {}

export const CommandInput = React.forwardRef<
  React.ComponentRef<typeof Command.Input>,
  CommandInputProps
>(({ className, size, ...props }, ref) => {
  return (
    <Command.Input
      ref={ref}
      className={cn(CommandInputVariants({ size }), className)}
      {...props}
    />
  );
});

export interface CommandListProps
  extends
    React.ComponentPropsWithoutRef<typeof Command.List>,
    VariantProps<typeof CommandListVariants> {}

export const CommandList = React.forwardRef<
  React.ComponentRef<typeof Command.List>,
  CommandListProps
>(({ className, children, ...props }, ref) => {
  return (
    <Command.List
      ref={ref}
      className={cn(CommandListVariants(), className)}
      {...props}
    >
      {children}
    </Command.List>
  );
});

export const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof Command.Empty>,
  React.ComponentPropsWithoutRef<typeof Command.Empty>
>(({ className, ...props }, ref) => (
  <Command.Empty
    ref={ref}
    className={cn(
      "py-6 text-center text-sm text-zinc-500 dark:text-zinc-400 ",
      className
    )}
    {...props}
  />
));

//*    Bunches related items together under a sticky label (like "Actions" or "Settings").
// *   **The Style Trap:** Must style the *heading text* specifically using native `cmdk` internal data attributes so the labels look crisp, tiny, and muted.
// *   **The Definition:**
export interface CommandGroupContainerProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Command.Group>,
  "heading"
> {
  heading: string; // Enforce heading as a string prop so we can style the click target
  defaultExpanded?: boolean;
  size?: "sm" | "md" | "lg";
}

export const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof Command.Group>,
  CommandGroupContainerProps
>(
  (
    { className, heading, children, size, defaultExpanded = false, ...props },
    ref
  ) => {
    // 1. Keep track of whether this specific section is open or closed
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

    return (
      <Command.Group
        ref={ref}
        heading={
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(CommandGroupVariants({ size }))}
          >
            <span>{heading}</span>
            <span className="text-[10px] opacity-60">
              {isExpanded ? "▲ Hide" : "▼ Expand"}
            </span>
          </div>
        }
        className={cn(
          "overflow-hidden p-1 text-zinc-950 dark:text-zinc-50",
          className
        )}
        {...props}
      >
        {/* 🎯 The Fix: Keep children in the DOM, toggle visibility purely with CSS.
        If it's collapsed, we hide the items, BUT cmdk can still see and filter them!
      */}
        <div className={cn(!isExpanded && "hidden")}>{children}</div>
      </Command.Group>
    );
  }
);

// *   The actual clickable row. This is the most crucial interactive layout piece.
// *   **The Style Trap: Must style the active state using `aria-selected=true` or `data-[selected=true]`. Because `cmdk` moves keyboard focus virtually without moving the actual browser focus state, standard CSS `:focus` or `:hover` utility classes will not work correctly when navigating with arrow keys.
export const CommandItem = React.forwardRef<
  React.ComponentRef<typeof Command.Item>,
  React.ComponentPropsWithoutRef<typeof Command.Item>
>(({ className, ...props }, ref) => (
  <Command.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 mt-0.5 mb-0 text-sm outline-none data-[selected=true]:text-zinc-900 data-[disabled=true]:opacity-50 dark:data-[selected=true]:text-zinc-50 border-t border-zinc-100 dark:border-zinc-900",
      className
    )}
    {...props}
  />
));

export const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof Command.Separator>,
  React.ComponentPropsWithoutRef<typeof Command.Separator>
>(({ className, ...props }, ref) => (
  <Command.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-800", className)}
    {...props}
  />
));

CommandBarContainer.displayName = "CommandBar.Root";
CommandInput.displayName = "CommandBar.Input";
CommandList.displayName = "CommandBar.List";
CommandEmpty.displayName = "CommandBar.Empty";
CommandGroup.displayName = "CommandBar.Group";
CommandItem.displayName = "CommandBar.Item";
CommandSeparator.displayName = "CommandBar.Separator";

export const CommandBar = {
  Root: CommandBarContainer,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
};
