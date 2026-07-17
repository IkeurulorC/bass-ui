"use client";

import * as React from "react";
import { use } from "react";
import { notFound } from "next/navigation";
import { Check, Copy } from "lucide-react";

import { ToastProvider } from "@bass-ui-kit/core";

import {
  ActionButtonShowcase,
  ActionButtonCodeString,
  ActionButtonAPI,
} from "../_showcases/ActionButtonShowcase";
import {
  CopyFieldCodeString,
  CopyFieldShowcase,
  CopyFieldAPI,
} from "../_showcases/CopyFieldShowcase";
import {
  StatusBadgeCodeString,
  StatusBadgeShowcase,
  StatusBadgeAPI,
} from "../_showcases/StatusBadgeShowcase";
import {
  DataTableCodeString,
  DataTableShowcase,
  DataTableAPI,
} from "../_showcases/DataTableShowcase";
import {
  StatCodeString,
  StatShowcase,
  StatAPI,
} from "../_showcases/KPIStatsShowcase";
import PriceTickerShowcase, {
  PriceTickerCodeString,
  PriceTickerAPI,
} from "../_showcases/PriceTickerShowcase";
import {
  AssetCardShowcase,
  AssetCardCodeString,
  AssetCardAPI,
} from "../_showcases/AssetCardShowcase";
import {
  TransactionStepperCodeString,
  TransactionStepperShowcase,
  TransactionStepperAPI,
} from "../_showcases/TransactionStepperShowcase";
import {
  ToolTipCodeString,
  ToolTipShowcase,
  ToolTipAPI,
} from "../_showcases/ToolTipShowcase";
import {
  ToastCodeSring,
  ToastShowcase,
  ToastAPI,
} from "../_showcases/ToastShowcase";
import {
  ModalCodeString,
  ModalShowcase,
  ModalAPI,
} from "../_showcases/ModalShowcase";
import {
  ToggleCodeString,
  ToggleShowcase,
  ToggleAPI,
} from "../_showcases/ToggleShowcase";
import {
  CheckBoxShowcase,
  CheckBoxCodeString,
  CheckBoxAPI,
} from "../_showcases/CheckBoxShowcase";
import {
  CurrencyInputCodeString,
  CurrencyInputShowcase,
  CurrencyInputAPI,
} from "../_showcases/CurrencyInputShowcase";
import {
  CommandBarCodeString,
  CommandBarShowcase,
  CommandBarAPI,
} from "../_showcases/CommandBarShowcase";

// Fallback registry for components that don't have built showcase panels yet
const PlaceholderShowcase = ({ name }: { name: string }) => (
  <div className="p-12 text-center text-sm font-mono text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
    [Interactive sandbox for {name} is currently under construction]
  </div>
);

const APIReferences: Record<string, React.ReactNode> = {
  actionbutton: <ActionButtonAPI />,
  assetcard: <AssetCardAPI />,
  checkbox: <CheckBoxAPI />,
  commandbar: <CommandBarAPI />,
  copyfield: <CopyFieldAPI />,
  currencyinput: <CurrencyInputAPI />,
  datatable: <DataTableAPI />,
  kpi_stats: <StatAPI />,
  modal: <ModalAPI />,
  priceticker: <PriceTickerAPI />,
  statusbadge: <StatusBadgeAPI />,
  toastnotification: <ToastAPI />,
  toggle: <ToggleAPI />,
  tooltip: <ToolTipAPI />,
  transactionstepper: <TransactionStepperAPI />,
}!;

const codeStrings: Record<string, string> = {
  actionbutton: ActionButtonCodeString,
  assetcard: AssetCardCodeString,
  checkbox: CheckBoxCodeString,
  commandbar: CommandBarCodeString,
  copyfield: CopyFieldCodeString,
  currencyinput: CurrencyInputCodeString,
  datatable: DataTableCodeString,
  kpi_stats: StatCodeString,
  modal: ModalCodeString,
  priceticker: PriceTickerCodeString,
  statusbadge: StatusBadgeCodeString,
  toastnotification: ToastCodeSring,
  toggle: ToggleCodeString,
  tooltip: ToolTipCodeString,
  transactionstepper: TransactionStepperCodeString,
};

