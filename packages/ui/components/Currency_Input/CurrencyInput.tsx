import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "../../src/utils";

export const currencyInputVariants = cva(
  [
    "flex w-full items-center rounded-xl border transition-all duration-300 overflow-hidden",
    "bg-white dark:bg-slate-950",
    "border-slate-200 dark:border-slate-800",
    "ring-offset-white dark:ring-offset-slate-950",
    "focus-within:ring-2 focus-within:ring-indigo-500/50 dark:focus-within:ring-indigo-400/30",
    "shadow-sm dark:shadow-none",
  ],
  {
    variants: {
      size: {
        default: "h-12",
        sm: "h-10 text-xs",
        lg: "h-14 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// --- Context ---
type CurrencyInputContextType = {
  value: string;
  displayValue: string;
  decimals: number;
  disabled?: boolean;
  onChange: (value: string) => void;
  onMax?: () => void;
  currency: string;
  onCurrencyChange?: (currency: string) => void;
};

const CurrencyInputContext = React.createContext<
  CurrencyInputContextType | undefined
>(undefined);

function useCurrencyInput() {
  const context = React.useContext(CurrencyInputContext);
  if (!context)
    throw new Error(
      "CurrencyInput sub-components must be rendered within a Root"
    );
  return context;
}

// --- Helpers ---
const formatWithCommas = (val: string, decimals: number): string => {
  if (!val) return "";
  const [integerPart, decimalPart] = val.split(".");
  const formattedInteger = integerPart
    ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : val;
  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart.slice(0, decimals)}`
    : formattedInteger;
};

const cleanRawValue = (val: string, decimals: number): string => {
  let cleaned = val.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) cleaned = `${parts[0]}.${parts.slice(1).join("")}`;
  if (parts[1] && parts[1].length > decimals)
    cleaned = `${parts[0]}.${parts[1].slice(0, decimals)}`;
  return cleaned;
};

// --- Components ---

export interface RootProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof currencyInputVariants> {
  value: string;
  onChange: (value: string) => void;
  decimals?: number;
  disabled?: boolean;
  onMax?: () => void;
  currency: string;
  onCurrencyChange?: (currency: string) => void;
}

export const Root = React.forwardRef<HTMLDivElement, RootProps>(
  (
    {
      className,
      size,
      value,
      onChange,
      decimals = 8,
      disabled,
      onMax,
      currency,
      onCurrencyChange,
      children,
      ...props
    },
    ref
  ) => (
    <CurrencyInputContext.Provider
      value={{
        currency,
        onCurrencyChange,
        value,
        displayValue: formatWithCommas(value, decimals),
        decimals,
        disabled,
        onChange,
        onMax,
      }}
    >
      <div
        ref={ref}
        className={cn(currencyInputVariants({ size }), className)}
        {...props}
      >
        {children}
      </div>
    </CurrencyInputContext.Provider>
  )
);
Root.displayName = "CurrencyInput.Root";

export interface MaxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const MaxButton = React.forwardRef<HTMLButtonElement, MaxButtonProps>(
  ({ className, ...props }, ref) => {
    const { onMax, disabled } = useCurrencyInput();
    if (!onMax) return null;
    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        onClick={onMax}
        className={cn(
          "px-4 h-full text-[10px] font-bold uppercase tracking-widest transition-colors border-r border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-30",
          className
        )}
        {...props}
      >
        Max
      </button>
    );
  }
);
MaxButton.displayName = "CurrencyInput.MaxButton";

export const Input = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">
>(({ className, ...props }, ref) => {
  const { displayValue, decimals, onChange, disabled } = useCurrencyInput();
  return (
    <input
      ref={ref}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      placeholder="0.00"
      disabled={disabled}
      value={displayValue}
      onChange={(e) => onChange(cleanRawValue(e.target.value, decimals))}
      className={cn(
        "flex-1 bg-transparent px-4 py-2 text-right font-mono text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "CurrencyInput.Input";

export const Dropdown = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: string[];
    className?: string;
  }
>(({ className, options, ...props }, ref) => {
  const { currency, onCurrencyChange, disabled } = useCurrencyInput();
  return (
    <div className="relative flex h-full items-center border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
      <select
        ref={ref}
        disabled={disabled}
        value={currency}
        onChange={(e) => onCurrencyChange?.(e.target.value)}
        aria-label="currency"
        className={cn(
          "h-full bg-transparent px-3 text-xs font-semibold text-slate-700 dark:text-black outline-none cursor-pointer pr-7 appearance-none",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option
            key={opt}
            className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
          >
            {opt}
          </option>
        ))}
      </select>
      <span
        className="absolute right-2 text-xs text-slate-600 dark:text-slate-300 pointer-events-none"
        aria-hidden="true"
      >
        {"▼"}
      </span>
    </div>
  );
});
Dropdown.displayName = "CurrencyInput.Dropdown";

export const CurrencyInput = { Root, MaxButton, Input, Dropdown };
