"use client";

import { Modal, ActionButton } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const modalSubComponents: PropRow[] = [
  {
    name: "Modal",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "The root orchestrator that manages internal open/close state transitions, portal bindings, and active context layouts.",
    required: false,
  },
  {
    name: "Modal.Trigger",
    type: "React.ComponentPropsWithoutRef<'button'>",
    description:
      "A button-wrapped interactive trigger node that acts as the primary modal activation launch point.",
    required: false,
  },
  {
    name: "Modal.Header",
    type: "React.ComponentPropsWithoutRef<'header'>",
    description:
      "The top layout container structurally designated for containing primary titles, subtitles, and the default floating close button.",
    required: false,
  },
  {
    name: "Modal.Body",
    type: "React.ComponentPropsWithoutRef<'main'>",
    description:
      "The primary viewport overflow area designated to encapsulate core descriptive text, layouts, or data submission forms.",
    required: false,
  },
  {
    name: "Modal.Footer",
    type: "React.ComponentPropsWithoutRef<'footer'>",
    description:
      "A flexible bottom layout container aligned cleanly to position system action buttons like confirmations or cancellation row blocks.",
    required: false,
  },
  {
    name: "Modal.Action",
    type: "React.ComponentPropsWithoutRef<'button'>",
    description:
      "A pre-configured, high-intent primary action button designed for executing the overlay's true submission purpose.",
    required: false,
  },
  {
    name: "Modal.Cancel",
    type: "React.ComponentPropsWithoutRef<'button'>",
    description:
      "A pre-styled alternative ghost action button intended to safely dismiss the state and reverse layout selections.",
    required: false,
  },
];

export function ModalShowcase() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
            Modal Showcase
          </h2>
        </div>
      </div>
      <div className="flex w-full m-2.5 justify-around">
        <Modal
          isOpen={true}
          aria-label="CompoundPattern"
          trigger={<ActionButton>Modal Trigger</ActionButton>}
        >
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

        <Modal
          isOpen={false}
          title="Discard Changes"
          footer="Discard"
          trigger={<ActionButton>Modal Trigger</ActionButton>}
        >
          <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
            {
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque error sit reprehenderit possimus corrupti pariatur debitis quis quibusdam quasi accusantium."
            }
          </p>
        </Modal>
      </div>
    </div>
  );
}

export const ModalAPI = () => {
  return (
    <ApiReference
      componentName="Modal Anatomy"
      propsList={modalSubComponents}
    />
  );
};

export const ModalCodeString = `
"use client";

import { Modal, ActionButton } from "@bass-ui-kit/core";

export function ModalRender() {
  return (
  <div className="flex w-full m-2.5 justify-around">
        <Modal
          isOpen={true}
          aria-label="CompoundPattern"
          trigger={<ActionButton>Modal Trigger</ActionButton>}
        >
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

        <Modal
          isOpen={false}
          title="Discard Changes"
          footer="Discard"
          trigger={<ActionButton>Modal Trigger</ActionButton>}
        >
          <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
            {
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque error sit reprehenderit possimus corrupti pariatur debitis quis quibusdam quasi accusantium."
            }
          </p>
        </Modal>
      </div>
  )
`;
