import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { CurrencyInput } from "./CurrencyInput";

const meta: Meta<typeof CurrencyInput.Root> = {
  title: "Components/CurrencyInput",
  component: CurrencyInput.Root,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    error: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    decimals: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CurrencyInput.Root>;

// Controlled wrapper to manage internal state inside Storybook
const CurrencyInputWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || "");
  return (
    <div className="w-full max-w-sm space-y-2">
      <CurrencyInput.Root
        {...args}
        value={value}
        onChange={(val) => {
          setValue(val);
          args.onChange?.(val);
        }}
      >
        <CurrencyInput.MaxButton />
        <CurrencyInput.Input />
        <CurrencyInput.Dropdown>
          <span className="font-semibold text-foreground">BTC</span>
        </CurrencyInput.Dropdown>
      </CurrencyInput.Root>
      <div className="text-xs text-muted-foreground font-mono">
        Raw State: "{value}"
      </div>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <CurrencyInputWrapper {...args} />,
  args: {
    decimals: 2,
    value: "1234567.89",
    onMax: () => alert("Max balance triggered!"),
  },
};

export const SatoshiPrecision: Story = {
  render: (args) => <CurrencyInputWrapper {...args} />,
  args: {
    decimals: 8,
    value: "0.00050042",
    onMax: () => alert("Setting wallet maximum: 2.10045000 BTC"),
  },
};

export const ErrorState: Story = {
  render: (args) => <CurrencyInputWrapper {...args} />,
  args: {
    decimals: 2,
    error: true,
    value: "500.00",
  },
};

export const Variations: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      {/* Small Variant */}
      <div>
        <span className="text-xs font-semibold block mb-1 text-muted-foreground">
          Small size (e.g. Compact widget)
        </span>
        <CurrencyInput.Root
          value="45.50"
          onChange={() => {}}
          size="sm"
          decimals={2}
        >
          <CurrencyInput.Input />
          <CurrencyInput.Dropdown>USD</CurrencyInput.Dropdown>
        </CurrencyInput.Root>
      </div>

      {/* Large Variant */}
      <div>
        <span className="text-xs font-semibold block mb-1 text-muted-foreground">
          Large size (e.g. Main Swap View)
        </span>
        <CurrencyInput.Root
          value="12500"
          onChange={() => {}}
          size="lg"
          decimals={0}
        >
          <CurrencyInput.MaxButton />
          <CurrencyInput.Input />
          <CurrencyInput.Dropdown>JPY</CurrencyInput.Dropdown>
        </CurrencyInput.Root>
      </div>
    </div>
  ),
};
