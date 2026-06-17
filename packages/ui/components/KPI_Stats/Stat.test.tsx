import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Stat } from "./Stat";

describe("KPI_Stats Component (Bass UI)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Safely simulate requestAnimationFrame ticks using our fake timers
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      return setTimeout(() => cb(performance.now()), 16) as unknown as number;
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should render all compound children correctly", () => {
    render(
      <Stat.Root>
        <Stat.Label>Test Label</Stat.Label>
        <Stat.Trend
          value={5.2}
          trendType="positive-up"
          data-testid="stat-trend"
        />
        <Stat.Value value={100} data-testid="stat-value" />
      </Stat.Root>
    );

    // Assert using explicit text matchers and test IDs for perfect stability
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByTestId("stat-trend")).toHaveTextContent("+5.2%");
  });

  it("should apply the formatter on every animation frame", () => {
    const mockFormatter = vi.fn((val: number) => `$${Math.round(val)}`);

    render(
      <Stat.Root>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Value value={1000} duration={1000} formatter={mockFormatter} />
      </Stat.Root>
    );

    // Verify the component invoked the formatter on initial render loop
    expect(mockFormatter).toHaveBeenCalled();

    // Fast-forward halfway through the duration window (500ms)
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Query the visual element directly via its ARIA state to see what the user sees
    const visualElement = screen.getByText((_, element) => {
      return element?.getAttribute("aria-hidden") === "true";
    });

    // Ensure it is actively counting up, meaning it's neither at the start nor the end
    expect(visualElement.textContent).not.toBe("$0");
    expect(visualElement.textContent).not.toBe("$1000");

    // Fast-forward past the finish line (another 600ms) to force it to snap to final value
    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(visualElement.textContent).toBe("$1000");
  });

  it("should render accessible static values for screen readers immediately", () => {
    const mockFormatter = (val: number) => `$${Math.round(val)}`;

    const { container } = render(
      <Stat.Root>
        <Stat.Value value={500} formatter={mockFormatter} />
      </Stat.Root>
    );

    // Direct targeted lookup for your accessibility layer snippet
    const srElement = container.querySelector(".sr-only");
    expect(srElement).toBeInTheDocument();
    expect(srElement?.textContent).toBe("$500");
  });
});
