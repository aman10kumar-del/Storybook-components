import React from "react";
import {render, screen, fireEvent} from "@testing-library/react"

import RadioButton from "./RadioButton"

describe("Test RadioButton", () => {

  test("label present", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const label = screen.getByTestId("radio-label")
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent("label")
  })

  test("default", () => {
    render((
      // @ts-ignore
      <RadioButton
        onChecked={() => {}}
      />
    ));
    const radioButton = screen.getByTestId("radio-input")
    expect(radioButton).not.toHaveAttribute("checked")
  })

  test("checked", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const radioButton = screen.getByTestId("radio-input")
    expect(radioButton).toHaveAttribute("checked")
  })

  test("unchecked", () => {
    render((
      <RadioButton
        checked={false}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const radioButton = screen.getByTestId("radio-input")
    expect(radioButton).not.toHaveAttribute("checked")
  })

  test("disabled", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        disabled={true}
        onChecked={() => {}}
      />
    ));
    const radioButton = screen.getByTestId("radio-input")
    expect(radioButton).toHaveAttribute("disabled")
  })

  test("onChange triggered", () => {
    const onChange = jest.fn()
    render((
      <RadioButton
        checked={false}
        label="label"
        name="name"
        value="value"
        disabled={true}
        onChecked={onChange}
      />
    ));
    fireEvent.click(screen.getByTestId("radio-input"));
    expect(onChange).toHaveBeenCalled();
  })

  test("high emphasis by default", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const radioLabel = screen.getByTestId("radio-label")
    expect(radioLabel).not.toHaveClass("low")
  })

  test("explicit high emphasis", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
        emphasis="high"
      />
    ));
    const radioLabel = screen.getByTestId("radio-label")
    expect(radioLabel).not.toHaveClass("low")
  })

  test("low emphasis", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
        emphasis="low"
      />
    ));
    const radioLabel = screen.getByTestId("radio-label")
    expect(radioLabel).toHaveClass("low")
  })

  test("block layout by default", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const radioContainer = screen.getByTestId("radio-container")
    expect(radioContainer).not.toHaveClass("inline")
  })

  test("explicit block layout", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
        layout="block"
      />
    ));
    const radioContainer = screen.getByTestId("radio-container")
    expect(radioContainer).not.toHaveClass("inline")
  })

  test("inline layout", () => {
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
        layout="inline"
      />
    ));
    const radioContainer = screen.getByTestId("radio-container")
    expect(radioContainer).toHaveClass("inline")
  })

  test("custom class is applied", () => {
    const customClass = "custom-class"
    render((
      <RadioButton
        checked={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
        customClass={customClass}
      />
    ));
    const radioContainer = screen.getByTestId("radio-container")
    expect(radioContainer).toHaveClass(customClass)
  })

  test("ReactElement as label", () => {
    const labelElement = <span data-testid="custom-label">Custom Label</span>
    render((
      <RadioButton
        checked={true}
        label={labelElement}
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const customLabel = screen.getByTestId("custom-label")
    expect(customLabel).toBeInTheDocument()
    expect(customLabel).toHaveTextContent("Custom Label")
  })

  test("click propagation is prevented", () => {
    const parentClick = jest.fn()
    render(
      <div onClick={parentClick}>
        <RadioButton
          checked={true}
          label="label"
          name="name"
          value="value"
          onChecked={() => {}}
        />
      </div>
    );
    fireEvent.click(screen.getByTestId("radio-input"))
    expect(parentClick).not.toHaveBeenCalled()
  })

  test("ARIA attributes are correctly set when checked", () => {
    render((
      <RadioButton
        checked={true}
        label="test label"
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const ariaElement = screen.getByTestId("radio-span")
    expect(ariaElement).toHaveAttribute("aria-checked", "true")
    expect(ariaElement).toHaveAttribute("aria-label", "test label")
  })

  test("ARIA attributes with ReactElement label", () => {
    const labelElement = <span>Custom Label</span>
    render((
      <RadioButton
        checked={false}
        label={labelElement}
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const ariaElement = screen.getByTestId("radio-span")
    expect(ariaElement).toHaveAttribute("aria-checked", "false")
    expect(ariaElement).toHaveAttribute("aria-label", "radio label")
  })

  test("name and value attributes are correctly set", () => {
    const testName = "test-name"
    const testValue = "test-value"
    render((
      <RadioButton
        checked={true}
        label="label"
        name={testName}
        value={testValue}
        onChecked={() => {}}
      />
    ));
    const radioInput = screen.getByTestId("radio-input")
    expect(radioInput).toHaveAttribute("name", testName)
    expect(radioInput).toHaveAttribute("value", testValue)
    expect(radioInput).toHaveAttribute("id", testValue)
  })

  test("empty label handling", () => {
    render((
      <RadioButton
        checked={true}
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const label = screen.getByTestId("radio-label")
    expect(label).toHaveTextContent("")
  })

  test("disabled and checked combination", () => {
    render((
      <RadioButton
        checked={true}
        disabled={true}
        label="label"
        name="name"
        value="value"
        onChecked={() => {}}
      />
    ));
    const radioInput = screen.getByTestId("radio-input")
    expect(radioInput).toHaveAttribute("disabled")
    expect(radioInput).toHaveAttribute("checked")
  })
})