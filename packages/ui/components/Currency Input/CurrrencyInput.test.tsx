import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";

// Helper component to simulate state updates during user interaction
const TestComponent = ({
  initialValue = "",
  decimals = 8,
  onMax,
  disabled = false,
}: {
  initialValue?: string;
  decimals?: number;
  onMax?: () => void;
  disabled?: boolean;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <CurrencyInput.Root
      value={value}
      onChange={setValue}
      decimals={decimals}
      onMax={onMax}
      disabled={disabled}
    >
      <CurrencyInput.MaxButton data-testid="max-btn" />
      <CurrencyInput.Input data-testid="currency-input" />
      <CurrencyInput.Dropdown data-testid="currency-dropdown">
        BTC
      </CurrencyInput.Dropdown>
    </CurrencyInput.Root>
  );
};

describe("CurrencyInput Component Suite", () => {
  it("should render compound components and format initial values with commas", () => {
    render(<TestComponent initialValue="1000000" />);

    const input = screen.getByTestId("currency-input") as HTMLInputElement;
    expect(input.value).toBe("1,000,000");
  });

  it("should format floating decimals correctly to 8 decimal places", () => {
    render(<TestComponent initialValue="0.12345678" decimals={8} />);

    const input = screen.getByTestId("currency-input") as HTMLInputElement;
    expect(input.value).toBe("0.12345678");
  });

  it("should sanitize and filter alpha/invalid characters out on type", async () => {
    const user = userEvent.setup();
    render(<TestComponent initialValue="" />);

    const input = screen.getByTestId("currency-input");
    await user.type(input, "12a3b.4");

    expect(input).toHaveValue("123.4");
  });

  it("should enforce the exact max decimal length configuration", async () => {
    const user = userEvent.setup();
    // Setting up maximum of 2 decimal places (e.g. typical FIAT fiat values)
    render(<TestComponent initialValue="" decimals={2} />);

    const input = screen.getByTestId("currency-input");
    await user.type(input, "10.5555");

    expect(input).toHaveValue("10.55");
  });

  it("should explicitly block multiple sequential decimal periods", async () => {
    const user = userEvent.setup();
    render(<TestComponent initialValue="" decimals={4} />);

    const input = screen.getByTestId("currency-input");
    await user.type(input, "1.2.3");

    expect(input).toHaveValue("1.23");
  });

  it("should support clicking the max button to fill preset numeric amounts", async () => {
    const user = userEvent.setup();
    const handleMaxMock = vi.fn();

    render(<TestComponent initialValue="" onMax={handleMaxMock} />);

    const maxBtn = screen.getByTestId("max-btn");
    await user.click(maxBtn);

    expect(handleMaxMock).toHaveBeenCalledTimes(1);
  });

  it("should apply disabled states cleanly to internal inputs and button slots", () => {
    const handleMaxMock = vi.fn();
    render(
      <TestComponent initialValue="42" disabled={true} onMax={handleMaxMock} />
    );

    const input = screen.getByTestId("currency-input");
    const maxBtn = screen.getByTestId("max-btn");

    expect(input).toBeDisabled();
    expect(maxBtn).toBeDisabled();
  });
});
