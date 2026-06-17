import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import * as React from "react";
import { AssetCard } from "./Card"; // Adjust to your actual import path

describe("AssetCard Strict Root Context Guardrails", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    // Spies on console.error to keep the Vitest terminal output clean
    // when React intentionally logs the component crashes
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // 1. Array of all sub-components that MUST live inside Root
  const subComponents = [
    { name: "Header", ui: <AssetCard.Header>Header</AssetCard.Header> },
    { name: "Icon", ui: <AssetCard.Icon>₿</AssetCard.Icon> },
    { name: "Group", ui: <AssetCard.Group>Group</AssetCard.Group> },
    { name: "Main", ui: <AssetCard.Main>Main</AssetCard.Main> },
    { name: "Info", ui: <AssetCard.Info>Info</AssetCard.Info> },
    { name: "Value", ui: <AssetCard.Value>$100</AssetCard.Value> },
    { name: "Rate", ui: <AssetCard.Rate rate={0.03} /> },
    { name: "Visuals", ui: <AssetCard.Visuals>Visuals</AssetCard.Visuals> },
    {
      name: "Sparkline",
      ui: <AssetCard.Sparkline data={[10, 20, 30]} width={100} height={30} />,
    },
  ];

  // 2. Dynamically run a test for every single sub-component
  subComponents.forEach(({ name, ui }) => {
    it(`should strictly crash if <AssetCard.${name}> is used outside AssetCardRoot`, () => {
      expect(() => {
        render(ui);
      }).toThrow(
        "AssetCard sub-components cannot be rendered outside the AssetCardRoot component."
      );
    });
  });
});

describe("Sparkline Isolated Math Logic (Inside Root Context)", () => {
  // Since Sparkline crashes outside Root, we wrap it in a mock Root
  // to safely test its internal calculation engine without context interference.

  it("should render null if data array length is less than 2", () => {
    const { container } = render(
      <AssetCard.Root>
        <AssetCard.Sparkline data={[100]} width={100} height={30} />
      </AssetCard.Root>
    );
    // Find the SVG element inside our rendered asset card tree
    const svg = container.querySelector("svg");
    expect(svg).toBeNull();
  });

  it("should generate proper scaling calculations for SVG line strings", () => {
    const mockData = [100, 150, 200];
    const { container } = render(
      <AssetCard.Root>
        <AssetCard.Sparkline data={mockData} width={100} height={30} />
      </AssetCard.Root>
    );

    const paths = container.querySelectorAll("path");
    const strokePath = paths[1]; // The actual visible stroke line

    expect(strokePath.getAttribute("d")).toContain("M 0.0");
    expect(strokePath.getAttribute("d")).toContain("L 50.0");
    expect(strokePath.getAttribute("d")).toContain("L 100.0");
  });
});
