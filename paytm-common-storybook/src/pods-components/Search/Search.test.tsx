import React from "react";
import {fireEvent, render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Search from "./Search"

jest.useFakeTimers();

describe("Test Search", () => {

  test("is present", () => {
    render((
      <Search 
        onChange={() => {}}
        onClear={() => {}}
      />
    ));
    const searchContainer = screen.getByTestId("search-container")
    expect(searchContainer).toBeInTheDocument();
  })

  test("onChange", () => {
    const onChange = jest.fn();
    render((
      <Search 
        onChange={onChange}
        onClear={() => {}}
      />
    ));
    const searchField = screen.getByTestId("search-field")
    userEvent.type(searchField, "Paytm")
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalledWith("Paytm")
  })

  test("onClear", () => {
    const onClear = jest.fn();
    render((
      <Search 
        onChange={() => {}}
        onClear={onClear}
      />
    ));
    const clearIcon = screen.getByTestId("clear-icon")
    fireEvent.mouseDown(clearIcon)
    expect(onClear).toHaveBeenCalled();
  })

  test("trailing icon present", () => {
    render((
      <Search 
        onChange={() => {}}
        onClear={() => {}}
        TrailingIcon={<span></span>}
      />
    ));
    const trailingIcon = screen.getByTestId("trailing-icon")
    expect(trailingIcon).toBeInTheDocument
  })

  // Default Props Tests
  test("renders with default props", () => {
    render(<Search onChange={() => {}} onClear={() => {}} />);
    const input = screen.getByTestId("search-field");
    expect(input).toHaveAttribute("placeholder", "Search");
    expect(input).toHaveAttribute("inputMode", "text");
  });

  // Custom Props Tests
  test("renders with custom label", () => {
    render(<Search onChange={() => {}} onClear={() => {}} label="Custom Search" />);
    const input = screen.getByTestId("search-field");
    expect(input).toHaveAttribute("placeholder", "Custom Search");
  });

  test("applies custom debounce interval", () => {
    const onChange = jest.fn();
    render(<Search onChange={onChange} onClear={() => {}} debounceInterval={500} />);
    const input = screen.getByTestId("search-field");
    userEvent.type(input, "test");
    jest.advanceTimersByTime(200);
    expect(onChange).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);
    expect(onChange).toHaveBeenCalledWith("test");
  });

  test("applies custom input props", () => {
    render(
      <Search 
        onChange={() => {}} 
        onClear={() => {}} 
        inputProps={{ maxLength: 10, "aria-label": "test" }}
      />
    );
    const input = screen.getByTestId("search-field");
    expect(input).toHaveAttribute("maxLength", "10");
    expect(input).toHaveAttribute("aria-label", "test");
  });

  test("renders with custom leading icon", () => {
    const CustomIcon = () => <div data-testid="custom-leading-icon">Custom</div>;
    render(
      <Search 
        onChange={() => {}} 
        onClear={() => {}} 
        LeadingIcon={<CustomIcon />}
      />
    );
    expect(screen.getByTestId("custom-leading-icon")).toBeInTheDocument();
  });

  test("applies stroke style when enabled", () => {
    render(<Search onChange={() => {}} onClear={() => {}} stroke />);
    const container = screen.getByTestId("search-container");
    expect(container.className).toContain("stroke");
  });

  // Input Mode Tests
  test("handles input mode switching", () => {
    const onInputModeChange = jest.fn();
    render(
      <Search 
        onChange={() => {}} 
        onClear={() => {}} 
        showInputModeSwitch
        defaultInputMode="text"
        onInputModeChange={onInputModeChange}
      />
    );
    const numericButton = screen.getByText("123");
    fireEvent.click(numericButton);
    expect(onInputModeChange).toHaveBeenCalledWith("numeric");
    const input = screen.getByTestId("search-field");
    expect(input).toHaveAttribute("inputMode", "numeric");
  });

  test("uses custom default input mode", () => {
    render(
      <Search 
        onChange={() => {}} 
        onClear={() => {}} 
        defaultInputMode="numeric"
      />
    );
    const input = screen.getByTestId("search-field");
    expect(input).toHaveAttribute("inputMode", "numeric");
  });

  // Accessibility Tests
  test("has correct accessibility attributes", () => {
    const customLabel = "Custom Search Label";
    render(<Search onChange={() => {}} onClear={() => {}} label={customLabel} />);
    const container = screen.getByTestId("search-container");
    expect(container).toHaveAttribute("role", "searchbox");
    expect(container).toHaveAttribute("aria-label", customLabel);
  });

  // Behavior Tests
  test("focuses input after clear", () => {
    render(<Search onChange={() => {}} onClear={() => {}} />);
    const clearIcon = screen.getByTestId("clear-icon");
    const input = screen.getByTestId("search-field");
    fireEvent.mouseDown(clearIcon);
    jest.runAllTimers();
    expect(document.activeElement).toBe(input);
  });

  test("applies custom class", () => {
    render(
      <Search 
        onChange={() => {}} 
        onClear={() => {}} 
        customClass="custom-search-class"
      />
    );
    const container = screen.getByTestId("search-container");
    expect(container.className).toContain("custom-search-class");
  });

  test("hides dismiss icon when showDismissIcon is false", () => {
    render(
      <Search 
        onChange={() => {}} 
        onClear={() => {}} 
        showDismissIcon={false}
      />
    );
    expect(screen.queryByTestId("clear-icon")).not.toBeInTheDocument();
  });
});