// Map url slug keys directly to their native React elements
const showcaseRegistry: Record<string, React.ReactNode> = {
  actionbutton: <ActionButtonShowcase />,
  copyfield: <CopyFieldShowcase />,
  statusbadge: <StatusBadgeShowcase />,
  datatable: <DataTableShowcase />,
  kpi_stats: <StatShowcase />,
  priceticker: <PriceTickerShowcase />,
  assetcard: <AssetCardShowcase />,
  toastnotification: <ToastShowcase />,
  transactionstepper: <TransactionStepperShowcase />,
  tooltip: <ToolTipShowcase />,
  modal: <ModalShowcase />,
  toggle: <ToggleShowcase />,
  checkbox: <CheckBoxShowcase />,
  commandbar: <CommandBarShowcase />,
  currencyinput: <CurrencyInputShowcase />,
};

interface PageProps {
  params: Promise<{ component: string }>;
}

const storyMap: Record<
  string,
  {
    title: string;
    desc: string;
    designChoices: string[];
    guidelines: { do: string[]; dont: string[] };
  }
> = {
  actionbutton: {
    title: "ActionButton",
    desc: "A versatile, highly interactive action trigger optimized for heavy state transactions.",
    designChoices: [
      "Usage of warm colours (deep blues) and soft, rounded edges in order to create a sense of safety, security, and stability.",
      "isLoading animation as an optimistic-UI element so your users feel less tense about loading times and know that their actions are registered.",
      "Bright red colours were chosen for danger buttons and subdued grays for secondary buttons in order to communicate intent.",
    ],
    guidelines: {
      do: [
        "Use this for high-impact actions that trigger irreversible changes, such as 'Confirm Transaction,' 'Authorize Transfer,' or 'Delete Wallet.'",
        "Use the isLoading state for every action that involves an API call to prevent duplicate submissions.",
      ],
      dont: [
        "Use the primary intent variant for simple navigational elements (like 'Back' or 'Cancel'). Use secondary or ghost variants instead.",
        "Stack multiple 'Primary' variant buttons next to each other. One must be 'Primary' and the other 'Secondary' to maintain visual hierarchy.",
      ],
    },
  },
  copyfield: {
    title: "CopyField",
    desc: "A secure, low-profile utility container optimized for one-click clipboard extraction of raw strings like wallet addresses, transaction hashes, or API keys.",
    designChoices: [
      "Transitioning the icon and tooltip from copy to checked for a brief window after copy is clicked as a form of visual-confirmation to users to avoid copy-pasting anxiety.",
    ],
    guidelines: {
      do: [
        "Use this for user-identifiable strings like wallet addresses or unique transaction hashes that users frequently need to share.",
        "Keep the value read-only. The component is intended for extraction, not user input.",
      ],
      dont: [
        "Use this for sensitive passwords or private keys that should not be easily copy-pasted into plain-text applications.",
        "Stack multiple CopyField components in a dense list. If you need to display a table of addresses, use a standard text-with-icon-button pattern to save vertical space.",
      ],
    },
  },
  datatable: {
    title: "DataTable",
    desc: "A robust, highly performant data grid designed to structure dense transactional datasets with built-in client-side pagination, sorting, and responsive layout scaling.",
    designChoices: [
      "Row-highlighting features which help anchor the user's attention to the correct data point",
      "Skeleton loading states in order to manage user impatience and anxiety as data for tables is being fetched. It also prevents the UI from 'jumping' when the data finally arrives.",
      "Pagination and sorting logic used to better organize data in order to prevent cognitive overload for the end user.",
    ],
    guidelines: {
      do: [
        "Use the paginateInternally prop to toggle between data sources. Set to true for small, client-side datasets; set to false when connecting to a paginated API (ensure totalRowCount is provided).",
        "Define your ColumnConfig consistently. The table automatically handles right-alignment for specific keys (price, value, holdings, etc.). If you have a custom numeric column, you may need to update the alignment logic in the useMemo block.",
        "Utilize skeletonRowCount to match your API’s pageSize. This prevents the 'layout jump' where the table height collapses and re-expands when the data finally loads.",
      ],
      dont: [
        "Pass raw, unsliced arrays into data if you have paginateInternally set to false. The engine will assume the backend has already processed the slicing.",
        " Override onPaginationChange or onSortingChange unless you are explicitly managing the state in a parent component (Server-side pattern).",
      ],
    },
  },
  kpi_stats: {
    title: "KPI Stats",
    desc: "A modular, executive-level layout container designed to emphasize key metrics alongside positive or negative trend trajectory signals.",
    designChoices: [
      "Clean visual hierarchy prioritizing the raw numerical value using prominent, high-contrast monospace alignments.",
      "Strict semantic color-coding on micro-trend chips to immediately communicate direction (positive trajectories in emerald, negative trajectories in rose).",
      "Composable sub-component architecture (`Stat.Root`, `Stat.Label`, `Stat.Trend`, `Stat.Value`) allowing layouts to reorganize elements depending on viewport density without breaking context.",
    ],
    guidelines: {
      do: [
        "Use this in transaction flows, checkout funnels, and wire-transfer configurations where localized currencies require explicit decimal control.",
      ],
      dont: [
        "Use this for standard numerical entries (like quantities, counts, or IDs) that do not require financial currency rounding criteria.",
      ],
    },
  },
  statusbadge: {
    title: "StatusBadge",
    desc: "Visual indicator designed to communicate system, transactional, or entity states.",
    designChoices: [
      "Subdued background tints with high-contrast text to ensure accessibility compliance.",
      "Strict color mapping: green for success, amber for warning, red for critical failures.",
    ],
    guidelines: {
      do: [
        "Place near the entity title or lifecycle header to maintain immediate contextual relationship.",
        "Use short, single-word status labels whenever possible.",
      ],
      dont: [
        "Make the badge interactive or clickable. Use an ActionButton or utility chip instead.",
        "Use vibrant primary accents for neutral states.",
      ],
    },
  },
  priceticker: {
    title: "PriceTicker",
    desc: "Visual indicator designed to communicate system, transactional, or entity states.",
    designChoices: [
      "Reactive Flash Engine: The TickerItem tracks price changes using a useRef to maintain a persistent reference to the previous price. When an update is detected, it triggers a CSS animation class (flash-green or flash-red).",
      "Seamless Infinite Marquee: To achieve a smooth marquee without visual jumps, the component triples the asset array ([...assets, ...assets, ...assets]). This provides enough buffer for the framer-motion animation to loop back to the start without the user noticing the reset.",
      "Performance Optimization: The flash animation reset is wrapped in requestAnimationFrame to ensure the browser successfully clears and restarts the animation class, preventing stale states during rapid price updates.",
      "Visual Fading: The marquee variant uses absolute positioned gradient overlays at the edges of the container. This ensures assets fade out smoothly rather than clipping abruptly at the boundaries of the viewport.",
    ],
    guidelines: {
      do: [
        'Use the marquee variant for secondary, "at-a-glance" tickers (e.g., at the top of a trading app). Use the stack variant for primary asset monitoring panels where readability of names and daily changes is prioritized',
        "Provide high-frequency updates to the assets prop to make the flash animations meaningful.",
      ],
      dont: [
        "Set the speed duration too low (e.g., < 10s) for the marquee; rapid scrolling can induce motion sickness and make the price information difficult to read.",
        "Overload the marquee with too many assets. Limit the list to 5–8 items to ensure the content remains readable while in motion.",
      ],
    },
  },
  assetcard: {
    title: "AssetCard",
    desc: "A specialized container primitive built to effectively communicate key financial metrics at a glance by standardizing the display of asset identification, real-time pricing, and performance indicators.",
    designChoices: [
      "A light background to ensure that it stands out and clearly displays its consistency.",
      "A sparkline to allow users to grasp the rise and falls in the value of an asset instantly.",
      "Usage of the Compound Component Pattern in order to allow flexible construction of cards based on the available data.",
    ],
    guidelines: {
      do: [
        "Use this in dashboard grids, portfolio summaries, and asset selection lists where users need to compare performance metrics rapidly.",
        "Use semantic color logic for change24h (green for positive, red for negative) to leverage visual pattern recognition.",
      ],
      dont: [
        "Use this for complex data tables; if the data requires sorting, filtering, or deep row-by-row comparisons, use the DataTable component instead.",
        "Crowd the card with excessive metadata; the AssetCard is designed for high-level information density only.",
      ],
    },
  },
  toastnotification: {
    title: "ToastNotification",
    desc: "A temporary overlay notification designed for real-time state alerts.",
    designChoices: [
      "Fixed window viewport placement to remain visible across stacking layout layers.",
      "Auto-dismiss thresholds configured using micro-animations to avoid abrupt flashing.",
    ],
    guidelines: {
      do: [
        "Keep descriptive header copy underneath 60 characters for quick semantic scanning.",
        "Include a manual dismiss 'close' switch trigger.",
      ],
      dont: [
        "Deliver vital transactional blockades via toasts; use high-impact modals instead.",
        "Trigger cascading stacks of more than three toast notifications at a single time.",
      ],
    },
  },
  transactionstepper: {
    title: "TransactionStepper",
    desc: "An essential feedback mechanism for long-running processes (like blockchain confirmations or bank transfers). It transforms abstract backend progress into a clear, linear journey.",
    designChoices: [
      "Explicit StepStatus mappings rendering PENDING, PROCESSING, SUCCESS, and FAILED states instantly recognizable.",
      "An active pulse status indicator (using Tailwind's ping animations) to create a visual 'heartbeat' indicating live activity.",
      "Strict color coordination showing completed steps with emerald connector paths, shifting to deep red alerts when actions stall.",
    ],
    guidelines: {
      do: [
        "Use this to keep users informed during multi-step processes. If a process takes more than 1–2 seconds, providing a visual sequence significantly reduces user anxiety.",
        "Keep labels short. The stepper layout works best with 1–2 words per label.",
      ],
      dont: [
        "Exceed 5–6 steps. If your process requires more, consider grouping steps into a single 'Stage' or using a different UI pattern like a progress bar.",
        "Forget to provide clear description text for a step no matter how complex (it defeats the point of the progress layout).",
      ],
    },
  },
  tooltip: {
    title: "ToolTip",
    desc: "A lightweight, context-aware utility built on Radix UI designed to display secondary information, keyboard shortcuts, or expanded metadata without cluttering the interface.",
    designChoices: [
      "Built using Radix's Portal architecture, rendering tooltips out-of-band to prevent visual clipping when hosted inside overflow-hidden parents.",
      "Progressive trigger wrappers that automatically handle raw text fragments gracefully without breaking layout elements.",
      "Instantaneous, responsive directional alignment configurations adjusting automatically relative to screen boundary constraints.",
    ],
    guidelines: {
      do: [
        "Use tooltips for 'nice-to-have' information. If the info is critical (e.g., a form error or required field), use persistent text instead.",
        "Keep the content brief. Tooltips should typically be 1–2 sentences or a small set of shortcut keys.",
      ],
      dont: [
        "Place interactive elements (like buttons or links) inside a tooltip. Because tooltips disappear when the mouse moves away, they are not ideal as focusable targets.",
        "Over-trigger them. Use tooltips sparingly to avoid 'interaction fatigue,' where the UI feels cluttered with pop-up text.",
      ],
    },
  },
  modal: {
    title: "Modal",
    desc: "A high-utility compound-component wrapper around Radix UI’s Dialog primitive designed to handle complex, high-stakes interactions like confirming asset swaps, authorizing transfers, or configuring sensitive wallet settings.",
    designChoices: [
      "Responsive Anatomy: Switches between a mobile-friendly bottom-sheet and a desktop-centered panel using responsive Class Variance Authority class rules.",
      "Context-Aware Actions: The ModalAction and ModalCancel sub-components consume an internal ModalContext to dismiss without manual callback prop-drilling.",
      "Semantic Accessibility: Built using Radix primitives to natively enforce focus-trapping, escape key dismissal, and appropriate ARIA accessibility attributes.",
    ],
    guidelines: {
      do: [
        "Use this for critical user journeys or actions. Because it blocks the background interface, it should be reserved for irreversible actions or necessary data entry.",
        "Leverage the footer prop/sub-components for smart layouts: standardizing the placement of destructive actions alongside cancel controls.",
      ],
      dont: [
        "Deeply nest modals. This creates a confusing 'modal-on-modal' situation that hurts accessibility and user focus flow.",
        "Overload the ModalBody with too much text. Keep the modal content focused on a single task to reduce cognitive load.",
      ],
    },
  },
  toggle: {
    title: "Toggle",
    desc: "A responsive, spring-animated boolean switch primitive built on Radix UI, designed to trigger instant-effect system parameters.",
    designChoices: [
      "Tactile Physics: Built using a high-stiffness spring transition (stiffness: 500, damping: 30) for an ultra-responsive slide response.",
      "Responsive Scale: Leverages localized CVA styling variables to present scale variants that ensure comfortable touch-targets across mobile devices.",
      "Sync Indicators: Seamlessly integrates subtle visual animations to notify the user of background API-commit latency while disabling user interactions.",
    ],
    guidelines: {
      do: [
        "Use this for settings and configuration elements that apply immediately without requiring a saving step.",
        "Add helper descriptions nearby when the toggle modifies high-consequence workspace actions.",
      ],
      dont: [
        "Use this as a substitute for multi-choice selectors in forms where changes should only be captured on submission.",
        "Forget to configure clear screen-reader labels if the toggle is rendered without clear contextual text blocks.",
      ],
    },
  },
  checkbox: {
    title: "CheckBox",
    desc: "A highly accessible multi-select indicator leveraging framer-motion scaling checks and neumorphic layout aesthetics.",
    designChoices: [
      "Pop Animation: Uses AnimatePresence alongside a physical spring-scale to make the check indicator visibly 'pop' into the viewport upon selection.",
      "Interactive Contrast: Implements explicit inset shadows in light configurations to differentiate the clickable box from native backgrounds.",
      "Label Association: Wraps Radix primitives to natively link interaction handlers with sibling labels, preserving keyboard execution.",
    ],
    guidelines: {
      do: [
        "Use checkboxes for list selections and configuration profiles where items get processed collectively during a form submission.",
        "Bind the click target area to both the box and the label text to maximize the interactive hit-zone for the user.",
      ],
      dont: [
        "Use checkboxes for instantaneous binary settings (like toggling Dark Mode). Use the Toggle component for those flows.",
        "Apply heavy drop-shadow decorations that make checkboxes look like floating triggers instead of standard form targets.",
      ],
    },
  },
  currencyinput: {
    title: "CurrencyInput",
    desc: "A robust primitive that simplifies numerical entries in fintech products by abstracting away the complex logic of decimal tracking, comma separators, and local input sanitization.",
    designChoices: [
      "Controlled Float Management: Processes parameters internally as a localized string layout to eliminate native float rounding bugs before exporting values back up.",
      "Layout Constraints: Maps currency symbols inside unselectable labels to prevent users from accidentally copying decorative visual indicators into clipboards.",
      "Inline Context Composition: Couples Max triggers and currency selectors inside a single shared boundary for a highly compact and distraction-free setup.",
    ],
    guidelines: {
      do: [
        "Use this in transaction steps, checkout routes, and wallet distributions where financial values require precise decimal boundaries.",
        "Combine this with validation handlers to restrict entry fields to realistic balance limits before processing active trades.",
      ],
      dont: [
        "Use this for standard numbers like quantities, IDs, indices, or serial counts that do not involve financial rounding metrics.",
        "Allow direct user input of raw commas; allow the internal formatter to handle display structures organically instead.",
      ],
    },
  },
  commandbar: {
    title: "CommandBar",
    desc: "An essential interaction primitive designed for power users and rapid navigation within your application. It serves as a centralized control center that abstracts complex menu hierarchies.",
    designChoices: [
      "Keyboard-First Architecture: Built on cmdk mechanics to handle virtual focus states (data-[selected=true]) seamlessly via arrow keys.",
      "Virtualized DOM Management: The CommandList manages elements dynamically relative to queries, optimizing parsing cycles during rapid searches.",
      "Hierarchical Collapsibility: Group structures utilize modular state hooks to render sections cleanly while ensuring maximum information density.",
    ],
    guidelines: {
      do: [
        "Group actions by context (e.g., 'Trading,' 'Portfolio,' 'Settings') to make the search results skimmable and prevent user overload.",
        "Include accessible, keyboard-based layout shortcuts alongside item labels to encourage fast interactions.",
      ],
      dont: [
        "Use this for complex multi-step workflows. If an action requires deep configuration, use the CommandBar as an entry gateway to a dedicated page.",
        "Nest actions deeply within the bar. It should lead directly to an immediate action execution or a direct navigation jump.",
      ],
    },
  },
};

