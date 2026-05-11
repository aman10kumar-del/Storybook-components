import React from "react";
import {render, screen, fireEvent, act} from "@testing-library/react"

import FAB from "./FAB"
import { ReactComponent as InfoIconComponent } from '../../assets/img/infoFlexiColor.svg';

jest.useFakeTimers();

const mockButton = {
  Icon: <InfoIconComponent />,
  label: "Label 1",
  onClick: () => {}
}

describe("Test FAB", () => {
  test("default", () => {
    render((
      // @ts-ignore
      <FAB
      />
    ));
    const fabSingleContainer = screen.getByTestId("fab-single-container")
    expect(fabSingleContainer).toBeInTheDocument();
  })

  test("fab-single: present", () => {
    render((
      <FAB
        {...mockButton}
      />
    ));
    const fabSingleContainer = screen.getByTestId("fab-single-container")
    expect(fabSingleContainer).toBeInTheDocument();
  })

  test("fab-single: standard", () => {
    render((
      <FAB
        Icon={mockButton.Icon}
        onClick={() => {}}
      />
    ));
    const label = screen.queryByTestId("label")
    expect(label).toBeNull();
  })

  test("fab-single: onclick called", () => {
    const onClick = jest.fn();
    render((
      <FAB
        {...mockButton}
        onClick={onClick}
      />
    ));
    const fab = screen.getByTestId("fab-button")
    act(() => {
      fireEvent.click(fab);
      jest.runAllTimers();
    })
    expect(onClick).toHaveBeenCalled();
  })

  test("custom class is applied correctly", () => {
    const customClass = "test-custom-class";
    render((
      <FAB
        {...mockButton}
        customClass={customClass}
      />
    ));
    const container = screen.getByTestId("fab-container");
    expect(container.className).toContain(customClass);
  })

  test("icon is rendered correctly", () => {
    render((
      <FAB
        {...mockButton}
      />
    ));
    const iconContainer = screen.getByTestId("fab-button").querySelector('.icon');
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer?.firstChild).toBeInstanceOf(SVGElement);
  })

  test("label is rendered when provided", () => {
    const testLabel = "Test Label";
    render((
      <FAB
        {...mockButton}
        label={testLabel}
      />
    ));
    const label = screen.getByTestId("label");
    expect(label).toBeInTheDocument();
    expect(label.textContent).toBe(testLabel);
  })

  test("accessibility attributes are present", () => {
    render((
      <FAB
        {...mockButton}
      />
    ));
    const fabButton = screen.getByTestId("fab-button");
    expect(fabButton).toHaveAttribute("role", "button");
    expect(fabButton).toHaveAttribute("tabIndex", "0");
  })

  test("ripple effect timing", () => {
    jest.useFakeTimers();
    const onClick = jest.fn();
    render((
      <FAB
        {...mockButton}
        onClick={onClick}
      />
    ));
    const fab = screen.getByTestId("fab-button");
    
    act(() => {
      fireEvent.click(fab);
    });
    
    expect(onClick).toHaveBeenCalledTimes(1);
    
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    // After 300ms, ripple effect should be gone
    expect(fab.className).not.toContain("ripple");
  })

  test("component structure with all props", () => {
    render((
      <FAB
        {...mockButton}
        customClass="test-class"
      />
    ));
    
    const container = screen.getByTestId("fab-container");
    const singleContainer = screen.getByTestId("fab-single-container");
    const fabButton = screen.getByTestId("fab-button");
    const label = screen.getByTestId("label");
    
    expect(container).toBeInTheDocument();
    expect(singleContainer).toBeInTheDocument();
    expect(fabButton).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(container.contains(singleContainer)).toBeTruthy();
    expect(singleContainer.contains(fabButton)).toBeTruthy();
    expect(fabButton.contains(label)).toBeTruthy();
  })
})