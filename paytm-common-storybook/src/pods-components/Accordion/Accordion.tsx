import React, { useState } from "react";

import { AccordionProps } from "./Accordion.types";
import Separator from "../Separator/Separator";
import { ReactComponent as UpArrow } from '../../assets/ultra-icons/system/nav/arrow_up.svg'
import { ReactComponent as DownArrow } from '../../assets/ultra-icons/system/nav/arrow_down.svg'
import cx from "../../utils/classNames";
import s from "./Accordion.module.scss";
import { onEnter } from "../../utils/utils";

const Accordion: React.FC<AccordionProps> = ({
	items = [],
	separator = true,
	hideSeparatorForLastItem = true,
	customClass = '',
}) => {
	const [expandedIdx, setExpandedIdx] = useState(-1)

	const showSeparator = (idx: number) => {
		if (idx !== (items || []).length - 1) return separator
		return separator && !hideSeparatorForLastItem
	}

	const isItemExpanded = (idx: number) => expandedIdx === idx;

	const onItemClick = (idx: number) => {
		setExpandedIdx(isItemExpanded(idx) ? -1 : idx)
	}

	return (
		<ul
			className={cx(s.accordionContainer, customClass)}
			data-testid="accordion-container"
		>
			{items?.map((item, idx) => (
				<li
					key={item.id || idx}
					className={cx(s.itemContainer, {
						[s.expanded]: expandedIdx === idx
					})}
					data-testid="item-container"
				>
					<div
						role="button"
						tabIndex={0}
						aria-expanded={isItemExpanded(idx)}
						className={s.titleContainer}
						data-testid="title-container"
						onClick={() => {
							onItemClick(idx);
						}}
						onKeyUp={(e) => {
							onEnter(e, onItemClick.bind(undefined, idx))
						}}
					>
						<span
							role="heading"
							aria-level={5}
							className={s.title}
							data-testid="title"
						>
							{item.title}
						</span>
						<span className={s.arrowIcon}>
							{isItemExpanded(idx) ? <UpArrow /> : <DownArrow />}
						</span>
					</div>
					{isItemExpanded(idx) && (
						<div className={s.descriptionContainer}>
							<p
								className={s.description}
								data-testid="description"
							>
								{item.content}
							</p>
						</div>
					)}
					{showSeparator(idx) && (
							<div className={s.separator}><Separator hairline /></div>
						)}
				</li>
			))}
		</ul>
	);
};

export default React.memo(Accordion);
