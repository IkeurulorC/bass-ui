"use client";

import { CommandBar } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

// 1. CommandBar.Root Props
export const commandBarRootProps: PropRow[] = [
  {
    name: "className",
    type: "string",
    description:
      "Overrides default structural modal overlay and floating container styling.",
    required: false,
  },
  {
    name: "children",
    type: "React.ReactNode",
    description:
      "The core layout primitives (Input, List, Empty) making up the internal structure of the command bar.",
    required: true,
  },
];

// 2. CommandBar.Input Props
export const commandBarInputProps: PropRow[] = [
  {
    name: "placeholder",
    type: "string",
    description:
      "Text hint displayed within the search input field when it is completely empty.",
    required: false,
    defaultValue: "'Search...'",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    description:
      "Callback function triggered instantly on every user keystroke to execute interactive filtering algorithms.",
    required: false,
  },
];

// 3. CommandBar.List Props
export const commandBarListProps: PropRow[] = [
  {
    name: "children",
    type: "React.ReactNode",
    description:
      "The collection of CommandBar.Item and CommandBar.Group components to be systematically indexed and filtered.",
    required: true,
  },
];

// 4. CommandBar.Group Props
export const commandBarGroupProps: PropRow[] = [
  {
    name: "heading",
    type: "string",
    description:
      "The header label text used to categorize and section distinct action blocks.",
    required: true,
  },
  {
    name: "defaultExpanded",
    type: "boolean",
    description:
      "Controls the initial spatial disclosure expansion state of the command option grouping.",
    required: false,
    defaultValue: "false",
  },
];

// 5. CommandBar.Item Props
export const commandBarItemProps: PropRow[] = [
  {
    name: "value",
    type: "string",
    description:
      "A unique search keyword identifier used by the filtering system to match text queries against this action row.",
    required: true,
  },
  {
    name: "onSelect",
    type: "() => void",
    description:
      "Callback function executed when the action line item is explicitly clicked or triggered via the keyboard 'Enter' hotkey.",
    required: false,
  },
  {
    name: "disabled",
    type: "boolean",
    description:
      "Applies non-interactive pointer rules and dim opacity to visually block action execution.",
    required: false,
    defaultValue: "false",
  },
];

export const CommandBarAPI = () => {
  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-3">
        Component API Reference
      </h2>

      <ApiReference
        componentName="CommandBar.Root"
        propsList={commandBarRootProps}
      />
      <ApiReference
        componentName="CommandBar.Input"
        propsList={commandBarInputProps}
      />
      <ApiReference
        componentName="CommandBar.List"
        propsList={commandBarListProps}
      />
      <ApiReference
        componentName="CommandBar.Group"
        propsList={commandBarGroupProps}
      />
      <ApiReference
        componentName="CommandBar.Item"
        propsList={commandBarItemProps}
      />
    </div>
  );
};

export const CommandBarCodeString = `
"use client";
import { CommandBar } from "@bass-ui-kit/core";

export function CommandBarRender() {
  const handleCreate = () => {};

  const handleDelete = () => {};
  return (
    <CommandBar.Root>
      <CommandBar.Input />
      <CommandBar.List>
        <CommandBar.Empty>No results found.</CommandBar.Empty>

        <CommandBar.Group heading="Actions">
          <CommandBar.Item onClick={handleCreate}>
            Create New Project
          </CommandBar.Item>
          <CommandBar.Item onClick={handleDelete}>
            Delete Project
          </CommandBar.Item>
          <CommandBar.Item onClick={handleDelete}>
            Find Project
          </CommandBar.Item>
          <CommandBar.Item onClick={handleDelete}>
            Edit Existing Project
          </CommandBar.Item>
        </CommandBar.Group>
        <CommandBar.Separator />
        <CommandBar.Group heading="Solutions">
          <CommandBar.Item onClick={handleCreate}>
            Creating New Projects
          </CommandBar.Item>
          <CommandBar.Item onClick={handleDelete}>
            Deleting Projects
          </CommandBar.Item>
          <CommandBar.Item onClick={handleDelete}>
            Finding Projects
          </CommandBar.Item>
          <CommandBar.Item onClick={handleDelete}>
            Editing Existing Projects
          </CommandBar.Item>
        </CommandBar.Group>
      </CommandBar.List>
    </CommandBar.Root>
  )
}

`;

export function CommandBarShowcase() {
  const handleCreate = () => {};

  const handleDelete = () => {};
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
            Command Bar Showcase
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Simulated keyboard-first command system with localized search query
          filtering.
        </p>
      </div>

      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-3">
          Infinite Marquee Variant (`variant=&quot;marquee&quot;`)
        </span>
        <div className="w-full h-60 rounded-xl bg-slate-950 p-4 border border-slate-900 overflow-hidden">
          <CommandBar.Root>
            <CommandBar.Input />
            <CommandBar.List>
              <CommandBar.Empty>No results found.</CommandBar.Empty>

              <CommandBar.Group heading="Actions">
                <CommandBar.Item onClick={handleCreate}>
                  Create New Project
                </CommandBar.Item>
                <CommandBar.Item onClick={handleDelete}>
                  Delete Project
                </CommandBar.Item>
                <CommandBar.Item onClick={handleDelete}>
                  Find Project
                </CommandBar.Item>
                <CommandBar.Item onClick={handleDelete}>
                  Edit Existing Project
                </CommandBar.Item>
              </CommandBar.Group>
              <CommandBar.Separator />
              <CommandBar.Group heading="Solutions">
                <CommandBar.Item onClick={handleCreate}>
                  Creating New Projects
                </CommandBar.Item>
                <CommandBar.Item onClick={handleDelete}>
                  Deleting Projects
                </CommandBar.Item>
                <CommandBar.Item onClick={handleDelete}>
                  Finding Projects
                </CommandBar.Item>
                <CommandBar.Item onClick={handleDelete}>
                  Editing Existing Projects
                </CommandBar.Item>
              </CommandBar.Group>
            </CommandBar.List>
          </CommandBar.Root>
        </div>
      </div>
    </div>
  );
}
