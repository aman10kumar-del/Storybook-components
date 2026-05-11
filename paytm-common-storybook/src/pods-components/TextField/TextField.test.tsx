import React from "react";
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import TextField from "./TextField"
import {ReactComponent as InfoIconComponent} from "../../assets/img/infoFlexiColor.svg"

describe("Test TextField", () => {

  test("is present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"  
      />
    ));
    const card = screen.getByTestId("text-field-container")
    expect(card).toBeInTheDocument();
    const textField = screen.getByTestId("input-field")
    expect(textField).toBeInTheDocument();
  })

  test("defaults", () => {
    render((
      //@ts-ignore
      <TextField 
      />
    ));
    const card = screen.getByTestId("text-field-container")
    expect(card).toHaveClass("low")
  })

  test("value present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
      />
    ));
    const textField = screen.getByTestId("input-field")
    expect(textField).toHaveValue("123")
  })

  test("low emphasis", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
      />
    ));
    const card = screen.getByTestId("text-field-container")
    const inputField = screen.queryByTestId("input-field")
    expect(inputField).not.toBeDisabled()
    expect(card).toHaveClass("low")
  })

  test("disabled low emphasis", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        disabled={true}
      />
    ));
    const card = screen.getByTestId("text-field-container")
    const inputField = screen.queryByTestId("input-field")
    expect(card).toHaveClass("disabled")
    expect(inputField).toBeDisabled()
  })

  test("low: label present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
      />
    ));
    const label = screen.getByTestId("label")
    expect(label).toHaveTextContent("Label")
  })

  test("low: placeholder not present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
      />
    ));
    const inputField = screen.queryByTestId("input-field")
    expect(inputField).toHaveAttribute("placeholder", " ")
  })

  test("leading icon present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const leadingIcon = screen.getByTestId("leading-icon")
    expect(leadingIcon).toBeInTheDocument()
  })

  test("trailing icon present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        TrailingIcon={<InfoIconComponent />}
      />
    ));
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(trailingIcon).toBeInTheDocument()
  })

  test("leading icon & trailing icon present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        TrailingIcon={<InfoIconComponent />}
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const leadingIcon = screen.getByTestId("leading-icon")
    expect(leadingIcon).toBeInTheDocument()
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(trailingIcon).toBeInTheDocument()
  })

  test("trailing link present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        TrailingLink={<a>Link</a>}
      />
    ));
    const trailingLink = screen.getByTestId("trailing-link")
    expect(trailingLink).toBeInTheDocument()
  })

  test("trailing icon preferred over trailing link", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        TrailingIcon={<InfoIconComponent />}
        TrailingLink={<a>Link</a>}
      />
    ));
    const trailingLink = screen.queryByTestId("trailing-link")
    expect(trailingLink).toBeNull()
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(trailingIcon).toBeInTheDocument()
  })

  test("assistive text", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        TrailingIcon={<InfoIconComponent />}
        assistiveText="Assistive Text"
      />
    ));
    const assistiveText = screen.getByTestId("assistive-text")
    expect(assistiveText).toHaveTextContent("Assistive Text")
  })

  test("error text", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        TrailingIcon={<InfoIconComponent />}
        error="Error Text"
      />
    ));
    const error = screen.getByTestId("error")
    expect(error).toHaveTextContent("Error Text")
  })

  test("error text preferred over assistive text", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        TrailingIcon={<InfoIconComponent />}
        assistiveText="Assistive Text"
        error="Error Text"
      />
    ));
    const assistiveText = screen.queryByTestId("assistive-text")
    expect(assistiveText).toBeNull();
    const error = screen.getByTestId("error")
    expect(error).toHaveTextContent("Error Text")
  })

  test("high emphasis", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="high"
      />
    ));
    const card = screen.getByTestId("text-field-container")
    const inputField = screen.queryByTestId("input-field")
    expect(card).toHaveClass("high")
    expect(inputField).not.toBeDisabled()
  })

  test("disabled high emphasis", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="high"
        disabled={true}
      />
    ));

    const card = screen.getByTestId("text-field-container")
    const inputField = screen.queryByTestId("input-field")
    expect(card).toHaveClass("disabled")
    expect(inputField).toBeDisabled()
  })

  test("on-change", () => {
    const onChange = jest.fn();
    render((
      <TextField 
        value=""
        label="Label"
        onChange={onChange}
        emphasis="high"
      />
    ));
    const inputField = screen.getByTestId("input-field")
    userEvent.type(inputField, "1")
    expect(onChange).toHaveBeenCalledWith("1");
  })

  test("custom class is applied", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        customClass="custom-class"
      />
    ));
    const container = screen.getByTestId("text-field-container")
    expect(container).toHaveClass("custom-class")
  })

  test("input props are passed through", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        inputProps={{
          maxLength: 10,
          id: "custom-id",
          "data-custom": "test"
        }}
      />
    ));
    const inputField = screen.getByTestId("input-field")
    expect(inputField).toHaveAttribute("maxLength", "10")
    expect(inputField).toHaveAttribute("id", "custom-id")
    expect(inputField).toHaveAttribute("data-custom", "test")
  })

  test("handles empty value", () => {
    render((
      <TextField 
        value=""
        label="Label"
        onChange={() => {}}
        emphasis="low"
      />
    ));
    const inputContainer = screen.getByTestId("input-field").parentElement
    expect(inputContainer).toHaveClass("inputEmpty")
  })

  test("handles undefined value", () => {
    render((
      <TextField 
        //@ts-ignore - testing undefined value
        value={undefined}
        label="Label"
        onChange={() => {}}
        emphasis="low"
      />
    ));
    const inputField = screen.getByTestId("input-field")
    expect(inputField).toHaveValue("")
  })

  test("handles empty label", () => {
    render((
      <TextField 
        value="123"
        label=""
        onChange={() => {}}
        emphasis="low"
      />
    ));
    const label = screen.getByTestId("label")
    expect(label).toHaveTextContent("")
  })

  test("aria attributes are correctly set", () => {
    render((
      <TextField 
        value="123"
        label="Test Label"
        onChange={() => {}}
        emphasis="low"
        disabled={true}
      />
    ));
    const inputField = screen.getByTestId("input-field")
    const label = screen.getByTestId("label")
    
    expect(inputField).toHaveAttribute("aria-label", "Test Label")
    expect(label).toHaveAttribute("aria-disabled", "true")
  })

  test("error state applies correct classes", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        error="Error message"
      />
    ));
    const container = screen.getByTestId("text-field-container")
    expect(container).toHaveClass("error")
    const errorSection = screen.getByRole("note")
    expect(errorSection).toHaveClass("infoSection")
  })

  test("input section has correct icon classes", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        LeadingIcon={<InfoIconComponent />}
        TrailingIcon={<InfoIconComponent />}
      />
    ));
    const inputSection = screen.getByTestId("input-field").closest("section")
    expect(inputSection).toHaveClass("hasLeadingIcon")
    expect(inputSection).toHaveClass("hasTrailingIcon")
  })

  test("trailing link is not rendered when trailing icon is present", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
        TrailingIcon={<InfoIconComponent />}
        TrailingLink={<a href="#">Link</a>}
      />
    ));
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(trailingIcon).toBeInTheDocument()
    expect(screen.queryByTestId("trailing-link")).not.toBeInTheDocument()
  })

  test("info section is not rendered without error or assistive text", () => {
    render((
      <TextField 
        value="123"
        label="Label"
        onChange={() => {}}
        emphasis="low"
      />
    ));
    expect(screen.queryByRole("note")).not.toBeInTheDocument()
  })

})