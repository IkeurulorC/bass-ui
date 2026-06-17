import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToastProvider, useToast } from "./ToastContext";
import { ActionButton } from "../ActionButton/ActionButton";
import { ToastProps } from "./Toast";

const ToastTrigger = (args: ToastProps) => {
  const { addToast } = useToast();
  return (
    <ActionButton
      intent={
        args.intent === "success"
          ? "primary"
          : args.intent === "error"
            ? "danger"
            : args.intent === "info"
              ? "ghost"
              : "secondary"
      }
      onClick={() => addToast(args)}
    >
      Fire Toast
    </ActionButton>
  );
};

describe("Tests the Toast Component", () => {
  it("Should render and then remove a toast after the duration", () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastTrigger description="testing" title="Success" />
      </ToastProvider>
    );

    expect(screen.queryByText("testing")).not.toBeInTheDocument();

    const button = screen.getByText("Fire Toast");
    fireEvent.click(button);

    const toastMessage = screen.getByText("testing");
    expect(toastMessage).toBeInTheDocument();
  });
});
