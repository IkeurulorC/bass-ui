"use client";
import { CommandBar } from "@bass-ui-kit/core";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900">
        {/* 1. TOPBAR */}
        <header className="fixed top-0 left-0 right-0 h-20 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-6">
          <div className="font-bold text-xl tracking-tight">DashApp</div>
          <div className="flex items-center gap-4">
            <CommandBar.Root>
              <CommandBar.Input />
              <CommandBar.List>
                <CommandBar.Empty>No results found.</CommandBar.Empty>

                <CommandBar.Group heading="Actions">
                  <CommandBar.Item>Create New Project</CommandBar.Item>
                  <CommandBar.Item>Delete Project</CommandBar.Item>
                  <CommandBar.Item>Find Project</CommandBar.Item>
                  <CommandBar.Item>Edit Existing Project</CommandBar.Item>
                </CommandBar.Group>
                <CommandBar.Separator />
                <CommandBar.Group heading="Solutions">
                  <CommandBar.Item>Creating New Projects</CommandBar.Item>
                  <CommandBar.Item>Deleting Projects</CommandBar.Item>
                  <CommandBar.Item>Finding Projects</CommandBar.Item>
                  <CommandBar.Item>Editing Existing Projects</CommandBar.Item>
                </CommandBar.Group>
              </CommandBar.List>
            </CommandBar.Root>
            <span className="text-sm text-gray-500">v1.0.0</span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
              U
            </div>
          </div>
        </header>

        <div className="pt-16">
          {/* 2. SIDEBAR */}
          <aside className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-20 overflow-y-auto p-6 hidden md:block">
            <nav className="space-y-1">
              <Link
                href="/"
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg bg-gray-100 text-gray-900"
              >
                Overview
              </Link>
              <Link
                href="/analytics"
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Analytics
              </Link>
              <Link
                href="/settings"
                className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Settings
              </Link>
            </nav>
          </aside>

          {/* 3. MAIN CONTENT AREA */}
          <main className="min-h-[calc(100vh-4rem)] p-6 md:ml-64 bg-slate-50 dark:bg-slate-950 transition-all">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
