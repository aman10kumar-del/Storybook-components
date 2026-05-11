import React from "react";
import {render, screen} from "@testing-library/react"

import Snackbar from "./Snackbar"
import {ReactComponent as InfoIconComponent} from "../../assets/img/infoFlexiColor.svg"
import { act } from "react-dom/test-utils";

jest.useFakeTimers();

describe("Test Snackbar", () => {
  test("is present", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toBeInTheDocument();
  })

  test("default", () => {
    render((
      //@ts-ignore
      <Snackbar 
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("positive")
  })

  test("text present", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
      />
    ));
    const label = screen.getByTestId("label")
    expect(label).toHaveTextContent("text")
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("hide")
  })

  test("icon present", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
        TrailingIcon={<InfoIconComponent />}
      />
    ));
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(trailingIcon).toBeInTheDocument();
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("hide")
  })

  test("positive", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("positive")
  })

  test("negative", () => {
    render((
      <Snackbar 
        text="text"
        context="negative"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("negative")
  })

  test("notice", () => {
    render((
      <Snackbar 
        text="text"
        context="notice"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("notice")
  })

  test("neutral", () => {
    render((
      <Snackbar 
        text="text"
        context="neutral"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("neutral")
  })

  test("hides after default interval", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
        autoHide
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("hide")
    act(() => {jest.runAllTimers()});
    expect(snackbar).toHaveClass("hide")
  })

  test("onHide gets triggered", () => {
    const onHide = jest.fn();
    render((
      <Snackbar 
        text="text"
        context="positive"
        autoHide
        onHide={onHide}
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("hide")
    act(() => {jest.runAllTimers()});
    expect(snackbar).toHaveClass("hide")
    expect(onHide).toHaveBeenCalled();
  })

  test("reserve space for status bar", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
        reserveSpaceForStatusBar
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("extraPaddingTop")
  })

  test("clamped by default", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
        reserveSpaceForStatusBar
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("clamp")
  })

  test("no clamp", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
        reserveSpaceForStatusBar
        noClamp
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("clamp")
  })

  test("fixed by default", () => {
    render((
      <Snackbar 
        text="text"
        context="neutral"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("floating")
  })

  test("explicit fixed", () => {
    render((
      <Snackbar 
        text="text"
        context="neutral"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("floating")
  })

  test("floating", () => {
    render((
      <Snackbar 
        text="text"
        context="neutral"
        position="floating"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("floating")
  })

  test("floating will cause alignment from left", () => {
    render((
      <Snackbar 
        text="text"
        context="neutral"
        position="floating"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("leftAlign")
  })

  test("action will cause alignment from left", () => {
    render((
      <Snackbar 
        text="text"
        context="neutral"
        actionButton={{
          label: "Label",
          onClick: () => {}
        }}
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("leftAlign")
  })

  test("leading icon is rendered", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const leadingIcon = screen.getByTestId("leading-icon")
    expect(leadingIcon).toBeInTheDocument();
  })

  test("trailing icon is not rendered when leading icon is present", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
        LeadingIcon={<InfoIconComponent />}
        TrailingIcon={<InfoIconComponent />}
      />
    ));
    const icons = screen.getAllByTestId(/icon/i)
    expect(icons).toHaveLength(1)
  })

  test("custom class is applied", () => {
    const customClass = "custom-class"
    render((
      <Snackbar 
        text="text"
        context="positive"
        customClass={customClass}
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass(customClass)
  })

  test("reserve space for bottom bar", () => {
    render((
      <Snackbar 
        text="text"
        context="positive"
        reserveSpaceForBottomBar
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("extraMarginBottom")
  })

  test("action button is rendered with correct props", () => {
    const onClick = jest.fn()
    render((
      <Snackbar 
        text="text"
        context="positive"
        actionButton={{
          label: "Action",
          onClick
        }}
      />
    ));
    const button = screen.getByText("Action")
    expect(button).toBeInTheDocument()
    expect(button.closest("button")).toHaveClass("stroke")
  })

  test("brand context is applied", () => {
    render((
      <Snackbar 
        text="text"
        context="brand"
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).toHaveClass("brand")
  })

  test("custom auto hide duration", () => {
    const onHide = jest.fn();
    render((
      <Snackbar 
        text="text"
        context="positive"
        autoHide
        autoHideAfter={2000}
        onHide={onHide}
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("hide")
    act(() => {jest.advanceTimersByTime(1000)});
    expect(snackbar).not.toHaveClass("hide")
    act(() => {jest.advanceTimersByTime(1000)});
    expect(snackbar).toHaveClass("hide")
    expect(onHide).toHaveBeenCalled();
  })

  test("empty text hides snackbar and triggers onHide", () => {
    const onHide = jest.fn();
    const { rerender } = render((
      <Snackbar 
        text="text"
        context="positive"
        onHide={onHide}
      />
    ));
    const snackbar = screen.getByTestId("snackbar-container")
    expect(snackbar).not.toHaveClass("hide")
    
    rerender((
      <Snackbar 
        text=""
        context="positive"
        onHide={onHide}
      />
    ));
    expect(snackbar).toHaveClass("hide")
    expect(onHide).toHaveBeenCalled();
  })
})