"use client";

import React, { useState } from "react";
import { CurrencyInput } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const currencyInputRootProps: PropRow[] = [
  {
    name: "className",
    type: "string",
    description:
      "The className property which can be used to override default container styling.",
    required: false,
  },
  {
    name: "size",
    type: '"default" | "sm" | "lg"',
    description:
      "Adjusts the spatial responsive footprint scale configurations to accommodate different layout requirements.",
    required: false,
    defaultValue: '"default"',
  },
  {
    name: "value",
    type: "string",
    description:
      "The raw numeric or decimal value string managed by the input context.",
    required: false,
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    description:
      "Callback function executed instantly whenever the localized numeric string value changes.",
    required: false,
  },
  {
    name: "decimals",
    type: "number",
    description:
      "The maximum number of decimal fraction places allowed for the processed numeric string configuration.",
    required: false,
    defaultValue: "8",
  },
  {
    name: "disabled",
    type: "boolean",
    description:
      "Applies non-interactive styles and pointer constraints to block user modifications.",
    required: false,
    defaultValue: "false",
  },
  {
    name: "currency",
    type: "string",
    description:
      "The active currency token code indicator string currently being used (e.g., 'BTC', 'USD').",
    required: false,
  },
  {
    name: "onCurrencyChange",
    type: "(currency: string) => void",
    description:
      "Callback function triggered when a alternate token asset row is selected in the picker context.",
    required: false,
  },
  {
    name: "onMax",
    type: "() => void",
    description:
      "Callback function triggered directly when the absolute maximum balances trigger is invoked.",
    required: false,
  },
];

export const currencyInputMaxButtonProps: PropRow[] = [
  {
    name: "className",
    type: "string",
    description:
      "The className property which can be used to override default maximum action button styling.",
    required: false,
  },
];

export const currencyInputProps: PropRow[] = [
  {
    name: "className",
    type: "string",
    description:
      "The className property which can be used to override the default native textual text input node styles.",
    required: false,
  },
];

export const currencyInputDropdownProps: PropRow[] = [
  {
    name: "className",
    type: "string",
    description:
      "The className property which can be used to override the default token picker selector overlay shell styling.",
    required: false,
  },
  {
    name: "options",
    type: "string[]",
    description:
      "An array of active token code symbol strings displayed as interactive selectable items inside the popover wrapper.",
    required: true,
  },
];

export const CurrencyInputAPI = () => {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
        Component API Reference
      </h2>

      <ApiReference
        componentName="CurrencyInput.Root"
        propsList={currencyInputRootProps}
      />
      <ApiReference
        componentName="CurrencyInput.Input"
        propsList={currencyInputProps}
      />
      <ApiReference
        componentName="CurrencyInput.MaxButton"
        propsList={currencyInputMaxButtonProps}
      />
      <ApiReference
        componentName="CurrencyInput.Dropdown"
        propsList={currencyInputDropdownProps}
      />
    </div>
  );
};

type CurrencyCode = "USD" | "EUR" | "GBP" | "NGN";

interface CurrencyDetails {
  code: CurrencyCode;
  symbol: string;
  balance: number;
  label: string;
}

const AVAILABLE_CURRENCIES: Record<CurrencyCode, CurrencyDetails> = {
  USD: {
    code: "USD",
    symbol: "$",
    balance: 12500.5,
    label: "United States Dollar",
  },
  EUR: { code: "EUR", symbol: "€", balance: 8430.2, label: "Euro" },
  GBP: { code: "GBP", symbol: "£", balance: 4120.0, label: "British Pound" },
  NGN: { code: "NGN", symbol: "₦", balance: 950000.0, label: "Nigerian Naira" },
};

