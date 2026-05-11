import React from "react";

import Badge from "../Badge/Badge";
import { BadgeWithoutShape, SegmentedControlCommon } from "./SegmentedControl.types";
import { onEnter, triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import { ID } from "../../utils/types";

import s from "./SegmentedControl.module.scss";

interface SegmentedCommonProps extends SegmentedControlCommon {
  activeTabID: ID
}

const MAX_TABS = 3;

const SegmentsCommon: React.FC<SegmentedCommonProps> = ({
  onChange,
  tabs = [],
  activeTabID,
  customClass = "",
}) => {
  const getActiveTabIndex = () => tabs?.findIndex(tab => tab.id === activeTabID)

  const getSliderStyles = () => {
    return {
      width: `${100 / (tabs?.slice(0, MAX_TABS)?.length || 1)}%`,
      transform: `translateX(${getActiveTabIndex() * 100}%)`
    }
  }

  const isBadgePresent = (badgeProps?: BadgeWithoutShape) => {
    return Object.keys(badgeProps || {}).length
  }

  const renderBadge = (badgeProps?: BadgeWithoutShape) => {
    if (!isBadgePresent(badgeProps)) {
      return null;
    }
    return (
      <Badge
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...badgeProps as BadgeWithoutShape}
        shape="count"
        customClass={cx(badgeProps?.customClass, s.badge)}
      />
    )
  }

  return (
    <div
      data-testid="segmented-container"
      className={cx(
        s.segmentedContainer,
        customClass
      )}
    >
      <ul
        role="tablist"
        data-testid="nav-tabs"
        className={s.navTabs}
      >
        <span
          className={s.slider}
          style={getSliderStyles()}
        />
        {tabs?.slice(0, MAX_TABS).map((tab) => (
          <li
            role="tab"
            aria-selected={activeTabID === tab.id}
            aria-disabled={!!tab.disabled}
            tabIndex={0}
            data-testid={`tab-${tab.id}`}
            className={cx(s.tab, {
              [s.active]: activeTabID === tab.id,
              [s.hasBadge]: isBadgePresent(tab.badgeProps),
              [s.disabled]: activeTabID !== tab.id && !!tab.disabled
            })}
            key={tab.id}
            onClick={() => {
              if (!tab.disabled) {
                triggerCallback(onChange, tab)
              }
            }}
            onKeyUp={e => {
              if (!tab.disabled) {
                onEnter(e, onChange.bind(undefined, tab))
              }
            }}
          >
            <span className={s.tabTitle}>
              {tab.title}
            </span>
            {renderBadge(tab.badgeProps)}
          </li>
        ))}
      </ul>
    </div>
  )
};

export default SegmentsCommon;
