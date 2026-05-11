import React, { useState } from "react";

import { ReactComponent as ContactsIcon } from "../../assets/ultra-icons/system/social/contacts.svg";
import Loader from "../Loader/Loader";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import {
  ALPHANUMERIC_NAME_MAX_LENGTH,
  sanitizeAlphanumericName,
  sanitizeIndianMobileDigits,
} from "./indianMobileValidation";
import type { EnterMobileNumberProps } from "./EnterMobileNumber.types";
import s from "./EnterMobileNumber.module.scss";

const EnterMobileNumber: React.FC<EnterMobileNumberProps> = ({
  value,
  onChange,
  countryCode = "+91",
  placeholderMobile = "Enter Mobile Number",
  placeholderName = "Enter Name",
  placeholder,
  disabled = false,
  loading = false,
  error = "",
  assistiveText = "",
  showAssistiveWhenNoError = true,
  customClass = "",
  inputProps = {},
  inputAriaLabel = "Mobile number",
  inputAriaLabelName = "Name",
  showContacts = false,
  contactsLabel = "Contacts",
  onContactsClick,
  showInputModeSwitch = false,
  defaultInputMode = "numeric",
  onInputModeChange,
}) => {
  const [inputMode, setInputMode] = useState<"text" | "numeric">(
    defaultInputMode,
  );

  const mobilePlaceholder = placeholder ?? placeholderMobile;

  const toggleInputMode = () => {
    const next = inputMode === "numeric" ? "text" : "numeric";
    const nextValue =
      next === "numeric"
        ? sanitizeIndianMobileDigits(value)
        : sanitizeAlphanumericName(value);
    setInputMode(next);
    if (nextValue !== value) {
      onChange(nextValue);
    }
    triggerCallback(onInputModeChange, next);
  };

  const {
    onChange: inputOnChange,
    maxLength: inputMaxLength,
    inputMode: inputModeProp,
    ...restInputProps
  } = inputProps;

  const effectiveInputMode = showInputModeSwitch ? inputMode : "numeric";
  const isNameMode = showInputModeSwitch && effectiveInputMode === "text";
  const resolvedPlaceholder = isNameMode ? placeholderName : mobilePlaceholder;
  const resolvedAriaLabel = isNameMode ? inputAriaLabelName : inputAriaLabel;
  const resolvedAutoComplete = isNameMode ? "name" : "tel-national";
  const resolvedMaxLength =
    inputMaxLength ?? (isNameMode ? ALPHANUMERIC_NAME_MAX_LENGTH : 10);

  return (
    <div data-testid="enter-mobile-number" className={cx(s.root, customClass)}>
      <div className={s.row}>
        <div
          className={cx(s.pill, {
            [s.error]: Boolean(error),
            [s.disabled]: disabled && !loading,
            [s.loading]: loading,
          })}
        >
          <span className={s.prefix} aria-hidden="true">
            {countryCode}
          </span>
          {loading ? (
            <div className={s.loaderWrap}>
              <Loader type="theme" size="small" />
            </div>
          ) : (
            <>
              <input
                data-testid="enter-mobile-number-input"
                className={s.input}
                type="text"
                inputMode={inputModeProp ?? effectiveInputMode}
                autoComplete={resolvedAutoComplete}
                maxLength={resolvedMaxLength}
                placeholder={resolvedPlaceholder}
                disabled={disabled}
                value={value}
                aria-label={resolvedAriaLabel}
                aria-invalid={Boolean(error)}
                onChange={(e) => {
                  const raw = e.target.value;
                  const next = isNameMode
                    ? sanitizeAlphanumericName(raw)
                    : sanitizeIndianMobileDigits(raw);
                  triggerCallback(inputOnChange, e);
                  onChange(next);
                }}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...restInputProps}
              />
              {showInputModeSwitch && (
                <>
                  <div className={s.divider} aria-hidden="true" />
                  <button
                    type="button"
                    data-testid="enter-mobile-number-mode-toggle"
                    className={s.modeToggle}
                    disabled={disabled}
                    aria-label={
                      inputMode === "numeric"
                        ? "Using number keyboard. Switch to letters"
                        : "Using letter keyboard. Switch to numbers"
                    }
                    aria-pressed={inputMode === "numeric"}
                    onClick={toggleInputMode}
                  >
                    {inputMode === "numeric" ? "123" : "ABC"}
                  </button>
                </>
              )}
            </>
          )}
        </div>
        {showContacts && (
          <button
            type="button"
            data-testid="enter-mobile-number-contacts"
            className={s.contacts}
            disabled={disabled || loading}
            onClick={() => triggerCallback(onContactsClick)}
          >
            <span className={s.contactsIcon}>
              <ContactsIcon />
            </span>
            <span className={s.contactsLabel}>{contactsLabel}</span>
          </button>
        )}
      </div>
      {(error || (assistiveText && showAssistiveWhenNoError && !error)) && (
        <section className={s.infoSection} role="note">
          {error ? (
            <span data-testid="enter-mobile-number-error" className={s.errorText}>
              {error}
            </span>
          ) : (
            <span data-testid="enter-mobile-number-assistive">{assistiveText}</span>
          )}
        </section>
      )}
    </div>
  );
};

export default React.memo(EnterMobileNumber);
