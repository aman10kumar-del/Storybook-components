import React from "react";
import { MAX_TRAILING_ITEMS, SectionHeaderProps } from "./SectionHeader.types";
import cx from "../../utils/classNames";
import Button from "../Button/Button";
import s from "./SectionHeader.module.scss";

const SectionHeader: React.FC<SectionHeaderProps> = ({
	size = "extra-large",
	title = "",
	subTitle = "",
	TrailingIcons=null,
	TrailingLink=null,
	TrailingText=null,
	TrailingButton = null,
	offset = false,
	customClass = "",
	titleClassName = "",
	titleWeight = "bold",
}) => {
	const renderTrailingSection = () => {
		if (!TrailingIcons?.length && !TrailingLink && !TrailingText && !TrailingButton) {
			return null;
		}

		return (
			<section className={s.trailingSection}>
				{TrailingIcons?.slice(0, MAX_TRAILING_ITEMS).map((TrailingIcon, idx) => (
					<span
						key={idx}
						data-testid={`icon-${idx}`}
						className={cx(s.trailingIcon)}
					>
						{TrailingIcon}
					</span>
				))}
				{!TrailingIcons?.length && TrailingButton && (
					<span data-testid="button" className={s.trailingButton}>
						<Button size="small" type="stroke" {...TrailingButton} />
					</span>
				)}
				{!TrailingIcons?.length && !TrailingButton && TrailingLink && (
					<span
						data-testid="link"
						className={s.trailingLink}
					>
						{TrailingLink}
					</span>
				)}
				{!TrailingIcons?.length && !TrailingButton && !TrailingLink && TrailingText && (
					<span data-testid="text" className={s.trailingText}>
						{TrailingText}
					</span>
				)}
			</section>
		);
	};

	return (
		<div
			data-testid="section-header-container"
			className={cx(
				s.sectionHeaderContainer,
				`${s[size]}`,
				{
					[s.offset]: offset,
					[s.extraVerticalPadding]: offset && !subTitle,
					[s.largeTitleMedium]: titleWeight === "medium" && size === "large",
				},
				customClass
			)}
		>
			<div className={s.firstRow}>
				<span role="heading" aria-level={2} data-testid="title" className={cx(s.title, titleClassName)}>{title}</span>
				{renderTrailingSection()}
			</div>
			{subTitle && (
				<div className={s.secondRow}>
					<span role="note" data-testid="sub-title" className={s.subTitle}>{subTitle}</span>
				</div>
			)}
		</div>
	);
};

export default React.memo(SectionHeader);
