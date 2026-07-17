"use client";
import React, { useState } from "react";
import { ActionButton } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

interface WrapperProps {
  intent?: "primary" | "secondary" | "ghost" | "danger";
  size?: "default" | "full";
  children: React.ReactNode;
}

export const ActionButtonCodeString = `
"use client";
import React, { useState } from "react";
import { ActionButton } from "@bass-ui-kit/core";

const ActionButtonRender = () => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <ActionButton intent={intent} isLoading={loading} onClick={handleLoading}>
      {children}
    </ActionButton>
  );
};

`;

const buttonApiProps: PropRow[] = [
  {
    name: "intent",
    type: '"Primary" | "Secondary" | "Ghost" | "Danger"',
    description:
      "Communicates the intent and significance of the button's action.",
    required: false,
    defaultValue: '"Primary"',
  },
  {
    name: "size",
    type: '"full" | "cut"',
    description: "Determining whether the button is to be full-width or cut.",
    required: false,
    defaultValue: '"cut"',
  },
  {
    name: "className",
    type: "string",
    description:
      "The className property which can be used to override default styling.",
    required: false,
  },
  {
    name: "onClick",
    type: "() => void",
    description: "The function which is called when the button is clicked.",
    required: false,
  },
  {
    name: "isDisabled",
    type: "boolean",
    description: "The interactive state of the button.",
    required: false,
    defaultValue: "false",
  },
  {
    name: "isLoading",
    type: "boolean",
    description:
      "The loading state of the triggered action when the button is clicked.",
    required: false,
    defaultValue: "false",
  },
];

export const ActionButtonAPI = () => {
  return <ApiReference componentName="Button" propsList={buttonApiProps} />;
};

const InteractiveWrapper = ({ intent = "primary", children }: WrapperProps) => {
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <ActionButton intent={intent} isLoading={loading} onClick={handleLoading}>
      {children}
    </ActionButton>
  );
};

export function ActionButtonShowcase() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* 1. Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
          Interactive States Showcase
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Click the dynamic buttons below to preview standard and loading
          states.
        </p>
      </div>

      {/* 2. Grid Compartments (Classic Variants) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-y sm:divide-y-0 md:divide-y-0 divide-x-0 sm:divide-x  divide-slate-200/80 dark:divide-slate-800/60 border-b border-slate-200/80 dark:border-slate-800/60">
        {/* Primary Compartment */}
        <div className="p-6 flex flex-col justify-between items-center h-32">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Primary Intent
          </span>
          <div className="h-11 flex items-end">
            <InteractiveWrapper intent="primary">
              Click To Submit
            </InteractiveWrapper>
          </div>
        </div>

        {/* Secondary Compartment */}
        <div className="p-6 flex flex-col justify-between items-center h-32">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Secondary Intent
          </span>
          <div className="h-11 flex items-end">
            <InteractiveWrapper intent="secondary">
              Click To Submit
            </InteractiveWrapper>
          </div>
        </div>

        {/* Ghost Compartment */}
        <div className="p-6 flex flex-col justify-between items-center h-32">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Ghost Intent
          </span>
          <div className="h-11 flex items-end">
            <InteractiveWrapper intent="ghost">
              Click To Submit
            </InteractiveWrapper>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 divide-x-0 sm:divide-x dark:divide-slate-800/60 border-b divide-slate-200/80 border-slate-200/80 dark:border-slate-800/60">
        {/* Danger Compartment */}
        <div className="p-6 flex flex-col justify-between items-center h-32">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Danger Intent
          </span>
          <div className="h-11 flex items-end">
            <InteractiveWrapper intent="danger">
              Click To Submit
            </InteractiveWrapper>
          </div>
        </div>

        {/* Disabled Compartment */}
        <div className="p-6 flex flex-col justify-between items-center h-32">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            Disabled State
          </span>
          <div className="h-11 flex items-end">
            <ActionButton isDisabled={true}>Click To Submit</ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
}
