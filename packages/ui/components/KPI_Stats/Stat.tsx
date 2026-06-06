import React, { useState, useEffect, createContext, useContext } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";

// 1. Context to pass 'size' downwards implicitly to children
const StatContext = createContext<{ size?: "sm" | "md" | "lg" }>({
  size: "lg",
});

const StatContainerVariants = cva(
  "max-w-fit items-center bg-[linear-gradient(hsla(252,100%,57%,0.8),hsla(241,81%,54%,0.8))] overflow-hidden backdrop-blur-md",
  {
    variants: {
      size: {
        sm: "flex flex-col gap-1 p-4 rounded-xl",
        md: " flex flex-col gap-1 px-5 pt-2 rounded-2xl",
        lg: "relative flex flex-col p-6 rounded-2xl shadow-sm",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const LabelVariants = cva(
  "font-medium text-muted-foreground text-text-secondary",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-sm tracking-wide",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

const TrendVariants = cva("font-mono font-semibold", {
  variants: {
    intent: {
      positive: "text-sentiment-positive-text",
      negative: "text-sentiment-negative-text",
      neutral: "text-white",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-sm tracking-wide",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const valueVariants = cva(
  "flex flex-col justify-center items-center bg-[linear-gradient(hsla(256,72%,46%,1),hsla(241,72%,46%,0))]",
  {
    variants: {
      size: {
        sm: "h-14 w-28  rounded-xl",
        md: "h-24 w-48 rounded-b-none rounded-t-3xl",
        lg: "h-24 w-52 rounded-b-none rounded-t-3xl tracking-wide",
      },
    },
  }
);

// Structural Compound Typing
export interface StatProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof StatContainerVariants> {
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
function StatLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { size } = useContext(StatContext);
  return (
    <span className={cn(LabelVariants({ size }), className)} {...props}>
      {children}
    </span>
  );
}

// Sub-Component: Trend
function StatTrend({
  value,
  trendType = "neutral",
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> & {
  value: number;
  trendType?: "positive-up" | "negative-up" | "neutral";
}) {
  const { size } = useContext(StatContext);

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
      className={cn(TrendVariants({ size, intent: intent }), className)}
      {...props}
    >
      {`${sign}${value}%`}
    </span>
  );
}

// Sub-Component: Value Engine
export const StatValue = ({
  value,
  duration = 1000,
  formatter,
  className = "",
  ...props
}: ValueProps) => {
  const [displayValue, setDisplayValue] = useState<string>(() =>
    formatter ? formatter(0) : "0"
  );

  const { size } = useContext(StatContext);

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
    <div className={valueVariants({ size })}>
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

// Sub-Component: Custom Extras Slot
function StatExtras({
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

// Main Root Export Container
export const Stat = ({
  className,
  children,
  size = "lg",
  ...props
}: StatProps) => {
  return (
    <StatContext.Provider value={{ size: size ?? "lg" }}>
      <div
        className={cn(StatContainerVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </StatContext.Provider>
  );
};

Stat.Label = StatLabel;
Stat.Trend = StatTrend;
Stat.Value = StatValue;
Stat.Extras = StatExtras;
