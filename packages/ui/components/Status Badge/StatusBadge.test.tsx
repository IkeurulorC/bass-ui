import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge Component", () => {
  it("should render the live pulse elements when status is live", () => {
    const { container } = render(
      <StatusBadge status="live">Live Stream</StatusBadge>
    );

    // Look for the absolute positioned ping class assigned to the pulse state
    const pingElement = container.querySelector(".animate-ping");
    expect(pingElement).toBeInTheDocument();
  });
});
