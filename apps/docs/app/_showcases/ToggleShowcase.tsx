"use client";

import React, { useState } from "react";
import { Toggle } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const toggleProps: PropRow[] = [
  {
    name: "label",
    type: "string",
    description:
      "Descriptive text layer appearing structurally to the right side of the switch primitive.",
    required: false,
  },
  {
    name: "error",
    type: "string",
    description:
      "Optional validation message or string tracking constraints shown below the toggle switch node.",
    required: false,
  },
  {
    name: "aria-label",
    type: "string",
    description:
      "Essential for screen reader accessibility interactions if no matching visible text element is rendered on screen.",
    required: false,
  },
];

export function ToggleShowcase() {
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleDevModeChange = (checked: boolean) => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsDevMode(checked);
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
          Toggle Switch Showcase
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Tactile, spring-animated binary switches designed for configuration
          changes that apply instantly.
        </p>
      </div>

      {/* Sandbox Area */}
      <div className="p-8 bg-slate-50/20 dark:bg-[#0f172a]/10 flex items-center justify-center min-h-[220px]">
        <div className="w-full max-w-md p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#090d16]/60 space-y-4">
          {/* Standard Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 dark:bg-[#0f172a]/20 border border-slate-100 dark:border-slate-800/40">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                FaceID Authentication
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Authorize actions via local biometrics.
              </span>
            </div>
            <Toggle
              checked={isBiometricsEnabled}
              onCheckedChange={setIsBiometricsEnabled}
            />
          </div>

          {/* Toggle with Loader Sync */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 dark:bg-[#0f172a]/20 border border-slate-100 dark:border-slate-800/40">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Developer Sandbox
                </span>
                {isSyncing && (
                  <span className="text-[9px] px-1.5 py-0.5 font-mono rounded bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 animate-pulse">
                    Syncing...
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Enable raw JSON ledger event streaming.
              </span>
            </div>
            <Toggle
              checked={isDevMode}
              onCheckedChange={handleDevModeChange}
              disabled={isSyncing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const ToggleAPI = () => {
  return <ApiReference componentName="Toggle" propsList={toggleProps} />;
};

export const ToggleCodeString = `
"use client";

import React, { useState } from "react";
import { Toggle } from "@bass-ui-kit/core";

export default function ToggleRender() {
const [isChecked, setIsChecked] = useState(false);
  return (
  <div className="pt-0.5">
    <Toggle
      checked={isChecked}
      onCheckedChange={setIsChecked}
    />
  </div>
}

`;
