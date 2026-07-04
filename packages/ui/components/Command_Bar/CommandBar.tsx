import * as React from "react";
import { cn } from "../../src/utils";
import { Command, useCommandState } from "cmdk";

export interface CommandBarContainerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "value" | "defaultValue"
> {
  className?: string;
}

// Wrapped in forwardRef so the underlying engine can do its measurements safely
export const CommandBarContainer = React.forwardRef<
  React.ComponentRef<typeof Command>,
  CommandBarContainerProps
>(({ className, children, ...props }, ref) => {
  return (
    <Command
      ref={ref}
      className={cn(
        "relative flex flex-col overflow-visible rounded-4xl bg-white dark:bg-zinc-900/90 text-zinc-950 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] backdrop-blur-md w-md md:w-xl lg:w-3xl custom-crypto-glow",
        className
      )}
      {...props}
    >
      {children}
    </Command>
  );
});

export interface CommandInputProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Command.Input>,
  "size"
> {
  className?: string;
}

export const CommandInput = React.forwardRef<
  React.ComponentRef<typeof Command.Input>,
  CommandInputProps
>(({ className, ...props }, ref) => {
  return (
    <Command.Input
      ref={ref}
      className={cn(
        "flex w-full bg-transparent mx-3 py-4 outline-none placeholder-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 h-10 text-xs px-3 font-medium md:h-12 md:text-sm md:px-4 lg:h-14 lg:text-base lg:px-5 transition-all duration-200",
        className
      )}
      {...props}
    />
  );
});

export interface CommandListProps extends React.ComponentPropsWithoutRef<
  typeof Command.List
> {
  className?: string;
}

export const CommandList = React.forwardRef<
  React.ComponentRef<typeof Command.List>,
  CommandListProps
>(({ className, children, ...props }, ref) => {
  const search = useCommandState((state) => state.search);

  const hasQuery = search.trim().length > 0;
  return (
    <Command.List
      ref={ref}
      className={cn(
        "absolute top-20 z-50 w-full max-h-[300px] overflow-y-auto overflow-x-hidden rounded-xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 text-xs px-2 w-md md:text-sm md:px-3 md:w-xl lg:text-base lg:px-4 lg:w-3xl",
        !hasQuery && "hidden",
        className
      )}
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
}

export const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof Command.Group>,
  CommandGroupContainerProps
>(
  (
    { className, heading, children, defaultExpanded = false, ...props },
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
            className={cn(
              "overflow-hidden p-1 text-zinc-950 dark:text-zinc-100",
              "flex w-full cursor-pointer items-center justify-between",
              "[&_[cmdk-group-heading]]:select-none [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.12em] [&_[cmdk-group-heading]]:text-zinc-500",
              className
            )}
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
        {/* 🎯 Note to self: Keep children in the DOM, toggle visibility purely with CSS.
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
      "relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2.5 mt-1 text-zinc-300 font-medium transition-all duration-150 outline-none data-[selected=true]:bg-black/[0.06] data-[selected=true]:text-black data-[selected=true]:translate-x-0.5 data-[disabled=true]:opacity-40",
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
