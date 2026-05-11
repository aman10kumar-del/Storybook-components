import React from "react";

import { CheckboxProps } from "./Checkbox.types";
import { triggerCallback } from "../../utils/utils";
import { ReactComponent as CheckboxOn } from "../../assets/ultra-icons/system/toggle/checkbox_on.svg"
import { ReactComponent as CheckboxOff } from "../../assets/ultra-icons/system/toggle/checkbox_off.svg"
import { ReactComponent as CheckboxIndeterminate } from "../../assets/ultra-icons/system/toggle/checkbox_indeterminate.svg"
import cx from "../../utils/classNames";
import s from "./Checkbox.module.scss";

const Checkbox: React.FC<CheckboxProps> = ({
	id = "",
	label = "",
	checked = "false",
	disabled = false,
	customClass = "",
	onChange,
	emphasis = "high",
  layout = "block",
}) => {
	const renderStatus = () => {
		switch (checked) {
			case "true":
				return <CheckboxOn data-testid="status-on" />
			case "false":
				return <CheckboxOff data-testid="status-off" />
			case "indeterminate":
				return <CheckboxIndeterminate data-testid="status-indeterminate" />
			default:
				return null;
		}
	}

	return (
		<div
			data-testid="checkbox-container"
			className={cx(s.checkboxContainer, `${s[layout]}`, {
				[s.checked]: checked === "true",
				[s.unchecked]: checked === "false",
				[s.indeterminate]: checked === "indeterminate",
				[s.disabled]: disabled,
			}, customClass)}
		>
			<input
				id={id || `checkbox-${label}`}
				className={s.checkboxInput}
				type="checkbox"
				checked={checked === "true"}
				onChange={(e) => {
					triggerCallback(onChange, String(e?.target?.checked))
				}}
				onClick={(e) => {
					e.stopPropagation();
				}}
			/>
			<label
				role="presentation"
				data-testid="checkbox-label"
				htmlFor={id || `checkbox-${label}`}
				className={s.label}
			>
				<span
					role="checkbox"
					aria-checked={checked === "true"}
					aria-label={label}
					className={s.statusIcon}
				>
					{renderStatus()}
				</span>
				<span data-testid="label-text" className={cx(s.text, `${s[emphasis]}`)}>{label}</span>
			</label>
		</div>
	);
};

export default React.memo(Checkbox);