export function CurrencyInputShowcase() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");
  const [amount, setAmount] = useState<string>("");

  const currentAsset = AVAILABLE_CURRENCIES[selectedCurrency];

  const handleMaxPress = () => {
    setAmount(currentAsset.balance.toString());
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
          CurrencyInput Sandbox
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Sanitized numeric processing with localized currency precision
          barriers and layout safeguards.
        </p>
      </div>

      {/* Main Sandbox Workspace */}
      <div className="p-8 bg-slate-50/20 dark:bg-[#0f172a]/10 min-h-[260px] flex items-center justify-center">
        <div className="w-full max-w-md p-6 rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16] shadow-xl space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            <span>Send Payment</span>
            <span>
              Bal: {currentAsset.symbol}
              {currentAsset.balance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <CurrencyInput.Root
            value={amount}
            onChange={setAmount}
            onCurrencyChange={(currency) => {
              setSelectedCurrency(currency as CurrencyCode);
              setAmount("");
            }}
            currency={selectedCurrency}
            onMax={handleMaxPress}
            className="relative flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0f172a]/20 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/80 transition-all px-3 py-1.5"
          >
            {/* Native Symbol Indicator */}
            <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 select-none mr-2">
              {currentAsset.symbol}
            </span>

            {/* Input field */}
            <CurrencyInput.Input
              placeholder="0.00"
              className="flex-1 min-w-0 bg-transparent text-sm font-mono font-medium outline-none border-none text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 py-2"
            />

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200/60 dark:border-slate-800/80">
              {/* Max Cap Button */}
              <CurrencyInput.MaxButton className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer">
                Max
              </CurrencyInput.MaxButton>

              {/* Currency Selector Dropdown */}
              <CurrencyInput.Dropdown
                options={Object.keys(AVAILABLE_CURRENCIES)}
                className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none border-none cursor-pointer pr-1"
              />
            </div>
          </CurrencyInput.Root>

          {/* Value Sanitization Audit Log */}
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0f172a]/30 border border-slate-100 dark:border-slate-800/80 space-y-1.5">
            <span className="text-[9px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase block">
              Application Float Diagnostics
            </span>
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-500 dark:text-slate-400">
                Raw Input:
              </span>
              <span className="text-slate-700 dark:text-slate-300">
                &quot;{amount}&quot;
              </span>
            </div>
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-slate-500 dark:text-slate-400">
                Parsed Float:
              </span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {amount ? parseFloat(amount).toFixed(2) : "0.00"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const CurrencyInputCodeString = `
"use client";

import React, { useState } from "react";
import { CurrencyInput } from "@bass-ui-kit/core";

type CurrencyCode = "USD" | "EUR" | "GBP" | "NGN";

interface CurrencyDetails {
  code: CurrencyCode;
  symbol: string;
  balance: number;
  label: string;
}

const AVAILABLE_CURRENCIES: Record<CurrencyCode, CurrencyDetails> = {
  USD: {
    code: "USD",
    symbol: "$",
    balance: 12500.5,
    label: "United States Dollar",
  },
  EUR: { code: "EUR", symbol: "€", balance: 8430.2, label: "Euro" },
  GBP: { code: "GBP", symbol: "£", balance: 4120.0, label: "British Pound" },
  NGN: { code: "NGN", symbol: "₦", balance: 950000.0, label: "Nigerian Naira" },
};

export function CurrencyInputRender() {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");
  const [amount, setAmount] = useState<string>("");

  const currentAsset = AVAILABLE_CURRENCIES[selectedCurrency];

  const handleMaxPress = () => {
    setAmount(currentAsset.balance.toString());
  };

  return (
  <CurrencyInput.Root
    value={amount}
    onChange={setAmount}
    onCurrencyChange={(e) => {
      setSelectedCurrency;
      setAmount(""); // Clear input when switching currencies to keep state safe
    }}
    currency={selectedCurrency}
    onMax={handleMaxPress}
    className="relative flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0f172a]/20 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/80 transition-all px-3 py-1.5"
  >
    {/* Native Symbol Indicator */}
    <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 select-none mr-2">
      {currentAsset.symbol}
    </span>

    {/* Input field */}
    <CurrencyInput.Input
      placeholder="0.00"
      className="flex-1 min-w-0 bg-transparent text-sm font-mono font-medium outline-none border-none text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 py-2"
    />
    
      {/* Max Cap Button */}
      <CurrencyInput.MaxButton className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer">
        Max
      </CurrencyInput.MaxButton>

      {/* Currency Selector Dropdown */}
      <CurrencyInput.Dropdown
        options={Object.keys(AVAILABLE_CURRENCIES)}
        className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-300 outline-none border-none cursor-pointer pr-1"
      />
    </CurrencyInput.Root>
  )
`;
