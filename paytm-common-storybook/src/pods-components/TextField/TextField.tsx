import React from "react";

import { TextFieldProps } from "./TextField.types";
import { triggerCallback } from "../../utils/utils";
import cx from "../../utils/classNames";
import s from "./TextField.module.scss";

const TextField: React.FC<TextFieldProps> = ({
	label = "",
	onChange,
	emphasis = "low",
	value = "",
	LeadingIcon,
	TrailingIcon,
	TrailingLink,
	assistiveText = "",
	error = "",
	customClass = "",
	inputProps = {},
	disabled,
	...restProps
}) => {

	return (
		<div
			data-testid="text-field-container"
			className={cx(s.textFieldContainer, `${s[emphasis]}`, {
				[s.error]: error,
				[s.disabled]: disabled
			}, customClass)}
		>
			<section
				className={cx(s.inputSection, {
					[s.hasLeadingIcon]: LeadingIcon,
					[s.hasTrailingIcon]: TrailingIcon,
			})}
			>
				{LeadingIcon && (
					<span
						data-testid="leading-icon"
						className={cx(s.icon, s.leadingIcon)}
						aria-disabled={disabled}
					>
						{LeadingIcon}
					</span>
				)}
				<div
					className={cx(s.inputContainer, {
						[s.inputEmpty]: !value
					})}
				>
					<input
						aria-label={label}
						data-testid="input-field"
						type="text"
						value={value}
						placeholder={" "}
						disabled={disabled}
						onChange={(e) => {
							triggerCallback(onChange, e?.target?.value)
						}}
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...inputProps}
					/>
					<span data-testid="label" className={s.label} aria-disabled={disabled}>{label}</span>
				</div>
				{TrailingIcon && (
					<span
						data-testid="trailing-icon"
						className={cx(s.icon, s.trailingIcon)}
					>
						{TrailingIcon}
					</span>
				)}
				{!TrailingIcon && TrailingLink && (
					<span data-testid="trailing-link" className={s.trailingLink} aria-disabled={disabled}>{TrailingLink}</span>
				)}
			</section>
			{(error || assistiveText) && (
				<section
					role="note"
					className={cx(s.infoSection)}
				>
				{error && <span data-testid="error" className={s.error}>{error}</span>}
				{!error && assistiveText && (
								<span data-testid="assistive-text" className={s.assistiveText}>{assistiveText}</span>
							)}
				</section>
			)}
		</div>
	);
};

export default React.memo(TextField);
