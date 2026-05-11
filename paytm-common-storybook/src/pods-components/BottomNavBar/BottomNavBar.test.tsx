import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import BottomNavBar from './BottomNavBar';
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg";

describe("Test BottomNavBar", () => {
  test("is present", () => {
    render((
      <BottomNavBar
        onClick={() => { }}
        options={[]}
      />
    ));
    const container = screen.getByTestId("bottom-nav-bar-container");
    expect(container).toBeInTheDocument();
  });

  test("label present", () => {
    render((
      <BottomNavBar
        onClick={() => { }}
        options={[
          { id: "1", label: "One", icon: <InfoIcon /> },
          { id: "2", label: "Two", icon: <InfoIcon /> },
          { id: "3", label: "Three", icon: <InfoIcon /> }
        ]}
      />
    ));
    const labels = screen.getAllByTestId("label");
    expect(labels).toHaveLength(3);
    expect(labels[0]).toHaveTextContent("One");
    expect(labels[1]).toHaveTextContent("Two");
    expect(labels[2]).toHaveTextContent("Three");
  });

  test("badge present", async () => {
    const { findAllByTestId } = render((
      <BottomNavBar
        onClick={() => { }}
        options={[
          { id: "1", label: "One", icon: <InfoIcon />, badgeProps: { label: '2', context: 'primary' } },
          { id: "2", label: "Two", icon: <InfoIcon />, badgeProps: { label: '3', context: 'primary' } },
          { id: "3", label: "Three", icon: <InfoIcon /> }
        ]}
      />
    ));
    const badges = await findAllByTestId("badge");
    expect(badges).toHaveLength(2);
    expect(badges[0]).toHaveTextContent("2");
    expect(badges[1]).toHaveTextContent("3");
  });

  test("nav bar item onclick", () => {
    const onClick = jest.fn();
    render(
      <BottomNavBar
        onClick={onClick}
        options={[
          { id: "1", label: "One", icon: <InfoIcon /> },
          { id: "2", label: "Two", icon: <InfoIcon /> },
          { id: "3", label: "Three", icon: <InfoIcon /> }
        ]}
      />
    );
    const item1 = screen.getByTestId("nav-bar-item-0")
    fireEvent.click(item1);
    expect(onClick).toHaveBeenCalledWith({ id: "1", label: "One", icon: <InfoIcon /> })
  });

  test("check nav bar item active", () => {
    render(
      <BottomNavBar
        onClick={() => { }}
        options={[
          { id: "1", label: "One", icon: <InfoIcon />, active: true },
          { id: "2", label: "Two", icon: <InfoIcon /> },
          { id: "3", label: "Three", icon: <InfoIcon /> }
        ]}
      />
    );
    const item1 = screen.getByTestId("nav-bar-item-0")
    expect(item1).toHaveClass('active');
  });

  // Icon rendering test cases
  test("renders icon correctly", () => {
    render(
      <BottomNavBar
        onClick={() => { }}
        options={[
          { id: "1", label: "One", icon: <InfoIcon /> }
        ]}
      />
    );
    const iconContainer = screen.getByTestId("icon");
    expect(iconContainer).toBeInTheDocument();
    expect(iconContainer.querySelector(".icon")).toBeInTheDocument();
  });

});