import React from "react";
import {render, screen, fireEvent, act} from "@testing-library/react"

import Button from "./Button"
import {ReactComponent as InfoIconComponent} from "../../assets/img/info.svg"

jest.useFakeTimers();

describe("Test Button", () => {

  test("label present", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="large"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Label")
  })

  test("leading icon present", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="large"
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const leadingIcon = screen.getByTestId("leading-icon")
    expect(leadingIcon).toBeInTheDocument();
  })

  test("trailing icon present", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="large"
        TrailingIcon={<InfoIconComponent />}
      />
    ));
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(trailingIcon).toBeInTheDocument();
  })

  test("onClick triggered", () => {
    const onClick = jest.fn();
    render((
      <Button
        label="Label"
        type="filled"
        size="large"
        TrailingIcon={<InfoIconComponent />}
        onClick={onClick}
      />
    ));
    act(() => {
      fireEvent.click(screen.getByTestId("button"));
      jest.runAllTimers();
    });
    expect(onClick).toHaveBeenCalled();
  })

  test('icon only - with trailing icon', () => {
    const onClick = jest.fn();
    const {getByTestId} = render((
      <Button
        type="filled"
        size="small"
        TrailingIcon={<InfoIconComponent />}
        onClick={onClick}
      />
    ));
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(trailingIcon).toBeInTheDocument();
  })

  test('icon only - with leading icon', () => {
    const onClick = jest.fn();
    render((
      <Button
        type="filled"
        size="small"
        LeadingIcon={<InfoIconComponent />}
        onClick={onClick}
      />
    ));
    const leadingIcon = screen.getByTestId("leading-icon")
    expect(leadingIcon).toBeInTheDocument();
  })

  test('disabled', () => {
    const onClick = jest.fn();
    render((
      <Button
        type="filled"
        size="small"
        LeadingIcon={<InfoIconComponent />}
        onClick={onClick}
        disabled={true}
        label="Label"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveAttribute("disabled")
  })

  test("large button", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="large"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("large")
  })

  test("medium button", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="medium"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("medium")
  })

  test("small button", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="small"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("small")
  })

  test("Filled button", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="large"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("filled")
  })

  test("Stroke button", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="stroke"
        size="large"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("stroke")
  })

  test("Tonal button", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="tonal"
        size="large"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("tonal")
  })

  test("Link button", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="link"
        size="large"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("link")
  })

  test("custom class applied", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="large"
        customClass="custom-class"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("custom-class")
  })

  test("both leading and trailing icons", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="large"
        LeadingIcon={<InfoIconComponent />}
        TrailingIcon={<InfoIconComponent />}
      />
    ));
    const leadingIcon = screen.queryByTestId("leading-icon")
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(leadingIcon).toBeNull()
    expect(trailingIcon).toBeInTheDocument()
  })

  test("withIcon class when icons present", () => {
    render((
      <Button
        label="Label"
        onClick={() => {}}
        type="filled"
        size="large"
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("withIcon")
  })

  test("aria-label with text label", () => {
    render((
      <Button
        label="Test Label"
        onClick={() => {}}
        type="filled"
        size="large"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveAttribute("aria-label", "Test Label")
  })

  test("aria-label with icon only", () => {
    render((
      <Button
        type="filled"
        size="large"
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveAttribute("aria-label", "button")
  })

  test("click handler not called when disabled", () => {
    const onClick = jest.fn();
    render((
      <Button
        label="Label"
        type="filled"
        size="large"
        onClick={onClick}
        disabled={true}
      />
    ));
    act(() => {
      fireEvent.click(screen.getByTestId("button"));
      jest.runAllTimers();
    });
    expect(onClick).not.toHaveBeenCalled();
  })

  test("renders without onClick handler", () => {
    render((
      <Button
        label="Label"
        type="filled"
        size="large"
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toBeInTheDocument()
  })

  test("icon-only button size classes", () => {
    render((
      <Button
        type="filled"
        size="small"
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("small")
    expect(button).toHaveClass("iconOnly")
  })

  test("renders with default props", () => {
    render(<Button />);
    const button = screen.getByTestId("button")
    expect(button).toHaveClass("filled")
    expect(button).toHaveClass("large")
  })
})