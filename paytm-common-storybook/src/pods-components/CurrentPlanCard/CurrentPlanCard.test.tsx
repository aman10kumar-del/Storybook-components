import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CurrentPlanCard from "./CurrentPlanCard";

describe("CurrentPlanCard", () => {
  const base = {
    operatorLogoSrc: "https://example.com/op.png",
    displayName: "Rahul Saini",
    mobileNumber: "9819808765",
    planPrice: "₹988",
    planDescription: "28 Days - Unlimited 5G+3...",
    planExpiryText: "Plan expires at 12:30 pm tomorrow",
    dataPackChips: [
      { id: "a", price: "₹22", detail: "1 GB · 1 Day" },
    ],
    dataPackBadgeLabel: "Cricket Special",
  };

  test("renders header, plan, data pack chips", () => {
    render(
      <CurrentPlanCard
        {...base}
        onChangeClick={() => {}}
        onRechargeClick={() => {}}
        onPlanDetailsClick={() => {}}
      />,
    );

    expect(screen.getByTestId("current-plan-card")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-logo-container")).toBeInTheDocument();
    expect(screen.getByText("Rahul Saini")).toBeInTheDocument();
    expect(screen.getByText("9819808765")).toBeInTheDocument();
    expect(screen.getByText("Current Plan:")).toBeInTheDocument();
    expect(screen.getByText("₹988")).toBeInTheDocument();
    expect(
      screen.getByText("28 Days - Unlimited 5G+3..."),
    ).toBeInTheDocument();
    expect(screen.getByText("Add Data Pack")).toBeInTheDocument();
    expect(screen.getByTestId("current-plan-chip-a")).toBeInTheDocument();
  });

  test("Change, Recharge, and Plan Details fire handlers", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    const onRecharge = jest.fn();
    const onDetails = jest.fn();
    render(
      <CurrentPlanCard
        {...base}
        showDataPackSection={false}
        onChangeClick={onChange}
        onRechargeClick={onRecharge}
        onPlanDetailsClick={onDetails}
      />,
    );

    const changeBtn = screen.getAllByTestId("button").find((el) =>
      el.textContent?.includes("Change"),
    );
    expect(changeBtn).toBeDefined();
    await user.click(changeBtn!);
    expect(onChange).toHaveBeenCalledTimes(1);

    const rechargeBtn = screen.getAllByTestId("button").find((el) =>
      el.textContent?.includes("Recharge"),
    );
    await user.click(rechargeBtn!);
    expect(onRecharge).toHaveBeenCalledTimes(1);

    const detailsBtn = screen.getAllByTestId("button").find((el) =>
      el.textContent?.includes("Plan Details"),
    );
    await user.click(detailsBtn!);
    expect(onDetails).toHaveBeenCalledTimes(1);
  });

  test("disables actions when handlers omitted", () => {
    render(<CurrentPlanCard {...base} showDataPackSection={false} />);

    const changeBtn = screen.getAllByTestId("button").find((el) =>
      el.textContent?.includes("Change"),
    );
    expect(changeBtn).toBeDisabled();

    const rechargeBtn = screen.getAllByTestId("button").find((el) =>
      el.textContent?.includes("Recharge"),
    );
    expect(rechargeBtn).toBeDisabled();

    expect(screen.queryByText("Plan Details")).not.toBeInTheDocument();
  });
});
