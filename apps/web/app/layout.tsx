"use client";
import * as React from "react";
import { ThemeProvider } from "next-themes";
import { CommandBar } from "@bass-ui-kit/core";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SettingsProvider,
  SettingsContext,
} from "./components/SettingsContext";
import "./globals.css";
import { ThemeToggle } from "./components/ThemeToggle";

function HeaderContent() {
  const router = useRouter();
  const { assetRegistry, setTargetPage, isLoading } =
    React.useContext(SettingsContext);
  React.useEffect(() => {
    console.log("Registry contents:", assetRegistry);
  }, [assetRegistry]);

  if (isLoading) return <div className="text-xs text-gray-400">Loading...</div>;

  return (
    <CommandBar.Root key={assetRegistry.length}>
      <CommandBar.Input placeholder="Search assets..." />
      <CommandBar.List>
        <CommandBar.Empty>No results found.</CommandBar.Empty>
        <CommandBar.Group heading="Market Assets">
          {assetRegistry.map((asset) => (
            <CommandBar.Item
              key={asset.id}
              onSelect={() => {
                const calculatedPage = Math.ceil(asset.rank / 10);
                setTargetPage(calculatedPage);
                router.push("/analytics");
              }}
            >
              {asset.name}
            </CommandBar.Item>
          ))}
        </CommandBar.Group>
      </CommandBar.List>
    </CommandBar.Root>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      {/* Set a base dark background color */}
      <body className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SettingsProvider>
            {/* 1. TOPBAR: Added dark background and border */}
            <header className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 z-30 flex items-center justify-between px-6 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-bold">
                  B
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-wide text-gray-900 dark:text-white">
                    Bass UI Kit
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-slate-500 tracking-widest">
                    Core Engine
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <HeaderContent />
                <div className="flex items-center gap-4 border-l border-gray-200 dark:border-slate-800 pl-6">
                  <ThemeToggle />
                  <a
                    href="..."
                    className="text-sm font-semibold text-gray-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    v1.0.4
                  </a>
                </div>
              </div>
            </header>

            <div className="pt-20">
              {/* 2. SIDEBAR: Added dark background and border */}
              <aside className="fixed top-20 left-0 bottom-0 w-64 bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 z-20 overflow-y-auto p-6 hidden md:block transition-colors">
                <nav className="space-y-1">
                  {[
                    { href: "/", label: "Overview" },
                    { href: "/analytics", label: "Analytics" },
                    { href: "/settings", label: "Settings" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                        pathName === item.href
                          ? "bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-900 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </aside>

              {/* 3. MAIN CONTENT AREA: Ensure dark background */}
              <main className="min-h-[calc(100vh-5rem)] p-6 md:ml-64 bg-slate-50 dark:bg-slate-950 transition-colors">
                {children}
              </main>
            </div>
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
