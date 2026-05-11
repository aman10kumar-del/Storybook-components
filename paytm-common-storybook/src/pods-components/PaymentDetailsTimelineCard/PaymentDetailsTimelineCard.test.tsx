import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PaymentDetailsTimelineCard from "./PaymentDetailsTimelineCard";

describe("PaymentDetailsTimelineCard", () => {
  const steps = [
    { id: "a", label: "Step one copy" },
    { id: "b", label: "Step two copy" },
  ];

  it("renders title and step labels", () => {
    render(
      <PaymentDetailsTimelineCard title="Payment Details" steps={steps} />
    );

    expect(screen.getByTestId("payment-details-timeline-card")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toHaveTextContent("Payment Details");
    expect(screen.getByText("Step one copy")).toBeInTheDocument();
    expect(screen.getByText("Step two copy")).toBeInTheDocument();
    expect(screen.getByTestId("activity-timeline-container")).toBeInTheDocument();
  });

  it("hides timeline when collapsed", () => {
    render(
      <PaymentDetailsTimelineCard
        steps={steps}
        onHeaderToggleClick={() => {}}
        headerExpanded={false}
      />
    );

    expect(
      screen.queryByTestId("activity-timeline-container")
    ).not.toBeInTheDocument();
  });

  it("calls onHeaderToggleClick from trailing control", async () => {
    const user = userEvent.setup();
    const onHeaderToggleClick = jest.fn();

    render(
      <PaymentDetailsTimelineCard
        steps={steps}
        onHeaderToggleClick={onHeaderToggleClick}
        headerExpanded
      />
    );

    await user.click(
      screen.getByTestId("payment-details-timeline-header-toggle")
    );
    expect(onHeaderToggleClick).toHaveBeenCalledTimes(1);
  });

  it("sets aria-expanded on toggle", () => {
    render(
      <PaymentDetailsTimelineCard
        steps={steps}
        onHeaderToggleClick={() => {}}
        headerExpanded={false}
      />
    );

    expect(screen.getByTestId("payment-details-timeline-header-toggle")).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });
});
