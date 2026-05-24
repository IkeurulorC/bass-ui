import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { PriceTicker, TickerAsset } from "./PriceTicker";

// Mock framer-motion to prevent loop animation side-effects during testing
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      props: React.HTMLAttributes<HTMLDivElement>;
    }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

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
];

describe("PriceTicker Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  // 1. Structural Test: Marquee Variant
  it("renders correctly in marquee variant with duplicated track items", () => {
    const { container } = render(
      <PriceTicker assets={mockAssets} variant="marquee" />
    );

    // Marquee triplicates the array length to achieve a seamless loop edge-to-edge
    const teslaNodes = screen.getAllByText("TSLA");
    expect(teslaNodes.length).toBe(3);

    // Ensures gradient fade masks are present in the DOM layout
    const gradients = container.querySelectorAll(
      ".bg-gradient-to-r, .bg-gradient-to-l"
    );
    expect(gradients.length).toBe(2);
  });

  // 2. Structural Test: Stack Variant
  it("renders correctly in vertical stack variant without triplication", () => {
    render(<PriceTicker assets={mockAssets} variant="stack" />);

    // Stack layout handles 1:1 data printing
    const teslaNodes = screen.getAllByText("TSLA");
    expect(teslaNodes.length).toBe(1);

    // The asset description name should explicitly mount in structural list views
    expect(screen.getByText("Tesla, Inc.")).toBeInTheDocument();
    expect(screen.getByText("Apple Inc.")).toBeInTheDocument();
  });
});
