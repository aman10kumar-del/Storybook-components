import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RecentPaymentsCard from "./RecentPaymentsCard";
import type { RecentPaymentsItem } from "./RecentPaymentsCard";

const items: RecentPaymentsItem[] = [
  {
    id: "a",
    title: "Person One",
    subtitle: "₹10 sent",
    avatar: { variant: "initials", initials: "PO", initialsColor: "sprout" },
  },
  {
    id: "b",
    title: "Person Two",
    subtitle: "₹20 received",
    avatar: {
      variant: "profile",
      imageURL: "https://example.com/p.png",
    },
  },
];

describe("RecentPaymentsCard", () => {
  it("renders rows and captions", () => {
    const withCaption: RecentPaymentsItem[] = [
      ...items,
      {
        id: "c",
        title: "Biz",
        subtitle: "₹30",
        captionUnderAvatar: "Business",
        avatar: { variant: "initials", initials: "BZ", initialsColor: "water" },
      },
    ];
    render(<RecentPaymentsCard items={withCaption} />);
    expect(screen.getByTestId("recent-payments-card")).toBeInTheDocument();
    expect(screen.getByTestId("recent-payments-row-a")).toBeInTheDocument();
    expect(screen.getByText("Person One")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
  });

  it("fires pay and view-all handlers", async () => {
    const user = userEvent.setup();
    const onPay = jest.fn();
    const onViewAll = jest.fn();
    render(
      <RecentPaymentsCard
        items={items}
        onPayClick={onPay}
        onViewAllClick={onViewAll}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Pay Person One/i }));
    expect(onPay).toHaveBeenCalledWith("a");
    await user.click(screen.getByTestId("recent-payments-view-all"));
    expect(onViewAll).toHaveBeenCalled();
  });

  it("uses static footer when view-all handler is omitted", () => {
    render(<RecentPaymentsCard items={items} />);
    expect(screen.getByTestId("recent-payments-view-all-static")).toBeInTheDocument();
    expect(screen.queryByTestId("recent-payments-view-all")).not.toBeInTheDocument();
  });
});
