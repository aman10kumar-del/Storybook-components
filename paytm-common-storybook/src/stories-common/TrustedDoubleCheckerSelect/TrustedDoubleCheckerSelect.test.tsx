import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TrustedDoubleCheckerSelect from "./TrustedDoubleCheckerSelect";

jest.useFakeTimers();

describe("TrustedDoubleCheckerSelect", () => {
  test("renders header and sections", () => {
    render(<TrustedDoubleCheckerSelect />);
    expect(screen.getByTestId("trusted-double-checker-select")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toHaveTextContent("Select a Trusted DoubleChecker");
    expect(screen.getByText("Suggestions")).toBeInTheDocument();
    expect(screen.getByText("All Contacts")).toBeInTheDocument();
    expect(screen.getByTestId("payments-contact-grid")).toBeInTheDocument();
  });

  test("filters contacts when search matches phone", () => {
    render(<TrustedDoubleCheckerSelect />);
    const field = screen.getByTestId("search-field");
    userEvent.type(field, "9727344560");
    jest.runAllTimers();
    expect(screen.queryByTestId("payments-contact-grid")).not.toBeInTheDocument();
    expect(screen.getByTestId("trusted-dc-row-c7")).toBeInTheDocument();
    expect(screen.queryByTestId("trusted-dc-row-c1")).not.toBeInTheDocument();
  });

  test("invokes onSelectContact when row is activated", () => {
    const onSelectContact = jest.fn();
    render(<TrustedDoubleCheckerSelect onSelectContact={onSelectContact} />);
    fireEvent.click(screen.getByTestId("trusted-dc-row-c1"));
    expect(onSelectContact).toHaveBeenCalledWith("c1");
  });

  test("invokes onChangeContact when Change is pressed", () => {
    const onChangeContact = jest.fn();
    render(<TrustedDoubleCheckerSelect onChangeContact={onChangeContact} />);
    const buttons = screen.getAllByTestId("button");
    const changeBtn = buttons.find((el) => el.textContent === "Change");
    expect(changeBtn).toBeTruthy();
    fireEvent.click(changeBtn!);
    expect(onChangeContact).toHaveBeenCalledWith("c1");
  });
});
