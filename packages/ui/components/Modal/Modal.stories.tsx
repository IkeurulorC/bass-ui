import { Meta } from "@storybook/react-vite";
import { Modal } from "./Modal";
import { ActionButton as BaseActionButton } from "../ActionButton/ActionButton";
import { Stat } from "../KPI_Stats/Stat";

const meta: Meta<typeof Modal> = {
  title: "Overlays/Modal",
  tags: ["autodocs"],
  parameters: {
    // This removes the 16px padding that Storybook adds by default
    layout: "centered",
  },
};

export default meta;

export const Default = () => {
  return (
    <Modal isOpen={true} title="Discard Changes" footer="Discard">
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        {
          "Are you sure you want to discard changes? This action can't be undone"
        }
      </p>
    </Modal>
  );
};

export const LongText = () => {
  return (
    <Modal isOpen={true} title="Discard Changes" footer="Discard">
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        {
          "Are you sure you want to discard changes? This action can't be undone Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque error sit reprehenderit possimus corrupti pariatur debitis quis quibusdam quasi accusantium, obcaecati fugiat blanditiis distinctio saepe quos magnam reiciendis dicta earum."
        }
      </p>
    </Modal>
  );
};

export const ActionButton = () => {
  const footer = (
    <>
      <BaseActionButton intent="secondary">Cancel</BaseActionButton>
      <BaseActionButton>Discard</BaseActionButton>
    </>
  );

  return (
    <Modal isOpen={true} title="Discard Changes" footer={footer}>
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        {
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque error sit reprehenderit possimus corrupti pariatur debitis quis quibusdam quasi accusantium."
        }
      </p>
    </Modal>
  );
};

export const Mix = () => {
  const footer = (
    <>
      <BaseActionButton intent="secondary">Cancel</BaseActionButton>
      <button className="flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none bg-indigo-500 hover:bg-indigo-600 px-10 py-3 font-sans text-sm font-semibold not-italic text-white max-w-none">
        Discard
      </button>
    </>
  );

  return (
    <Modal isOpen={true} title="Discard Changes" footer={footer}>
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        {
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque error sit reprehenderit possimus corrupti pariatur debitis quis quibusdam quasi accusantium."
        }
      </p>
    </Modal>
  );
};

export const StyledActionButton = () => {
  const footer = (
    <>
      <BaseActionButton
        className="flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none  px-10 py-[10px] font-sans text-sm font-semibold not-italic text-white min-w-min"
        intent="secondary"
      >
        Cancel
      </BaseActionButton>
      <BaseActionButton className="flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none bg-indigo-500 hover:bg-indigo-600 px-10 py-[10px] font-sans text-sm font-semibold not-italic text-white min-w-min">
        Discard
      </BaseActionButton>
    </>
  );
  return (
    <Modal isOpen={true} title="Discard Changes" footer={footer}>
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        {
          "Are you sure you want to discard changes? This action can't be undone"
        }
      </p>
    </Modal>
  );
};

const trigger = (
  <button className="bg-blue-800 text-white p-2">Open Modal</button>
);

export const Trigger = () => {
  return (
    <Modal
      isOpen={false}
      title="Discard Changes"
      footer="Discard"
      trigger={trigger}
    >
      <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
        {
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque error sit reprehenderit possimus corrupti pariatur debitis quis quibusdam quasi accusantium."
        }
      </p>
    </Modal>
  );
};

export const CompoundPattern = () => {
  return (
    <Modal isOpen={true} aria-label="CompoundPattern">
      <Modal.Header>
        <div className="flex flex-col gap-1 text-left">
          <h3 className="my-0 font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Connect Wallet
          </h3>
          <p className="my-0 text-xs text-slate-400">
            Select your Web3 provider to interact with the bass-ui dashboard
          </p>
        </div>
      </Modal.Header>

      <Modal.Body className="flex flex-col gap-3 py-4 w-full lg:w-[350px]">
        <button
          type="button"
          className="flex items-center justify-between w-full p-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-left bg-transparent cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">🦊</span>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                MetaMask
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Connect using your browser extension
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 bg-indigo-200 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full">
            Popular
          </span>
        </button>

        <button
          type="button"
          className="flex items-center justify-between w-full p-3 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all text-left bg-transparent cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl select-none">🛡️</span>
            <div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                Trust Wallet
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Scan QR code using mobile device
              </div>
            </div>
          </div>
        </button>
      </Modal.Body>

      <Modal.Footer className="flex w-full justify-end border-t border-slate-100 dark:border-slate-900 pt-3">
        <Modal.Cancel className="w-full lg:w-auto" />
      </Modal.Footer>
    </Modal>
  );
};

// Highly unique composition showcasing Stat component nested inside Modal
export const AnalyticalStats = () => {
  return (
    <Modal isOpen={true}>
      <Modal.Header>
        <div className="flex flex-col gap-1 text-left">
          <h3 className="my-0 font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Portfolio Performance
          </h3>
          <p className="my-0 text-xs text-slate-400">
            Live updates of your primary treasury and yield stats
          </p>
        </div>
      </Modal.Header>

      <Modal.Body className="flex flex-row gap-4 py-4 w-full justify-center">
        {/* Main Net Yield Stat Card */}
        <Stat.Root className="bg-slate-950 text-white border border-slate-800 shadow-xl">
          <Stat.Label className="text-slate-400 font-medium">
            Net Yield (24h)
          </Stat.Label>
          <Stat.Value
            value={48520}
            duration={1500}
            formatter={(val) => `$${Math.round(val).toLocaleString()}`}
            className="text-white font-mono"
          />
          <div className="flex items-center gap-1.5 mt-2">
            <Stat.Trend value={12.4} trendType="positive-up" />
            <span className="text-slate-500 text-xs font-medium">
              vs yesterday
            </span>
          </div>
        </Stat.Root>

        {/* Conversion Success Stat Card */}
        <Stat.Root className="bg-indigo-950 text-white border border-indigo-800 shadow-xl">
          <Stat.Label className="text-indigo-300 font-medium">
            Staking Rate
          </Stat.Label>
          <Stat.Value
            value={94}
            duration={1200}
            formatter={(val) => `${Math.round(val)}%`}
            className="text-white font-mono"
          />
          <div className="flex items-center gap-1.5 mt-2">
            <Stat.Trend value={-1.2} trendType="negative-up" />
            <span className="text-indigo-400 text-xs font-medium">
              under target
            </span>
          </div>
        </Stat.Root>
      </Modal.Body>

      <Modal.Footer className="flex w-full justify-between border-t border-slate-100 dark:border-slate-900 pt-4">
        <span className="text-[11px] text-slate-400 font-medium self-center">
          Last synced: Just now
        </span>
        <div className="flex gap-2">
          <Modal.Cancel />
          <BaseActionButton className="bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 text-white px-6">
            Refresh Feed
          </BaseActionButton>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
