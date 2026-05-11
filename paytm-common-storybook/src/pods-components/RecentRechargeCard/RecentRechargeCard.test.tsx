import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RecentRechargeCard from "./RecentRechargeCard";

describe("RecentRechargeCard", () => {
  const base = {
    operatorLogoSrc: "https://example.com/op.png",
    displayName: "Rahul Saini",
    mobileNumber: "9819808765",
    lastRechargeSummary: "Last recharged ₹2,000 on 23 Sep",
  };

  test("renders content, avatar logo, and menu", () => {
    render(<RecentRechargeCard {...base} onMenuClick={() => {}} />);
    expect(screen.getByTestId("recent-recharge-card")).toBeInTheDocument();
    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("avatar-logo-container")).toBeInTheDocument();
    expect(screen.getByText("Rahul Saini")).toBeInTheDocument();
    expect(screen.getByText("9819808765")).toBeInTheDocument();
    expect(
      screen.getByText("Last recharged ₹2,000 on 23 Sep"),
    ).toBeInTheDocument();
    expect(screen.queryByTestId("separator")).not.toBeInTheDocument();
    expect(screen.getByTestId("recent-recharge-card-menu")).toBeInTheDocument();
  });

  test("menu click fires handler", async () => {
    const user = userEvent.setup();
    const onMenu = jest.fn();
    render(<RecentRechargeCard {...base} onMenuClick={onMenu} />);
    await user.click(screen.getByTestId("recent-recharge-card-menu"));
    expect(onMenu).toHaveBeenCalledTimes(1);
  });

  test("without onMenuClick shows static menu slot", () => {
    render(<RecentRechargeCard {...base} />);
    expect(
      screen.getByTestId("recent-recharge-card-menu-static"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
