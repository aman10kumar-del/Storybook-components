import React, { useEffect, useState } from "react";
import { SnackbarProps } from "./Snackbar.types";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import s from "./Snackbar.module.scss";
import Button from "../Button/Button";

const Snackbar: React.FC<SnackbarProps> = ({
  text = "",
  context = "positive",
  autoHide = false,
  autoHideAfter = 5000,
  reserveSpaceForStatusBar = false,
  TrailingIcon,
  customClass = '',
  onHide,
  noClamp,
  position = "fixed",
  reserveSpaceForBottomBar = false,
  LeadingIcon,
  actionButton
}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (autoHide) {
      const timeoutId = setTimeout(() => {
        setShow(false)
        triggerCallback(onHide)
      }, autoHideAfter)

      return () => clearTimeout(timeoutId)
    }
  }, [autoHide, autoHideAfter, onHide])

  useEffect(() => {
    const nextShow = !!text
    setShow(nextShow)
    if (!nextShow) {
      triggerCallback(onHide)
    }
  }, [text])

  return (
    <div
      role="alert"
      data-testid="snackbar-container"
      className={cx(s.snackbar, `${s[context]}`, `${s[position]}`, {
        [s.hide]: !show,
        [s.extraPaddingTop]: reserveSpaceForStatusBar,
        [s.extraMarginBottom]: reserveSpaceForBottomBar,
        [s.clamp]: !noClamp,
        [s.leftAlign]: actionButton || position === "floating"
      }, customClass)}
    >
      {LeadingIcon && <span data-testid="leading-icon" className={s.icon}>{LeadingIcon}</span>}
      <span className={s.label} data-testid="label">{text}</span>
      {!LeadingIcon && TrailingIcon && <span data-testid="trailing-icon" className={s.icon}>{TrailingIcon}</span>}
      {actionButton && (
        <Button
          type="stroke"
          customClass={cx(s.actionButton, actionButton.customClass)}
          size="small"
          {...actionButton}
        />
      )}
    </div>
  );
};

export default React.memo(Snackbar);
