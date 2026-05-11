import React, { useMemo } from "react";

import { PasscodeProps } from "./Passcode.types";
import { onEnter, triggerCallback } from "../../utils/utils";
import s from "./Passcode.module.scss";

const Passcode: React.FC<PasscodeProps> = ({
  value = "",
  inputLength = 6,
  onChange,
  title = "Passcode",
  customClass = "",
  error = "",
  alternativeActionText = "",
  forgotPasscodeText = "Forgot Passcode?",
  onAlternativeActionClick = () => {},
  onForgotPasscodeClick = () => {},
  inputProps = {}
}) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items = [];

    for (let i = 0; i < inputLength; i++) {
      items.push(valueArray[i] && valueArray[i] !== " " ? valueArray[i] : "")
    }
    return items;
  }, [value, inputLength]);

  const focusToNextInput = (target: HTMLInputElement) => {
    // eslint-disable-next-line operator-linebreak
    const nextElementSibling =
      target.parentElement?.nextElementSibling?.firstChild as HTMLInputElement;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const focusToPrevInput = (target: HTMLInputElement) => {
    // eslint-disable-next-line operator-linebreak
    const previousElementSibling =
      target.parentElement?.previousElementSibling?.firstChild as HTMLInputElement;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const focusCurrentElement = (target: HTMLElement) => {
    const currentElement = target.previousElementSibling as HTMLInputElement;

    if (currentElement) {
      currentElement.focus();
    }
  };

	const manageElementFocus = (target: HTMLInputElement, newValue: string) => {
		if (newValue.replace(/\s/, '').length >= inputLength) {
			target.blur();
			return;
		}
		focusToNextInput(target);
	}

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const targetValue = e.target?.value?.trim() || " ";
    const currentValue = valueItems?.map(v => (v === '' ? ' ' : v))?.join('');
    // eslint-disable-next-line operator-linebreak
    const newValue =
      currentValue.substring(0, idx) + targetValue + currentValue.substring(idx + 1);
    triggerCallback(onChange, newValue);
    if (targetValue === " ") {
      return;
    }
    manageElementFocus(e.target, newValue);
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      focusToNextInput(target);
      return;
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      focusToPrevInput(target);
      return;
    }

    const targetValue = target.value;
    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);
    if (e.key === "Backspace" && targetValue === "") {
      focusToPrevInput(target);
    }
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { target } = e;
    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div data-testid="passcode-container" className={`${s.passcodeContainer} ${customClass}`}>
      <span data-testid="custom-title" className={s.title}>{title}</span>
      <div className={s.passcodeBoxes}>
        {valueItems.map((value, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className={s.passcodeBox}
          >
            <input
              aria-label={`passcode-box-${idx}`}
              data-testid={`passcode-box-${idx}`}
              type="password"
              autoComplete="on"
              maxLength={1}
              value={value}
              onChange={(e) => inputOnChange(e, idx)}
              onKeyDown={(e) => inputOnKeyDown(e)}
              onFocus={inputOnFocus}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={idx === 0}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...inputProps}
            />
            {value && (
              <s
                role="presentation"
                data-testid={`dot-${idx}`}
                onClick={(e) => { focusCurrentElement(e.target as HTMLElement) }}
              />
            )}
          </div>
        ))}
      </div>
      {error && <span role="note" data-testid="error" className={s.error}>{error}</span>}
      <div className={s.actionsDiv}>
        <span
          role="button"
          tabIndex={0}
          className={s.forgotPasscode}
          data-testid="forgot-password"
          onClick={() => { triggerCallback(onForgotPasscodeClick) }}
          onKeyUp={e => {
            onEnter(e, onForgotPasscodeClick)
          }}
        >
          {forgotPasscodeText}
        </span>
        {alternativeActionText && (
          <span
            role="button"
            tabIndex={0}
            className={s.alternativeAction}
            data-testid="alternative-action"
            onClick={() => { triggerCallback(onAlternativeActionClick) }}
            onKeyUp={e => {
              onEnter(e, onAlternativeActionClick)
            }}
          >
          {alternativeActionText}
          </span>
        )}
      </div>
    </div>
  );
};

export default React.memo(Passcode);
