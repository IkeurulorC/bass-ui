import { CopyField } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

const copyFieldSubComponents: PropRow[] = [
  {
    name: "CopyField",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "The primary container managing the internal clipboard interaction state and layout context.",
    required: false,
  },
  {
    name: "CopyFieldInput",
    type: "React.ComponentPropsWithoutRef<'input'>",
    description:
      "A read-only text input field engineered to cleanly display the data string intended to be copied.",
    required: false,
  },
  {
    name: "CopyFieldButton",
    type: "React.ComponentPropsWithoutRef<'button'>",
    description:
      "The interactive click trigger that executes the programmatic copy-to-clipboard action.",
    required: false,
  },
];

export const CopyFieldAPI = () => {
  return (
    <ApiReference
      componentName="CopyField Anatomy"
      propsList={copyFieldSubComponents}
    />
  );
};

export function CopyFieldShowcase() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
          CopyField Component Showcase
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          A specialized primitive designed for situations where secure handling
          of data is paramount, e.gwallet addresses, transaction IDs, or
          recovery seeds.
        </p>
      </div>

      <div className="p-8 bg-slate-50/20 dark:bg-[#0f172a]/10 flex items-center justify-center min-h-[220px]">
        <div className="w-full p-6 rounded-xl border border-slate-200/60 dark:border-slate-850 bg-white dark:bg-[#090d16]/60 space-y-4">
          <CopyField
            className="my-4 mx-1.5"
            value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis facere quam ad quod dolorem doloribus esse quidem aliquid repellat, beatae, animi eligendi cum quisquam laudantium reiciendis consectetur neque dolores corporis!"
          />
        </div>
      </div>
    </div>
  );
}

export const CopyFieldCodeString = `
import { CopyField } from "@bass-ui-kit/core";

export function CopyFieldRender() {
  return (
    <CopyField
      className="my-4 mx-1.5"
      value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis facere quam ad quod dolorem doloribus esse quidem aliquid repellat, beatae, animi eligendi cum quisquam laudantium reiciendis consectetur neque dolores corporis!"
    />
  );
}

`;
