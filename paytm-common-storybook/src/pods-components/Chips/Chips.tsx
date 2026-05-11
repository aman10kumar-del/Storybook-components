import React from "react";
import {
	ChipsProps,
} from "./Chips.types";
import { onEnter, triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import s from "./Chips.module.scss";
import Badge from "../Badge/Badge";
import { BadgeWithoutShape } from "./Chips.types";

const Chips: React.FC<ChipsProps> = (props) => {
	const {
    type = 'normal',
    customClass = '',
    size = 'regular',
    dottedOutline = false,
    enabled = true,
    selected = false,
    label = '',
    title,
    LeadingIcon,
    TrailingIcon,
    badgeProps,
    itemLayoutProps,
    borderRadius,
  } = props;

  const onChipsClick = () => {
    if (!enabled) {
      return;
    }
    triggerCallback(props.onClick, props.label);
  };

  const isBadgePresent = (badgeProps?: BadgeWithoutShape) => {
    return Object.keys(badgeProps || {}).length;
  };

  const renderBadge = (badgeProps?: BadgeWithoutShape) => {
    if (!isBadgePresent(badgeProps)) {
      return null;
    }
    return (
      <Badge
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(badgeProps as BadgeWithoutShape)}
        shape="count"
        customClass={cx(badgeProps?.customClass, s.badge)}
      />
    );
  };

  const renderTrailingContent = (
    badgeProps?: BadgeWithoutShape,
    TrailingIcon?: React.ReactElement
  ) => {
    if (badgeProps) {
      return renderBadge(badgeProps);
    }
    if (TrailingIcon) {
      return (
        <span className={s.trailingIcon} data-testid="trailing-icon">
          {TrailingIcon}
        </span>
      );
    }
    return null;
  };

  const getInlineStyles = () => {
    const styles: React.CSSProperties = {};

    if (itemLayoutProps && !selected) {
      if (itemLayoutProps.bg_color) {
        styles.backgroundColor = itemLayoutProps.bg_color;
      }

      if (itemLayoutProps.border_color) {
        styles.border = `1px solid ${itemLayoutProps.border_color}`;
      }
    }

    if (borderRadius) {
      styles.borderRadius = borderRadius;
    }

    return styles;
  };

  const getLabelStyles = () => {
    if (selected || !itemLayoutProps?.label_text_color) {
      return {};
    }
    return { color: itemLayoutProps.label_text_color };
  };

  const getTitleStyles = () => {
    if (selected || !itemLayoutProps?.title_text_color) {
      return {};
    }
    return { color: itemLayoutProps.title_text_color };
  };

  const renderContent = () => {
    return (
      <>
        {LeadingIcon && (
          <span className={s.leadingIcon} data-testid="leading-icon">
            {LeadingIcon}
          </span>
        )}
        {label && (
          <span className={s.labelContainer} data-testid="label-container">
            <span
              className={s.label}
              data-testid="label"
              style={getLabelStyles()}
            >
              {label}
            </span>
            {title && (
              <span
                className={s.title}
                data-testid="title"
                style={getTitleStyles()}
              >
                {title}
              </span>
            )}
          </span>
        )}
        {renderTrailingContent(badgeProps, TrailingIcon)}
      </>
    );
  };

  return (
    <div
      role="button"
      tabIndex={enabled ? 0 : -1}
      data-testid={type}
      className={cx(
        s.chips,
        s[type],
        s[size],
        {
          [s.dotted]: dottedOutline,
          [s.disabled]: !enabled,
          [s.selected]: selected,
          [s.hasLeadingElements]: LeadingIcon,
          [s.hasTrailingElements]: TrailingIcon || isBadgePresent(badgeProps),
        },
        customClass
      )}
      style={getInlineStyles()}
      onClick={onChipsClick}
      onKeyUp={(e) => {
        onEnter(e, onChipsClick);
      }}
    >
      {renderContent()}
    </div>
  );
};

export default Chips;
