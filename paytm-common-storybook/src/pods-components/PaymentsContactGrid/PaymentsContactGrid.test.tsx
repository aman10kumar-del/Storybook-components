import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PaymentsContactGrid from "./PaymentsContactGrid";

describe("PaymentsContactGrid", () => {
  test("renders list, cells, and avatars", () => {
    render(
      <PaymentsContactGrid
        items={[
          {
            id: "a",
            variant: "initials",
            label: "Alpha",
            initials: "A",
            initialsColor: "lavender",
            starBadge: true,
          },
          {
            id: "b",
            variant: "profile",
            label: "Beta",
            imageURL: "https://example.com/p.png",
          },
        ]}
        columnsPerRow={2}
      />,
    );

    expect(screen.getByTestId("payments-contact-grid")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /contacts/i })).toBeInTheDocument();
    expect(screen.getByTestId("payments-contact-grid-item-a")).toBeInTheDocument();
    expect(screen.getByTestId("payments-contact-grid-item-b")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-initials-container")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-profile-container")).toBeInTheDocument();
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  test("view all button calls onClick and exposes aria-label", async () => {
    const user = userEvent.setup();
    const onViewAll = jest.fn();
    render(
      <PaymentsContactGrid
        items={[
          {
            id: "v",
            variant: "viewAll",
            label: "View All",
            onClick: onViewAll,
          },
        ]}
      />,
    );

    const btn = screen.getByTestId("payments-contact-grid-item-v");
    expect(btn).toHaveAttribute("aria-label", "View all contacts");
    await user.click(btn);
    expect(onViewAll).toHaveBeenCalledTimes(1);
  });

  test("optional ariaLabel overrides default for view all", () => {
    render(
      <PaymentsContactGrid
        items={[
          {
            id: "v",
            variant: "viewAll",
            label: "View All",
            ariaLabel: "See every contact",
            onClick: () => {},
          },
        ]}
      />,
    );
    expect(screen.getByTestId("payments-contact-grid-item-v")).toHaveAttribute(
      "aria-label",
      "See every contact",
    );
  });

  test("profile item with onClick renders as button", async () => {
    const user = userEvent.setup();
    const onTap = jest.fn();
    render(
      <PaymentsContactGrid
        columnsPerRow={1}
        items={[
          {
            id: "p",
            variant: "profile",
            label: "Pat",
            imageURL: "https://example.com/x.png",
            onClick: onTap,
          },
        ]}
      />,
    );
    await user.click(screen.getByTestId("payments-contact-grid-item-p"));
    expect(onTap).toHaveBeenCalledTimes(1);
  });

  test("static view all without onClick is not a button", () => {
    render(
      <PaymentsContactGrid
        items={[
          {
            id: "v",
            variant: "viewAll",
            label: "View All",
          },
        ]}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
