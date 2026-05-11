import React from "react";
import {render, screen} from "@testing-library/react"

import Loader from "./Loader"

describe("Test Loader", () => {

  test("loader present", () => {
    render((
      <Loader />
    ));
    const loader = screen.getByTestId("loader")
    expect(loader).toBeInTheDocument();
  })

  test("monotone loader", () => {
    render((
      <Loader 
        type="monotone"
      />
    ));
    const loader = screen.getByTestId("loader");
    expect(loader).toHaveClass("monotone")
  })
})