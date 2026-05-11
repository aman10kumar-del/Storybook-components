import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ActionSheet from './ActionSheet';
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg";

describe("Test ActionSheet", () => {
  beforeAll(() => {
    let root = document.createElement('div')
    root.id = "root"
    document.body.appendChild(root)
  })
  afterEach(() => {
    cleanup()
  })

  test("is present", () => {
    render((
      <ActionSheet
        onClick={() => { }}
        options={[]}
        active={true}
        triggerClose={() => { }}
      />
    ));
    const container = screen.getByTestId("action-sheet-container");
    expect(container).toBeInTheDocument();
  });

  test("value present", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One" },
          { id: "2", label: "Two" },
          { id: "3", label: "Three" },
        ]}
      />
    ));
    const values = screen.getAllByTestId("label-container");
    expect(values).toHaveLength(3);
    expect(values[0]).toHaveTextContent("One");
    expect(values[1]).toHaveTextContent("Two");
    expect(values[2]).toHaveTextContent("Three");
  });

  test("leading icon present", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One", LeadingIcon: <InfoIcon /> },
          { id: "2", label: "Two", LeadingIcon: <InfoIcon /> },
          { id: "3", label: "Three", LeadingIcon: <InfoIcon /> },
        ]}
      />
    ));
    const values = screen.getAllByTestId("leading-icon");
    expect(values).toHaveLength(3);
  });

  test("separator present default", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One", LeadingIcon: <InfoIcon /> },
          { id: "2", label: "Two", LeadingIcon: <InfoIcon /> },
          { id: "3", label: "Three", LeadingIcon: <InfoIcon /> },
        ]}
      />
    ));
    const values = screen.getAllByTestId("separator-item");
    expect(values).toHaveLength(3);
  });

  test("separator not present", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One", LeadingIcon: <InfoIcon />, separator: false },
          { id: "2", label: "Two", LeadingIcon: <InfoIcon />, separator: false },
          { id: "3", label: "Three", LeadingIcon: <InfoIcon />, separator: false },
        ]}
      />
    ));
    const values = screen.queryAllByTestId("separator-item");
    expect(values).toHaveLength(0);
  });

  test("action item onclick", () => {
    const onClick = jest.fn();
    render(
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={onClick}
        options={[
          { id: "1", label: "One", LeadingIcon: <InfoIcon /> },
          { id: "2", label: "Two", LeadingIcon: <InfoIcon /> },
          { id: "3", label: "Three", LeadingIcon: <InfoIcon /> },
        ]}
      />
    );
    const item1 = screen.getByTestId("sheet-item-0")
    fireEvent.click(item1);
    expect(onClick).toHaveBeenCalledWith({ id: "1", label: "One", LeadingIcon: <InfoIcon /> })
  });

  test("disabled item count", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One", LeadingIcon: <InfoIcon />, disabled: true },
          { id: "2", label: "Two", LeadingIcon: <InfoIcon /> },
          { id: "3", label: "Three", LeadingIcon: <InfoIcon /> },
        ]}
      />
    ));
    const item1 = screen.getByTestId("sheet-item-0");
    expect(item1).toHaveClass('disabledItem');
    const item2 = screen.getByTestId("sheet-item-1");
    expect(item2).not.toHaveClass('disabledItem');
    const item3 = screen.getByTestId("sheet-item-2");
    expect(item3).not.toHaveClass('disabledItem');
  });

  test("destructiveText item count", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One", LeadingIcon: <InfoIcon />, type: "destructive" },
          { id: "2", label: "Two", LeadingIcon: <InfoIcon /> },
          { id: "3", label: "Three", LeadingIcon: <InfoIcon /> },
        ]}
      />
    ));
    const item1 = screen.getByTestId("sheet-item-0");
    expect(item1).toHaveClass('destructiveItem');
    const item2 = screen.getByTestId("sheet-item-1");
    expect(item2).not.toHaveClass('destructiveItem');
    const item3 = screen.getByTestId("sheet-item-2");
    expect(item3).not.toHaveClass('destructiveItem');
  });

  test("bottomcta exists", () => {
    const triggerClose = jest.fn();
    const getComponent = () => (
      <ActionSheet
        active={true}
        triggerClose={triggerClose}
        onClick={() => { }}
        options={[
          { id: "1", label: "One", LeadingIcon: <InfoIcon /> },
          { id: "2", label: "Two", LeadingIcon: <InfoIcon /> },
          { id: "3", label: "Three", LeadingIcon: <InfoIcon /> },
        ]}
      />
    );
    render(getComponent());
    const bottomCta = screen.getByTestId("bottom-cta");
    fireEvent.click(bottomCta)
    expect(triggerClose).toHaveBeenCalled();
  });

  test("ListItemProps renders correctly", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One" },
          { id: "2", label: "Two" },
        ]}
        ListItemProps={{
          id: "list-1",
          primary: "Primary Text",
          secondary: "Secondary Text"
        }}
      />
    ));
    
    expect(screen.getByText("Primary Text")).toBeInTheDocument();
    expect(screen.getByText("Secondary Text")).toBeInTheDocument();
  });

  test("ListItemProps with leading avatar renders correctly", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One" },
        ]}
        ListItemProps={{
          id: "list-1",
          primary: "Primary Text",
          leading: {
            type: "avatar",
            avatar: {
              type: "profile",
              avatarProfile: {
                imageURL: "https://example.com/mock-avatar.jpg"
              }
            }
          }
        }}
      />
    ));
    
    expect(screen.getByTestId("leading-avatar")).toBeInTheDocument();
  });

  test("ListItemProps with trailing button renders correctly", () => {
    const buttonClick = jest.fn();
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One" },
        ]}
        ListItemProps={{
          id: "list-1",
          primary: "Primary Text",
          trailing: {
            type: "button",
            button: {
              label: "Click Me",
              type: "link",
              onClick: buttonClick
            }
          }
        }}
      />
    ));
    
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(buttonClick).toHaveBeenCalled();
  });

  test("ListItemProps separator works correctly", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One" },
        ]}
        ListItemProps={{
          id: "list-1",
          primary: "Primary Text",
          separator: false
        }}
      />
    ));
    
    const listItem = screen.getByTestId("list-item-list-1");
    expect(listItem.querySelector('[data-testid="separator-item"]')).not.toBeInTheDocument();
  });

  test("ListItemProps is not rendered when not provided", () => {
    render((
      <ActionSheet
        active={true}
        triggerClose={() => { }}
        onClick={() => { }}
        options={[
          { id: "1", label: "One" },
        ]}
      />
    ));
    
    // The List component should not be rendered
    expect(screen.queryByTestId("list-item-container")).not.toBeInTheDocument();
  });
});