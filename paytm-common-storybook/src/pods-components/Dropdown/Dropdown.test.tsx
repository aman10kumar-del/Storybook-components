import React from "react";
import {render, screen, fireEvent, cleanup, act} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import Dropdown from "./Dropdown"
import {ReactComponent as InfoIconComponent} from "../../assets/img/info.svg"

jest.useFakeTimers();

describe("Test Dropdown", () => {

  beforeAll(() => {
    let root = document.createElement('div')
    root.id = "root"
    document.body.appendChild(root)
  })
  afterEach(() => {
    cleanup()
  })

  test("label present", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
      />
    ));
    const label = screen.getByTestId("label")
    expect(label).toBeInTheDocument();
  })

  test("default", () => {
    render((
      // @ts-ignore
      <Dropdown
      />
    ));
    const label = screen.getByTestId("label")
    expect(label).toBeEmptyDOMElement();
  })

  test("info text present", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
      />
    ));
    const info = screen.getByText("info_text")
    expect(info).toBeInTheDocument();
  })

  test("error text present", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        error="error_text"
      />
    ));
    const info = screen.getByText("error_text")
    expect(info).toBeInTheDocument();
  })

  test("error takes preference over info", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
        error="error_text"
      />
    ));
    const info = screen.getByText("error_text")
    expect(info).toBeInTheDocument();
  })

  test("icon present", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
        error="error_text"
        LeadingIcon={< InfoIconComponent />}
      />
    ));
    const info = screen.getByText("error_text")
    expect(info).toBeInTheDocument();
  })

  test("bottom sheet slides up", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
      />
    ));
    const bottomSheetContainer = screen.getByTestId("bottom-sheet-container")
    expect(bottomSheetContainer).not.toHaveClass("active")
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(bottomSheetContainer).toHaveClass("active")
  })

  test("use label as default title", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
      />
    ));
    fireEvent.click(screen.getByTestId("dropdown"));
    const title = screen.getByTestId("title")
    expect(title).toHaveTextContent("label");
  })

  test("search field hidden by default", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
      />
    ));
    fireEvent.click(screen.getByTestId("dropdown"));
    const bottomSheet = screen.getByTestId("bottom-sheet")
    expect(bottomSheet).not.toHaveTextContent("search");
  })

  test("show search field", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
        bottomSheetSearchProps={{
          label: "Search"
        }}
      />
    ));
    fireEvent.click(screen.getByTestId("dropdown"));
    const searchField = screen.getByPlaceholderText("Search")
    expect(searchField).toBeInTheDocument();
  })

  test("filter options using search field", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
        bottomSheetSearchProps={{
          label: "Search"
        }}
      />
    ));
    fireEvent.click(screen.getByTestId("dropdown"));
    const searchField = screen.getByTestId("search-field")
    act(() => { 
      userEvent.type(searchField, "_1");
      jest.runAllTimers();
    })
    expect(searchField).toHaveValue("_1")
    const bottomSheet = screen.getByTestId("bottom-sheet")
    expect(bottomSheet).not.toHaveTextContent("text_2");
  })

  test("clear button shows all options back", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
        bottomSheetSearchProps={{
          label: "Search"
        }}
      />
    ));
    fireEvent.click(screen.getByTestId("dropdown"));
    const searchField = screen.getByTestId("search-field")
    act(() => { 
      userEvent.type(searchField, "_3");
      jest.runAllTimers();
    })
    expect(searchField).toHaveValue("_3")
    const bottomSheet = screen.getByTestId("bottom-sheet")
    expect(bottomSheet).not.toHaveTextContent("text_1");
    expect(bottomSheet).not.toHaveTextContent("text_2");
    const clearIcon = screen.getByTestId("clear-icon")
    fireEvent.mouseDown(clearIcon)
    expect(searchField).toHaveValue("")
    expect(bottomSheet).toHaveTextContent("text_1");
    expect(bottomSheet).toHaveTextContent("text_2");
  })

  test("close works with backdrop click", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[1]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"        
      />
    ));
    const bottomSheetContainer = screen.getByTestId("bottom-sheet-container")
    expect(bottomSheetContainer).not.toHaveClass("active")
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(bottomSheetContainer).toHaveClass("active")
    fireEvent.click(screen.getByTestId("backdrop"));
    expect(bottomSheetContainer).not.toHaveClass("active")
  })

  test("close works when option selected", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={() => {}}
        iText="info_text"
      />
    ));
    const bottomSheetContainer = screen.getByTestId("bottom-sheet-container")
    expect(bottomSheetContainer).not.toHaveClass("active")
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(bottomSheetContainer).toHaveClass("active")
    fireEvent.click(screen.getByText("text_2"));
    expect(bottomSheetContainer).not.toHaveClass("active")
  })

  test("disabled state prevents interaction", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={() => {}}
        disabled={true}
      />
    ));
    const dropdown = screen.getByTestId("dropdown")
    expect(dropdown).toHaveClass("disabled")
    fireEvent.click(dropdown);
    const bottomSheetContainer = screen.getByTestId("bottom-sheet-container")
    expect(bottomSheetContainer).not.toHaveClass("active")
  })

  test("custom class names are applied", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={() => {}}
        customClassDropdown="custom-dropdown"
        customClassBottomSheet="custom-bottom-sheet"
      />
    ));
    expect(screen.getByTestId("dropdown").parentElement).toHaveClass("custom-dropdown")
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(screen.getByTestId("bottom-sheet")).toHaveClass("custom-bottom-sheet")
  })

  test("custom key and value props work", () => {
    let OPTIONS = [{
      key: "key_1",
      value: "value_1"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={() => {}}
        sKey="key"
        sValue="value"
      />
    ));
    const value = screen.getByTestId("value")
    expect(value).toHaveTextContent("value_1")
  })

  test("empty options shows empty list", () => {
    render((
      <Dropdown
        label="label"
        value={{ id: "", text: "" }}
        options={[]}
        onChange={() => {}}
      />
    ));
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(screen.getByAltText("No results")).toBeInTheDocument()
    expect(screen.getByText("No results found")).toBeInTheDocument()
  })

  test("keyboard accessibility with Enter key", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={() => {}}
      />
    ));
    const dropdown = screen.getByTestId("dropdown")
    const bottomSheetContainer = screen.getByTestId("bottom-sheet-container")
    expect(bottomSheetContainer).not.toHaveClass("active")
    fireEvent.keyUp(dropdown, { key: 'Enter' });
    expect(bottomSheetContainer).toHaveClass("active")
  })

  test("custom bottom sheet header props", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }];
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={() => {}}
        bottomSheetHeaderProps={{
          title: "Custom Title",
          size: "small"
        }}
      />
    ));
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(screen.getByText("Custom Title")).toBeInTheDocument()
  })

  test("custom attachToElementID", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }];
    const customRoot = document.createElement('div')
    customRoot.id = "custom-root"
    document.body.appendChild(customRoot)
    
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={() => {}}
        attachToElementID="custom-root"
      />
    ));
    fireEvent.click(screen.getByTestId("dropdown"));
    expect(document.getElementById("custom-root")?.contains(screen.getByTestId("bottom-sheet"))).toBeTruthy()
  })

  test("leading icon with value alignment", () => {
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }];
    render((
      <Dropdown
        label="label"
        value={{ id: "", text: "" }}
        options={OPTIONS}
        onChange={() => {}}
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const label = screen.getByTestId("label")
    expect(label).toHaveClass("extraLeftPadding")
    
    cleanup()
    // When value is selected, label should move to top
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={() => {}}
        LeadingIcon={<InfoIconComponent />}
      />
    ));
    const labelWithValue = screen.getByTestId("label")
    expect(labelWithValue).toHaveClass("alignToTop")
    expect(labelWithValue).not.toHaveClass("extraLeftPadding")
  })

  test("onChange callback is triggered with selected option", () => {
    const mockOnChange = jest.fn();
    let OPTIONS = [{
      id: "id_1",
      text: "text_1"
    }, {
      id: "id_2",
      text: "text_2"
    }];
    
    render((
      <Dropdown
        label="label"
        value={OPTIONS[0]}
        options={OPTIONS}
        onChange={mockOnChange}
      />
    ));
    
    fireEvent.click(screen.getByTestId("dropdown"));
    fireEvent.click(screen.getByText("text_2"));
    
    expect(mockOnChange).toHaveBeenCalledWith(OPTIONS[1])
  })

})