import React, { useEffect, useMemo, useState } from "react";

import { OTPProps } from "./OTP.types";
import { onEnter, triggerCallback } from "../../utils/utils";
import s from "./OTP.module.scss";
import cx from "../../utils/classNames";

const RE_DIGIT = /^\d+$/;
let timer: any;

const OTP: React.FC<OTPProps> = ({
  value = "",
  inputLength = 6,
  onChange,
  title = "One Time Password (OTP)",
  customClass = "",
  error = "",
  warning = "",
  resendOTPText = "Resend OTP",
  resendOTPInterval = 30,
  onResendOTPClick = () => {},
  alternativeActionText = "",
  onAlternativeActionClick = () => {},
  inputProps = {}
}) => {
	const [timerValue, setTimerValue] = useState(0);

	useEffect(() => {
		if (timerValue === resendOTPInterval) {
			timer = setInterval(() => {
				setTimerValue(timerValue => timerValue - 1)
			}, 1000)
		} else if (timerValue === 0) {
			clearInterval(timer)
		}
	}, [timerValue])

  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items = [];

    for (let i = 0; i < inputLength; i++) {
      const char = valueArray[i];
			items.push(RE_DIGIT.test(char) ? char : "")
    }
    return items;
  }, [value, inputLength]);

  const focusToNextInput = (target: HTMLInputElement) => {
    const nextElementSibling = target.nextElementSibling as HTMLInputElement;

    if (nextElementSibling) {
      nextElementSibling.focus();
    }
  };

  const focusToPrevInput = (target: HTMLInputElement) => {
    const previousElementSibling = target.previousElementSibling as HTMLInputElement;

    if (previousElementSibling) {
      previousElementSibling.focus();
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
    const { target } = e;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";
    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
			const currentValue = valueItems?.map(v => (v === '' ? ' ' : v))?.join('');
      // eslint-disable-next-line operator-linebreak
      const newValue =
        currentValue.substring(0, idx) + targetValue + currentValue.substring(idx + 1);
      triggerCallback(onChange, newValue);
      if (!isTargetValueDigit) {
        return;
      }
			manageElementFocus(target, newValue);
    }
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

    if (e.key !== "Backspace" || targetValue !== "") {
      return;
    }
    focusToPrevInput(target);
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { target } = e;
    target.setSelectionRange(0, target.value.length);
  };

	const getFormattedTimerString = (timerValue: number) => {
		const minutes = Math.floor(timerValue / 60);
		const seconds = Math.floor(timerValue % 60);

		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}

  const resendOTPHandler = () => {
    setTimerValue(resendOTPInterval);
    triggerCallback(onResendOTPClick);
  }

  return (
    <div data-testid="otp-container" className={`${s.otpContainer} ${customClass}`}>
      <span data-testid="custom-title" className={s.title}>{title}</span>
      <div className={s.otpBox}>
        {valueItems.map((digit, idx) => (
          <input
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            aria-label={`input-box-${idx}`}
						data-testid={`input-box-${idx}`}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{1}"
            maxLength={1}
            value={digit}
            onChange={(e) => inputOnChange(e, idx)}
            onKeyDown={(e) => inputOnKeyDown(e)}
            onFocus={inputOnFocus}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus={idx === 0}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...inputProps}
          />
        ))}
      </div>
      <div className={s.infoSection}>
        {warning && !error && <span role="note" data-testid="warning" className={s.warning}>{warning}</span>}
        {error && <span role="note" data-testid="error" className={s.error}>{error}</span>}
        {resendOTPText && (
          <span
            role="button"
            tabIndex={0}
						data-testid="resend-otp"
            className={cx(s.resendOTP, {
							[s.countDown]: timerValue
						})}
            onClick={resendOTPHandler}
            onKeyUp={(e) => {
              onEnter(e, resendOTPHandler)
            }}
          >
            {`${resendOTPText}${timerValue ? ` in ${getFormattedTimerString(timerValue)}` : ''}`}
          </span>
        )}
      </div>
      {alternativeActionText && (
				<div className={s.altAction}>
					<span
            role="button"
            tabIndex={0}
						data-testid="alternative-action"
						onClick={() => {
							triggerCallback(onAlternativeActionClick);
						}}
            onKeyUp={(e) => {
              onEnter(e, onAlternativeActionClick)
            }}
					>
						{alternativeActionText}
					</span>
				</div>
      )}
    </div>
  );
};

export default React.memo(OTP);
