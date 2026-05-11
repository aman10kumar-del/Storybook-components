import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PlanDetailsListingCard from "./PlanDetailsListingCard";

describe("PlanDetailsListingCard", () => {
  const base = {
    headlinePrice: "₹30",
    priceSubtitle: "+ ₹10/Day",
    validityValue: "2 Days",
    dataValue: "1.5 GB/Day",
    badgeLabel: "Free Unlimited 5G",
    footerIcons: [<span key="a">a</span>],
 };

  test("renders price, specs, badge, and footer icons", () => {
    render(
      <PlanDetailsListingCard
        {...base}
        onSpecRowClick={() => {}}
        onPlanDetailsClick={() => {}}
      />,
    );

    expect(screen.getByTestId("plan-details-listing-card")).toBeInTheDocument();
    expect(screen.getByText("₹30")).toBeInTheDocument();
    expect(screen.getByText("+ ₹10/Day")).toBeInTheDocument();
    expect(screen.getByText("Free Unlimited 5G")).toBeInTheDocument();
    expect(screen.getByText("2 Days")).toBeInTheDocument();
    expect(screen.getByText("1.5 GB/Day")).toBeInTheDocument();
    expect(screen.getByTestId("plan-details-listing-footer-icons")).toBeInTheDocument();
  });

  test("spec row and Plan Details fire handlers", async () => {
    const user = userEvent.setup();
    const onSpec = jest.fn();
    const onDetails = jest.fn();
    render(
      <PlanDetailsListingCard
        {...base}
        onSpecRowClick={onSpec}
        onPlanDetailsClick={onDetails}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /Validity, Data; expand/i }),
    );
    expect(onSpec).toHaveBeenCalledTimes(1);

    await user.click(screen.getByTestId("plan-details-listing-plan-details"));
    expect(onDetails).toHaveBeenCalledTimes(1);
  });

  test("omits badge when label empty", () => {
    render(
      <PlanDetailsListingCard
        {...base}
        badgeLabel=""
        onSpecRowClick={() => {}}
      />,
    );
    expect(screen.queryByText("Free Unlimited 5G")).not.toBeInTheDocument();
  });

  test("read-only row does not render spec button", () => {
    render(<PlanDetailsListingCard {...base} />);
    expect(
      screen.queryByRole("button", { name: /Validity, Data; expand/i }),
    ).not.toBeInTheDocument();
  });

  test("static Plan Details when handler omitted", () => {
    render(<PlanDetailsListingCard {...base} onSpecRowClick={() => {}} />);
    expect(screen.getByText("Plan Details")).toBeInTheDocument();
    expect(
      screen.queryByTestId("plan-details-listing-plan-details"),
    ).not.toBeInTheDocument();
  });
});
