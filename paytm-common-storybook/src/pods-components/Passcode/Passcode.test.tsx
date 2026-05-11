import React from "react";
import {render, screen, fireEvent, act} from "@testing-library/react"
import userEvent from "@testing-library/user-event";

import Passcode from "./Passcode"

jest.useFakeTimers();

describe("Test Passcode", () => {

  test("Passcode input present", () => {
    render((
      <Passcode
        value="abcEFG"
        onChange={()=>{}}
      />
    ));
    const firstBox = screen.getByTestId("passcode-box-0")
    const lastBox = screen.getByTestId("passcode-box-5")
    expect(firstBox).toHaveValue("a");
    expect(lastBox).toHaveValue("G")
  })

  test("custom title", () => {
    render((
      <Passcode
        value="abcEFG"
        onChange={()=>{}}
        title="Custom title"
      />
    ));
    const title = screen.getByTestId("custom-title")
    expect(title).toHaveTextContent("Custom title");
  })

  test("show error", () => {
    render((
      <Passcode
        value="abcEFG"
        onChange={()=>{}}
        error="error"
      />
    ));
    const error = screen.getByTestId("error")
    expect(error).toBeInTheDocument();
  })

  test("onchange to be called", () => {
    const onChange = jest.fn();
    render((
      <Passcode
        value="abc"
        onChange={onChange}
      />
    ));
    const fourthBox = screen.getByTestId("passcode-box-3")
    userEvent.type(fourthBox, "E")
    expect(onChange).toHaveBeenCalledWith("abcE  ");
  })

  test("focus next box when value filled in current box", () => {
    render((
      <Passcode
        value="abc"
        onChange={()=>{}}
      />
    ));
    const fourthBox = screen.getByTestId("passcode-box-3")
    const fifthBox = screen.getByTestId("passcode-box-4")
    expect(fifthBox).not.toHaveFocus();
    userEvent.type(fourthBox, "E")
    expect(fifthBox).toHaveFocus();
  })

  test("remove focus when all boxes are filled", () => {
    render((
      <Passcode
        value="abcEF"
        onChange={()=>{}}
      />
    ));
    const firstBox = screen.getByTestId("passcode-box-0")
    const secondBox = screen.getByTestId("passcode-box-1")
    const thirdBox = screen.getByTestId("passcode-box-2")
    const fourthBox = screen.getByTestId("passcode-box-3")
    const fifthBox = screen.getByTestId("passcode-box-4")
    const sixthBox = screen.getByTestId("passcode-box-5")
    userEvent.type(sixthBox, "G")
    expect(firstBox).not.toHaveFocus();
    expect(secondBox).not.toHaveFocus();
    expect(thirdBox).not.toHaveFocus();
    expect(fourthBox).not.toHaveFocus();
    expect(fifthBox).not.toHaveFocus();
    expect(sixthBox).not.toHaveFocus();
  })

  test("focus next box when right arrow is pressed", () => {
    render((
      <Passcode
        value="abc"
        onChange={()=>{}}
      />
    ));
    const fourthBox = screen.getByTestId("passcode-box-3")
    const fifthBox = screen.getByTestId("passcode-box-4")
    expect(fifthBox).not.toHaveFocus();
    userEvent.type(fourthBox, "{arrowright}")
    expect(fifthBox).toHaveFocus();
  })

  test("focus previous box when left arrow is pressed", () => {
    render((
      <Passcode
        value="abc"
        onChange={()=>{}}
      />
    ));
    const secondBox = screen.getByTestId("passcode-box-1")
    const thirdBox = screen.getByTestId("passcode-box-2")
    expect(secondBox).not.toHaveFocus();
    userEvent.type(thirdBox, "{arrowleft}")
    expect(secondBox).toHaveFocus();
  })

  test("alternative action click", () => {
    const onClick = jest.fn()
    render((
      <Passcode
        value="abc"
        onChange={()=>{}}
        alternativeActionText="alternate action"
        onAlternativeActionClick={onClick}
      />
    ));
    const alternativeAction = screen.getByTestId("alternative-action")
    fireEvent.click(alternativeAction)
    expect(onClick).toHaveBeenCalled();
  })

  test("forgot password click", () => {
    const onClick = jest.fn()
    render((
      <Passcode
        value="abc"
        onChange={()=>{}}
        onForgotPasscodeClick={onClick}
      />
    ));
    const forgotPassword = screen.getByTestId("forgot-password")
    fireEvent.click(forgotPassword)
    expect(onClick).toHaveBeenCalled();
  })

  test("dot symbol click focuses passcode box", () => {
    const onClick = jest.fn()
    render((
      <Passcode
        value="abc"
        onChange={()=>{}}
        onForgotPasscodeClick={onClick}
      />
    ));
    const secondDotSymbol = screen.getByTestId("dot-1");
    const secondBox = screen.getByTestId("passcode-box-1")
    expect(secondBox).not.toHaveFocus();
    fireEvent.click(secondDotSymbol)
    expect(secondBox).toHaveFocus();
  })

  test("discard empty input values", () => {
    const onClick = jest.fn()
    render((
      <Passcode
        value="abc  G"
        onChange={()=>{}}
        onForgotPasscodeClick={onClick}
      />
    ));
    const fourthBox = screen.getByTestId("passcode-box-3")
    expect(fourthBox).toHaveValue("");
  })
})