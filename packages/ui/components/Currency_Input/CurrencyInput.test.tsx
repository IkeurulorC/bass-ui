/* eslint-disable react/prop-types */
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CurrencyInput } from "./CurrencyInput";

// 🛠️ A simple state harness component to let the compound structure
// manage state updates naturally during user typing tests
const TestInputWrapper = ({
  initialValue = "",
  decimals = 8,
  onMax,
  currency = "USD",
}) => {
  const [val, setVal] = useState(initialValue);
  const [curr, setCurr] = useState(currency);

  return (
    <CurrencyInput.Root
      value={val}
      onChange={setVal}
      decimals={decimals}
      onMax={onMax}
      currency={curr}
      onCurrencyChange={setCurr}
    >
      <CurrencyInput.MaxButton />
      <CurrencyInput.Input data-testid="currency-input-field" />
      <CurrencyInput.Dropdown
        options={["USD", "EUR", "BTC"]}
        data-testid="currency-select"
      />
    </CurrencyInput.Root>
  );
};

describe("CurrencyInput Component (Bass UI)", () => {
  it("should render compound components and format initial values with commas", () => {
    render(<TestInputWrapper initialValue="1250000" decimals={2} />);

    const input = screen.getByTestId(
      "currency-input-field"
    ) as HTMLInputElement;
    expect(input.value).toBe("1,250,000");
  });

  it("should format floating decimals correctly to 8 decimal places", () => {
    render(<TestInputWrapper initialValue="0.123456789" decimals={8} />);

    const input = screen.getByTestId(
      "currency-input-field"
    ) as HTMLInputElement;
    // Should slice down exactly at 8 digits
    expect(input.value).toBe("0.12345678");
  });

  it("should sanitize and filter alpha/invalid characters out on type", async () => {
    const user = userEvent.setup();
    render(<TestInputWrapper initialValue="" decimals={2} />);

    const input = screen.getByTestId("currency-input-field");

    // Attempt typing mixed text and numeric data
    await user.type(input, "1a2b3");
    expect(input).toHaveValue("123");
  });

  it("should enforce the exact max decimal length configuration", async () => {
    const user = userEvent.setup();
    render(<TestInputWrapper initialValue="10" decimals={2} />);

    const input = screen.getByTestId("currency-input-field");

    await user.type(input, ".4567");
    // Should stop appending numbers after two decimal tracks (.45)
    expect(input).toHaveValue("10.45");
  });

  it("should explicitly block multiple sequential decimal periods", async () => {
    const user = userEvent.setup();
    render(<TestInputWrapper initialValue="" decimals={2} />);

    const input = screen.getByTestId("currency-input-field");

    await user.type(input, "1.2.3.");
    expect(input).toHaveValue("1.23");
  });

  it("should support clicking the max button to fill preset numeric amounts", async () => {
    const user = userEvent.setup();
    const mockMaxHandler = vi.fn();

    render(<TestInputWrapper initialValue="0" onMax={mockMaxHandler} />);

    const maxBtn = screen.getByRole("button", { name: /max/i });
    await user.click(maxBtn);

    expect(mockMaxHandler).toHaveBeenCalledTimes(1);
  });

  it("should apply disabled states cleanly to internal inputs and button slots", () => {
    render(
      <CurrencyInput.Root
        value="100"
        onChange={() => {}}
        disabled
        currency="USD"
        onMax={vi.fn()}
      >
        <CurrencyInput.MaxButton />
        <CurrencyInput.Input data-testid="disabled-input" />
        <CurrencyInput.Dropdown options={["USD"]} />
      </CurrencyInput.Root>
    );

    const input = screen.getByTestId("disabled-input");
    const maxBtn = screen.getByRole("button", { name: /max/i });

    expect(input).toBeDisabled();
    expect(maxBtn).toBeDisabled();
  });
});
