import React, { Fragment } from "react";
import { ButtonProps } from "./Button.types";
import s from "./Button.module.scss";
import cx from "../../utils/classNames";
import Loader from "../Loader/Loader";

const Button: React.FC<ButtonProps> = function ({
  type = "filled",
  size = "large",
  LeadingIcon,
  TrailingIcon,
  customClass = "",
  disabled = false,
  label = "",
  onClick,
  loading = false,
  ariaExpanded,
  ariaLabel,
}) {

  const isIconOnly = () => !label && (TrailingIcon || LeadingIcon);

  const getLoaderSize = () => {
    if (size === "large") {
      return "large";
    }
    if (size === "medium") {
      return "medium";
    }
    return "small";
  };

  const renderButtonElements = () => {
    if (loading && !disabled) {
      return (
        <Loader
          data-testid="loader"
          type={type === "filled" ? "monotone" : "theme"}
          size={getLoaderSize()}
        />
      );
    }

    return (
      <Fragment>
        <div
          className={s.titleSection}
        >
          {!TrailingIcon && LeadingIcon && (
            <span className={s.leadingIcon} data-testid="leading-icon">
              {LeadingIcon}
            </span>
          )}
          {label && <span className={s.label} data-testid="label">{label}</span>}
          {TrailingIcon && (
            <span className={s.trailingIcon} data-testid="trailing-icon">
              {TrailingIcon}
            </span>
          )}
        </div>
      </Fragment>
    );
  };



  return (
    <button
      aria-label={ariaLabel ?? (label || "button")}
      aria-expanded={ariaExpanded}
      className={cx(
        s.button,
        s[type],
        s[size],
        {
          [s.iconOnly]: isIconOnly(),
          [s.withIcon]: TrailingIcon || LeadingIcon
        },
        customClass
      )}
      disabled={disabled}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      data-testid="button"
    >
      {renderButtonElements()}
    </button>
  );
};

export default Button;


