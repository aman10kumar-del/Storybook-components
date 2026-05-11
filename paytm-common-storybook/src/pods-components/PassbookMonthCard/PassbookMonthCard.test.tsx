import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PassbookMonthCard from "./PassbookMonthCard";
import type { PassbookMonthCardRow } from "./PassbookMonthCard.types";

const rows: PassbookMonthCardRow[] = [
  {
    id: "a",
    name: "Sumit Gupta",
    subtitle: "3 minutes ago",
    amountLabel: "₹400",
    avatar: { variant: "profile", imageSrc: "https://example.com/a.png" },
    sourceBankLogoSrc: "https://example.com/bank.png",
    sourceBankLogoAlt: "Axis",
  },
  {
    id: "b",
    name: "Rajeev Kumar",
    subtitle: "Yesterday",
    amountLabel: "+₹312",
    amountTone: "credit",
    avatar: { variant: "initials", initials: "RK" },
    sourceBankLogoSrc: "https://example.com/bank2.png",
  },
];

describe("PassbookMonthCard", () => {
  test("renders header, amounts, initials row, and list semantics", () => {
    render(
      <PassbookMonthCard
        monthTitle="June 2025"
        totalAmountLabel="₹99,28,758.43"
        rows={rows}
      />,
    );
    expect(screen.getByTestId("passbook-month-card")).toBeInTheDocument();
    expect(screen.getByTestId("passbook-month-card-header")).toBeInTheDocument();
    expect(screen.getByText("June 2025")).toBeInTheDocument();
    expect(screen.getByText("₹99,28,758.43")).toBeInTheDocument();
    expect(screen.getByText("Sumit Gupta")).toBeInTheDocument();
    expect(screen.getByText("+₹312")).toBeInTheDocument();
    expect(screen.getByTestId("passbook-month-card-row-a")).toBeInTheDocument();
    expect(screen.getByTestId("passbook-month-card-row-b")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-profile-container")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-initials-container")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(
      screen.queryByRole("button", { name: /open month details/i }),
    ).not.toBeInTheDocument();
  });

  test("header button fires when handler provided", async () => {
    const user = userEvent.setup();
    const onHeader = jest.fn();
    render(
      <PassbookMonthCard
        monthTitle="June 2025"
        totalAmountLabel="₹1"
        rows={rows}
        onHeaderClick={onHeader}
        headerAriaLabel="Expand June 2025"
      />,
    );
    await user.click(
      screen.getByRole("button", { name: "Expand June 2025" }),
    );
    expect(onHeader).toHaveBeenCalledTimes(1);
  });
});
