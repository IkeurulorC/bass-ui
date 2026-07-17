"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react"; // Or use your custom copy icon / CopyField primitive

interface ComponentViewerProps {
  preview: React.ReactNode;
  codeString: string;
  // If you pre-render syntax highlighting, you can pass a highlighted node instead
  highlightedCode?: React.ReactNode;
}

export default function ComponentViewer({
  preview,
  codeString,
  highlightedCode,
}: ComponentViewerProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm">
      {/* Control Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        {/* Segmented Tab Controls */}
        <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40">
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === "preview"
                ? "bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === "code"
                ? "bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            Code
          </button>
        </div>

        {/* Action Buttons (e.g., Copy Button) */}
        {activeTab === "code" && (
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="relative">
        {activeTab === "preview" ? (
          // Preview Pane
          <div className="p-8 bg-slate-50/20 dark:bg-[#0f172a]/10 flex items-center justify-center min-h-[250px]">
            {preview}
          </div>
        ) : (
          // Code Pane
          <div className="overflow-x-auto bg-slate-950 text-slate-200 text-xs font-mono p-5 leading-relaxed max-h-[400px]">
            {highlightedCode ? (
              highlightedCode
            ) : (
              <pre className="whitespace-pre">
                <code>{codeString}</code>
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