export default function ComponentDocPage({ params }: PageProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview"
  );
  const [copied, setCopied] = React.useState(false);

  // Safe unwrap of asynchronous route params inside a client execution module
  const resolvedParams = use(params);
  const componentKey = resolvedParams.component.toLowerCase();

  const data = storyMap[componentKey];
  const LiveShowcase = showcaseRegistry[componentKey];
  const codeString = codeStrings[componentKey];
  const apiRef = APIReferences[componentKey];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        codeString ? codeString : "Work still in progress"
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  if (!data) {
    notFound();
  }

  return (
    <ToastProvider>
      <div className="space-y-8 animate-fade-in">
        {/* Dynamic Header Block */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
            {data.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base max-w-2xl transition-colors duration-200">
            {data.desc}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
                activeTab === "preview"
                  ? "bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                activeTab === "code"
                  ? "bg-white dark:bg-[#090d16] text-slate-900 dark:text-slate-100 shadow-sm"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Code
            </button>
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#090d16] overflow-hidden shadow-lg dark:shadow-2xl transition-all duration-200">
            {activeTab === "preview" ? (
              LiveShowcase || <PlaceholderShowcase name={data.title} />
            ) : (
              <div className="group relative w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#090d16]/20 p-4">
                <pre className="overflow-x-auto whitespace-pre no-scrollbar pr-12">
                  <code className="text-xs font-mono text-blue-600 dark:text-blue-400 select-all">
                    {codeString}
                  </code>
                </pre>

                <button
                  onClick={handleCopy}
                  className="absolute top-3 right-3 p-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors shadow-sm opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
                  title="Copy code"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-4">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090d16] p-5 sm:p-6 transition-all duration-200">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Design Choices & Rationale
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-disc list-inside">
              {data.designChoices.map((choice, index) => (
                <li key={index}>{choice}</li>
              ))}
            </ul>
          </div>

          {/* Guidelines Context */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#090d16] p-5 sm:p-6 transition-all duration-200">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Usage Guidelines
            </h4>

            {/* Dos */}
            <div className="space-y-2 font-mono text-xs text-green-600 dark:text-green-400">
              {data.guidelines.do.map((doItem, index) => (
                <div key={index}>✓ Do: {doItem}</div>
              ))}
            </div>

            {/* Don'ts */}
            <div className="my-2 mt-4 space-y-2 font-mono text-xs text-red-600 dark:text-red-400">
              {data.guidelines.dont.map((dontItem, index) => (
                <div key={index}>✗ Don&apos;t: {dontItem}</div>
              ))}
            </div>
          </div>

          <div>{apiRef ? apiRef : codeString}</div>
        </div>
      </div>
    </ToastProvider>
  );
}
