import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FABFloatingExtendedMini from "./FABFloatingExtendedMini";
import { ReactComponent as HomeIcon } from "../../assets/ultra-icons/system/category/home.svg";

const items = [
  {
    id: "a",
    ariaLabel: "Alpha",
    icon: <HomeIcon aria-hidden />,
  },
  {
    id: "b",
    ariaLabel: "Bravo",
    icon: <HomeIcon aria-hidden />,
  },
];

describe("FABFloatingExtendedMini", () => {
  test("renders items and calls onItemClick with id", async () => {
    const user = userEvent.setup();
    const onItemClick = jest.fn();
    render(
      <FABFloatingExtendedMini
        items={items}
        onItemClick={onItemClick}
        docked={false}
      />,
    );
    expect(screen.getByTestId("fab-floating-extended-mini-pill")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Bravo" }));
    expect(onItemClick).toHaveBeenCalledWith("b");
  });

  test("docked applies fixed wrapper class", () => {
    const { container } = render(
      <FABFloatingExtendedMini items={items} docked />,
    );
    const nav = container.querySelector("nav");
    expect(nav?.className).toMatch(/dock/);
  });

  test("custom class merges onto pill", () => {
    render(
      <FABFloatingExtendedMini
        items={items}
        docked={false}
        customClass="extra-pill-class"
      />,
    );
    const pill = screen.getByTestId("fab-floating-extended-mini-pill");
    expect(pill.className).toContain("extra-pill-class");
  });
});
