import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceTicker, TickerAsset } from "./PriceTicker";
import { useState, useEffect } from "react";

// Mock data
const mockAssets: TickerAsset[] = [
  {
    id: "1",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 211.75,
    change24h: 0.88,
  },
  {
    id: "2",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 188.42,
    change24h: 2.15,
  },
  {
    id: "3",
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 66810.5,
    change24h: -1.3,
  },
  {
    id: "4",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 211.75,
    change24h: 0.88,
  },
  {
    id: "5",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 221.75,
    change24h: 0.88,
  },
  {
    id: "6",
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 15303.0,
    change24h: -1.3,
  },
];

const meta: Meta<typeof PriceTicker> = {
  title: "Components/PriceTicker",
  component: PriceTicker,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["marquee", "stack"],
      description: "The layout style of the ticker",
    },
    speed: {
      control: { type: "number", min: 5, max: 100, step: 5 },
      description: "Duration in seconds for a full marquee loop rotation",
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriceTicker>;

// 1. Default Marquee Story
export const Marquee: Story = {
  args: {
    assets: mockAssets,
    variant: "marquee",
    speed: 30,
  },
  render: (args) => (
    <div className="w-full bg-black p-6 rounded-xl">
      <PriceTicker {...args} />
    </div>
  ),
};

// 2. Vertical Stack Story
export const Stack: Story = {
  args: {
    assets: mockAssets,
    variant: "stack",
  },
  render: (args) => (
    <div className="w-full max-w-md mx-auto bg-black p-6 rounded-xl">
      <PriceTicker {...args} />
    </div>
  ),
};

// 3. Dynamic Live-Updating Interactive Flex Story
// This simulation automatically fluctuates prices to showcase the dynamic CSS flash states.
export const LiveMarketSimulation: Story = {
  args: {
    variant: "marquee",
    speed: 25,
    assets: mockAssets,
  },
  render: (args) => {
    const [liveAssets, setLiveAssets] = useState<TickerAsset[]>(mockAssets);

    useEffect(() => {
      const interval = setInterval(() => {
        setLiveAssets((prevAssets) =>
          prevAssets.map((asset) => {
            // Randomly select assets to fluctuate to simulate actual market shifts
            if (Math.random() > 0.4) {
              const isPositiveChange = Math.random() > 0.5;
              // Add a slight variance shift to trigger the color flash
              const priceDelta = asset.price * (Math.random() * 0.005);
              const newPrice = isPositiveChange
                ? asset.price + priceDelta
                : asset.price - priceDelta;

              return {
                ...asset,
                price: Number(newPrice.toFixed(2)),
              };
            }
            return asset;
          })
        );
      }, 2500); // Shift random prices every 2.5 seconds

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full space-y-8 bg-black p-8 rounded-xl">
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">
            Marquee View (Live Data)
          </h4>
          <PriceTicker {...args} assets={liveAssets} variant="marquee" />
        </div>

        <div className="max-w-md mx-auto">
          <h4 className="text-sm font-medium text-gray-400 mb-2 text-center">
            Stack View (Live Data)
          </h4>
          <PriceTicker {...args} assets={liveAssets} variant="stack" />
        </div>
      </div>
    );
  },
};
