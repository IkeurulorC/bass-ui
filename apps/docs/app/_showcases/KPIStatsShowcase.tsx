import React from "react";
import { Stat } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const statSubComponents: PropRow[] = [
  {
    name: "Stat.Root",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "The primary shell container that orchestrates layout flow, background gradients, and card frame styling configurations.",
    required: false,
  },
  {
    name: "Stat.Label",
    type: "React.ComponentPropsWithoutRef<'span'>",
    description:
      "A secondary, dim typography element engineered to provide clear context and describe the focused metric.",
    required: false,
  },
  {
    name: "Stat.Value",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "The prominent focal display node; integrates an automated counting animation layout engine to dynamically step through numeric ranges.",
    required: false,
  },
  {
    name: "Stat.Trend",
    type: "React.ComponentPropsWithoutRef<'span'>",
    description:
      "Displays conditional percentage shifts using integrated, color-coded delta logic based on positive or negative balance trends.",
    required: false,
  },
  {
    name: "Stat.Extras",
    type: "React.ComponentPropsWithoutRef<'section'>",
    description:
      "A dedicated layout slot designed to cleanly append extra custom markup, secondary timestamps, or helper status icons.",
    required: false,
  },
];

const formatUSD = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
};

export function StatShowcase() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* 1. Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
          KPI Stats Variant Showcase
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Visual comparison of trend directional types, custom labels, and
          automated value formatters.
        </p>
      </div>

      {/* 2. Grid Compartments (The Two Variants Side-by-Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-slate-200/80 dark:divide-slate-800/60">
        {/* Positive-Up / Small Variant Compartment */}
        <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[160px] transition-colors duration-150">
          <div className="mb-4">
            <span className="text-[10px] font-bold tracking-widest text-emerald-600 dark:text-emerald-500 uppercase px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/30 w-max">
              Positive Trend
            </span>
          </div>
          <div className="w-full">
            <Stat.Root>
              <Stat.Label>Monthly Recurring Revenue</Stat.Label>
              <Stat.Trend trendType="positive-up" value={+8.4} />
              <Stat.Value value={124560} formatter={formatUSD} />
            </Stat.Root>
          </div>
        </div>

        {/* Negative-Up / Negative Variant Compartment */}
        <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[160px] transition-colors duration-150">
          <div className="mb-4">
            <span className="text-[10px] font-bold tracking-widest text-rose-600 dark:text-rose-500 uppercase px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/30 w-max">
              Negative Trend
            </span>
          </div>
          <div className="w-full">
            <Stat.Root>
              <Stat.Label>Monthly Recurring Revenue</Stat.Label>
              <Stat.Trend trendType="negative-up" value={+8.4} />
              <Stat.Value value={124560} formatter={formatUSD} />
            </Stat.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

export const StatAPI = () => {
  return (
    <ApiReference componentName="Stat Anatomy" propsList={statSubComponents} />
  );
};

export const StatCodeString = `
import React from "react";
import { Stat } from "@bass-ui-kit/core";

const formatUSD = (val: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
};

export function StatRender() {
  return (
  <div className="w-full">
    <Stat.Root>
      <Stat.Label>Monthly Recurring Revenue</Stat.Label>
      <Stat.Trend trendType="positive-up" value={+8.4} />
      <Stat.Value value={124560} formatter={formatUSD} />
    </Stat.Root>
    <Stat.Root>
      <Stat.Label>Monthly Recurring Revenue</Stat.Label>
      <Stat.Trend trendType="negative-up" value={+8.4} />
      <Stat.Value value={124560} formatter={formatUSD} />
    </Stat.Root>
  </div>
  )
`;
