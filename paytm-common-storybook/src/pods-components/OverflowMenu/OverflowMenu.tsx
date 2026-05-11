/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef } from "react";
import {
  ControlledMenu,
  MenuItem,
  useClick,
  useMenuState,
} from "@szhsin/react-menu";
import type {
	MenuAlign,
  MenuDirection,
} from "@szhsin/react-menu"

import { HorizontalPositions, OverflowMenuProps, VerticalPositions } from "./OverflowMenu.types";
import cx from "../../utils/classNames";
import { onEnter, triggerCallback } from "../../utils/utils";
import s from "./OverflowMenu.module.scss";

const OverflowMenu: React.FC<OverflowMenuProps> = ({
	caretPosition = "bottom-trailing",
	type = "standard",
	children = null,
	customClass = "",
	menuItems = [],
	initialOpen = false,
	onClick,
	customProps = {}
}) => {
	const [overflowMenuState, toggleOverFlowMenu] = useMenuState({
		transition: true,
		initialOpen,
	});
  const anchorProps = useClick(overflowMenuState.state, toggleOverFlowMenu);
	const anchorRef = useRef<HTMLDivElement>(null)

	const getCaretPositions = () => {
		const [verticalPosition, horizontalPositon] = caretPosition.split("-") as [VerticalPositions, HorizontalPositions]
		return {
			verticalPosition,
			horizontalPositon
		}
	}

	const getHorizontalDirection = (position: HorizontalPositions) => {
		if (position === "center") {
			return position
		}
		return position === "trailing" ? "end" : "start"
	}

	const getDirection = (): {direction: MenuDirection, align: MenuAlign} => {
		const { verticalPosition, horizontalPositon } = getCaretPositions();
		return {
			direction: verticalPosition === "bottom" ? "top" : "bottom",
			align: getHorizontalDirection(horizontalPositon)
		}
	}

	if (!React.Children.toArray(children)?.length) {
		return null;
	}

	return (
		<div
			data-testid="overflow-container"
			className={cx(s.overflowContainer, customClass)}
		>
			<div
				role="button"
				tabIndex={0}
				aria-label="open overflow menu"
				aria-haspopup="menu"
				data-testid="trigger-container"
				ref={anchorRef}
				onKeyUp={e => {
					onEnter(e, toggleOverFlowMenu)
				}}
				{...anchorProps}
			>
				{children}
			</div>
			<ControlledMenu
				{...overflowMenuState}
				{...getDirection()}
				containerProps={{
				// @ts-ignore
					"data-testid": "overflow"
				}}
				menuClassName={cx(s.overflow, {
					[s.primary]: type === "primary"
				})}
				arrowProps={{
					className: s.caret
				}}
				position="auto"
				viewScroll="close"
				arrow
				anchorRef={anchorRef}
				onClose={() => {
					toggleOverFlowMenu(false);
				}}
				portal
				{...customProps}
			>
				{
					menuItems.map(menu => (
						<MenuItem
							key={menu.label}
							onClick={() => {
								triggerCallback(onClick, menu)
							}}
							className={s.menuItem}
						>
							{menu.LeadingIcon && (
								<span data-testid="icon" className={s.icon}>{menu.LeadingIcon}</span>
							)}
							<span data-testid="name" className={s.name}>{menu.label}</span>
						</MenuItem>
					))
				}
			</ControlledMenu>
		</div>
	);
};

export default React.memo(OverflowMenu);
