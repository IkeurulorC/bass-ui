import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";

const AssetCardContext = React.createContext<boolean | null>(null);

function useAssetCardContext() {
  const context = React.useContext(AssetCardContext);
  if (!context) {
    throw new Error(
      "AssetCard sub-components cannot be rendered outside the AssetCardRoot component."
    );
  }
  return context;
}

// 1. Root Variants via CVA
const AssetCardRootVariants = cva(
  "flex flex-col justify-between p-4 shadow-md rounded-2xl bg-white border border-slate-100",
  {
    variants: {
      size: {
        sm: "w-40 h-28",
        md: "w-52 h-36",
        lg: "w-56 h-40",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

interface AssetCardRootProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof AssetCardRootVariants> {}

export function AssetCardRoot({
  className,
  size,
  children,
  ...props
}: AssetCardRootProps) {
  return (
    <AssetCardContext.Provider value={true}>
      <div
        className={cn(AssetCardRootVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </AssetCardContext.Provider>
  );
}

// 2. Header Component
export function AssetCardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  useAssetCardContext();

  return (
    <header className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </header>
  );
}

// 3. Icon Sub-Component
export function AssetCardIcon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  useAssetCardContext();

  return (
    <div className={cn("flex-shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

// 4. Group for Meta Text (Title & Subtitle)
export function AssetCardGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  useAssetCardContext();

  return (
    <div
      className={cn("flex flex-col text-sm leading-tight", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// 5. Main Content Wrapper (The Two Sibling Divs Box)
export function AssetCardMain({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  useAssetCardContext();

  return (
    <main
      className={cn(
        "flex flex-row w-full items-center justify-between gap-1 mt-auto",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}

// 6. Left Content (Price/Rate Block)
export function AssetCardInfo({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  useAssetCardContext();

  return (
    <div className={cn("flex flex-col justify-center", className)} {...props}>
      {children}
    </div>
  );
}

// 7. Numerical Value Display
export function AssetCardValue({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  useAssetCardContext();

  return (
    <h1
      className={cn(
        "text-xl font-semibold font-mono tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export interface AssetCardRateProps extends React.HTMLAttributes<HTMLSpanElement> {
  rate: number;
}

// 8. Rate/Percentage Change Display
export function AssetCardRate({
  className,
  rate,
  ...props
}: AssetCardRateProps) {
  useAssetCardContext();

  return (
    <span
      className={cn(
        `text-sm font-mono ${rate > 0 ? "text-emerald-500" : rate < 0 ? "text-rose-500" : "text-amber-500"} font-semibold`,
        className
      )}
      {...props}
    >
      {rate > 0 ? `▲ ${rate}%` : rate < 0 ? `▼ ${rate}%` : `▶ ${rate}%`}
    </span>
  );
}

// 9. Right Content (Visual Chart Wrapper)
export function AssetCardVisuals({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  useAssetCardContext();

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// 10. Sparkline Component Props Definition
interface SparklineProps extends React.SVGProps<SVGSVGElement> {
  data: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
}

export const AssetCardSparkline: React.FC<SparklineProps> = ({
  data,
  width = 90,
  height = 30,
  strokeWidth = 2,
  className,
  ...props
}) => {
  useAssetCardContext();

  const gradientId = React.useId();

  if (!data || data.length < 2) return null;

  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const valueRange = maxValue - minValue === 0 ? 1 : maxValue - minValue;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / valueRange) * height;
    return { x, y };
  });

  const linePathData = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");

  const areaPathData = `${linePathData} L ${width} ${height} L 0 ${height} Z`;

  const isUp = data[data.length - 1] >= data[0];
  const strokeColor = isUp ? "stroke-emerald-500" : "stroke-rose-500";
  const stopColor = isUp ? "rgb(16, 185, 129)" : "rgb(244, 63, 94)";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("overflow-visible", className)}
      {...props}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stopColor} stopOpacity={0.25} />
          <stop offset="100%" stopColor={stopColor} stopOpacity={0.0} />
        </linearGradient>
      </defs>
      <path
        d={areaPathData}
        fill={`url(#${gradientId})`}
        className="transition-all duration-300 ease-in-out"
      />
      <path
        d={linePathData}
        fill="none"
        className={cn(strokeColor, "transition-all duration-300 ease-in-out")}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AssetCard = {
  Root: AssetCardRoot,
  Header: AssetCardHeader,
  Main: AssetCardMain,
  Group: AssetCardGroup,
  Info: AssetCardInfo,
  Icon: AssetCardIcon,
  Rate: AssetCardRate,
  Value: AssetCardValue,
  Visuals: AssetCardVisuals,
  Sparkline: AssetCardSparkline,
};

// interface SparklineProps {
//   data: number[]; // e.g., [114200, 114500, 114100, 114884]
//   width?: number;
//   height?: number;
//   strokeWidth?: number;
// }

// export const Sparkline: React.FC<SparklineProps> = ({
//   data,
//   width = 90,
//   height = 20,
//   strokeWidth = 2,
// }) => {
//   if (!data || data.length < 2) return null;

//   const minVal = Math.min(...data);
//   const maxVal = Math.max(...data);
//   const valRange = maxVal - minVal === 0 ? 1 : maxVal - minVal;

//   // Map data points to SVG X and Y coordinates
//   const points = data.map((val, index) => {
//     // X distributes evenly across the width
//     const x = (index / (data.length - 1)) * width;

//     // Y flips because SVG (0,0) is top-left, but high values should be at the top
//     const y = height - ((val - minVal) / valRange) * height;

//     return { x, y };
//   });

//   // Construct the "d" path string: "M x0 y0 L x1 y1 L x2 y2..."
//   const pathData = points
//     .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
//     .join(" ");

//   // Determine color based on overall performance (last vs first)
//   const isUp = data[data.length - 1] >= data[0];
//   const strokeColor = isUp ? "stroke-emerald-500" : "stroke-rose-500";

//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       className="overflow-visible"
//     >
//       <path
//         d={pathData}
//         fill="none"
//         className={`${strokeColor} transition-all duration-300 ease-in-out`}
//         strokeWidth={strokeWidth}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };
