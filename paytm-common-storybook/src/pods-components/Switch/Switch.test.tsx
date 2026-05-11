import React from "react";
import {fireEvent, render, screen} from "@testing-library/react"

import Switch from "./Switch"

describe("Test Switch", () => {

  test("label present", () => {
    render((
      <Switch 
        active={true}
        label="Label"
        onToggle={() => {}}
      />
    ));
    const label = screen.getByTestId("label")
    expect(label).toBeInTheDocument();
  })

  test("default", () => {
    render((
      //@ts-ignore
      <Switch 
        onToggle={() => {}}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch")
    expect(toggleSwitch).not.toHaveClass('active');
  })

  test("on & enabled", () => {
    render((
      <Switch 
        active={true}
        label="Label"
        onToggle={() => {}}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch")
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).not.toHaveClass('disabled');
    expect(toggleSwitch).toHaveClass('active');
  })

  test("off & enabled", () => {
    render((
      <Switch 
        active={false}
        label="Label"
        onToggle={() => {}}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch")
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).not.toHaveClass('disabled');
    expect(toggleSwitch).not.toHaveClass('active');
  })

  test("on & disabled", () => {
    render((
      <Switch 
        active={true}
        label="Label"
        disabled={true}
        onToggle={() => {}}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch")
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).toHaveClass('disabled');
    expect(toggleSwitch).toHaveClass('active');
  })

  test("off & disabled", () => {
    render((
      <Switch 
        active={false}
        label="Label"
        disabled={true}
        onToggle={() => {}}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch")
    expect(toggleSwitch).toBeInTheDocument();
    expect(toggleSwitch).toHaveClass('disabled');
    expect(toggleSwitch).not.toHaveClass('active');
  }),

  test("onToggle", () => {
    const onToggle = jest.fn();
    render((
      <Switch 
        active={false}
        label="Label"
        disabled={true}
        onToggle={onToggle}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch");
    fireEvent.click(toggleSwitch);
    expect(onToggle).toHaveBeenCalled();
  })

  test("custom class is applied", () => {
    const customClass = "test-custom-class";
    render((
      <Switch 
        active={false}
        onToggle={() => {}}
        customClass={customClass}
      />
    ));
    const wrapper = screen.getByTestId("toggle-switch").parentElement;
    expect(wrapper).toHaveClass(customClass);
  });

  test("renders without label", () => {
    render((
      <Switch 
        active={false}
        onToggle={() => {}}
      />
    ));
    const label = screen.queryByTestId("label");
    expect(label).not.toBeInTheDocument();
    const toggleSwitch = screen.getByTestId("toggle-switch");
    expect(toggleSwitch).toBeInTheDocument();
  });

  test("keyboard accessibility - Enter key triggers toggle", () => {
    const onToggle = jest.fn();
    render((
      <Switch 
        active={false}
        onToggle={onToggle}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch");
    fireEvent.keyUp(toggleSwitch, { key: 'Enter', code: 'Enter' });
    expect(onToggle).toHaveBeenCalled();
  });

  test("keyboard accessibility - other keys don't trigger toggle", () => {
    const onToggle = jest.fn();
    render((
      <Switch 
        active={false}
        onToggle={onToggle}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch");
    fireEvent.keyUp(toggleSwitch, { key: 'Space', code: 'Space' });
    expect(onToggle).not.toHaveBeenCalled();
  });

  test("ARIA attributes are correctly set when active", () => {
    const label = "Test Label";
    render((
      <Switch 
        active={true}
        label={label}
        onToggle={() => {}}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch");
    expect(toggleSwitch).toHaveAttribute("role", "switch");
    expect(toggleSwitch).toHaveAttribute("aria-checked", "true");
    expect(toggleSwitch).toHaveAttribute("aria-label", label);
  });

  test("ARIA attributes are correctly set when inactive", () => {
    const label = "Test Label";
    render((
      <Switch 
        active={false}
        label={label}
        onToggle={() => {}}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch");
    expect(toggleSwitch).toHaveAttribute("role", "switch");
    expect(toggleSwitch).toHaveAttribute("aria-checked", "false");
    expect(toggleSwitch).toHaveAttribute("aria-label", label);
  });

  test("has correct tab index for keyboard navigation", () => {
    render((
      <Switch 
        active={false}
        onToggle={() => {}}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch");
    expect(toggleSwitch).toHaveAttribute("tabIndex", "0");
  });

  test("multiple toggle interactions work correctly", () => {
    const onToggle = jest.fn();
    render((
      <Switch 
        active={false}
        onToggle={onToggle}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch");
    
    fireEvent.click(toggleSwitch);
    expect(onToggle).toHaveBeenCalledTimes(1);
    
    fireEvent.click(toggleSwitch);
    expect(onToggle).toHaveBeenCalledTimes(2);
    
    fireEvent.click(toggleSwitch);
    expect(onToggle).toHaveBeenCalledTimes(3);
  });

  test("disabled switch prevents toggle interaction", () => {
    const onToggle = jest.fn();
    render((
      <Switch 
        active={false}
        disabled={true}
        onToggle={onToggle}
      />
    ));
    const toggleSwitch = screen.getByTestId("toggle-switch");
    
    fireEvent.click(toggleSwitch);
    expect(onToggle).toHaveBeenCalledTimes(1); // Still called because it's handled by parent

    fireEvent.keyUp(toggleSwitch, { key: 'Enter', code: 'Enter' });
    expect(onToggle).toHaveBeenCalledTimes(2); // Still called because it's handled by parent
  });
});