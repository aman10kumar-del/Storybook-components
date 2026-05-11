import React, { useEffect, useState } from "react";

import {
  BadgeWithoutShape,
  ControlledTabs, Tab, TabsProps, UnControlledTabs
} from "./Tabs.types";
import { onEnter, triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import s from "./Tabs.module.scss";
import Badge from "../Badge/Badge";

const Tabs: React.FC<TabsProps> = (props) => {
  const {
    controlType = "uncontrolled",
    onChange,
    tabs = [],
    customClass = "",
    separator = false,
  } = props;

  const getActiveTabForControlled = () => {
    const { controlType } = props;
    if (controlType !== "controlled") {
      return null
    }
    return (props as ControlledTabs).controlledTab?.activeTabID
  }

  const getActiveTab = () => {
    return (
      (controlType === "controlled"
        ? getActiveTabForControlled()
        : (props as UnControlledTabs).unControlledTab?.initialActiveTabID)
      || tabs[0]?.id
    );
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    const { controlType } = props;
    const newActiveTabFromProps = getActiveTabForControlled();
    if (
      controlType === "controlled"
      && (typeof newActiveTabFromProps === "number" || typeof newActiveTabFromProps === "string")
      && activeTab !== newActiveTabFromProps
    ) {
      setActiveTab(newActiveTabFromProps);
    }
  }, [getActiveTabForControlled()]);

  const onTabSelected = (tab: Tab) => {
    if (controlType === "uncontrolled") {
      setActiveTab(tab.id);
    }
    triggerCallback(onChange, tab);
  }

  const renderBadge = (badge?: BadgeWithoutShape) => {
    if (!badge || !Object.keys(badge || {}).length) {
      return null;
    }
    return (
      <Badge
        customClass={cx(s.badge, badge.customClass)}
        shape="count"
        {...badge}
      />
    )
  }

  return (
    <div
      data-testid="tabs-container"
      className={cx(
        s.tabsContainer,
        {
          [s.separator]: separator,
        },
        customClass
      )}
    >
      <ul
        role="tablist"
        data-testid="nav-tabs"
        className={s.navTabs}
      >
        {tabs.map((tab) => (
          <li
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={0}
            data-testid={`tab-${tab.id}`}
            className={cx(s.tab, {
              [s.active]: activeTab === tab.id,
              [s.disabled]: activeTab !== tab.id && tab.disabled,
            })}
            key={tab.id}
            onClick={() => {
              if (!tab.disabled) {
                onTabSelected(tab)
              }
            }}
            onKeyUp={e => {
              if (!tab.disabled) {
                onEnter(e, onTabSelected.bind(undefined, tab))
              }
            }}
          >
            <span>{tab.title}</span>
            {renderBadge(tab.badge)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Tabs);
