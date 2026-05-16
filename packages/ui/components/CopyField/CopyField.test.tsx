import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { CopyField } from "./CopyField";

describe("Testing to confirm that the CopyField Component works correctly", () => {
  it("should copy the correct text to the clipboard", async () => {
    const user = userEvent.setup();
    const testValue = "https://bass-ui.com";

    // Mocking the clipboard API
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<CopyField value={testValue} />);

    const copyButton = screen.getByRole("button");
    await user.click(copyButton);

    expect(writeTextMock).toHaveBeenCalledWith(testValue);
  });
});
