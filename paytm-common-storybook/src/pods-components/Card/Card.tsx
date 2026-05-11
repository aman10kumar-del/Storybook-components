import React from "react";

import { CardProps } from "./Card.types";
import { triggerCallback } from "../../utils/utils";

import s from "./Card.module.scss";

const Card: React.FC<CardProps> = ({
	children = null,
	customClass = '',
	onClick
}) => {
	return (
		<div
			role="presentation"
			data-testid="card"
			className={`${s.cardWrapper} ${customClass}`}
			onClick={() => {
				triggerCallback(onClick)
			}}
		>
			{children}
		</div>
	);
};

export default React.memo(Card);
