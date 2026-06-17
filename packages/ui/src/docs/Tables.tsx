export interface TableRowData {
  propName: string;
  propType: string;
  description: string;
  defaultValue: string | number | React.ReactNode;
}

interface PropTableProps {
  data: TableRowData[];
}

export const PropTable = ({ data }: PropTableProps) => (
  <table className="w-full border-collapse text-left text-sm min-w-[640px] sm:min-w-full">
    <thead className="bg-table-header-bg border-b border-table-border">
      <tr>
        {["Prop", "Type", "Description", "Default"].map((h) => (
          <th key={h} className="px-4 py-4.5 text-xs font-semibold">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-table-border">
      {data.map((row, i) => (
        <tr key={i}>
          <td className="px-4 py-4 font-mono text-sm">{row.propName}</td>
          <td className="px-4 py-4">
            <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">
              {row.propType}
            </code>
          </td>
          <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
            {row.description}
          </td>
          <td className="px-4 py-4 text-slate-500">{row.defaultValue}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const CurrencyInputRootProps = () => {
  const data = [
    {
      propName: "className",
      propType: "String",
      defaultValue: "-",
      description:
        "The className property which can be used to override default styling.",
    },
    {
      propName: "size",
      propType: "default | sm | lg",
      defaultValue: "default",
      description:
        "Can be used to adjust the size to accomodate different requirements.",
    },
    {
      propName: "value",
      propType: "String",
      defaultValue: "-",
      description: "The raw numeric string.",
    },
    {
      propName: "onChange",
      propType: "(value: string) => void",
      defaultValue: "-",
      description: "A function that is run when value is changed.",
    },
    {
      propName: "decimals",
      propType: "Number",
      defaultValue: "8",
      description:
        "The maximum number of decimal places for the inputted value.",
    },
    {
      propName: "disabled",
      propType: "Boolean",
      defaultValue: "False",
      description:
        "The disabled state of the component, if set to true, prevents interaction.",
    },
    {
      propName: "onMax",
      propType: "() => void",
      defaultValue: "-",
      description: "The function called when the max button is clicked.",
    },
    {
      propName: "currency",
      propType: "String",
      defaultValue: "-",
      description: "The currency being used.",
    },
    {
      propName: "onCurrencyChange",
      propType: "(currency: string) => void",
      defaultValue: "-",
      description: "A function which is run when the currency is changed.",
    },
  ];

  return <PropTable data={data} />;
};
export const CurrencyInputMaxButtonProps = () => {
  const data = [
    {
      propName: "className",
      propType: "String",
      defaultValue: "-",
      description:
        "The className property which can be used to override default styling.",
    },
  ];

  return <PropTable data={data} />;
};

export const CurrencyInputProps = () => {
  const data = [
    {
      propName: "className",
      propType: "String",
      defaultValue: "-",
      description:
        "The className property which can be used to override default styling.",
    },
  ];

  return <PropTable data={data} />;
};

export const CurrencyInputDropdownProps = () => {
  const data = [
    {
      propName: "className",
      propType: "String",
      defaultValue: "-",
      description:
        "The className property which can be used to override default styling.",
    },
    {
      propName: "options",
      propType: "String[]",
      defaultValue: "-",
      description:
        "The className property which can be used to override default styling.",
    },
  ];

  return <PropTable data={data} />;
};

export const ActionButtonProps = () => {
  const data = [
    {
      propName: "intent",
      propType: "Primary | Secondary | Ghost | Danger",
      defaultValue: "Primary",
      description:
        "Communicates the intent and significance of the button's action.",
    },
    {
      propName: "size",
      propType: "full | cut",
      defaultValue: "cut",
      description: "Determining whether the button is to be full-width or cut.",
    },
    {
      propName: "className",
      propType: "String",
      defaultValue: "-",
      description:
        "The className property which can be used to override default styling.",
    },
    {
      propName: "onClick",
      propType: "function",
      defaultValue: "-",
      description: "The function which is called when the button is clicked.",
    },
    {
      propName: "isDisabled",
      propType: "Boolean",
      defaultValue: "false",
      description: "The interactive state of the button.",
    },
    {
      propName: "isLoading",
      propType: "Boolean",
      defaultValue: "false",
      description:
        "The loading state of the triggered action when the button is clicked.",
    },
  ];

  return <PropTable data={data} />;
};

export const AssetCardProps = () => {
  const data = [
    {
      subComponent: "Root",
      BaseElement: "<div>",
      description: "The body where the card details lie.",
    },
    {
      subComponent: "Header",
      BaseElement: "<header>",
      description: "The card's header section.",
    },
    {
      subComponent: "Main",
      BaseElement: "<main>",
      description: "The card's main section.",
    },
    {
      subComponent: "Group",
      BaseElement: "<div>",
      description: "The asset's name and symbol (BTC, USD, ETH, NGN).",
    },
    {
      subComponent: "Info",
      BaseElement: "<div>",
      description: "Information concerning the asset being displayed.",
    },
    {
      subComponent: "Icon",
      BaseElement: "<div>",
      description: "The asset's icon or any associative image.",
    },
    {
      subComponent: "Rate",
      BaseElement: "<span>",
      description:
        "Within the info subcomponent: The rise/fall rate of the asset.",
    },
    {
      subComponent: "Value",
      BaseElement: "<h1>",
      description: "Within the info subcomponent: The asset's current value.",
    },
    {
      subComponent: "Visuals",
      BaseElement: "<div>",
      description: "A section for visual information concerning the asset.",
    },
    {
      subComponent: "Sparkline",
      BaseElement: "<svg>",
      description:
        "A sparkline representing the recent dips and rises of the asset's value.",
    },
  ];

  return (
    <table className="w-full border-collapse text-left text-sm min-w-[640px] sm:min-w-full">
      <thead className="bg-table-header-bg border-b border-table-border">
        <tr>
          {["Subcomponent", "Description", "Base Element"].map((header) => (
            <th
              key={header}
              className="px-4 sm:px-6 py-4.5 font-semibold text-table-header-text text-xs tracking-wider select-none first:pl-6 sm:first:pl-8 last:pr-6 sm:last:pr-8"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-table-border font-medium text-table-body-text">
        {data.map((row, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap px-4 sm:px-6 py-4 sm:py-5 align-middle first:pl-6 sm:first:pl-8 last:pr-6 sm:last:pr-8">
              {row.subComponent}
            </td>
            <td className="px-4 sm:px-6 py-4 sm:py-5 align-middle first:pl-6 sm:first:pl-8 last:pr-6 sm:last:pr-8">
              {row.description}
            </td>
            <td className="whitespace-nowrap px-4 sm:px-6 py-4 sm:py-5 align-middle first:pl-6 sm:first:pl-8 last:pr-6 sm:last:pr-8 font-mono text-xs text-emerald-600">
              <code>{row.BaseElement}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const CommandBarRootProps = () => {
  const data = [
    {
      propName: "className",
      propType: "String",
      defaultValue: "-",
      description: "Overrides default modal styling.",
    },
    {
      propName: "children",
      propType: "ReactNode",
      defaultValue: "-",
      description: "The content of the command bar.",
    },
  ];
  return <PropTable data={data} />;
};

export const CommandBarInputProps = () => {
  const data = [
    {
      propName: "placeholder",
      propType: "String",
      defaultValue: "'Search...'",
      description: "Text hint within the input field.",
    },
    {
      propName: "onValueChange",
      propType: "(value: string) => void",
      defaultValue: "-",
      description: "Triggered on user input for filtering.",
    },
  ];
  return <PropTable data={data} />;
};

export const CommandBarListProps = () => {
  const data = [
    {
      propName: "children",
      propType: "ReactNode",
      defaultValue: "-",
      description: "CommandItems and Groups to be filtered.",
    },
  ];
  return <PropTable data={data} />;
};

export const CommandBarGroupProps = () => {
  const data = [
    {
      propName: "heading",
      propType: "String",
      defaultValue: "-",
      description: "The label text for the grouped actions.",
    },
    {
      propName: "defaultExpanded",
      propType: "Boolean",
      defaultValue: "false",
      description: "Initial expanded state of the group.",
    },
  ];
  return <PropTable data={data} />;
};

export const CommandBarItemProps = () => {
  const data = [
    {
      propName: "onSelect",
      propType: "() => void",
      defaultValue: "-",
      description: "Callback triggered on click or 'Enter' key.",
    },
    {
      propName: "disabled",
      propType: "Boolean",
      defaultValue: "false",
      description: "Visual and functional disabled state.",
    },
    {
      propName: "value",
      propType: "String",
      defaultValue: "-",
      description: "Unique identifier for filtering.",
    },
  ];
  return <PropTable data={data} />;
};

export const CopyFieldProps = () => {
  const data = [
    {
      subComponent: "CopyField",
      BaseElement: "<div>",
      description:
        "The primary container managing the clipboard interaction state.",
    },
    {
      subComponent: "CopyFieldInput",
      BaseElement: "<input>",
      description: "A read-only field displaying the data to be copied.",
    },
    {
      subComponent: "CopyFieldButton",
      BaseElement: "<button>",
      description: "The interactive trigger for the copy-to-clipboard action.",
    },
  ];

  return (
    <table className="w-full border-collapse text-left text-sm min-w-[640px] sm:min-w-full">
      <thead className="bg-table-header-bg border-b border-table-border">
        <tr>
          {["Subcomponent", "Description", "Base Element"].map((header) => (
            <th
              key={header}
              className="px-4 sm:px-6 py-4.5 font-semibold text-table-header-text text-xs tracking-wider select-none"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-table-border font-medium text-table-body-text">
        {data.map((row, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap px-4 sm:px-6 py-4 sm:py-5">
              {row.subComponent}
            </td>
            <td className="px-4 sm:px-6 py-4 sm:py-5">{row.description}</td>
            <td className="px-4 sm:px-6 py-4 sm:py-5 font-mono text-emerald-600 text-xs">
              <code>{row.BaseElement}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const StatsProps = () => {
  const data = [
    {
      subComponent: "Stat.Root",
      BaseElement: "<div>",
      description:
        "The main container that handles card styling, background gradients, and layout.",
    },
    {
      subComponent: "Stat.Label",
      BaseElement: "<span>",
      description: "A secondary text element used to describe the metric.",
    },
    {
      subComponent: "Stat.Value",
      BaseElement: "<div>",
      description:
        "The primary data display; features an automatic counting animation engine.",
    },
    {
      subComponent: "Stat.Trend",
      BaseElement: "<span>",
      description:
        "Displays percentage change with color-coded logic (positive/negative).",
    },
    {
      subComponent: "Stat.Extras",
      BaseElement: "<section>",
      description:
        "A flexible slot for additional custom elements (e.g., small icons, timestamps).",
    },
  ];

  return (
    <table className="w-full border-collapse text-left text-sm min-w-[640px] sm:min-w-full">
      <thead className="bg-table-header-bg border-b border-table-border">
        <tr>
          {["Subcomponent", "Description", "Base Element"].map((header) => (
            <th
              key={header}
              className="px-4 sm:px-6 py-4.5 font-semibold text-table-header-text text-xs tracking-wider select-none"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-table-border font-medium text-table-body-text">
        {data.map((row, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap px-4 sm:px-6 py-4 sm:py-5">
              {row.subComponent}
            </td>
            <td className="px-4 sm:px-6 py-4 sm:py-5">{row.description}</td>
            <td className="px-4 sm:px-6 py-4 sm:py-5 font-mono text-emerald-600 text-xs">
              <code>{row.BaseElement}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const ModalProps = () => {
  const data = [
    {
      subComponent: "Modal",
      BaseElement: "<div>",
      description:
        "The root orchestrator that manages internal open/close state and context.",
    },
    {
      subComponent: "Modal.Trigger",
      BaseElement: "<button>",
      description:
        "A wrapper for any element to serve as the modal launch point.",
    },
    {
      subComponent: "Modal.Header",
      BaseElement: "<header>",
      description: "The top container containing the title and close button.",
    },
    {
      subComponent: "Modal.Body",
      BaseElement: "<main>",
      description: "The primary area for modal content/forms.",
    },
    {
      subComponent: "Modal.Footer",
      BaseElement: "<footer>",
      description: "A layout container for action buttons (Cancel/Confirm).",
    },
    {
      subComponent: "Modal.Action",
      BaseElement: "<button>",
      description:
        "A pre-styled primary button for executing the modal's purpose.",
    },
    {
      subComponent: "Modal.Cancel",
      BaseElement: "<button>",
      description: "A pre-styled ghost button for dismissing the action.",
    },
  ];

  return (
    <table className="w-full border-collapse text-left text-sm min-w-[640px] sm:min-w-full">
      <thead className="bg-table-header-bg border-b border-table-border">
        <tr>
          {["Subcomponent", "Description", "Base Element"].map((header) => (
            <th
              key={header}
              className="px-4 sm:px-6 py-4.5 font-semibold text-table-header-text text-xs tracking-wider select-none"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-table-border font-medium text-table-body-text">
        {data.map((row, index) => (
          <tr key={index}>
            <td className="whitespace-nowrap px-4 sm:px-6 py-4 sm:py-5">
              {row.subComponent}
            </td>
            <td className="px-4 sm:px-6 py-4 sm:py-5">{row.description}</td>
            <td className="px-4 sm:px-6 py-4 sm:py-5 font-mono text-emerald-600 text-xs">
              <code>{row.BaseElement}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const PriceTickerProps = () => {
  const data = [
    {
      propName: "assets",
      propType: "TickerAsset[]",
      defaultValue: "[]",
      description:
        "An array of objects containing id, symbol, name, price, and 24h change.",
    },
    {
      propName: "variant",
      propType: "marquee | stack",
      defaultValue: "marquee",
      description:
        "Defines whether the list scrolls infinitely or displays as a vertical list.",
    },
    {
      propName: "speed",
      propType: "number",
      defaultValue: "30",
      description:
        "The duration in seconds for a full marquee rotation (only for 'marquee' variant).",
    },
  ];
  return <PropTable data={data} />;
};

export const StatusBadgeProps = () => {
  const data = [
    {
      propName: "status",
      propType: "Successful | Pending | Failed | Live",
      defaultValue: "-",
      description: "Determines the color theme, icon, and pulse behavior.",
    },
    {
      propName: "children",
      propType: "string",
      defaultValue: "-",
      description:
        "The text content to display. If omitted, defaults to the capitalized status.",
    },
    {
      propName: "className",
      propType: "string",
      defaultValue: "-",
      description: "Optional overrides for component layout or spacing.",
    },
  ];
  return <PropTable data={data} />;
};

export const ToggleProps = () => {
  const data = [
    {
      propName: "label",
      propType: "string",
      defaultValue: "-",
      description: "Descriptive text appearing to the right of the switch.",
    },
    {
      propName: "error",
      propType: "string",
      defaultValue: "-",
      description: "Optional validation message shown below the toggle..",
    },
    {
      propName: "aria-label",
      propType: "string",
      defaultValue: "-",
      description:
        "Essential for accessibility if no visible label is provided..",
    },
  ];
  return <PropTable data={data} />;
};

export const CheckBoxProps = () => {
  const data = [
    {
      propName: "disabled",
      propType: "boolean",
      defaultValue: "false",
      description: "Prevents interaction and reduces opacity.",
    },
    {
      propName: "aria-label",
      propType: "string",
      defaultValue: "-",
      description:
        "Essential for accessibility if no visible label is provided..",
    },
  ];
  return <PropTable data={data} />;
};
