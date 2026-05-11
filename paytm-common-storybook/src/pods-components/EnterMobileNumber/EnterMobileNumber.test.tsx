import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EnterMobileNumber from "./EnterMobileNumber";
import {
  isValidIndianMobile,
  sanitizeAlphanumericName,
  sanitizeIndianMobileDigits,
} from "./indianMobileValidation";

describe("indianMobileValidation", () => {
  test("sanitize strips non-digits and caps length", () => {
    expect(sanitizeIndianMobileDigits("98 765-43abc210")).toBe("9876543210");
    expect(sanitizeIndianMobileDigits("12345678901234")).toBe("1234567890");
  });

  test("isValidIndianMobile", () => {
    expect(isValidIndianMobile("9876543210")).toBe(true);
    expect(isValidIndianMobile("8876543210")).toBe(true);
    expect(isValidIndianMobile("5876543210")).toBe(false);
    expect(isValidIndianMobile("987654321")).toBe(false);
  });

  test("sanitizeAlphanumericName keeps alphanumerics and spaces", () => {
    expect(sanitizeAlphanumericName("Priya@ Sharma!")).toBe("Priya Sharma");
    expect(sanitizeAlphanumericName("A  B")).toBe("A B");
  });
});

describe("EnterMobileNumber", () => {
  test("renders and filters input to digits", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <EnterMobileNumber value="" onChange={onChange} inputAriaLabel="Mobile" />,
    );
    const input = screen.getByLabelText("Mobile");
    await user.type(input, "9a8b7c6543210");
    expect(onChange.mock.calls.map((c) => c[0]).join("")).toBe("9876543210");
  });

  test("ABC mode accepts letters and uses name placeholder", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <EnterMobileNumber
        value=""
        onChange={onChange}
        showInputModeSwitch
        defaultInputMode="text"
        inputAriaLabelName="Name field"
      />,
    );
    const input = screen.getByLabelText("Name field");
    expect(input).toHaveAttribute("placeholder", "Enter Name");
    await user.type(input, "An@ya 9");
    expect(onChange.mock.calls.map((c) => c[0]).join("")).toBe("Anya 9");
  });

  test("shows error text", () => {
    render(
      <EnterMobileNumber
        value=""
        onChange={() => {}}
        error="Enter your mobile number"
      />,
    );
    expect(screen.getByTestId("enter-mobile-number-error")).toHaveTextContent(
      "Enter your mobile number",
    );
  });

  test("contacts button fires callback", async () => {
    const user = userEvent.setup();
    const onContactsClick = jest.fn();
    render(
      <EnterMobileNumber
        value=""
        onChange={() => {}}
        showContacts
        onContactsClick={onContactsClick}
      />,
    );
    await user.click(screen.getByTestId("enter-mobile-number-contacts"));
    expect(onContactsClick).toHaveBeenCalledTimes(1);
  });
});
