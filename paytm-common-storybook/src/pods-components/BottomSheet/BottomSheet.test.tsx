import React from "react";
import {cleanup, fireEvent, render, screen} from "@testing-library/react"

import BottomSheet from "./BottomSheet"

describe("Test BottomSheet", () => {
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
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
      /> 
    ));
    const container = screen.getByTestId("bottom-sheet-container")
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("active")
  })

  test("default", () => {
    render((
      //@ts-ignore
      <BottomSheet 
      /> 
    ));
    const container = screen.getByTestId("bottom-sheet-container")
    expect(container).toBeInTheDocument();
    expect(container).not.toHaveClass("active")
  })

  test("title present", () => {
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
      /> 
    ));
    const title = screen.getByTestId("title")
    expect(title).toHaveTextContent("Title")
  })

  test("close icon present by default", () => {
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
      /> 
    ));
    const closeIcon = screen.getByTestId("close-icon")
    expect(closeIcon).toBeInTheDocument()
  })

  test("close icon hidden", () => {
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
        showCloseIcon={false}
      /> 
    ));
    const closeIcon = screen.queryByTestId("close-icon")
    expect(closeIcon).toBeNull()
  })

  test("description present", () => {
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
        description="Description"
      /> 
    ));
    const description = screen.getByTestId("description")
    expect(description).toHaveTextContent("Description")
  })

  test("action buttons not present by default", () => {
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
        description="Description"
      /> 
    ));
    const primaryButton = screen.queryByTestId("primary-button")
    const secondaryButton = screen.queryByTestId("secondary-button")
    expect(primaryButton).toBeNull();
    expect(secondaryButton).toBeNull();
  })

  test("primary button present", () => {
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
        description="Description"
        primaryButton={{
          label: "Primary",
          onClick: () => {}
        }}
      /> 
    ));
    const primaryButton = screen.getAllByTestId("button")
    expect(primaryButton).toHaveLength(1)
    expect(primaryButton[0]).toHaveTextContent("Primary")
  })

  test("secondary button present", () => {
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
        description="Description"
        secondaryButton={{
          label: "Secondary",
          onClick: () => {}
        }}
      /> 
    ));
    const secondaryButton = screen.getAllByTestId("button")
    expect(secondaryButton).toHaveLength(1)
    expect(secondaryButton[0]).toHaveTextContent("Secondary")
  })

  test("grabber present", () => {
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
        description="Description"
        showGrabber
      /> 
    ));
    const grabber = screen.getByTestId("grabber")
    expect(grabber).toBeInTheDocument()
  })

  test("close icon click", () => {
    const triggerClose = jest.fn();
    render((
      <BottomSheet 
        active={true}
        triggerClose={triggerClose}
        title="Title"
        description="Description"
      /> 
    ));
    const closeIcon = screen.getByTestId("close-icon")
    fireEvent.click(closeIcon)
    expect(triggerClose).toHaveBeenCalled();
  })

  test("backdrop click", () => {
    const triggerClose = jest.fn();
    render((
      <BottomSheet 
        active={true}
        triggerClose={triggerClose}
        title="Title"
        description="Description"
      /> 
    ));
    const backdrop = screen.getByTestId("backdrop")
    fireEvent.click(backdrop)
    expect(triggerClose).toHaveBeenCalled();
  })

  test("secondary button click triggers triggerClose", () => {
    const triggerClose = jest.fn();
    render((
      <BottomSheet 
        active={true}
        triggerClose={triggerClose}
        title="Title"
        description="Description"
        secondaryButton={{
          label: "Secondary",
          onClick: () => {}
        }}
      /> 
    ));
    const secondaryButton = screen.getByText("Secondary")
    fireEvent.click(secondaryButton)
    expect(triggerClose).toHaveBeenCalled();
  })

  test("primary button click", () => {
    const onPrimaryButtonClick = jest.fn();
    render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
        title="Title"
        description="Description"
        primaryButton={{
          label: "Primary",
          onClick: onPrimaryButtonClick
        }}
      /> 
    ));
    const primaryButton = screen.getByText("Primary")
    fireEvent.click(primaryButton)
    expect(onPrimaryButtonClick).toHaveBeenCalled();
  })

  test("secondary button click", () => {
    const onSecondaryButtonClick = jest.fn();
    render((
      <BottomSheet 
        active={true}
        triggerClose={()=>{}}
        title="Title"
        description="Description"
        secondaryButton={{
          label: "Secondary",
          onClick: onSecondaryButtonClick
        }}
      /> 
    ));
    const secondaryButton = screen.getByText("Secondary")
    fireEvent.click(secondaryButton)
    expect(onSecondaryButtonClick).toHaveBeenCalled();
  })

  test("toggling active prop closes the sheet", () => {
    let active = true;
    let getComponent = () => (
      <BottomSheet 
        active={active}
        triggerClose={() => {}}
      /> 
    )
    const {rerender} = render(getComponent());
    const container = screen.getByTestId("bottom-sheet-container")
    expect(container).toHaveClass("active")
    active = false;
    rerender(getComponent())
    expect(container).not.toHaveClass("active")
  })

  test("children present", () => {
    const {rerender} = render((
      <BottomSheet 
        active={true}
        triggerClose={() => {}}
      >
        <label>Children</label>
      </BottomSheet> 
    ));
    const children = screen.getByTestId("children")
    expect(children).toBeInTheDocument();
  })
})