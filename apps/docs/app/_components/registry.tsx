// apps/docs/app/registry.tsx
import React from "react";
import { ActionButtonShowcase } from "./_showcases/ActionButtonShowcase";

// Temporary placeholding components for the ones you haven't built showcases for yet
const Placeholder = ({ name }: { name: string }) => (
  <div className="p-8 text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
    Showcase wrapper for {name} coming soon...
  </div>
);

export const componentRegistry: Record<string, React.ReactNode> = {
  actionbutton: <ActionButtonShowcase />,
  copyfield: <Placeholder name="CopyField" />,
  statusbadge: <Placeholder name="StatusBadge" />,
  datatable: <Placeholder name="DataTable" />,
  kpi_stats: <Placeholder name="KPI Stats" />,
  priceticker: <Placeholder name="PriceTicker" />,
  toastnotification: <Placeholder name="ToastNotification" />,
};
