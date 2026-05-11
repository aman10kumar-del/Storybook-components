import React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react"

import Tabs from "./Tabs"
import { Tab } from "./Tabs.types";

const TABS = [
  {
    id: "1",
    title: "Tab1",
  },
  { 
    id: "2",
    title: "Tab2"
  },
  { 
    id: "3",
    title: "Tab3",
    disabled: true
  }]

const TABS_WITH_BADGE: Tab[] = [
  {
    id: "1",
    title: "Flights",
    badge: {
      context: "primary",
      label: "1"
    }
  }, 
  {
    id: "2",
    title: "Train",
    badge: {
      context: "positive",
      label: "2"
    }
  }, 
  {
    id: "3",
    title: "Bus",
    disabled: true,
    badge: {
      context: "negative",
      label: "3"
    }
  },
  {
    id: "4",
    title: "Auto",
    badge: {
      context: "notice",
      label: "4"
    }
  }
]

describe("Test Tabs", () => {

  test("is present", () => {
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={() => {}}
      />
    ));
    const card = screen.getByTestId("tabs-container")
    expect(card).toBeInTheDocument();
  })

  test("default", () => {
    render((
      //@ts-ignore
      <Tabs 
        tabs={TABS}
      />
    ));
    const tab1 = screen.getByTestId("tab-1")
    expect(tab1).toHaveClass("active")
  })

  test("uncontrolled tab - click changes active tab", () => {
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
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

  test("uncontrolled tab - click triggers onChange", () => {
    const onChange = jest.fn();
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
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

  test("uncontrolled tab - click does not change disabled tab", () => {
    const onChange = jest.fn();
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={onChange}
      />
    ));
    const tab1 = screen.getByTestId("tab-1")
    const tab3 = screen.getByTestId("tab-3")
    expect(tab3).toHaveClass("disabled")
    expect(tab1).toHaveClass("active")
    act(() => {
      fireEvent.click(tab3)
    })
    expect(tab1).toHaveClass("active")
    expect(tab3).not.toHaveClass("active")
    expect(onChange).not.toHaveBeenCalled()
  })

  test("controlled tab - click does not change active tab", () => {
    render((
      <Tabs 
        tabs={TABS}
        controlType="controlled"
        controlledTab={{
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

  test("controlled tab - click triggers onChange", () => {
    const onChange = jest.fn();
    render((
      <Tabs 
        tabs={TABS}
        controlType="controlled"
        controlledTab={{
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
  
  test("controlled tab - ", () => {
    let activeTabID = TABS[0].id
    const getComponent = () => (
      <Tabs 
        tabs={TABS}
        controlType="controlled"
        controlledTab={{
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

  test("controlled tab - click does not change disabled tab", () => {
    const onChange = jest.fn();
    render((
      <Tabs 
        tabs={TABS}
        controlType="controlled"
        controlledTab={{
          activeTabID: TABS[0].id
        }}
        onChange={onChange}
      />
    ));
    const tab1 = screen.getByTestId("tab-1")
    const tab3 = screen.getByTestId("tab-3")
    expect(tab3).toHaveClass("disabled")
    expect(tab1).toHaveClass("active")
    act(() => {
      fireEvent.click(tab3)
    })
    expect(tab1).toHaveClass("active")
    expect(tab3).not.toHaveClass("active")
    expect(onChange).not.toHaveBeenCalled()
  })

  test("badge is present", () => {
    render((
      <Tabs 
        tabs={TABS_WITH_BADGE}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={() => {}}
      />
    ));
    const badges = screen.getAllByTestId("badge")
    expect(badges).toHaveLength(4);
    expect(badges[0]).toHaveTextContent("1")
    expect(badges[3]).toHaveTextContent("4")
  })

  // Props validation tests
  test("renders with empty tabs array", () => {
    render((
      <Tabs 
        tabs={[]}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: "1"
        }}
        onChange={() => {}}
      />
    ));
    const tabsContainer = screen.getByTestId("tabs-container");
    const navTabs = screen.getByTestId("nav-tabs");
    expect(tabsContainer).toBeInTheDocument();
    expect(navTabs.children).toHaveLength(0);
  });

  test("renders with custom class", () => {
    const customClass = "custom-tabs";
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={() => {}}
        customClass={customClass}
      />
    ));
    const tabsContainer = screen.getByTestId("tabs-container");
    expect(tabsContainer).toHaveClass(customClass);
  });

  test("renders with separator", () => {
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={() => {}}
        separator
      />
    ));
    const tabsContainer = screen.getByTestId("tabs-container");
    expect(tabsContainer).toHaveClass("separator");
  });

  // Accessibility tests
  test("has correct ARIA attributes", () => {
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={() => {}}
      />
    ));
    const tab1 = screen.getByTestId("tab-1");
    const tab2 = screen.getByTestId("tab-2");
    
    expect(tab1).toHaveAttribute("role", "tab");
    expect(tab1).toHaveAttribute("aria-selected", "true");
    expect(tab2).toHaveAttribute("role", "tab");
    expect(tab2).toHaveAttribute("aria-selected", "false");
  });

  test("handles keyboard navigation", () => {
    const onChange = jest.fn();
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={onChange}
      />
    ));
    const tab2 = screen.getByTestId("tab-2");
    
    act(() => {
      fireEvent.keyUp(tab2, { key: "Enter" });
    });
    
    expect(onChange).toHaveBeenCalledWith(TABS[1]);
  });

  test("disabled tab ignores keyboard navigation", () => {
    const onChange = jest.fn();
    render((
      <Tabs 
        tabs={TABS}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS[0].id
        }}
        onChange={onChange}
      />
    ));
    const tab3 = screen.getByTestId("tab-3");
    
    act(() => {
      fireEvent.keyUp(tab3, { key: "Enter" });
    });
    
    expect(onChange).not.toHaveBeenCalled();
  });

  // Badge variation tests
  test("renders badge with custom class", () => {
    const customBadgeClass = "custom-badge";
    const tabsWithCustomBadge = [{
      ...TABS_WITH_BADGE[0],
      badge: {
        ...TABS_WITH_BADGE[0].badge!,
        customClass: customBadgeClass
      }
    }];

    render((
      <Tabs 
        tabs={tabsWithCustomBadge}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: tabsWithCustomBadge[0].id
        }}
        onChange={() => {}}
      />
    ));
    
    const badge = screen.getByTestId("badge");
    expect(badge).toHaveClass(customBadgeClass);
  });

  test("renders badges with different contexts", () => {
    render((
      <Tabs 
        tabs={TABS_WITH_BADGE}
        controlType="uncontrolled"
        unControlledTab={{
          initialActiveTabID: TABS_WITH_BADGE[0].id
        }}
        onChange={() => {}}
      />
    ));
    
    const badges = screen.getAllByTestId("badge");
    expect(badges[0]).toHaveClass("primary");
    expect(badges[1]).toHaveClass("positive");
    expect(badges[2]).toHaveClass("negative");
    expect(badges[3]).toHaveClass("notice");
  });
})