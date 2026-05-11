import React from "react";
import {render, screen} from "@testing-library/react"

import Card from "./Card"

describe("Test Card", () => {

  test("is present", () => {
    render((
      <Card>
        <div className="inner-div">
          Card body
        </div>
      </Card>
    ));
    const card = screen.getByTestId("card")
    expect(card).toBeInTheDocument();
    const cardBody = screen.getByText("Card body")
    expect(cardBody).toBeInTheDocument();
  })

  test("no children present", () => {
    render((
      // @ts-ignore
      <Card />
    ));
    const card = screen.getByTestId("card")
    expect(card).toBeInTheDocument();
    expect(card).toBeEmptyDOMElement();
  })

})