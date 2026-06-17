import React, { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../src/utils";

const TrendVariants = cva(
  "font-mono font-semibold text-xs md:text-sm lg:tracking-wide",
  {
    variants: {
      intent: {
        positive: "text-sentiment-positive-text",
        negative: "text-sentiment-negative-text",
        neutral: "text-white",
      },
    },
    defaultVariants: {},
  }
);

// Structural Compound Typing
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ValueProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  value: number;
  duration?: number;
  formatter?: (value: number) => string;
}

// Sub-Component: Label
export function Label({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-medium text-muted-foreground text-text-secondary text-xs md:text-sm lg:tracking-wide",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
Label.displayName = "Stat.Label";

// Sub-Component: Trend
export function Trend({
  value,
  trendType = "neutral",
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  value: number;
  trendType?: "positive-up" | "negative-up" | "neutral";
}) {
  let intent: "positive" | "negative" | "neutral" = "neutral";
  if (trendType === "positive-up") {
    intent = value > 0 ? "positive" : value < 0 ? "negative" : "neutral";
  } else if (trendType === "negative-up") {
    intent = value > 0 ? "negative" : value < 0 ? "positive" : "neutral";
  }

  // Determine standard prefix layout sign
  const sign = value > 0 ? "+" : "";

  return (
    <span
      className={cn(TrendVariants({ intent: intent }), className)}
      {...props}
    >
      {`${sign}${value}%`}
    </span>
  );
}
Trend.displayName = "Stat.Trend";

// Sub-Component: Value Engine
export const Value = ({
  value,
  duration = 1000,
  formatter,
  className = "",
  ...props
}: ValueProps) => {
  const [displayValue, setDisplayValue] = useState<string>(() =>
    formatter ? formatter(0) : "0"
  );

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;
    let animationFrameId: number;

    const easeOutQuad = (t: number): number => t * (2 - t);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentRawValue =
        startValue + (endValue - startValue) * easedProgress;

      const formattedFrame = formatter
        ? formatter(currentRawValue)
        : Math.round(currentRawValue).toString();

      setDisplayValue(formattedFrame);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, formatter]);

  const finalAccessibleValue = formatter ? formatter(value) : value.toString();

  return (
    <div className="flex flex-col justify-center items-center h-14 w-28 rounded-xl md:h-24 md:w-48 md:rounded-b-none md:rounded-t-3xl lg:h-24 lg:w-52 lg:rounded-b-none lg:rounded-t-3xl lg:tracking-wide bg-[linear-gradient(hsla(256,72%,46%,1),hsla(241,72%,46%,0))]">
      <span
        className={cn(
          "font-bold tracking-tight text-slate-100 tabular-nums text-xl md:text-3xl lg:text-4xl",
          className
        )}
        {...props}
      >
        <span className="sr-only">{finalAccessibleValue}</span>
        <span aria-hidden="true">{displayValue}</span>
      </span>
    </div>
  );
};

Value.displayName = "Stat.Value";

// Sub-Component: Custom Extras Slot
export function Extras({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
}

Extras.displayName = "Stat.Extras";

// Main Root Export Container
export const Root = ({ className, children, ...props }: StatProps) => {
  return (
    <div
      className={cn(
        "lg:relative flex flex-col gap-1 p-4 md:px-5 md:pt-2 lg:pt-6 lg:pb-6 lg:pr-6 lg:pl-6 rounded-xl md:rounded-2xl shadow-sm max-w-fit items-center bg-[linear-gradient(hsla(252,100%,57%,0.8),hsla(241,81%,54%,0.8))] overflow-hidden backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Root.displayName = "Stat.Root";

export const Stat = {
  Root,
  Label,
  Trend,
  Value,
  Extras,
};
