import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PassbookAccountTile from "./PassbookAccountTile";
import PassbookGraphicTile from "./PassbookGraphicTile";
import { PassbookTileRow } from "./PassbookTileRow";

describe("PassbookAccountTile", () => {
  test("renders CTA and fires onCtaClick", async () => {
    const user = userEvent.setup();
    const onCtaClick = jest.fn();
    render(
      <PassbookAccountTile
        title="Axis Bank"
        subtitle="A/c No - 1"
        leading={<span data-testid="logo">L</span>}
        onCtaClick={onCtaClick}
      />,
    );
    expect(screen.getByTestId("passbook-account-tile")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /check balance/i }));
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  test("loading state shows Button with built-in loader", () => {
    render(
      <PassbookAccountTile
        title="Axis Bank"
        subtitle="A/c No - 1"
        leading={<span>L</span>}
        actionState="loading"
      />,
    );
    expect(screen.getByTestId("button")).toBeInTheDocument();
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("balance state shows amount", () => {
    render(
      <PassbookAccountTile
        title="Axis Bank"
        subtitle="A/c No - 1"
        leading={<span>L</span>}
        actionState="balance"
        balanceText="₹100"
      />,
    );
    expect(screen.getByText("₹100")).toBeInTheDocument();
  });
});

describe("PassbookGraphicTile", () => {
  test("renders label lines", () => {
    render(
      <PassbookGraphicTile label={"Line1\nLine2"} footer={<span>f</span>} />,
    );
    expect(screen.getByText("Line1")).toBeInTheDocument();
    expect(screen.getByText("Line2")).toBeInTheDocument();
  });

  test("optional click handler", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<PassbookGraphicTile label="Tap" onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: /tap/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("PassbookTileRow", () => {
  test("renders children", () => {
    render(
      <PassbookTileRow>
        <span data-testid="child">x</span>
      </PassbookTileRow>,
    );
    expect(screen.getByTestId("passbook-tile-row")).toBeInTheDocument();
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
