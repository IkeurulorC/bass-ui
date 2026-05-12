import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CheckBox } from "./Toggle"; // Using the unified file

describe("CheckBox - State & Callback (1 & 5)", () => {
  it("should have correct initial aria-checked state", () => {
    render(<CheckBox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "false");
  });

  it("should honor the defaultChecked prop on mount", () => {
    render(<CheckBox defaultChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-checked", "true");
  });

  it("should trigger onCheckedChange with the correct boolean value", async () => {
    // Create a mock function to track the call
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<CheckBox onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    // Click the checkbox
    await user.click(checkbox);

    // Verify the function was called with true
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);

    // Click again to uncheck
    await user.click(checkbox);
    expect(handleChange).toHaveBeenLastCalledWith(false);
  });

  it("should not trigger callback when disabled", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<CheckBox disabled onCheckedChange={handleChange} />);
    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    // Verify state didn't change and function wasn't called
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    expect(handleChange).not.toHaveBeenCalled();
  });
});
