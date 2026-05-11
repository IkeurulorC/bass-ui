import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { ToolTip } from "./Tooltip";

describe("ToolTip Component", () => {
  const defaultProps = {
    trigger: <button>Hover Me</button>,
    children: "Tooltip Content",
    header: "Tooltip Header",
  };

  it("renders header and children correctly", async () => {
    const user = userEvent.setup();
    render(
      <ToolTip {...defaultProps} header="Custom Header">
        Inner Message
      </ToolTip>
    );

    await user.hover(screen.getByRole("button"));

    const tooltip = await screen.findByRole("tooltip");

    // Check if both header and children exist
    expect(tooltip).toHaveTextContent("Custom Header");
    expect(tooltip).toHaveTextContent("Inner Message");
  });

  it("does not render the header section if the header prop is missing", async () => {
    const user = userEvent.setup();
    // Render without header
    render(<ToolTip trigger={<button>T</button>}>No Header Here</ToolTip>);

    await user.hover(screen.getByRole("button"));
    const tooltip = await screen.findByRole("tooltip");

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).not.toHaveTextContent("Tooltip Header");
  });
});
