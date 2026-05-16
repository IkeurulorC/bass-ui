import { Stat } from "./Stat";

export default {
  title: "Components/KPI_Stats",
};

const formatUSD = (val: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0, // Keeps it clean ($124,560)
  }).format(val);

export const Default = () => (
  <Stat>
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="positive-up" value={+8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat>
);

export const Medium = () => (
  <Stat size="md">
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="positive-up" value={+8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat>
);

export const Small = () => (
  <Stat size="sm">
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="positive-up" value={+8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat>
);

export const Negative = () => (
  <Stat size="sm">
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="negative-up" value={+8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat>
);

export const RedPositive = () => (
  <Stat size="sm">
    <Stat.Label>Monthly Recurring Revenue</Stat.Label>
    <Stat.Trend trendType="positive-up" value={-8.4} />
    <Stat.Value value={124560} formatter={formatUSD} />
  </Stat>
);
