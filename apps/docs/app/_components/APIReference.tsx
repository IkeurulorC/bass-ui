"use client";

import React from "react";

export interface PropRow {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  defaultValue?: string;
}

interface ApiReferenceProps {
  componentName: string;
  propsList: PropRow[];
}

export default function ApiReference({
  componentName,
  propsList,
}: ApiReferenceProps) {
  return (
    <div className="w-full space-y-6 text-left mt-12">
      {/* Section Title */}
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
        API Reference: {componentName}
      </h2>

      {/* Reference List Container */}
      <div className="divide-y divide-slate-200/80 dark:divide-slate-800/60 border-t border-slate-200/80 dark:border-slate-800/60">
        {propsList.map((prop) => (
          <div key={prop.name} className="py-5 space-y-2.5">
            {/* Row Header: Name and Status Badge */}
            <div className="flex items-center gap-3 text-xs">
              <span className="font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/60 font-semibold text-slate-800 dark:text-slate-200">
                {prop.name}
              </span>

              {prop.required ? (
                <span className="text-[#ff5a1f] font-medium select-none">
                  <span className="text-slate-300 dark:text-slate-700 mr-2 font-normal">
                    |
                  </span>
                  Required
                </span>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 font-medium select-none">
                  <span className="text-slate-300 dark:text-slate-700 mr-2 font-normal">
                    |
                  </span>
                  Optional
                </span>
              )}
            </div>

            {/* Type Declaration */}
            <div className="font-mono text-xs text-blue-600 dark:text-blue-400 selection:bg-blue-500/10">
              {prop.type}
            </div>

            {/* Description Paragraph */}
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {prop.description}
            </p>

            {/* Default Value Box (Optional) */}
            {prop.defaultValue && (
              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span>Default: </span>
                <span className="text-blue-500/90 dark:text-blue-400/80 font-medium">
                  {prop.defaultValue}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
