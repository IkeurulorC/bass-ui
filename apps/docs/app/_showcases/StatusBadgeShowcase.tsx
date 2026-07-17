import { StatusBadge } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const statusBadgeProps: PropRow[] = [
  {
    name: "status",
    type: '"Successful" | "Pending" | "Failed" | "Live"',
    description:
      "Determines the semantic color theme, corresponding status icon, and conditional pulse animation behavior.",
    required: true,
  },
  {
    name: "children",
    type: "string",
    description:
      "The custom text content to display within the badge label. If omitted, defaults automatically to the capitalized version of the status string.",
    required: false,
  },
  {
    name: "className",
    type: "string",
    description:
      "Optional Tailwind utility classes to override the component's internal design tokens, layout parameters, or spatial margins.",
    required: false,
  },
];

export function StatusBadgeShowcase() {
  return (
    <div className="flex flex-col gap-4 p-6 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 min-w-[300px]">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        Lifecycle States
      </h3>
      <div className="flex flex-wrap gap-3">
        <StatusBadge status="successful">Successful</StatusBadge>
        <StatusBadge status="pending">Pending</StatusBadge>
        <StatusBadge status="failed">Failed</StatusBadge>
      </div>

      <hr className="border-slate-200 my-1" />

      <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
        System States
      </h3>
      <div className="flex flex-wrap gap-3">
        <StatusBadge status="live">Live Stream</StatusBadge>
      </div>
    </div>
  );
}

export const StatusBadgeAPI = () => {
  return (
    <ApiReference componentName="StatusBadge" propsList={statusBadgeProps} />
  );
};

export const StatusBadgeCodeString = `
import { StatusBadge } from "@bass-ui-kit/core";
export function StatusBadgeRender() {
  return (
  <>
    <StatusBadge status="successful">Successful</StatusBadge>
    <StatusBadge status="pending">Pending</StatusBadge>
    <StatusBadge status="failed">Failed</StatusBadge>
    <StatusBadge status="live">Live Stream</StatusBadge>
  </>
  )
}
  
`;
