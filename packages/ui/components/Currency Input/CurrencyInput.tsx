import * as React from "react";
import { VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils"; // Standard Tailwind merge utility
import { cva } from "class-variance-authority";

export const currencyInputVariants = cva(
  "flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-9 text-xs",
        lg: "h-11 text-base",
      },
      error: {
        true: "border-destructive focus-within:ring-destructive",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

// --- Context for Compound Components ---
type CurrencyInputContextType = {
  value: string; // Raw numeric string
  displayValue: string; // Formatted string with commas
  decimals: number;
  disabled?: boolean;
  onChange: (value: string) => void;
  onMax?: () => void;
};

const CurrencyInputContext = React.createContext<
  CurrencyInputContextType | undefined
>(undefined);

function useCurrencyInput() {
  const context = React.useContext(CurrencyInputContext);
  if (!context) {
    throw new Error(
      "CurrencyInput sub-components must be rendered within a CurrencyInput.Root"
    );
  }
  return context;
}

// --- Helper Functions for Satoshi precision ---
const formatWithCommas = (val: string, decimals: number): string => {
  if (!val) return "";

  // Split parts to safeguard decimals from comma formatting
  const [integerPart, decimalPart] = val.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimalPart !== undefined) {
    // Trim to max allowed decimals
    return `${formattedInteger}.${decimalPart.slice(0, decimals)}`;
  }

  return formattedInteger;
};

const cleanRawValue = (val: string, decimals: number): string => {
  // Remove anything that isn't a digit or a decimal point
  let cleaned = val.replace(/[^\d.]/g, "");

  // Ensure only one decimal point exists
  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = `${parts[0]}.${parts.slice(1).join("")}`;
  }

  // Enforce max decimal places
  if (parts[1] && parts[1].length > decimals) {
    cleaned = `${parts[0]}.${parts[1].slice(0, decimals)}`;
  }

  return cleaned;
};

// --- Compound Components ---

// 1. Root Container
// Replace your old RootProps interface with this:
export interface RootProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof currencyInputVariants> {
  value: string;
  onChange: (value: string) => void;
  decimals?: number;
  disabled?: boolean;
  onMax?: () => void;
}

const Root = React.forwardRef<HTMLDivElement, RootProps>(
  (
    {
      className,
      size,
      error,
      value,
      onChange,
      decimals = 8,
      disabled,
      onMax,
      children,
      ...props
    },
    ref
  ) => {
    const displayValue = formatWithCommas(value, decimals);

    return (
      <CurrencyInputContext.Provider
        value={{ value, displayValue, decimals, disabled, onChange, onMax }}
      >
        <div
          ref={ref}
          className={cn(currencyInputVariants({ size, error }), className)}
          {...props}
        >
          {children}
        </div>
      </CurrencyInputContext.Provider>
    );
  }
);
Root.displayName = "CurrencyInput.Root";

// 2. Max Button Prefix
export interface MaxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const MaxButton = React.forwardRef<HTMLButtonElement, MaxButtonProps>(
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
          "px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors border-r h-full disabled:opacity-50 raw-button",
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

// 3. Actual Numeric Input Field
export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const { displayValue, decimals, onChange, disabled } = useCurrencyInput();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawInput = e.target.value;
      const cleanValue = cleanRawValue(rawInput, decimals);
      onChange(cleanValue);
    };

    return (
      <input
        ref={ref}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder="0.00"
        disabled={disabled}
        value={displayValue}
        onChange={handleInputChange}
        className={cn(
          "flex-1 bg-transparent px-3 py-2 text-right font-mono focus-visible:outline-none disabled:cursor-not-allowed min-w-0",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "CurrencyInput.Input";

// 4. Currency Selector Dropdown / Addon Slot
export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center border-l bg-muted/30 px-3 font-medium text-muted-foreground text-xs",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Dropdown.displayName = "CurrencyInput.Dropdown";

// Export as compound object
export const CurrencyInput = {
  Root,
  MaxButton,
  Input,
  Dropdown,
};
