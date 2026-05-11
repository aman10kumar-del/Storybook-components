import React, { type CSSProperties } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReactComponent as BankIcon } from "../../assets/ultra-icons/standard/bank.svg";
import IconGrid from "./IconGrid";

describe("IconGrid", () => {
  test("renders items and Avatars", () => {
    render(
      <IconGrid
        items={[
          {
            id: "one",
            label: "Line1\nLine2",
            icon: <BankIcon aria-hidden />,
            onClick: () => {},
          },
        ]}
      />,
    );
    expect(screen.getByTestId("icon-grid")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-icon-container")).toBeInTheDocument();
    expect(screen.getByText("Line1")).toBeInTheDocument();
    expect(screen.getByText("Line2")).toBeInTheDocument();
  });

  test("clickable item fires onClick", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <IconGrid
        columnsPerRow={2}
        items={[
          {
            id: "tap",
            label: "Tap",
            icon: <BankIcon aria-hidden />,
            onClick,
          },
        ]}
      />,
    );
    await user.click(screen.getByTestId("icon-grid-item-tap"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("item without onClick is not a button", () => {
    render(
      <IconGrid
        items={[
          {
            id: "static",
            label: "Static",
            icon: <BankIcon aria-hidden />,
          },
        ]}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.getByRole("group", { name: /static/i })).toBeInTheDocument();
  });

  test("placement inCard exposes data attribute for styling hooks", () => {
    render(
      <IconGrid
        placement="inCard"
        style={
          {
            "--icon-grid-well-bg": "var(--background-primary-strong)",
            "--icon-grid-icon-on-well": "var(--icon-universal-light)",
          } as CSSProperties
        }
        items={[
          {
            id: "x",
            label: "X",
            icon: <BankIcon aria-hidden />,
            onClick: () => {},
          },
        ]}
      />,
    );
    expect(screen.getByTestId("icon-grid")).toHaveAttribute(
      "data-placement",
      "inCard",
    );
  });
});
