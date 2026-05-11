import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ReactComponent as BankIcon } from "../../assets/ultra-icons/standard/bank.svg";
import ShortcutPill from "./ShortcutPill";
import ShortcutPillRow from "./ShortcutPillRow";

describe("ShortcutPill", () => {
  test("renders title and subtitle", () => {
    render(
      <ShortcutPill
        title="Axis Bank"
        subtitle="A/c 5678"
        graphic={<BankIcon aria-hidden />}
        onClick={() => {}}
      />,
    );
    expect(screen.getByTestId("shortcut-pill-title")).toHaveTextContent(
      "Axis Bank",
    );
    expect(screen.getByTestId("shortcut-pill-subtitle")).toHaveTextContent(
      "A/c 5678",
    );
  });

  test("click fires onClick", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <ShortcutPill
        title="Test"
        subtitle="Sub"
        graphic={<BankIcon aria-hidden />}
        onClick={onClick}
      />,
    );
    await user.click(screen.getByTestId("shortcut-pill"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("ShortcutPillRow", () => {
  test("wraps pills in a list", () => {
    render(
      <ShortcutPillRow>
        <ShortcutPill
          title="A"
          subtitle="1"
          graphic={<BankIcon aria-hidden />}
          onClick={() => {}}
        />
        <ShortcutPill
          title="B"
          subtitle="2"
          graphic={<BankIcon aria-hidden />}
          onClick={() => {}}
        />
      </ShortcutPillRow>,
    );
    expect(screen.getByTestId("shortcut-pill-row")).toHaveAttribute(
      "role",
      "list",
    );
    expect(screen.getAllByTestId("shortcut-pill")).toHaveLength(2);
  });
});
