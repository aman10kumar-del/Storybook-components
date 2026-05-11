import React from "react";
import {fireEvent, render, screen} from "@testing-library/react"

import Checkbox from "./Checkbox"

describe("Test Checkbox", () => {

  test("is present", () => {
    render((
      <Checkbox 
        checked="true"
        onChange={() => {}}
        id=""
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).toBeInTheDocument();
  })

  test("default", () => {
    render((
      //@ts-ignore
      <Checkbox 
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).toBeInTheDocument();
    const unCheckedIcon = screen.getByTestId("status-off")
    expect(unCheckedIcon).toBeInTheDocument()
    const labelText = screen.getByTestId("label-text")
    expect(labelText).toHaveTextContent("");
  })

  test("label present", () => {
    render((
      <Checkbox 
        checked="true"
        onChange={() => {}}
        id=""
        label="Label"
      />
    ));
    const labelText = screen.getByTestId("label-text")
    expect(labelText).toHaveTextContent("Label");
  })

  test("checked", () => {
    render((
      <Checkbox 
        checked="true"
        onChange={() => {}}
        id=""
        label="Label"
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).toHaveClass("checked")
    const checkedIcon = screen.getByTestId("status-on")
    expect(checkedIcon).toBeInTheDocument()
  })

  test("unchecked", () => {
    render((
      <Checkbox 
        checked="false"
        onChange={() => {}}
        id=""
        label="Label"
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).toHaveClass("unchecked")
    const unCheckedIcon = screen.getByTestId("status-off")
    expect(unCheckedIcon).toBeInTheDocument()
  })

  test("indeterminate", () => {
    render((
      <Checkbox 
        checked="indeterminate"
        onChange={() => {}}
        id=""
        label="Label"
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).toHaveClass("indeterminate")
    const indeterminateIcon = screen.getByTestId("status-indeterminate")
    expect(indeterminateIcon).toBeInTheDocument()
  })

  test("onChange triggered - ON to OFF", () => {
    const onChange = jest.fn();
    render((
      <Checkbox 
        checked="true"
        onChange={onChange}
        id=""
        label="Label"
      />
    ));
    const label = screen.getByTestId("checkbox-label")
    fireEvent.click(label)
    expect(onChange).toHaveBeenCalledWith("false")
  })
  
  test("onChange triggered - OFF to ON", () => {
    const onChange = jest.fn();
    render((
      <Checkbox 
        checked="false"
        onChange={onChange}
        id=""
        label="Label"
      />
    ));
    const label = screen.getByTestId("checkbox-label")
    fireEvent.click(label)
    expect(onChange).toHaveBeenCalledWith("true")
  })

  test("disabled", () => {
    render((
      <Checkbox 
        checked="false"
        onChange={() => {}}
        id=""
        label="Label"
        disabled
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).toHaveClass("disabled")
  })
  
  test("block layout be default", () => {
    render((
      <Checkbox 
        checked="false"
        onChange={() => {}}
        id=""
        label="Label"
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).not.toHaveClass("inline")
  })

  test("explicit block layout", () => {
    render((
      <Checkbox 
        checked="false"
        onChange={() => {}}
        id=""
        label="Label"
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).not.toHaveClass("inline")
  })

  test("inline layout", () => {
    render((
      <Checkbox 
        checked="false"
        onChange={() => {}}
        id=""
        label="Label"
        layout="inline"
      />
    ));
    const checkboxContainer = screen.getByTestId("checkbox-container")
    expect(checkboxContainer).toHaveClass("inline")
  })

  test("high emphasis by default", () => {
    render((
      <Checkbox 
        checked="false"
        onChange={() => {}}
        id=""
        label="Label"
      />
    ));
    const labelText = screen.getByTestId("label-text")
    expect(labelText).not.toHaveClass("low")
  })
  
  test("explicit high emphasis", () => {
    render((
      <Checkbox 
        checked="false"
        onChange={() => {}}
        id=""
        label="Label"
        emphasis="high"
      />
    ));
    const labelText = screen.getByTestId("label-text")
    expect(labelText).not.toHaveClass("low")
  })

  test("low emphasis", () => {
    render((
      <Checkbox 
        checked="false"
        onChange={() => {}}
        id=""
        label="Label"
        emphasis="low"
      />
    ));
    const labelText = screen.getByTestId("label-text")
    expect(labelText).toHaveClass("low")
  })
})