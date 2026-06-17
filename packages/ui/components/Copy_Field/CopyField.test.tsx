import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from "vitest";
import { CopyField } from "./CopyField";

describe("Testing to confirm that the CopyField Component works correctly", () => {
  const testValue = "https://bass-ui.com";
  let writeTextMock: Mock;

  beforeEach(() => {
    vi.useFakeTimers();

    // 1. Create a clean mock function that explicitly returns a fully resolved promise
    writeTextMock = vi.fn(() => Promise.resolve());

    // 2. Define the property natively instead of using stubGlobal to ensure deep runtime preservation
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: writeTextMock,
      },
      configurable: true,
      writable: true,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should display the correct value inside the input field", () => {
    render(<CopyField value={testValue} />);

    const input = screen.getByLabelText("CopyField Text") as HTMLInputElement;
    expect(input.value).toBe(testValue);
    expect(input).toHaveAttribute("readonly");
  });

  it("should copy the correct text to the clipboard when clicked", async () => {
    render(<CopyField value={testValue} />);

    const copyButton = screen.getByRole("button", {
      name: /copy to clipboard/i,
    });

    // 3. Wrap click execution inside an awaited act block to flush the clipboard microtask queue
    await act(async () => {
      fireEvent.click(copyButton);
    });

    // Verify system clipboard interaction
    expect(writeTextMock).toHaveBeenCalledWith(testValue);
    expect(writeTextMock).toHaveBeenCalledTimes(1);

    // Verify the visual success check icon swaps in
    const checkIcon = copyButton.querySelector(".text-green-500");
    expect(checkIcon).toBeInTheDocument();
  });

  it("should clear the success check icon back to default after 2000ms", async () => {
    render(<CopyField value={testValue} />);

    const copyButton = screen.getByRole("button", {
      name: /copy to clipboard/i,
    });

    await act(async () => {
      fireEvent.click(copyButton);
    });

    // Check icon should be visible immediately after clicking
    expect(copyButton.querySelector(".text-green-500")).toBeInTheDocument();

    // Fast-forward past the 2000ms timeout window inside handleCopy cleanly
    act(() => {
      vi.advanceTimersByTime(2100);
    });

    // Check icon should disappear and the regular copy icon should return
    expect(copyButton.querySelector(".text-green-500")).not.toBeInTheDocument();
    expect(copyButton.querySelector(".text-copy-btn-icon")).toBeInTheDocument();
  });
});
