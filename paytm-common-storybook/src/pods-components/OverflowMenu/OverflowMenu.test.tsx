import React from "react";
import {fireEvent, render, screen} from "@testing-library/react"

import OverflowMenu from "./OverflowMenu"
import {ReactComponent as SearchIcon} from "../../assets/ultra-icons/system/action/search.svg"
import {ReactComponent as StatusOffIcon} from "../../assets/ultra-icons/system/toggle/checkbox_off.svg"
import {ReactComponent as StatusOnIcon} from "../../assets/ultra-icons/system/toggle/checkbox_on.svg"

const MENU_ITEMS_WITHOUT_ICON = [
  {
    label: "Menu 1",
  },
  {
    label: "Menu 2",
  },
  {
    label: "Menu 3",
  },
]

const MENU_ITEMS_WITH_ICON = [
  {
    label: "Menu 1",
    LeadingIcon: <SearchIcon />,
  },
  {
    label: "Menu 2",
    LeadingIcon: <StatusOnIcon />,
  },
  {
    label: "Menu 3",
    LeadingIcon: <StatusOffIcon />,
  },
]
describe("Test OverflowMenu", () => {

  test("is present", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-leading"
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const container = screen.getByTestId("overflow-container")
    expect(container).toBeInTheDocument();
  })

  test("not mounted by default", () => {
    render((
      //@ts-ignore
      <OverflowMenu
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.queryAllByTestId("overflow")
    expect(overflow).toHaveLength(0)
  })

  test("standard by default", () => {
    render((
      //@ts-ignore
      <OverflowMenu
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-leading"
        initialOpen
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow")
    expect(overflow.getElementsByTagName("ul")[0]).not.toHaveClass("primary")
  })

  test("content present", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-leading"
        initialOpen
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const items = screen.getAllByRole("menuitem")
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent("Menu 1")
    expect(items[1]).toHaveTextContent("Menu 2")
    expect(items[2]).toHaveTextContent("Menu 3")
    const icons = screen.getAllByTestId("icon")
    expect(icons).toHaveLength(3)
  })

  test("clicking on child opens overflow", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-leading"
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    expect(screen.queryAllByTestId("overflow")).toHaveLength(0)
    const triggerContainer = screen.getByTestId("trigger-container")
    fireEvent.click(triggerContainer)
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--state-opening")
    fireEvent.animationEnd(overflow)
    expect(overflow).toHaveClass("szh-menu--state-open")
  })

  test("once open,  a blur event closes overflow", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-leading"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--state-open")
    fireEvent.animationEnd(overflow)
   
    fireEvent.blur(screen.getByTestId("overflow"))

    expect(overflow).toHaveClass("szh-menu--state-closing")
    fireEvent.animationEnd(overflow)
    expect(overflow).toHaveClass("szh-menu--state-closed")
  })

  test("open by default", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-leading"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--state-open")
  })

  test("caret at top-left", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-leading"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--dir-bottom")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at top-right", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-trailing"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--dir-bottom")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at bottom-left", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="bottom-leading"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--dir-top")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at bottom-right", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="bottom-trailing"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--dir-top")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at bottom-center", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="bottom-center"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--dir-top")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("caret at top-right", () => {
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-center"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow").getElementsByClassName("szh-menu")[0]
    expect(overflow).toHaveClass("szh-menu--dir-bottom")
    //TODO: currently react-menu does not add class for horizontal positioning. When it does, add that check here
  })

  test("empty child returns null", () => {
    render((
      //@ts-ignore
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="bottom-trailing"
        initialOpen={true}
      >
      </OverflowMenu>
    ));
    const container = screen.queryByTestId("overflow-container")
    expect(container).toBeNull();
  })

  test("onClick", () => {
    const onClick = jest.fn();
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={onClick}
        caretPosition="bottom-trailing"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const itemOne = screen.getAllByRole("menuitem")[0]
    fireEvent.click(itemOne)
    expect(onClick).toHaveBeenCalledWith({label: "Menu 1", LeadingIcon: <SearchIcon />})
  })

  test("icons not present", () => {
    const onClick = jest.fn();
    render((
      <OverflowMenu
        type="standard"
        menuItems={MENU_ITEMS_WITHOUT_ICON}
        onClick={onClick}
        caretPosition="bottom-trailing"
        initialOpen={true}
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const items = screen.getAllByRole("menuitem")
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent("Menu 1")
    expect(items[1]).toHaveTextContent("Menu 2")
    expect(items[2]).toHaveTextContent("Menu 3")
    const icons = screen.queryAllByTestId("icon")
    expect(icons).toHaveLength(0)
  })

  test("primary", () => {
    render((
      //@ts-ignore
      <OverflowMenu
        menuItems={MENU_ITEMS_WITH_ICON}
        onClick={()=>{}}
        caretPosition="top-leading"
        initialOpen
        type="primary"
      >
        <button>Open</button>
      </OverflowMenu>
    ));
    const overflow = screen.getByTestId("overflow")
    expect(overflow.getElementsByTagName("ul")[0]).toHaveClass("primary")
  })

})