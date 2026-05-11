import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MixedControlsList from "./MixedControlsList";

describe("MixedControlsList", () => {
  test("renders three rows, switch, and chevrons", () => {
    render(<MixedControlsList />);
    expect(screen.getByTestId("mixed-controls-list")).toBeInTheDocument();
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByText("Hide payment")).toBeInTheDocument();
    expect(screen.getByText("Contact Support")).toBeInTheDocument();
    expect(screen.getByText("Help")).toBeInTheDocument();
    expect(screen.getByTestId("trailing-switch")).toBeInTheDocument();
    const chevronRows = screen.getAllByTestId("trailing-icon");
    expect(chevronRows).toHaveLength(2);
  });

  test("switch toggles uncontrolled and calls onHidePaymentActiveChange", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <MixedControlsList onHidePaymentActiveChange={onChange} />,
    );
    const sw = screen.getByRole("switch", { name: "Hide payment" });
    expect(sw).toBe(screen.getByTestId("toggle-switch"));
    expect(sw).toHaveAttribute("aria-checked", "false");
    await user.click(sw);
    expect(sw).toHaveAttribute("aria-checked", "true");
    expect(onChange).toHaveBeenCalledWith(true);
  });

  test("controlled hidePaymentActive drives switch", () => {
    render(<MixedControlsList hidePaymentActive />);
    expect(screen.getByTestId("toggle-switch")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  test("row clicks fire navigation handlers", async () => {
    const user = userEvent.setup();
    const onSupport = jest.fn();
    const onHelp = jest.fn();
    render(
      <MixedControlsList
        onContactSupportClick={onSupport}
        onHelpClick={onHelp}
      />,
    );
    await user.click(screen.getByTestId("list-item-mixed-controls-contact-support"));
    await user.click(screen.getByTestId("list-item-mixed-controls-help"));
    expect(onSupport).toHaveBeenCalledWith("mixed-controls-contact-support");
    expect(onHelp).toHaveBeenCalledWith("mixed-controls-help");
  });
});
