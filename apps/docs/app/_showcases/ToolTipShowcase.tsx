import { ActionButton, ToolTip } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const toolTipProps: PropRow[] = [
  {
    name: "trigger",
    type: "React.ReactNode",
    description:
      "The target element that programmatically reveals the tooltip bubble container upon mouse hover or keyboard focus.",
    required: true,
  },
  {
    name: "header",
    type: "React.ReactNode",
    description:
      "An optional bolded section title layout displayed directly above the primary body content.",
    required: false,
  },
  {
    name: "children",
    type: "React.ReactNode",
    description:
      "The primary descriptive text or custom rich content elements nested within the main tooltip body layout.",
    required: true,
  },
  {
    name: "className",
    type: "string",
    description:
      "Optional custom Tailwind classes to override the absolute floating content container's default base styling.",
    required: false,
  },
];

export function ToolTipShowcase() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
            Tooltip Showcase
          </h2>
          <span
            className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
            title="Live stream simulation active"
          />
        </div>
      </div>
      <div className="flex w-full m-2.5 justify-center">
        <ToolTip
          className="my-4 mx-1.5"
          trigger={<ActionButton>Trigger</ActionButton>}
          header={<span>Tooltip Triggered</span>}
        >
          The tooltip is triggered when you hover over the created trigger.
        </ToolTip>
      </div>
    </div>
  );
}

export const ToolTipAPI = () => {
  return <ApiReference componentName="ToolTip" propsList={toolTipProps} />;
};

export const ToolTipCodeString = `
import { ActionButton, ToolTip } from "@bass-ui-kit/core";

export function ToolTipRender() {
  return (
  <ToolTip
    className="my-4 mx-1.5"
    trigger={<ActionButton>Trigger</ActionButton>}
    header={<span>Tooltip Triggered</span>}
    children="The tooltip is triggered when you hover over the created trigger."
  />
  )
}
`;
