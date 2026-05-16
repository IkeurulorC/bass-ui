import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, AlertTriangle, Clock } from "lucide-react";
import { cn } from "../../src/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1 text-xs font-semibold tracking-wide transition-all duration-200",
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
  "flex h-5 w-5 items-center justify-center rounded-full text-white shrink-0",
  {
    variants: {
      status: {
        successful: "bg-emerald-600",
        failed: "bg-rose-600",
        pending: "bg-indigo-600",
        live: "bg-sky-600 relative",
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
        {status === "successful" && <Check className="h-3 w-3 stroke-[3]" />}
        {status === "failed" && (
          <AlertTriangle className="h-3 w-3 stroke-[3]" />
        )}
        {status === "pending" && <Clock className="h-3 w-3 stroke-[3]" />}

        {/* The Live Pulse Indicator */}
        {status === "live" && (
          <>
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="absolute inset-0 rounded-full bg-sky-500 opacity-75 animate-ping" />
          </>
        )}
      </span>
      <span className="capitalize">{children || status}</span>
    </span>
  );
};
