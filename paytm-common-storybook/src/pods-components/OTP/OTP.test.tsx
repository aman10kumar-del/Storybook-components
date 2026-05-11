import React from "react";
import {render, screen, fireEvent, act} from "@testing-library/react"
import userEvent from "@testing-library/user-event";

import OTP from "./OTP"

jest.useFakeTimers();

describe("Test OTP", () => {

  test("otp input present", () => {
    render((
      <OTP
        value="123456"
        onChange={()=>{}}
      />
    ));
    const firstBox = screen.getByTestId("input-box-0")
    const lastBox = screen.getByTestId("input-box-5")
    expect(firstBox).toHaveValue("1");
    expect(lastBox).toHaveValue("6")
  })

  test("custom title", () => {
    render((
      <OTP
        value="123456"
        onChange={()=>{}}
        title="Custom title"
      />
    ));
    const title = screen.getByTestId("custom-title")
    expect(title).toHaveTextContent("Custom title");
  })

  test("hide resend otp", () => {
    render((
      <OTP
        value="123456"
        onChange={()=>{}}
        resendOTPText={""}
      />
    ));
    const container = screen.getByTestId("otp-container")
    expect(container).not.toHaveTextContent("Resend OTP");
  })

  test("show warning", () => {
    render((
      <OTP
        value="123456"
        onChange={()=>{}}
        warning="warning"
      />
    ));
    const warning = screen.getByTestId("warning")
    expect(warning).toBeInTheDocument();
  })

  test("show error", () => {
    render((
      <OTP
        value="123456"
        onChange={()=>{}}
        error="error"
      />
    ));
    const error = screen.getByTestId("error")
    expect(error).toBeInTheDocument();
  })

  test("error overrides warning", () => {
    render((
      <OTP
        value="123456"
        onChange={()=>{}}
        error="error"
        warning="warning"
      />
    ));
    const error = screen.getByTestId("error")
    expect(error).toBeInTheDocument();
    const container = screen.getByTestId("otp-container")
    expect(container).not.toHaveTextContent("warning");
  })

  test("onchange to be called", () => {
    const onChange = jest.fn();
    render((
      <OTP
        value="123"
        onChange={onChange}
      />
    ));
    const fourthBox = screen.getByTestId("input-box-3")
    userEvent.type(fourthBox, "4")
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith("1234  ");
  })

  test("prevent non numeric inputs", () => {
    render((
      <OTP
        value="123"
        onChange={() => {}}
      />
    ));
    const fourthBox = screen.getByTestId("input-box-3")
    userEvent.type(fourthBox, "A")
    expect(fourthBox).toHaveValue("");
  })

  test("focus next box when value filled in current box", () => {
    render((
      <OTP
        value="123"
        onChange={()=>{}}
      />
    ));
    const fourthBox = screen.getByTestId("input-box-3")
    const fifthBox = screen.getByTestId("input-box-4")
    expect(fifthBox).not.toHaveFocus();
    userEvent.type(fourthBox, "4")
    expect(fifthBox).toHaveFocus();
  })

  test("remove focus when all boxes are filled", () => {
    render((
      <OTP
        value="12345"
        onChange={()=>{}}
      />
    ));
    const firstBox = screen.getByTestId("input-box-0")
    const secondBox = screen.getByTestId("input-box-1")
    const thirdBox = screen.getByTestId("input-box-2")
    const fourthBox = screen.getByTestId("input-box-3")
    const fifthBox = screen.getByTestId("input-box-4")
    const sixthBox = screen.getByTestId("input-box-5")
    userEvent.type(sixthBox, "6")
    expect(firstBox).not.toHaveFocus();
    expect(secondBox).not.toHaveFocus();
    expect(thirdBox).not.toHaveFocus();
    expect(fourthBox).not.toHaveFocus();
    expect(fifthBox).not.toHaveFocus();
    expect(sixthBox).not.toHaveFocus();
  })

  test("focus next box when right arrow is pressed", () => {
    render((
      <OTP
        value="123"
        onChange={()=>{}}
      />
    ));
    const fourthBox = screen.getByTestId("input-box-3")
    const fifthBox = screen.getByTestId("input-box-4")
    expect(fifthBox).not.toHaveFocus();
    userEvent.type(fourthBox, "{arrowright}")
    expect(fifthBox).toHaveFocus();
  })

  test("focus previous box when left arrow is pressed", () => {
    render((
      <OTP
        value="123"
        onChange={()=>{}}
      />
    ));
    const secondBox = screen.getByTestId("input-box-1")
    const thirdBox = screen.getByTestId("input-box-2")
    expect(secondBox).not.toHaveFocus();
    userEvent.type(thirdBox, "{arrowleft}")
    expect(secondBox).toHaveFocus();
  })

  test("resend otp click", () => {
    render((
      <OTP
        value="123"
        onChange={()=>{}}
        resendOTPInterval={30}
      />
    ));
    const resendOTP = screen.getByTestId("resend-otp")
    expect(resendOTP).not.toHaveTextContent("in")
    fireEvent.click(resendOTP)
    expect(resendOTP).toHaveTextContent("Resend OTP in")
    act(() => {
      for (let i=0; i < 30; i++) {
        jest.runOnlyPendingTimers();
      }
    });
    expect(resendOTP).not.toHaveTextContent("in")
  })

  test("alternative action click", () => {
    const onClick = jest.fn()
    render((
      <OTP
        value="123"
        onChange={()=>{}}
        alternativeActionText={"Try another verification method"}
        onAlternativeActionClick={onClick}
      />
    ));
    const alternativeAction = screen.getByTestId("alternative-action")
    fireEvent.click(alternativeAction)
    expect(onClick).toHaveBeenCalled();
  })
})