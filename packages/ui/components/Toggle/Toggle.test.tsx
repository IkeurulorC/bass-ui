import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle Component - State Logic", () => {
  it("should flip aria-checked from false to true when clicked", async () => {
    const user = userEvent.setup();
    render(<Toggle label="Enable Notifications" />);

    // Find by the accessible role
    const switchRoot = screen.getByRole("switch");

    // Initial state check
    expect(switchRoot).toHaveAttribute("aria-checked", "false");

    // Simulate the click
    await user.click(switchRoot);

    // Final state check
    expect(switchRoot).toHaveAttribute("aria-checked", "true");
  });

  it("should start in the 'on' state when defaultChecked is true", () => {
    render(<Toggle defaultChecked />);

    const switchRoot = screen.getByRole("switch");

    expect(switchRoot).toHaveAttribute("aria-checked", "true");
  });

  it("should not toggle when the component is disabled", async () => {
    const user = userEvent.setup();
    render(<Toggle disabled />);

    const switchRoot = screen.getByRole("switch");

    await user.click(switchRoot);

    // Should remain false because it's disabled
    expect(switchRoot).toHaveAttribute("aria-checked", "false");
    expect(switchRoot).toBeDisabled();
  });
});
