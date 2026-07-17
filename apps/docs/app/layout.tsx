import React from "react";
import DocsShell from "./DocsShell";
import "./globals.css";

export const metadata = {
  title: "Bass UI Docs",
  description: "Bespoke design system playground",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 dark:bg-[#090d16] transition-colors duration-200">
        <DocsShell>{children}</DocsShell>
      </body>
    </html>
  );
}
