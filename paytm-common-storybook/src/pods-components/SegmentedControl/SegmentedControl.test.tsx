import React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react"

import SegmentedControl from "./SegmentedControl"
import { Tab } from "./SegmentedControl.types";

const TABS = [
  {
    id: "1",
    title: "Tab1",
  },
  { 
    id: "2",
    title: "Tab2",
  },
  { 
    id: "3",
    title: "Tab3"
  }]

describe("Test SegmentedControl", () => {

  test("is present", () => {
    render((
      <SegmentedControl 
        tabs={TABS}
        controlType="uncontrolled"
        unControlled={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={() => {}}
      />
    ));
    const container = screen.getByTestId("segmented-container")
    expect(container).toBeInTheDocument();
  })

  test("default - with tabs", () => {
    render((
      //@ts-ignore
      <SegmentedControl 
        tabs={TABS}
      />
    ));
    const tab1 = screen.getByTestId("tab-1")
    expect(tab1).toHaveClass("active")
  })

  test("uncontrolled - defaults", () => {
    render((
      //@ts-ignore
      <SegmentedControl 
      />
    ));
    const container = screen.getByTestId("segmented-container")
    expect(container).toBeInTheDocument();
  })

  test("uncontrolled - click changes active tab", () => {
    render((
      <SegmentedControl 
        tabs={TABS}
        controlType="uncontrolled"
        unControlled={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={() => {}}
      />
    ));
    const tab1 = screen.getByTestId("tab-1")
    const tab2 = screen.getByTestId("tab-2")
    expect(tab1).toHaveClass("active")
    act(() => {
      fireEvent.click(tab2)
    })
    expect(tab1).not.toHaveClass("active")
    expect(tab2).toHaveClass("active")
  })

  test("uncontrolled - click triggers onChange", () => {
    const onChange = jest.fn();
    render((
      <SegmentedControl 
        tabs={TABS}
        controlType="uncontrolled"
        unControlled={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={onChange}
      />
    ));
    const tab2 = screen.getByTestId("tab-2")
    act(() => {
      fireEvent.click(tab2)
    })
    expect(onChange).toHaveBeenCalledWith(TABS[1])
  })

  test("controlled - defaults", () => {
    render((
      //@ts-ignore
      <SegmentedControl
        controlType="controlled" 
      />
    ));
    const container = screen.getByTestId("segmented-container")
    expect(container).toBeInTheDocument();
  })

  test("controlled - click does not change active tab", () => {
    render((
      <SegmentedControl 
        tabs={TABS}
        controlType="controlled"
        controlled={{
          activeTabID: TABS[0].id
        }}
        onChange={() => {}}
      />
    ));
    const tab1 = screen.getByTestId("tab-1")
    const tab2 = screen.getByTestId("tab-2")
    expect(tab1).toHaveClass("active")
    act(() => {
      fireEvent.click(tab2)
    })
    expect(tab1).toHaveClass("active")
    expect(tab2).not.toHaveClass("active")
  })

  test("controlled - click triggers onChange", () => {
    const onChange = jest.fn();
    render((
      <SegmentedControl 
        tabs={TABS}
        controlType="controlled"
        controlled={{
          activeTabID: TABS[0].id
        }}
        onChange={onChange}
      />
    ));
    const tab2 = screen.getByTestId("tab-2")
    act(() => {
      fireEvent.click(tab2)
    })
    expect(onChange).toHaveBeenCalledWith(TABS[1])
  })
  
  test("controlled - change active tab", () => {
    let activeTabID = TABS[0].id
    const getComponent = () => (
      <SegmentedControl 
        tabs={TABS}
        controlType="controlled"
        controlled={{
          activeTabID
        }}
        onChange={() => {}}
      />
    );
    const {rerender} =render(getComponent());
    const tab1 = screen.getByTestId("tab-1")
    const tab2 = screen.getByTestId("tab-2")
    expect(tab1).toHaveClass("active")
    expect(tab2).not.toHaveClass("active")
    activeTabID = TABS[1].id
    rerender(getComponent())
    expect(tab1).not.toHaveClass("active")
    expect(tab2).toHaveClass("active")
  })

  // Badge Tests
  test("renders badge when badgeProps is provided", () => {
    const tabsWithBadge: Tab[] = [
      {
        id: "1",
        title: "Tab1",
        badgeProps: {
          label: "5",
          context: "notice",
          customClass: "custom-badge"
        }
      },
      ...TABS.slice(1)
    ];

    render((
      <SegmentedControl 
        tabs={tabsWithBadge}
        controlType="uncontrolled"
        unControlled={{
          initialActiveTabID: tabsWithBadge[0].id
        }}
        onChange={() => {}}
      />
    ));
    
    const badge = screen.getByText("5");
    expect(badge).toBeInTheDocument();
  });

  test("does not render badge when badgeProps is empty", () => {
    const tabsWithEmptyBadge: Tab[] = [
      {
        id: "1",
        title: "Tab1",
      },
      ...TABS.slice(1)
    ];

    render((
      <SegmentedControl 
        tabs={tabsWithEmptyBadge}
        controlType="uncontrolled"
        unControlled={{
          initialActiveTabID: tabsWithEmptyBadge[0].id
        }}
        onChange={() => {}}
      />
    ));
    
    const tab = screen.getByTestId("tab-1");
    expect(tab.querySelector(".badge")).toBeNull();
  });

  // Disabled Tab Tests
  test("disabled tab cannot be clicked", () => {
    const tabsWithDisabled = [
      {
        id: "1",
        title: "Tab1"
      },
      {
        id: "2",
        title: "Tab2",
        disabled: true
      },
      {
        id: "3",
        title: "Tab3"
      }
    ];

    const onChange = jest.fn();
    render((
      <SegmentedControl 
        tabs={tabsWithDisabled}
        controlType="uncontrolled"
        unControlled={{
          initialActiveTabID: tabsWithDisabled[0].id
        }}
        onChange={onChange}
      />
    ));
    
    const disabledTab = screen.getByTestId("tab-2");
    expect(disabledTab).toHaveAttribute("aria-disabled", "true");
    
    act(() => {
      fireEvent.click(disabledTab);
    });
    
    expect(onChange).not.toHaveBeenCalled();
    expect(disabledTab).toHaveClass("disabled");
  });

  // Max Tabs Tests
  test("renders maximum of 3 tabs when more are provided", () => {
    const extraTabs = [
      ...TABS,
      {
        id: "4",
        title: "Tab4"
      },
      {
        id: "5",
        title: "Tab5"
      }
    ];

    render((
      <SegmentedControl 
        tabs={extraTabs}
        controlType="uncontrolled"
        unControlled={{
          initialActiveTabID: extraTabs[0].id
        }}
        onChange={() => {}}
      />
    ));
    
    const allTabs = screen.getAllByRole("tab");
    expect(allTabs).toHaveLength(3);
    expect(screen.queryByText("Tab4")).not.toBeInTheDocument();
    expect(screen.queryByText("Tab5")).not.toBeInTheDocument();
  });

  // Custom Class Tests
  test("applies custom class to container", () => {
    const customClass = "custom-segmented-control";
    render((
      <SegmentedControl 
        tabs={TABS}
        controlType="uncontrolled"
        unControlled={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={() => {}}
        customClass={customClass}
      />
    ));
    
    const container = screen.getByTestId("segmented-container");
    expect(container).toHaveClass(customClass);
  });

})