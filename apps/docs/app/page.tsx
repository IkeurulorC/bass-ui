import React from "react";

export default function DocsLandingPage() {
  return (
    <div className="space-y-8 animate-fade-in text-slate-900 dark:text-white transition-colors duration-200">
      {/* Hero Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-6">
        <h2 className="text-4xl font-extrabold tracking-tight">
          Welcome to Bass UI
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 text-lg max-w-2xl">
          An ultra-clean, accessible, high-performance UI library designed
          specifically for heavy state management, financial widgets, and
          real-time transaction panels.
        </p>
      </div>

      {/* Quick Start / Monorepo Integration */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold tracking-tight">Quick Start</h3>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090d16] p-6 space-y-4 transition-all duration-200">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Install the components package into your workspace application:
          </p>
          <div className="bg-slate-900 dark:bg-black p-4 rounded-lg font-mono text-xs text-blue-400 dark:text-blue-300 overflow-x-auto border border-slate-800">
            <span className="text-slate-500">$</span> npm install
            @bass-ui-kit/core
          </div>
          <div className="bg-slate-900 dark:bg-black p-4 rounded-lg font-mono text-xs text-blue-400 dark:text-blue-300 overflow-x-auto border border-slate-800">
            <span className="text-slate-500">$</span> pnpm add @bass-ui-kit/core
          </div>
          <div className="bg-slate-900 dark:bg-black p-4 rounded-lg font-mono text-xs text-blue-400 dark:text-blue-300 overflow-x-auto border border-slate-800">
            <span className="text-slate-500">$</span> yarn add @bass-ui-kit/core
          </div>
          <div className="bg-slate-900 dark:bg-black p-4 rounded-lg font-mono text-xs text-blue-400 dark:text-blue-300 overflow-x-auto border border-slate-800">
            <span className="text-slate-500">$</span> bun add @bass-ui-kit/core
          </div>
        </div>
      </div>

      {/* Design Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090d16] p-6 transition-all duration-200">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-300 mb-2">
            ⚡ Performance First
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Every component is built on minimal primitives, avoiding heavy
            bundles. Perfect for highly reactive crypto tickers and dense data
            tables.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090d16] p-6 transition-all duration-200">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-300 mb-2">
            🎨 Dynamic Tailoring
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Styled natively with Tailwind CSS and variant logic. Adapts to your
            layouts right out of the box with responsive size classes.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090d16] p-6 transition-all duration-200">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-300 mb-2">
            ♿ Accessibility First
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All interactive flows strictly observe **WCAG 2.1 contrast rules**
            and include mandatory keyboard accessibility patterns (focus
            management, ARIA roles, and semantic HTML).
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090d16] p-6 transition-all duration-200">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-300 mb-2">
            💻 Execution Flexibility
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Components utilize the **Compound Component Pattern** to guarantee
            long-term maintainability for freelance scalability while offering
            maximum developer flexibility.
          </p>
        </div>
      </div>
    </div>
  );
}
