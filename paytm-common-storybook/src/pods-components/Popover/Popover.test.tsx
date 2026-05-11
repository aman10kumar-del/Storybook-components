import React from "react";
import {fireEvent, render, screen} from "@testing-library/react"

import Popover from "./Popover"

describe("Test Popover", () => {

  test("is present", () => {
    render((
      <Popover
        caretPosition="top-leading"
        content="Content"
      >
        <button>Open</button>
      </Popover>
    ));
    const container = screen.getByTestId("popover-container")
    expect(container).toBeInTheDocument();
  })

  test("default", () => {
    render((
      //@ts-ignore
      <Popover
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--state-closed", "szh-menu--dir-top")
  })

  test("content present", () => {
    render((
      <Popover
        caretPosition="top-leading"
        content="Content"
      >
        <button>Open</button>
      </Popover>
    ));
    const content = screen.getByTestId("popover").getElementsByClassName("szh-menu__item")[0]
    expect(content).toHaveTextContent("Content");
  })

  test("initially not open", () => {
    render((
      <Popover
        caretPosition="top-leading"
        content="Content"
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--state-closed")
  })

  test("clicking on child opens popover", () => {
    render((
      <Popover
        caretPosition="top-leading"
        content="Content"
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--state-closed")
    const triggerContainer = screen.getByTestId("trigger-container")
    fireEvent.click(triggerContainer)
    expect(popover).toHaveClass("szh-menu--state-opening")
    fireEvent.animationEnd(popover)
    expect(popover).toHaveClass("szh-menu--state-open")
  })

  test("once open, a blur event closes popover", () => {
    render((
      <Popover
        caretPosition="top-leading"
        content="Content"
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--state-closed")
    const triggerContainer = screen.getByTestId("trigger-container")
    fireEvent.click(triggerContainer)
    expect(popover).toHaveClass("szh-menu--state-opening")
    fireEvent.animationEnd(popover)
    expect(popover).toHaveClass("szh-menu--state-open")
   
    fireEvent.blur(screen.getByTestId("popover"))

    expect(popover).toHaveClass("szh-menu--state-closing")
    fireEvent.animationEnd(popover)
    expect(popover).toHaveClass("szh-menu--state-closed")
  })

  test("open by default", () => {
    render((
      <Popover
        caretPosition="top-leading"
        content="Content"
        initialOpen={true}
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--state-opening")
    fireEvent.animationEnd(popover)
    expect(popover).toHaveClass("szh-menu--state-open")
  })

  test("caret at top-left", () => {
    render((
      <Popover
        caretPosition="top-leading"
        content="Content"
        initialOpen={true}
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--dir-bottom")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at top-right", () => {
    render((
      <Popover
        caretPosition="top-trailing"
        content="Content"
        initialOpen={true}
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--dir-bottom")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at top-center", () => {
    render((
      <Popover
        caretPosition="top-center"
        content="Content"
        initialOpen={true}
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--dir-bottom")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at bottom-center", () => {
    render((
      <Popover
        caretPosition="bottom-center"
        content="Content"
        initialOpen={true}
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--dir-top")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at bottom-left", () => {
    render((
      <Popover
        caretPosition="bottom-leading"
        content="Content"
        initialOpen={true}
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--dir-top")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at bottom-right", () => {
    render((
      <Popover
        caretPosition="bottom-trailing"
        content="Content"
        initialOpen={true}
      >
        <button>Open</button>
      </Popover>
    ));
    const popover = screen.getByTestId("popover").getElementsByClassName("szh-menu")[0]
    expect(popover).toHaveClass("szh-menu--dir-top")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("empty child returns null", () => {
    render((
      //@ts-ignore
      <Popover
        caretPosition="bottom-trailing"
        content="Content"
        initialOpen={true}
      >
      </Popover>
    ));
    const container = screen.queryByTestId("popover-container")
    expect(container).toBeNull();
  })

})