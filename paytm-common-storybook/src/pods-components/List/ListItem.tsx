import React from "react";

import { triggerCallback } from "../../utils/utils";
import Avatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";
import { BadgeProps } from "../Badge/Badge.types";
import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import { CheckboxProps } from "../Checkbox/Checkbox.types";
import RadioButton from "../RadioButton/RadioButton";
import { RadioButtonProps } from "../RadioButton/RadioButton.types";
import Separator from "../Separator/Separator";
import Switch from "../Switch/Switch";
import { SwitchProps } from "../Switch/Switch.types";
import { StatusTypes, CustomButton, CustomAvatar, ListItemProps } from "./List.types";
import { ReactComponent as FailedIcon } from "../../assets/ultra-icons/system/status/failed_themed.svg";
import { ReactComponent as WarningIcon } from "../../assets/ultra-icons/system/status/pending_themed.svg";
import { ReactComponent as SuccessIcon } from "../../assets/ultra-icons/system/status/success_themed.svg";
import cx from "../../utils/classNames";

import s from "./List.module.scss"

const MAX_TERTIARY_ICONS = 2;

const ListItem: React.FC<ListItemProps> = (props) => {

  const {
    id,
    leading,
    primary,
    secondary,
    tertiary,
    PrimaryIcon,
    TertiaryIcons,
    onClick,
    separator = true,
    customClass,
    trailing
  } = props;

  const getStatusContents = (status: StatusTypes, statusText?: string) => {
    switch (status) {
      case "success":
        return {
          text: statusText || "Success",
          Icon: <SuccessIcon />,
        };
      case "warning":
        return {
          text: statusText || "Pending",
          Icon: <WarningIcon />,
        };
      case "failiure":
        return {
          text: statusText || "Failed",
          Icon: <FailedIcon />,
        };
      default:
        return {}
    }
  };

  const renderTrailingStatus = (status: StatusTypes, statusText?: string) => {
    const statusContents = getStatusContents(status, statusText);
    return (
      <div className={s.trailingStatusContainer}>
        <span data-testid="trailing-status-icon" className={s.statusIcon}>
          {statusContents.Icon}
        </span>
        <span
          data-testid="trailing-status-text"
          className={cx(s.statusText, `${s[status]}`)}
        >
          {statusContents.text}
        </span>
      </div>
    );
  };

  const renderTrailingBadge = (badge: BadgeProps) => (
    <span data-testid="trailing-badge" className={s.trailingBadge}>
      <Badge
        {...badge}
      />
    </span>
  );

  const renderTrailingDetail = (detail: string) => (
    <span data-testid="trailing-detail" className={s.trailingDetail}>
      {detail}
    </span>
  );

  const renderTrailingLegend = (legend: string) => (
    <span data-testid="trailing-legend" className={s.trailingLegend}>
      {legend}
    </span>
  );

  const renderTrailingMeta = (meta: string) => (
    <span data-testid="trailing-meta" className={s.trailingMeta}>
      {meta}
    </span>
  );

  const renderTrailingCheckbox = (checkboxProps: CheckboxProps) => (
    <span data-testid="trailing-checkbox" className={s.trailingCheckbox}>
      <Checkbox {...checkboxProps} />
    </span>
  );

  const renderTrailingRadio = (radioProps: RadioButtonProps) => (
    <span data-testid="trailing-radio" className={s.trailingRadio}>
      <RadioButton {...radioProps} />
    </span>
  );

  const renderTrailingButton = (buttonProps: CustomButton) => (
    <span data-testid="trailing-button" className={s.trailingButton}>
      <Button size="medium" type="stroke" {...buttonProps} />
    </span>
  );

  const renderTrailingSwitch = (switchProps: SwitchProps) => (
    <span data-testid="trailing-switch" className={s.trailingSwitch}>
      <Switch {...switchProps} />
    </span>
  );

  const renderTrailingAvatar = (
    avatarProps: CustomAvatar,
    size: "small" | "regular" = "regular",
  ) => (
    <span data-testid="trailing-avatar" className={s.trailingAvatar}>
      <Avatar size={size} {...avatarProps} />
    </span>
  );

  const renderTrailingSection = () => {
    let content = null;

    if (!trailing) return null;

    switch (trailing.type) {
      case "badge":
        content = renderTrailingBadge(trailing.badge);
        break;
      case "button":
        content = renderTrailingButton(trailing.button);
        break;
      case "checkbox":
        content = renderTrailingCheckbox(trailing.checkbox);
        break;
      case "icon":
        content = (
          <span data-testid="trailing-icon" className={s.trailingIcon}>
            {trailing.Icon}
          </span>
        );
        break;
      case "avatar":
        content = renderTrailingAvatar(trailing.avatar, trailing.size);
        break;
      case "link":
        content = (
          <span data-testid="trailing-link" className={s.trailingLink}>
            <span className={s.linkText}>{trailing.Link}</span>
            <span className={s.linkIcon}>{trailing.LinkIcon}</span>
          </span>
        );
        break;
      case "switch":
        content = renderTrailingSwitch(trailing.switch);
        break;
      case "radio":
        content = renderTrailingRadio(trailing.radio);
        break;
      case "detail":
        content = renderTrailingDetail(trailing.detail);
        break;
      case "legend":
        content = renderTrailingLegend(trailing.legend);
        break;
      case "meta":
        content = renderTrailingMeta(trailing.meta);
        break;
      case "status":
        content = renderTrailingStatus(
          trailing.statusMode,
          trailing.status
        );
        break;
      case "detail-with-meta":
        content = (
          <div className={s.detailWithMeta}>
            {renderTrailingDetail(trailing.detail)}
            {renderTrailingMeta(trailing.meta)}
          </div>
        );
        break;
      case "legend-with-status":
        content = (
          <div className={s.legendWithStatus}>
            {renderTrailingLegend(trailing.legend)}
            {renderTrailingStatus(
              trailing.statusMode,
              trailing.status
            )}
          </div>
        );
        break;
      case "meta-with-badge":
        content = (
          <div className={s.metaWithBadge}>
            {renderTrailingMeta(trailing.meta)}
            {renderTrailingBadge(trailing.badge)}
          </div>
        );
        break;
      default:
        content = null;
    }

    if (content === null) return null;
    return (
      <section
        data-testid="trailing-section"
        className={cx(s.trailingSection, {
          [s.topAlign]: trailing.position === "top"
        })}
      >
        {content}
      </section>
    );
  };

  const renderLeadingIcon = (icon: React.ReactElement, size: "small" | "regular" = "regular") => (
    <span data-testid="leading-icon" className={cx(s.leadingIcon, {
      [s.small]: size === "small"
    })}>
      {icon}
    </span>
  );

  const renderLeadingCheckbox = (checkboxProps: CheckboxProps) => (
    <span data-testid="leading-checkbox" className={s.leadingCheckbox}>
      <Checkbox {...checkboxProps} id={id} />
    </span>
  );

  const renderLeadingRadio = (radioProps: RadioButtonProps) => (
    <span data-testid="leading-radio" className={s.leadingRadio}>
      <RadioButton {...radioProps} />
    </span>
  );

  const renderLeadingAvatar = (avatarProps: CustomAvatar, size: "small" | "regular" = "regular") => (
    <span data-testid="leading-avatar" className={s.leadingAvatar}>
      <Avatar size={size} {...avatarProps} />
    </span>
  );

  const renderLeadingSection = () => {
    if (!leading) return null;

    let content = null;
    switch (leading.type) {
      case "icon":
        content = renderLeadingIcon(leading.Icon, leading.size);
        break;
      case "checkbox":
        content = renderLeadingCheckbox(leading.checkbox);
        break;
      case "radio":
        content = renderLeadingRadio(leading.radio);
        break;
      case "avatar":
        content = renderLeadingAvatar(leading.avatar, leading.size);
        break;
      default:
        content = null;
    }

    if (content === null) return null;
    return (
      <section
        data-testid="leading-section"
        className={cx(s.leadingSection, {
          [s.topAlign]: leading.position === "top"
        })}
      >
        {content}
      </section>
    );
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      data-testid={`list-item-${id}`}
      className={cx(s.listItem, customClass)}
      onClick={() => {
        triggerCallback(onClick, id);
      }}
    >
      {renderLeadingSection()}
      <section className={s.mainSection}>
        <section className={s.mainContents}>
          <section
            className={cx(s.texts, {
              [s.minimalHeight]: !leading,
            })}
          >
            <div className={cx(s.primary, {
              [s.withIcon]: PrimaryIcon
            })}>
              <span data-testid="primary" className={s.primaryText}>
                {primary}
              </span>
              {PrimaryIcon && (
                <span
                  data-testid="primary-icon"
                  className={s.primaryIcon}
                >
                  {PrimaryIcon}
                </span>
              )}
            </div>
            {secondary && (
              <div className={s.secondary}>
                <span
                  role="note"
                  data-testid="secondary"
                  className={s.secondaryText}
                >
                  {secondary}
                </span>
              </div>
            )}
            {tertiary && (
              <div className={s.tertiary}>
                {TertiaryIcons && (
                  TertiaryIcons?.slice(0, MAX_TERTIARY_ICONS)?.map(
                    (TertiaryIcon, idx) => (
                      <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx}
                        data-testid="tertiary-icon"
                        className={s.tertiaryIcon}
                      >
                        {TertiaryIcon}
                      </span>
                    )
                  ))}
                <span role="note" data-testid="tertiary" className={s.tertiaryText}>
                  {tertiary}
                </span>
              </div>
            )}
          </section>
          {renderTrailingSection()}
        </section>
        {separator && (
          <div className={s.separator}>
            <Separator hairline />
          </div>
        )}
      </section>
    </li>
  );
};

export default ListItem;