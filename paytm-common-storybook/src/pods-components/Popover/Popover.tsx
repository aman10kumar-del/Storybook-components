/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useRef } from "react";
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

import { HorizontalPositions, PopoverProps, VerticalPositions } from "./Popover.types";
import cx from "../../utils/classNames";
import { onEnter } from "../../utils/utils";
import s from "./Popover.module.scss";

const CARET_HEIGHT = 12;

const Popover: React.FC<PopoverProps> = ({
	caretPosition = "bottom-right",
	children = null,
	customClass = "",
	content = null,
	initialOpen = false,
	portal = false,
	customProps = {}
}) => {
	const [popoverState, togglePopover] = useMenuState({
		transition: true,
		initialMounted: true
	});
  const anchorProps = useClick(popoverState.state, togglePopover);
	const anchorRef = useRef<HTMLDivElement>(null)
	const popoverRef = useRef<HTMLDivElement>(null)

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

	const getVerticalTransformLocation = (computedTop: string) => {
		const { verticalPosition } = getCaretPositions();
		if (verticalPosition === "top") {
			return computedTop
		}
		const parsedTop = parseInt(computedTop.replace("px", ""), 10)
		if (Number.isNaN(parsedTop)) {
			return computedTop;
		}
		return `${parsedTop + CARET_HEIGHT}px`
	}

	const getPopoverStyles = () => {
		const arrowElement = (popoverRef.current?.getElementsByClassName("szh-menu__arrow") || [])[0]
		if (!arrowElement) return {};
		const { left, top } = getComputedStyle(arrowElement)
		return {
			transformOrigin: `${left} ${getVerticalTransformLocation(top)}`
		}
	}

	useEffect(() => {
		if (anchorRef.current && initialOpen) {
			togglePopover(true);
		}
	}, [])

	if (!React.Children.toArray(children)?.length) {
		return null;
	}

	return (
		<div
			data-testid="popover-container"
			className={cx(s.popoverContainer, customClass)}
		>
			<div
				role="button"
				tabIndex={0}
				aria-label="open popover"
				aria-haspopup="dialog"
				data-testid="trigger-container"
        ref={anchorRef}
				onKeyUp={e => {
					onEnter(e, togglePopover)
				}}
        {...anchorProps}
			>
        {children}
			</div>
      <ControlledMenu
				{...popoverState}
				{...getDirection()}
				containerProps={{
				// @ts-ignore
					"data-testid": "popover"
				}}
				ref={popoverRef}
				menuClassName={s.popover}
				arrowProps={{
					className: s.caret
				}}
				menuStyle={getPopoverStyles()}
        position="auto"
        viewScroll="close"
        arrow
        anchorRef={anchorRef}
        onClose={() => {
          togglePopover(false);
        }}
				portal={portal}
				{...customProps}
      >
				<MenuItem className={s.popoverContent}>{content}</MenuItem>
      </ControlledMenu>
		</div>
	);
};

export default React.memo(Popover);
