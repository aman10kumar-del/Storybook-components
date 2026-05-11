import React from "react";

import {
	AvatarPropsExceptSize,
	GridAvatarProps,
	GridCategoryProps,
	GridIconProps,
	GridProps
} from "./Grid.types";
import cx from "../../utils/classNames";
import s from "./Grid.module.scss";
import Avatar from "../Avatar/Avatar";

const Grid: React.FC<GridProps> = (props) => {
	const {
		type = "category",
		customClass = ""
	} = props;

	const renderGridAvatar = () => {
		const {
			gridAvatar: {
				items = []
			} = {}
		} = props as GridAvatarProps
		return (
			<div
				role="row"
				className={s.gridContent}
			>
				{items.map(({ avatarProps = {}, label = "" }) => (
					<div
						key={label}
						className={s.gridItemContainer}
						role="gridcell"
					>
						<span data-testid="grid-avatar" className={s.gridAvatar}>
							<Avatar
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...avatarProps as AvatarPropsExceptSize}
								size="regular"
							/>
						</span>
						<span data-testid="grid-label" className={s.gridLabel}>{label}</span>
					</div>
				))}
			</div>
		)
	}

	const renderGridIcon = () => {
		const {
			gridIcon: {
				items = []
			} = {}
		} = props as GridIconProps
		return (
			<div
				role="row"
				className={s.gridContent}
			>
				{items.map(({ Icon, label = "" }) => (
					<div
						key={label}
						className={s.gridItemContainer}
						role="gridcell"
					>
						<span data-testid="grid-icon" className={s.gridIcon}>{Icon}</span>
						<span data-testid="grid-label" className={s.gridLabel}>{label}</span>
					</div>
				))}
			</div>
		)
	}

	const renderGridCategory = () => {
		const {
			gridCategory: {
				items = []
			} = {}
		} = props as GridCategoryProps
		return (
			<div
				className={s.gridContent}
				role="row"
			>
				{items.map(({ Icon, label = "" }) => (
					<div
						role="gridcell"
						key={label}
						className={s.gridItemContainer}
					>
						<span data-testid="grid-icon" className={s.gridIcon}>{Icon}</span>
						<span data-testid="grid-label" className={s.gridLabel}>{label}</span>
					</div>
				))}
			</div>
		)
	}

	const renderGrid = () => {
		if (type === "avatar") {
			return renderGridAvatar();
		}
		if (type === "icon") {
			return renderGridIcon();
		}
		return renderGridCategory();
	}

	return (
		<div
			role="grid"
			data-testid={`grid-${type}-container`}
			className={cx(s.gridContainer, `${s[type]}`, customClass)}
		>
			{renderGrid()}
		</div>
	);
};

export default React.memo(Grid);
