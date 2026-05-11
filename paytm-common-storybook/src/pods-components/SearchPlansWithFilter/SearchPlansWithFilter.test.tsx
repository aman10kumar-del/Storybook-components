import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchPlansWithFilter from "./SearchPlansWithFilter";

describe("SearchPlansWithFilter", () => {
  test("types and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <SearchPlansWithFilter
        value=""
        onChange={onChange}
        placeholder="Search plans"
      />,
    );
    const input = screen.getByLabelText("Search plans");
    await user.type(input, "prepaid");
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls.map((c) => c[0]).join("")).toBe("prepaid");
  });

  test("clear empties value via onChange", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onClear = jest.fn();
    render(
      <SearchPlansWithFilter
        value="x"
        onChange={onChange}
        onClear={onClear}
        placeholder="Search plans"
      />,
    );
    await user.click(screen.getByTestId("search-plans-clear"));
    expect(onChange).toHaveBeenCalledWith("");
    expect(onClear).toHaveBeenCalled();
  });

  test("filter button", async () => {
    const user = userEvent.setup();
    const onFilterClick = jest.fn();
    render(
      <SearchPlansWithFilter
        value=""
        onChange={() => {}}
        onFilterClick={onFilterClick}
        filterActive
        placeholder="Search plans"
      />,
    );
    expect(screen.getByTestId("search-plans-filter")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await user.click(screen.getByTestId("search-plans-filter"));
    expect(onFilterClick).toHaveBeenCalledTimes(1);
  });
});
