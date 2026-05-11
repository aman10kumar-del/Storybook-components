import React, { Fragment } from "react";

import { BadgeProps } from "./Badge.types";
import cx from "../../utils/classNames";
import s from "./Badge.module.scss";

const Badge: React.FC<BadgeProps> = ({
	label = "",
	context = "primary",
	muted = false,
	shape = "normal",
	customClass = "",
	LeadingIcon = null,
	TrailingIcon = null
}) => {
	return (
		<div
			data-testid="badge"
			className={cx(
				s.badge,
				s[context],
				muted && s.muted,
				s[shape],
				{
					[s.leadingIcon]: LeadingIcon,
					[s.trailingIcon]: TrailingIcon,
				},
				customClass,
			)}
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
	);
};

export default Badge;
