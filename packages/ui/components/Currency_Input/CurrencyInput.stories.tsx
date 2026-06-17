import type { Meta } from "@storybook/react-vite";
import * as React from "react";
import { CurrencyInput } from "./CurrencyInput";

const meta: Meta<typeof CurrencyInput.Root> = {
  title: "Forms/CurrencyInput",
  tags: ["autodocs"],
};

export default meta;

export const Default = () => {
  const [amount, setAmount] = React.useState("");
  const [currency, setCurrency] = React.useState("BTC");

  return (
    <CurrencyInput.Root
      value={amount}
      onChange={setAmount}
      currency={currency}
      onCurrencyChange={setCurrency}
      onMax={() => alert("Max balance triggered!")}
    >
      <CurrencyInput.MaxButton />
      <CurrencyInput.Input />
      <CurrencyInput.Dropdown options={["BTC", "ETH", "USD", "NGN"]} />
    </CurrencyInput.Root>
  );
};

export const SatoshiPrecision = () => {
  const [amount, setAmount] = React.useState("");
  const [currency, setCurrency] = React.useState("BTC");

  return (
    <CurrencyInput.Root
      decimals={8}
      value={amount}
      onChange={setAmount}
      currency={currency}
      onCurrencyChange={setCurrency}
      onMax={() => alert("Max balance triggered!")}
    >
      <CurrencyInput.MaxButton />
      <CurrencyInput.Input />
      <CurrencyInput.Dropdown options={["BTC", "ETH", "USD", "NGN"]} />
    </CurrencyInput.Root>
  );
};

export const Disabled = () => {
  const [amount, setAmount] = React.useState("");
  const [currency, setCurrency] = React.useState("BTC");

  return (
    <CurrencyInput.Root
      disabled={true}
      value={amount}
      onChange={setAmount}
      currency={currency}
      onCurrencyChange={setCurrency}
      onMax={() => alert("Max balance triggered!")}
    >
      <CurrencyInput.MaxButton />
      <CurrencyInput.Input />
      <CurrencyInput.Dropdown options={["BTC", "ETH", "USD", "NGN"]} />
    </CurrencyInput.Root>
  );
};
