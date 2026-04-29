import { render, screen } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import { UserEvent, userEvent } from "@testing-library/user-event";
import ActionButton from "./ActionButton";
import "@testing-library/jest-dom/vitest";

describe("ActionButton (Unit)", () => {
  it("applies default primary and large classes", () => {
    render(<ActionButton>Default Button</ActionButton>);
    const btn = screen.getByRole("button", { name: /default button/i });

    expect(btn).toHaveClass("flex", "items-center", "justify-around");
    expect(btn).toHaveClass(
      "bg-btn-primary-bg",
      "!text-btn-primary-text",
      "px-8"
    );
  });

  // 2. THE VARIANT MATRIX (CVA CONTRACT)
  it("swaps classes correctly based on intent props", () => {
    const { rerender } = render(
      <ActionButton intent="danger" size="sm">
        Delete
      </ActionButton>
    );
    let btn = screen.getByRole("button");

    expect(btn).toHaveClass("bg-btn-danger-bg", "px-5");
    expect(btn).not.toHaveClass("bg-btn-primary-bg");

    // Test the 'ghost' or 'outline' if you have it
    rerender(<ActionButton intent="ghost">Ghost</ActionButton>);
    expect(btn).toHaveClass("bg-btn-ghost-bg", "hover:bg-btn-ghost-bg-hover");
  });

  // 3. INTERACTION & ACCESSIBILITY LOGIC
  it("handles the disabled state logically", () => {
    const handleClick = vi.fn();
    render(
      <ActionButton isDisabled={true} onClick={handleClick}>
        Disabled
      </ActionButton>
    );

    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(btn).toHaveClass("pointer-events-none");

    // Interaction Check: Does the click still fire? (It shouldn't)
    btn.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards extra attributes and custom classes correctly", () => {
    render(
      <ActionButton type="submit" data-testid="custom-btn" className="mt-4">
        Submit
      </ActionButton>
    );

    const btn = screen.getByTestId("custom-btn");

    expect(btn).toHaveAttribute("type", "submit");
    expect(btn).toHaveClass("mt-4");
  });
});
