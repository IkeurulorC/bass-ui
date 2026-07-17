"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

const componentsList = [
  { id: "actionbutton", name: "ActionButton", category: "Foundations" },
  { id: "copyfield", name: "CopyField", category: "Foundations" },
  { id: "statusbadge", name: "StatusBadge", category: "Foundations" },
  { id: "datatable", name: "DataTable", category: "Data Display" },
  { id: "kpi_stats", name: "KPI Stats", category: "Data Display" },
  { id: "priceticker", name: "PriceTicker", category: "Data Display" },
  { id: "assetcard", name: "AssetCard", category: "Data Display" },
  { id: "toastnotification", name: "ToastNotification", category: "Overlays" },
  {
    id: "transactionstepper",
    name: "TransactionStepper",
    category: "Overlays",
  },
  { id: "tooltip", name: "ToolTip", category: "Overlays" },
  { id: "modal", name: "Modal", category: "Overlays" },
  { id: "toggle", name: "Toggle", category: "Forms" },
  { id: "checkbox", name: "CheckBox", category: "Forms" },
  { id: "currencyinput", name: "CurrencyInput", category: "Forms" },
  { id: "commandbar", name: "CommandBar", category: "Forms" },
];

export default function DocsShell({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Group components by their category
  const categories = componentsList.reduce(
    (acc, curr) => {
      const group = acc[curr.category] ?? [];
      group.push(curr);
      acc[curr.category] = group;
      return acc;
    },
    {} as Record<string, typeof componentsList>
  );

  // Base utility styling shared across all links
  const navLinkClasses =
    "block w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-150";

  // Highlight styles applied specifically to the active link
  const activeLinkClasses =
    "bg-blue-50/80 dark:bg-blue-950/40 font-medium text-blue-600 dark:text-blue-400";

  // Muted, interactive styling applied to standard inactive links
  const inactiveLinkClasses =
    "text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-200";

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col md:flex-row h-screen w-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-[#f8fafc] font-sans overflow-hidden transition-colors duration-200">
        {/* 📱 Mobile Header & Burger Trigger */}
        <header className="flex md:hidden items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#090d16] z-50 shrink-0">
          <Link href="/" onClick={() => setIsSidebarOpen(false)}>
            <h1 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
              BASS UI KIT
            </h1>
          </Link>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/40 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isSidebarOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </header>

        {/* 🖥️ Sidebar (Responsive Drawer) */}
        <aside
          className={`
          fixed inset-y-0 left-0 transform md:relative md:translate-x-0 
          w-64 border-r border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#090d16] 
          flex flex-col p-6 shrink-0 transition-all duration-300 ease-in-out z-40
          ${isSidebarOpen ? "translate-x-0 pt-20 md:pt-6" : "-translate-x-full md:translate-x-0"}
        `}
        >
          {/* Logo (Hidden on mobile inside side-drawer) */}
          <div className="hidden md:block mb-8">
            <Link href="/">
              <h1 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
                BASS UI KIT
              </h1>
            </Link>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              v1.0.0 — Documentation Site
            </p>
          </div>

          <nav className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-2">
            <Link
              key="home"
              href="/"
              onClick={() => setIsSidebarOpen(false)}
              className={`${navLinkClasses} ${pathName === "/" ? activeLinkClasses : inactiveLinkClasses}`}
            >
              Home
            </Link>

            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="space-y-1">
                <h3 className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-600 uppercase mb-2 mt-4 first:mt-0">
                  {category}
                </h3>
                {items.map((item) => {
                  const targetHref = `/${item.id}`;
                  const isActive = pathName === targetHref;

                  return (
                    <Link
                      key={item.id}
                      href={targetHref}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`${navLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Drawer Overlay Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          />
        )}

        {/* 📄 Adaptive Main Content Area */}
        <main className="flex-1 bg-white dark:bg-[#0f172a] overflow-y-auto p-6 sm:p-12 transition-colors duration-200">
          <div className="max-w-4xl mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}
