import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PlanDetailsCard from "./PlanDetailsCard";

describe("PlanDetailsCard", () => {
  const base = {
    operatorLogoSrc: "https://example.com/op.png",
    displayName: "Rahul Saini",
    mobileNumber: "9819808765",
    headlinePrice: "₹30",
    priceSubtitle: "₹10/ Day",
    badgeLabel: "Super Saver",
    validityValue: "365 Days",
    dataValue: "2.5 GB/ day + 3GB",
    description: "Long plan copy for testing.",
  };

  test("renders header, plan row, description, and view more", () => {
    render(
      <PlanDetailsCard
        {...base}
        onChangeClick={() => {}}
        onViewMoreClick={() => {}}
      />,
    );

    expect(screen.getByTestId("plan-details-card")).toBeInTheDocument();
    expect(screen.getByText("Rahul Saini")).toBeInTheDocument();
    expect(screen.getByText("9819808765")).toBeInTheDocument();
    expect(screen.getByText("Plan Amount:")).toBeInTheDocument();
    expect(screen.getByText("₹30")).toBeInTheDocument();
    expect(screen.getByText("Super Saver")).toBeInTheDocument();
    expect(screen.getByText("365 Days")).toBeInTheDocument();
    expect(screen.getByText("Long plan copy for testing.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /view more details/i }),
    ).toBeInTheDocument();
  });

  test("Change and View More fire handlers", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onMore = jest.fn();
    render(
      <PlanDetailsCard
        {...base}
        onChangeClick={onChange}
        onViewMoreClick={onMore}
      />,
    );

    const changeBtn = screen.getAllByTestId("button").find((el) =>
      el.textContent?.includes("Change"),
    );
    expect(changeBtn).toBeDefined();
    await user.click(changeBtn!);
    expect(onChange).toHaveBeenCalledTimes(1);

    await user.click(
      screen.getByRole("button", { name: /view more details/i }),
    );
    expect(onMore).toHaveBeenCalledTimes(1);
  });

  test("omits badge when label empty", () => {
    render(
      <PlanDetailsCard
        {...base}
        badgeLabel=""
        onChangeClick={() => {}}
      />,
    );
    expect(screen.queryByText("Super Saver")).not.toBeInTheDocument();
  });
});
