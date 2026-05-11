import React from "react";
import { createPortal } from "react-dom";

import { BottomSheetProps } from "./BottomSheet.types";
import { ReactComponent as CrossIcon } from "../../assets/ultra-icons/system/nav/dismiss.svg";
import Button from "../Button/Button";
import { triggerCallback } from "../../utils/utils";
import useHasMounted from "../../utils/hooks/useHasMounted";
import cx from "../../utils/classNames";
import s from "./BottomSheet.module.scss";

const BottomSheet: React.FC<BottomSheetProps> = ({
	children = null,
	active = false,
	title = "",
	description = "",
	primaryButton,
	secondaryButton,
	showCloseIcon = true,
	showGrabber = false,
	triggerClose,
	attachToElementID = "root",
	reserveSpaceForBottomBar = false,
	customClass = ""
}) => {
	const hasMounted = useHasMounted();
	if (!hasMounted) {
    return null;
  }

	const root = document.getElementById(attachToElementID);
  if (!root) return null

	const isContentPresent = () => {
		return title || showCloseIcon || description || React.Children.toArray(children).length
	}

	const isActionsPresent = () => {
		return primaryButton?.label || secondaryButton?.label
	}

	const renderContentSection = () => {
		if (!isContentPresent()) {
			return null;
		}
		return (
			<section className={s.contentSection}>
				{(title || showCloseIcon) && (
					<div className={s.bottomSheetHeader}>
						{title && (
							<span
								className={s.label}
								role="heading"
								aria-level={2}
								data-testid="title"
							>
								{title}
							</span>
						)}
						{showCloseIcon && (
							<span className={s.crossIcon}>
								<CrossIcon
									data-testid="close-icon"
									onClick={() => triggerCallback(triggerClose)}
								/>
							</span>
						)}
					</div>
				)}
				{description && (
					<p
						data-testid="description"
						className={s.description}
					>
						{description}
					</p>
				)}
				{React.Children.toArray(children).length > 0 && (
					<div
						data-testid="children"
						className={s.children}
					>
						{children}
					</div>
				)}
			</section>
		)
	}

	const renderActionSection = () => {
		if (!isActionsPresent()) {
			return null;
		}
		return (
			<section className={s.actionSection}>
				{primaryButton?.label && (
					<Button
						type="filled"
						{...primaryButton}
						customClass={cx("zero-horizontal-margin full-width", primaryButton?.customClass)}
						size="large"
					/>
				)}
				{secondaryButton?.label && (
					<Button
						type="stroke"
						{...secondaryButton}
						onClick={() => {
							triggerCallback(triggerClose)
							triggerCallback(secondaryButton?.onClick)
						}}
						customClass={cx("zero-horizontal-margin full-width", secondaryButton?.customClass)}
						size="large"
					/>
				)}
			</section>
		);
	}

	return createPortal(
		<div
			data-testid="bottom-sheet-container"
			className={cx(s.bottomSheetContainer, {
				[s.active]: active,
			})}
		>
			<div
				role="presentation"
				data-testid="backdrop"
				className={s.backDrop}
				onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					e.stopPropagation();
					triggerCallback(triggerClose);
				}}
			/>
			<div
				role="presentation"
				className={cx(s.bottomSheetContent, {
					[s.extraBottomPadding]: reserveSpaceForBottomBar
				}, customClass)}
				data-testid="bottom-sheet"
				onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					e.stopPropagation();
				}}
			>
				{renderContentSection()}
				{renderActionSection()}
				{showGrabber && <span data-testid="grabber" className={s.grabber} />}
			</div>
		</div>,
	root
	)
};

export default React.memo(BottomSheet);
