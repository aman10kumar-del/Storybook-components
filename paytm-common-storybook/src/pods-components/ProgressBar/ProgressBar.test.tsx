import React from "react";
import {render, screen, act} from "@testing-library/react"
import ProgressBar from "./ProgressBar";

describe("Test ProgressBar", () => {
  test("default value", () => {
    render((
      <ProgressBar
        value={0}
      />
    ));
    const bar = screen.getByTestId("bar-width");
    expect(bar).toHaveStyle('--w: 0%');
  });

  test("custom value", () => {
    render((
      <ProgressBar
        value={30}
      />
    ));
    const bar = screen.getByTestId("bar-width");
    expect(bar).toHaveStyle('--w: 30%');
  });
});