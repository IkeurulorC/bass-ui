import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { TransactionStepper, TransactionStep } from "./TransactionStepper";
import "@testing-library/jest-dom"; // Import if not using global setup

describe("TransactionStepper Component", () => {
  it("renders all step labels and descriptions provided by the backend JSON", () => {
    const mockSteps: TransactionStep[] = [
      {
        id: "1",
        label: "Step One",
        status: "SUCCESS",
        description: "Finished first task",
      },
      {
        id: "2",
        label: "Step Two",
        status: "PENDING",
        description: "Waiting in line",
      },
    ];

    render(<TransactionStepper steps={mockSteps} />);

    // Assert labels are present
    expect(screen.getByText("Step One")).toBeInTheDocument();
    expect(screen.getByText("Step Two")).toBeInTheDocument();

    // Assert descriptions are present
    expect(screen.getByText("Finished first task")).toBeInTheDocument();
    expect(screen.getByText("Waiting in line")).toBeInTheDocument();
  });

  it("renders the fallback index numbers for PENDING steps", () => {
    const mockSteps: TransactionStep[] = [
      { id: "1", label: "Step One", status: "PENDING" },
      { id: "2", label: "Step Two", status: "PENDING" },
    ];

    render(<TransactionStepper steps={mockSteps} />);

    // Pending steps should render their 1-based index inside the bubble
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("renders a checkmark icon for SUCCESS steps", () => {
    const mockSteps: TransactionStep[] = [
      { id: "1", label: "Step One", status: "SUCCESS" },
    ];

    render(<TransactionStepper steps={mockSteps} />);

    expect(screen.getByText("✓")).toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });

  it("renders a cross icon for FAILED steps", () => {
    const mockSteps: TransactionStep[] = [
      { id: "1", label: "Step One", status: "FAILED" },
    ];

    render(<TransactionStepper steps={mockSteps} />);

    expect(screen.getByText("✕")).toBeInTheDocument();
  });

  it("applies the correct text styling colors for different statuses", () => {
    const mockSteps: TransactionStep[] = [
      { id: "1", label: "Success Step", status: "SUCCESS" },
      { id: "2", label: "Processing Step", status: "PROCESSING" },
      { id: "3", label: "Failed Step", status: "FAILED" },
    ];

    render(<TransactionStepper steps={mockSteps} />);

    const successLabel = screen.getByText("Success Step");
    const processingLabel = screen.getByText("Processing Step");
    const failedLabel = screen.getByText("Failed Step");

    // Verify Tailwind color class indicators are assigned appropriately
    expect(successLabel).toHaveClass("text-gray-800");
    expect(processingLabel).toHaveClass("text-blue-600", "font-semibold");
    expect(failedLabel).toHaveClass("text-red-600");
  });

  it("applies custom className passed via props to the wrapper container", () => {
    const mockSteps: TransactionStep[] = [];
    const customClass = "custom-stepper-utility-class";

    // We add a data-testid to target the wrapper element easily
    const { container } = render(
      <TransactionStepper steps={mockSteps} className={customClass} />
    );

    // The first child div should contain our custom class
    expect(container.firstChild).toHaveClass(customClass);
  });

  it("handles empty step arrays gracefully without crashing", () => {
    const { container } = render(<TransactionStepper steps={[]} />);

    // It should render the container layout outer tracking track but contain no children step wrappers
    expect(container).toBeInTheDocument();
    expect(screen.queryByText("✓")).not.toBeInTheDocument();
  });
});
