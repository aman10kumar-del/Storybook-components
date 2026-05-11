import React from "react";
import { AlertAction, AlertsProps } from "./Alerts.types";
import s from './Alerts.module.scss';
import cx from "../../utils/classNames"
import { triggerCallback } from "../../utils/utils";
import { ReactComponent as CrossIcon } from "../../assets/ultra-icons/system/nav/close.svg";
import Button from "../Button/Button";

const Alerts: React.FC<AlertsProps> = (props) => {
  const {
    active,
    title,
    subTitle,
    context = 'primary',
    layout = 'block',
    LeadingIcon,
    LargeLeadingIcon,
    showDismissIcon,
    triggerClose,
    customClass = '',
    action
  } = props;

  if (!active) {
    return null;
  }

  const isActionButtonPresent = (action?: AlertAction): action is AlertAction => {
    return typeof action !== "undefined" && Object.keys(action).length > 0
  }

  const renderActionButton = () => {
    if (!isActionButtonPresent(action)) {
      return null;
    }
    return (
      <Button
        size="small"
        {...action}
      />
    )
  }

  const renderActionSection = () => {
    if (!isActionButtonPresent(action) && !showDismissIcon) {
      return null;
    }
    return (
      <section className={s.actionSection}>
        {renderActionButton()}
        {showDismissIcon ? (
          <span className={s.crossIcon}>
            <CrossIcon
              data-testid="close-icon"
              onClick={() => {
                triggerCallback(triggerClose);
              }}
            />
          </span>
        ) : null}
      </section>
    )
  }

  return (
    <div
      role="alert"
      data-testid="alerts-container"
      className={cx(s.alertsContainer, s[layout], s[context], customClass)}
    >
      <section
        className={cx(s.contentSection, {
          [s.verticalPadding]: !title
        })}
      >
        {LeadingIcon ? (
          <div data-testid="leading-icon" className={cx(s.leadingIcon, {
            [s.large]: LargeLeadingIcon
          })}>
            {LeadingIcon}
          </div>
        ) : null}
        <div className={s.headings}>
          {title ? (
            <h5 className={s.title} data-testid="title">{title}</h5>
          ) : null}
          {subTitle ? (
            <p className={s.subTitle} data-testid="sub-title">{subTitle}</p>
          ) : null}
        </div>
      </section>
      {renderActionSection()}
    </div>
  )
};

export default Alerts;
