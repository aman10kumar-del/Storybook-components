import React from "react";
import {render, screen} from "@testing-library/react"

import Separator from "./Separator"

describe("Test Separator", () => {

  test("default separator", () => {
    render((
      <Separator />
    ));
    const defaultSeparator = screen.getByTestId("separator")
    expect(defaultSeparator).toBeInTheDocument();
    expect(defaultSeparator).not.toHaveClass("hairline")
  })

  test("hairline separator", () => {
    render((
      <Separator 
        hairline
      />
    ));
    const hairlineSeparator = screen.getByTestId("separator")
    expect(hairlineSeparator).toBeInTheDocument();
    expect(hairlineSeparator).toHaveClass("hairline")
  })

})