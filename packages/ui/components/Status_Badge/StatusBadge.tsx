import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full pl-1.5 pr-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200",
  {
    variants: {
      status: {
        successful:
          "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20",
        failed: "bg-rose-500/10 text-rose-700 border border-rose-500/20",
        pending: "bg-indigo-500/10 text-indigo-700 border border-indigo-500/20",
        live: "bg-sky-500/10 text-sky-700 border border-sky-500/20",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

const iconWrapperVariants = cva(
  "inline-flex h-5 w-5 items-center justify-center rounded-full text-white shrink-0 transform-gpu subpixel-antialiased",
  {
    variants: {
      status: {
        successful: "bg-emerald-600/90",
        failed: "bg-rose-600/90 relative",
        pending: "bg-indigo-600/90 relative",
        live: "bg-sky-600/90 relative",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
);

export interface StatusBadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: string;
  status: "successful" | "pending" | "failed" | "live";
  className?: string;
}

export const StatusBadge = ({
  children,
  status,
  className,
  ...props
}: StatusBadgeProps) => {
  return (
    <span className={cn(badgeVariants({ status }), className)} {...props}>
      <span className={cn(iconWrapperVariants({ status }))}>
        {status === "successful" && (
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
            className="h-3 w-3 stroke-[3.5] block shrink-0 lucide lucide-check-icon lucide-check"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
        {status === "failed" && (
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
            className="h-3 w-3 stroke-[3.5] block shrink-0 lucide lucide-triangle-alert-icon lucide-triangle-alert"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        )}
        {status === "pending" && (
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
            className="h-3 w-3 stroke-[3.5] block shrink-0 lucide lucide-clock-icon lucide-clock"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
        )}

        {/* The Live Pulse Indicator */}
        {status === "live" && (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="absolute inset-0 rounded-full bg-sky-500 opacity-75 animate-ping" />
          </>
        )}
      </span>

      <span className="capitalize leading-none relative">
        {children || status}
      </span>
    </span>
  );
};
