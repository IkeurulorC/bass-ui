"use client";

import React, { useState } from "react";
import { CheckBox } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

const checkboxProps: PropRow[] = [
  {
    name: "disabled",
    type: "boolean",
    description:
      "Prevents user interaction and dynamically reduces the visual opacity layer.",
    required: false,
    defaultValue: "false",
  },
  {
    name: "aria-label",
    type: "string",
    description:
      "An explicit string description that is essential for assistive screen reader accessibility if no alternative visible text label is rendered on screen.",
    required: false,
  },
];

type AlertPreference = "trading" | "security" | "marketing";

export const CheckBoxCodeString = `
"use client";

import React, { useState } from "react";
import { CheckBox } from "@bass-ui-kit/core";

export default function CheckBoxRender() {
  const [isChecked, setIsChecked] = useState(false);
  return (
  <div className="pt-0.5">
    <CheckBox
      checked={isChecked}
      onCheckedChange={setIsChecked}
      id="preview"
    />
  </div>
  )
}
`;

export const CheckBoxAPI = () => {
  return (
    <ApiReference
      componentName="Interactive Control"
      propsList={checkboxProps}
    />
  );
};

export function CheckBoxShowcase() {
  const [selectedAlerts, setSelectedAlerts] = useState<AlertPreference[]>([
    "trading",
    "security",
  ]);

  const toggleAlert = (type: AlertPreference) => {
    setSelectedAlerts((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
          CheckBox Showcase
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          State-managed multi-select indicators utilizing high-quality scale
          transition effects.
        </p>
      </div>

      {/* Sandbox Area */}
      <div className="p-8 bg-slate-50/20 dark:bg-[#0f172a]/10 flex items-center justify-center min-h-[220px]">
        <div className="w-full max-w-md p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#090d16]/60 space-y-4">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-2">
            Notification Subscriptions
          </span>

          <div className="space-y-2.5">
            {[
              {
                id: "trading",
                label: "Real-time Order Fills",
                desc: "Instantly alert on partial/completed orders.",
              },
              {
                id: "security",
                label: "New Device Sign-ins",
                desc: "Notify when sessions are initiated elsewhere.",
              },
              {
                id: "marketing",
                label: "Weekly Account Digest",
                desc: "Summarize weekly balance and yield performance.",
              },
            ].map((item) => {
              const isChecked = selectedAlerts.includes(
                item.id as AlertPreference
              );
              return (
                <div
                  key={item.id}
                  onClick={() => toggleAlert(item.id as AlertPreference)}
                  className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50/50 dark:hover:bg-[#0f172a]/20 cursor-pointer transition-all select-none border border-transparent hover:border-slate-100 dark:hover:border-slate-800/40"
                >
                  <div className="pt-0.5">
                    <CheckBox
                      checked={isChecked}
                      onCheckedChange={() => {}} // Wrapper click controls the state loop
                      id={`alert-${item.id}`}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label
                      htmlFor={`alert-${item.id}`}
                      className="text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer"
                    >
                      {item.label}
                    </label>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      {item.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
