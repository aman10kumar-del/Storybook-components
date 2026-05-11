import React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react"

import Accordion from "./Accordion"

const ITEMS = [
  {
    title: "Title 1",
    content: "Description 1"
  },
  {
    title: "Title 2",
    content: "Description 2"
  },
  {
    title: "Title 3",
    content: "Description 3"
  }
];

describe("Test Accordion", () => {

  test("is present", () => {
    render((
      <Accordion
        items={ITEMS}      
      />
    ));
    const accordionContainer = screen.getByTestId("accordion-container")
    expect(accordionContainer).toBeInTheDocument();
  })

  test("defaults", () => {
    render((
      //@ts-ignore
      <Accordion
      />
    ));
    const accordionContainer = screen.getByTestId("accordion-container")
    expect(accordionContainer).toBeInTheDocument();
    const titles = screen.queryAllByTestId("title")
    expect(titles).toHaveLength(0);
  })

  test("titles present", () => {
    render((
      <Accordion
        items={ITEMS}      
      />
    ));
    const titles = screen.getAllByTestId("title")
    expect(titles).toHaveLength(3);
    expect(titles[0]).toHaveTextContent("Title 1")
    expect(titles[1]).toHaveTextContent("Title 2")
    expect(titles[2]).toHaveTextContent("Title 3")
  })

  test("separator present, except for last item", () => {
    render((
      <Accordion
        items={ITEMS}      
      />
    ));
    const separators = screen.getAllByTestId("separator")
    expect(separators).toHaveLength(2);
  })

  test("descriptions hideen by default", () => {
    render((
      <Accordion
        items={ITEMS}      
      />
    ));
    const descriptions = screen.queryAllByTestId("description")
    expect(descriptions).toHaveLength(0);
  })

  test("clicking on title shows description", () => {
    render((
      <Accordion
        items={ITEMS}      
      />
    ));
    const titleContainers = screen.getAllByTestId("title-container")
    let items = screen.queryAllByTestId("item-container")
    expect(items[0]).not.toHaveClass("expanded")
    act(() => {
      fireEvent.click(titleContainers[0])
    })
    expect(items[0]).toHaveClass("expanded")
  })

  test("clicking on expanded item collapses it", () => {
    render((
      <Accordion
        items={ITEMS}      
      />
    ));
    const titleContainers = screen.getAllByTestId("title-container")
    let items = screen.queryAllByTestId("item-container")
    expect(items[0]).not.toHaveClass("expanded")
    act(() => {
      fireEvent.click(titleContainers[0])
    })
    expect(items[0]).toHaveClass("expanded")
    act(() => {
      fireEvent.click(titleContainers[0])
    })
    expect(items[0]).not.toHaveClass("expanded")
  })

  test("clicking on other item collapses expanded item", () => {
    render((
      <Accordion
        items={ITEMS}      
      />
    ));
    const titleContainers = screen.getAllByTestId("title-container")
    let items = screen.queryAllByTestId("item-container")
    expect(items[0]).not.toHaveClass("expanded")
    act(() => {
      fireEvent.click(titleContainers[0])
    })
    expect(items[0]).toHaveClass("expanded")
    act(() => {
      fireEvent.click(titleContainers[1])
    })
    expect(items[0]).not.toHaveClass("expanded")
    expect(items[1]).toHaveClass("expanded")
  })

  test("separator hidden", () => {
    render((
      <Accordion
        items={ITEMS}  
        separator={false}    
      />
    ));
    const separators = screen.queryAllByTestId("separator")
    expect(separators).toHaveLength(0);
  })

})