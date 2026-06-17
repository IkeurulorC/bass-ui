import { Meta } from "@storybook/react-vite";
import { Stat } from "./Stat";

const meta: Meta<typeof Stat> = {
  title: "Data Display/KPI_Stats",
  tags: ["autodocs"],
};

export default meta;

const formatUSD = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // Keeps it clean ($124,560)
  }).format(val);

export const Default = () => (
  <Stat.Root>
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="neutral" value={+8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat.Root>
);

export const Medium = () => (
  <Stat.Root>
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="positive-up" value={+8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat.Root>
);

export const Small = () => (
  <Stat.Root>
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="positive-up" value={-8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat.Root>
);

export const Negative = () => (
  <Stat.Root>
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="negative-up" value={+8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat.Root>
);

export const RedPositive = () => (
  <Stat.Root>
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="negative-up" value={-8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat.Root>
);
