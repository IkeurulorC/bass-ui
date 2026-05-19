import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest"; // or 'jest' depending on your setup
import { CommandBar } from "./CommandBar";

window.HTMLElement.prototype.scrollIntoView = () => {};

describe("CommandBar Component", () => {
  it("renders the command bar with its items cleanly", () => {
    render(
      <CommandBar.Root>
        <CommandBar.Input placeholder="Search test..." />
        <CommandBar.List>
          <CommandBar.Group heading="Testing Actions" defaultExpanded={true}>
            <CommandBar.Item>Test Item 1</CommandBar.Item>
          </CommandBar.Group>
        </CommandBar.List>
      </CommandBar.Root>
    );

    // 1. Check if the input field is on the screen
    const inputEl = screen.getByPlaceholderText("Search test...");
    expect(inputEl).toBeTruthy();

    // 2. Check if our category header is visible
    expect(screen.getByText("Testing Actions")).toBeTruthy();

    // 3. Check if our item row rendered properly
    expect(screen.getByText("Test Item 1")).toBeTruthy();
  });
});
