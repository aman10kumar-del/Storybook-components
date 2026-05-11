import React from 'react'

import { RadioButtonProps } from './RadioButton.types';
import cx from "../../utils/classNames";
import s from './RadioButton.module.scss';

const RadioButton: React.FC<RadioButtonProps> = function ({
  disabled = false,
  checked = false,
  emphasis = "high",
  layout = "block",
  label = "",
  name = "",
  value = "",
  customClass = "",
  onChecked
}) {
  return (
    <div
      className={cx(s.radioButtonContainer, `${s[layout]}`, customClass)}
      data-testid="radio-container"
    >
      <input
        name={name}
        id={value}
        type="radio"
        value={value}
        checked={checked}
        onChange={(e) => {
          if (onChecked) {
            onChecked(e)
          }
        }}
        disabled={disabled}
        data-testid="radio-input"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
      <label
        className={cx(`${s[emphasis]}`)}
        htmlFor={value}
        data-testid="radio-label"
      >
        {label}
      </label>
      <span
        data-testid="radio-span"
        role="radio"
        aria-label={typeof label === "string" ? label : "radio label"}
        aria-checked={checked}
      />
    </div>
  )
}

export default RadioButton;
