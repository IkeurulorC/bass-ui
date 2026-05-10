import React, { createContext, useContext, useState, useEffect } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../src/utils";
import * as Dialog from "@radix-ui/react-dialog";
import ActionButton from "../ActionButton/ActionButton";

interface Close {
  handleClose: () => void;
}

const ModalContext = createContext<Close | null>(null);

function ModalTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function ModalHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative flex items-center justify-around flex-none grow-0 font-sans w-full lg:w-[300px] gap-3",
        className
      )}
    >
      {children}
    </header>
  );
}

function ModalBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn(
        "flex flex-row justify-center mt-[18px] mb-3 p-2 gap-2 flex-none order-1 grow-0",
        className
      )}
    >
      {children}
    </main>
  );
}

function ModalFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "mt-1 flex flex-col-reverse gap-3 order-2 h-min w-full grow-0 lg:mt-1 lg:flex-row lg:items-end lg:justify-start lg:gap-5 lg:pl-[5px]",
        className
      )}
    >
      {children}
    </footer>
  );
}

function ModalCancel({
  onClick,
  className,
  ...props
}: {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}) {
  const context = useContext(ModalContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      console.log("Default action triggered");
      context?.handleClose();
    }
  };
  return (
    <ActionButton
      intent="ghost"
      onClick={handleClick}
      className={cn(
        "flex flex-none grow-0 flex-row items-center justify-center rounded-[4px] border-none px-10 py-[10px] font-sans text-sm font-semibold not-italic text-slate-500! min-w-min",
        className
      )}
      {...props}
    >
      Cancel
    </ActionButton>
  );
}

function ModalAction({
  action,
  className,
  onClick,
  ...props
}: {
  action?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ComponentProps<"button">) {
  const context = useContext(ModalContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      console.log("Default action triggered");
      context?.handleClose();
    }
  };
  return (
    <ActionButton
      onClick={handleClick}
      className={cn(
        "flex flex-none grow-0 flex-row items-center justify-center gap-[10px] rounded-[4px] border-none bg-indigo-500 dark:bg-indigo-600 px-10 py-[10px] font-sans text-sm font-semibold not-italic text-white min-w-min",
        className
      )}
      {...props}
    >
      {action}
    </ActionButton>
  );
}

const modalVariants = cva(
  [
    "flex",
    "flex-col",
    "justify-start",
    "bg-surface-card",
    "shadow-2xl",
    "z-50",
    "font-['Inclusive_Sans']",
    "m-0",
    "max-w-none",
    "border-none",
    "overflow-hidden",
  ],
  {
    variants: {
      intent: {
        primary: [],
        secondary: [],
        danger: [],
        ghost: [],
      },
      size: {
        sm: [
          "fixed bottom-0 top-auto left-0 translate-x-0 translate-y-0",
          "mt-auto mb-0 w-full rounded-t-[20px] rounded-b-none",
          "pt-10 pr-6 pb-8 pl-6 max-h-[45vh] max-w-none",
          "animate-[mobile-slide-up_0.3s_ease-out] gap-3",
        ],
        lg: [
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "p-8 gap-3 w-min h-min rounded-[16px]",
          "animate-[modal-appear_0.2s_ease-out]",
          "font-optical-sizing-auto",
        ],
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

type ClassVariant = VariantProps<typeof modalVariants>;

interface ModalProps
  extends
    ClassVariant,
    Omit<React.ComponentPropsWithoutRef<typeof Dialog.Content>, "title"> {
  isOpen: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export const Modal = ({
  isOpen: externalOpen,
  onOpenChange,
  onClose,
  children,
  trigger,
  className,
  footer,
  size,
  title,
  description,
  ...props
}: ModalProps) => {
  // Use the external prop to initialize your local state
  const [isOpen, setIsOpen] = useState(externalOpen ?? false);

  // Sync local state if the external prop changes (useful for Storybook)
  useEffect(() => {
    if (externalOpen !== undefined) setIsOpen(externalOpen);
  }, [externalOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.(); // Call the callback if provided
  };
  return (
    <ModalContext.Provider value={{ handleClose }}>
      <Dialog.Root
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          // 1. Update the state via onOpenChange
          onOpenChange?.(open);

          // 2. If the new state is 'false', trigger your onClose logic
          if (!open) {
            if (onClose) {
              onClose();
            }
          }
        }}
      >
        {/* If trigger is provided, render it. Otherwise, it can opened programmatically. */}
        {trigger && (
          <ModalTrigger>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
          </ModalTrigger>
        )}

        <Dialog.Portal>
          <Dialog.Overlay
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-filter backdrop-blur-sm z-40 animate-fade-in"
          />
          <Dialog.Content
            className={cn(modalVariants({ size }), className)}
            {...props}
          >
            {title && (
              <ModalHeader>
                <Dialog.Title className="my-0 font-sans text-2xl font-medium not-italic leading-[22px] text-left dark:text-white">
                  {title}
                </Dialog.Title>

                <Dialog.Close asChild>
                  <button
                    onClick={handleClose}
                    aria-label="Close"
                    className="p-2 rounded-full transition-colors duration-200 border-none bg-transparent cursor-pointer hover:bg-[#f3f4f6] flex items-center justify-center"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="w-[18px] h-[18px] block dark:text-white"
                    >
                      <path
                        d="M6.575 7.975L1.675 12.875C1.49167 13.0583 1.25833 13.15 0.975 13.15C0.691667 13.15 0.458333 13.0583 0.275 12.875C0.0916663 12.6917 0 12.4583 0 12.175C0 11.8917 0.0916663 11.6583 0.275 11.475L5.175 6.575L0.275 1.675C0.0916663 1.49167 0 1.25833 0 0.975C0 0.691667 0.0916663 0.458333 0.275 0.275C0.458333 0.0916663 0.691667 0 0.975 0C1.25833 0 1.49167 0.0916663 1.675 0.275L6.575 5.175L11.475 0.275C11.6583 0.0916663 11.8917 0 12.175 0C12.4583 0 12.6917 0.0916663 12.875 0.275C13.0583 0.458333 13.15 0.691667 13.15 0.975C13.15 1.25833 13.0583 1.49167 12.875 1.675L7.975 6.575L12.875 11.475C13.0583 11.6583 13.15 11.8917 13.15 12.175C13.15 12.4583 13.0583 12.6917 12.875 12.875C12.6917 13.0583 12.4583 13.15 12.175 13.15C11.8917 13.15 11.6583 13.0583 11.475 12.875L6.575 7.975Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </Dialog.Close>
              </ModalHeader>
            )}

            {children && (
              <ModalBody className="flex flex-row justify-center mt-[18px] mb-3 p-2 gap-2 flex-none order-1 grow-0">
                {children}
              </ModalBody>
            )}

            {description && (
              <Dialog.Description className="text-gray-500">
                {description}
              </Dialog.Description>
            )}

            {footer && (
              <Modal.Footer>
                {typeof footer === "string" ? (
                  <>
                    <ModalCancel />
                    <ModalAction action={footer} />
                  </>
                ) : (
                  footer
                )}
              </Modal.Footer>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ModalContext.Provider>
  );
};

Modal.Trigger = ModalTrigger;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Action = ModalAction;
Modal.Cancel = ModalCancel;
