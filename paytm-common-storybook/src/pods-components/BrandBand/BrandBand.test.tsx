import React from "react";
import {render, screen} from "@testing-library/react"

import BrandBand from "./BrandBand";

describe("Test BrandBand", () => {

  test("is present", () => {
    render(
      <BrandBand />
    );
    const container = screen.getByTestId("brand-band-container")
    const primaryBand = screen.getByTestId("primary-band")
    const secondaryBand = screen.getByTestId("secondary-band")
    expect(container).toBeInTheDocument();
    expect(container).toContainElement(primaryBand)
    expect(container).toContainElement(secondaryBand)
  })
})