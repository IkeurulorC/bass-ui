import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "./Modal";

describe("Tests the Modal Component", () => {
  it("", async () => {
    expect(screen.queryByText("Practice Modal")).not.toBeInTheDocument();
    render(
      <Modal
        description="tit-for-tat"
        isOpen={false}
        trigger={
          <button className="bg-blue-500 text-white p-2">Open Modal</button>
        }
        title="Practice Modal"
      >
        <Modal.Header>
          <h3 className="text-2xl font-medium not-italic leading-[22px] text-center">
            Discard Changes
          </h3>
        </Modal.Header>
        <Modal.Body>
          <p className="not-italic text-[15px] font-medium text-left font-sans text-gray-600 dark:text-gray-400">
            Are you sure you want to discard changes? This action can't be
            undone
          </p>
        </Modal.Body>
        <Modal.Footer>Discard</Modal.Footer>
      </Modal>
    );

    const Trigger = screen.getByText("Open Modal");
    fireEvent.click(Trigger);

    expect(await screen.findByText("Practice Modal")).toBeDefined();
  });
});
