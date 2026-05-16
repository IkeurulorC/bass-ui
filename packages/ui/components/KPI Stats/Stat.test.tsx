import React from "react";
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Stat } from "./Stat"; // Adjust to your actual import path

describe("KPI_Stats Component (Bass UI)", () => {
  beforeEach(() => {
    // 1. Tell Vitest to hijack time so requestAnimationFrame doesn't take a full second
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render all compound children correctly", () => {
    render(
      <Stat size="sm">
        <Stat.Label>Test Label</Stat.Label>
        <Stat.Trend value={5.2} trendType="positive-up" />
        <Stat.Value value={100} />
      </Stat>
    );

    // Verify structural text renders safely
    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("+5.2%")).toBeInTheDocument();
  });

  it("should apply the formatter on every animation frame", () => {
    const mockFormatter = vi.fn((val: number) => `$${Math.round(val)}`);

    render(
      <Stat>
        <Stat.Label>Revenue</Stat.Label>
        <Stat.Value value={1000} duration={1000} formatter={mockFormatter} />
      </Stat>
    );

    // Initial check
    expect(mockFormatter).toReturnWith("$0");

    // Fast-forward halfway
    act(() => {
      vi.advanceTimersByTime(500);
    });

    const midValue = screen.getByText(/\$/, { ignore: ".sr-only" });
    expect(midValue.textContent).not.toBe("$0");
    expect(midValue.textContent).not.toBe("$1000");

    // FIX: Advance the timers past the duration window (e.g., another 600ms)
    // to guarantee the animation loop hits progress === 1 and snaps to the final target.
    act(() => {
      vi.advanceTimersByTime(600);
    });

    // Instead of looking for exact text matches that might get hung up on floating-point rounding,
    // query the visible element explicitly and check its contents!
    const finalVisualValue = screen.getByText((content, element) => {
      return element?.getAttribute("aria-hidden") === "true";
    });

    expect(finalVisualValue.textContent).toBe("$1000");
  });

  it("should render accessible static values for screen readers immediately", () => {
    const mockFormatter = (val: number) => `$${Math.round(val)}`;

    const { container } = render(
      <Stat>
        <Stat.Value value={500} formatter={mockFormatter} />
      </Stat>
    );

    // Locate the screen-reader-only element containing the final value
    const srElement = container.querySelector(".sr-only");
    expect(srElement).toBeInTheDocument();
    expect(srElement?.textContent).toBe("$500");
  });
});
